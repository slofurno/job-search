defmodule Jobsearch.Router do
  use Plug.Router
  require Logger
  alias Jobsearch.Job
  alias Jobsearch.History

  plug :match
  plug :dispatch

  def init(options) do
    options
  end

  get "/api/jobs" do
    jobs = Sqlitex.Server.query(Sqlitex.Server, "select * from jobs", into: %Job{})
    |> Poison.encode!

    send_resp(conn, 200, jobs)
  end

  get "/api/history" do
    history = Sqlitex.Server.query(Sqlitex.Server, "select * from history", into: %{})
    |> Poison.encode!

    send_resp(conn, 200, history)
  end

  get "/" do
    conn = fetch_query_params(conn)
    send_resp(conn, 200, "received #{inspect(conn.params)}")
  end

  post "/api/jobs" do
    {:ok, body, conn} = read_body(conn, [])
    job = Poison.decode!(body, as: %Job{})
    job = %{job | id: random_hex()}
		Sqlitex.Server.query(Sqlitex.Server, "insert into jobs values (?,?,?,?,?)", 
			bind: [job.id, job.name, job.url, job.city, job.text])

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Poison.encode!(job))
  end

  get "/api/jobs/:id" do
    conn
    |> send_resp(200, "hello #{id}")
  end

  post "/api/history" do
    {:ok, body, conn} = read_body(conn, [])
    history = Poison.decode!(body, as: %History{})
    history = %{history | id: random_hex(), time: epoch_time()}
    Sqlitex.Server.query(Sqlitex.Server, "insert into history values (?,?,?,?)",
			bind: [history.id, history.job, history.status, history.time])

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Poison.encode!(history))
  end

  match _ do
    IO.inspect(conn.params)
    send_resp(conn, 404, "oops")
  end

  @hex "0123456789abcedf"

  def epoch_time do
    :os.system_time(:milli_seconds)
  end

  def random_hex do
    tevs = for <<a::size(4), b::size(4) <- :crypto.strong_rand_bytes(12)>>,
        n <- [a, b],
        do: String.at(@hex, n) 

    tevs
    |> to_string

  end
end
