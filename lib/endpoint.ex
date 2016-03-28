defmodule Jobsearch.Endpoint do
  use Plug.Builder

  plug Plug.Static,
  at: "/", from: "./public"

  plug Jobsearch.Router
end
