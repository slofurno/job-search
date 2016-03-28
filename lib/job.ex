defmodule Jobsearch.Job do
  defstruct [:id, :name, :city, :url, :text]
end

defmodule Jobsearch.History do
  defstruct [:id, :job, :status, :time]
end

defmodule Jobsearch.Topic do
  defstruct [:id, :order, :title]
end
