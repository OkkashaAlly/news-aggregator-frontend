"use client";
import { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

// =====================================================
// FILTERS  COMPONENT ==================================
// =====================================================
const Filter = () => {
  const [showModal, setShowModal] = useState(false);

  // handle search
  const handleFilters = () => {
    setShowModal(!showModal);
    console.log("searching...");
  };

  // RETURN ==========================================
  return (
    <div className="relative">
      <button onClick={handleFilters} className="flex gap-2 items-center">
        <HiOutlineAdjustmentsHorizontal />
        <span>Filters & Preferences</span>
      </button>
      {/* modal */}
      {showModal && <Modal />}
    </div>
  );
};

// EXTENDED COMPONENT =================================
const Modal = () => {
  return (
    <div className="absolute shadow-lg top-8 left-4">
      <div className="bg-white p-4 rounded">
        <h1>Modal</h1>
      </div>
    </div>
  );
};

export default Filter;
