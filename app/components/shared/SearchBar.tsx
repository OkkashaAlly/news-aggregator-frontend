"use client";
import { searchNews } from "@/store/features/search/searchSlice";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

// =====================================================
// SEARCH BAR COMPONENT ================================
// =====================================================
const SearchBar = () => {
  // redux 
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("")


  // handle search
  const handleSearch = () => {
    dispatch(searchNews(searchTerm))
  };

  // RETURN ==========================================
  return (
    <div className="flex items-center border border-gray-300 rounded-md py-1.5 px-2.5">
      <input
        type="text"
        className="w-full outline-none"
        placeholder="Search for news topic"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="ml-2" onClick={handleSearch}>
        <HiMagnifyingGlass />
      </button>
    </div>
  );
};

export default SearchBar;
