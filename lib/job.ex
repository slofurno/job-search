defmodule Jobsearch.Job do
  defstruct [:id, :name, :city, :url, :text]
end

defimpl Collectable, for: Jobsearch.Job do
  def into(original) do
    {original, fn
      job, {:cont, {k, v}} -> %{job | k => v}
      job, :done -> job
      _, :halt -> :ok
    end}
  end
end

defmodule Jobsearch.History do
  defstruct [:id, :job, :status, :time]
end

defimpl Collectable, for: Jobsearch.History do
  def into(original) do
    {original, fn
      history, {:cont, {k, v}} -> Map.put(history, k, v)
      history, :done -> history
      _, :halt -> :ok
    end}
  end
end

defmodule Jobsearch.Topic do
  defstruct [:id, :order, :title]
end
