"use client";
import { searchNews, setQuery } from "@/store/features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FormEvent, useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

// =====================================================
// SEARCH BAR COMPONENT ================================
// =====================================================
const SearchBar = () => {
  // redux
  const dispatch = useAppDispatch();

  const { query } = useAppSelector(state => state.search);

  // load initial news on page load
  useEffect(() => {
    dispatch(searchNews(query));
  }, []);

  // handle search
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    dispatch(searchNews(query));
  };

  // RETURN ==========================================
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border border-gray-300 rounded-md py-1.5 px-2.5"
    >
      <input
        type="text"
        className="w-full outline-none"
        placeholder="Search for news topic"
        onChange={e => {
          dispatch(setQuery(e.target.value || "headlines"));
        }}
      />
      <button className="ml-2">
        <HiMagnifyingGlass />
      </button>
    </form>
  );
};

export default SearchBar;
