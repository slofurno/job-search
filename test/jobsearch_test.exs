defmodule JobsearchTest do
  use ExUnit.Case
  doctest Jobsearch

  @shared_cache ':memory:'

  test "the truth" do
    assert 1 + 1 == 2
  end

	setup_all do
    {:ok, db} = Sqlitex.open(@shared_cache)
    on_exit fn ->
      Sqlitex.close(db)
    end
  end

	test "insert history" do
		{:ok, conn} = Sqlitex.Server.start_link(@shared_cache)
		[row] = Sqlitex.Server.query(conn, "select * from jobs", into: %{})
		IO.inspect(row)
	end

end
