defmodule Jobsearch.Plugstarter do
  def start_link() do
    {:ok, _} = Plug.Adapters.Cowboy.http Jobsearch.Endpoint, [], port: 4004
  end
end
