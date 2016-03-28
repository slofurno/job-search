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

  get "/jobs" do
    jobs = Sqlitex.Server.query(Sqlitex.Server, "select * from jobs", into: %{})
    |> Poison.encode!

    send_resp(conn, 200, jobs)
  end

  get "/history" do
    history = Sqlitex.Server.query(Sqlitex.Server, "select * from history", into: %{})
    |> Poison.encode!

    send_resp(conn, 200, history)
  end

  get "/" do
    conn = fetch_query_params(conn)
    send_resp(conn, 200, "received #{inspect(conn.params)}")
  end

  post "/jobs" do
    {:ok, body, conn} = read_body(conn, [])
    job = Poison.decode!(body, as: %Job{})
		Sqlitex.Server.query(Sqlitex.Server, "insert into jobs values (?,?,?,?,?)", 
			[job.id, job.name, job.url, job.city, job.text])
    send_resp(conn, 200, "thanks")
  end

  post "/history" do
    {:ok, body, conn} = read_body(conn, [])
    history = Poison.decode!(body, as: %History{})
    Sqlitex.Server.query(Sqlitex.Server, "insert into history values (?,?,?,?)",
			[history.id, history.job, history.status, history.time])
    send_resp(conn, 200, "thanks")
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
