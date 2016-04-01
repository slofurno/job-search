defmodule Jobsearch.Endpoint do
  use Plug.Builder 

  plug Jobsearch.Router
  plug :serve_index

  plug Plug.Static,
  at: "/", from: :jobsearch

  def serve_index(%Plug.Conn{request_path: request_path, path_info: path_info} = conn,_) do
    case Regex.match?(~r/\./, request_path) do
      true -> conn
      false -> %{conn | path_info: path_info ++ ["index.html"]}
    end
  end
end
