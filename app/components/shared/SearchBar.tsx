"use client";
import { searchNews } from "@/store/features/search/searchSlice";
import { useAppDispatch } from "@/store/hooks";
import { FormEvent, useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

// =====================================================
// SEARCH BAR COMPONENT ================================
// =====================================================
const SearchBar = () => {
  // redux
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("headlines");

  // load initial news on page load
  useEffect(() => {
    dispatch(searchNews(searchTerm));
  }, []);

  // handle search
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    dispatch(searchNews(searchTerm || "headlines"));
  };

  // RETURN ==========================================
  return (
    <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-md py-1.5 px-2.5">
      <input
        type="text"
        className="w-full outline-none"
        placeholder="Search for news topic"
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button className="ml-2" >
        <HiMagnifyingGlass />
      </button>
    </form>
  );
};

export default SearchBar;
