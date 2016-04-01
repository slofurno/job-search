defmodule Jobsearch.Endpoint do
  use Plug.Builder 

  plug Jobsearch.Router
  plug :serve_index

  plug Plug.Static,
  at: "/", from: :jobsearch

  plug :inspect_conn

  def replace_last([x|[]], n) do
    [n]
  end

  def replace_last([x|xs],n) do
    [x|replace_last(xs, n)]
  end

  # def inspect_conn(%Plug.Conn{path_info: [xs]} = conn, opts) do
  def inspect_conn(%Plug.Conn{request_path: x} = conn, opts) do
    case Regex.match?(~r/\./, x) do
      true -> conn
      false -> %{conn | path_info: x ++ ["index.html"]} 
      #send_resp(conn, 200, "false #{x}") 
    end
  end

  def serve_index(%Plug.Conn{path_info: []} = conn, opts) do
    %{conn | path_info: ["index.html"]} 
  end

  def serve_index(conn, opts) do
    conn
  end

end
