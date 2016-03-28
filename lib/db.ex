defmodule Jobsearch.Db do
  def start_link do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def put_value(key, value) do
    Agent.update(__MODULE__, &Map.put(&1, key, value))
  end

  def get_value(key) do
    Agent.get(__MODULE__, &Map.get(&1, key))
  end
end
