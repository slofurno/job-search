defmodule Jobsearch.Utils do
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

  def replace_last([_|[]], n) do
    [n]
  end

  def replace_last([x|xs],n) do
    [x|replace_last(xs, n)]
  end

  def serve_index(%Plug.Conn{path_info: []} = conn, _) do
    %{conn | path_info: ["index.html"]} 
  end

  def serve_index(conn, _) do
    conn
  end
end
