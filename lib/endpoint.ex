defmodule Jobsearch.Endpoint do
  use Plug.Builder

  plug Plug.Static,
  at: "/", from: "./static"

  plug Jobsearch.Router
end
