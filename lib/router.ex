defmodule Jobsearch.Router do
  use Plug.Router
  require Logger
  alias Jobsearch.Job
  alias Jobsearch.History
  alias Jobsearch.Utils

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

  put "/api/jobs/:id" do
    {:ok, body, conn} = read_body(conn, [])
    job = Poison.decode!(body, as: %Job{})
		Sqlitex.Server.query(Sqlitex.Server, "update jobs set name=?, url=?, city=?, text=? where id = ?",
			bind: [job.name, job.url, job.city, job.text, id])

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Poison.encode!(job))
  end
  
  delete "/api/jobs/:id" do
		Sqlitex.Server.query(Sqlitex.Server, "delete from jobs where id=?", bind: [id])
    conn
    |> send_resp(200, "deleted #{id}")
  end

  delete "/api/history/:id" do
		Sqlitex.Server.query(Sqlitex.Server, "delete from history where id=?", bind: [id])
    conn
    |> send_resp(200, "deleted #{id}")
  end

  post "/api/jobs" do
    {:ok, body, conn} = read_body(conn, [])
    job = Poison.decode!(body, as: %Job{})
    job = %{job | id: Utils.random_hex()}
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
    history = %{history | id: Utils.random_hex(), time: Utils.epoch_time()}
    Sqlitex.Server.query(Sqlitex.Server, "insert into history values (?,?,?,?)",
			bind: [history.id, history.job, history.status, history.time])

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Poison.encode!(history))
  end

  match _ do
    conn
  end

end
