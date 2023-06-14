"use client";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

// =====================================================
// FILTERS  COMPONENT ==================================
// =====================================================
const Filter = () => {
  // handle search
  const handleFilters = () => {
    console.log("searching...");
  };

  // RETURN ==========================================
  return (
    <button onClick={handleFilters} className="flex gap-2 items-center">
      <HiOutlineAdjustmentsHorizontal />
      <span>Filters & Preferences</span>
    </button>
  );
};

export default Filter;
