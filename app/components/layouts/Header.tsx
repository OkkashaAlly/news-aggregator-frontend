// COMPONENTS =========================================
import { SearchBar } from "..";

// ===================================================
// HEADER LAYOUT COMPONENT (app/page.tsx) ============
// ===================================================
export default function Header() {
  // RETURN ==========================================
  return (
    <header className="border-b border-b-gray-300 shadow-sm bg-white py-3">
      <div className="container w-[75%] flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {/* logo */}
          <h1 className="text-2xl font-bold">News App</h1>
          {/* search bar  */}
          <SearchBar />
        </div>
        {/* buttons  */}
        <div className="flex gap-4">
          <button className="text-gray-600 px-4 py-2 rounded-md">Login</button>
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md">
            Create account
          </button>
        </div>
      </div>
    </header>
  );
}

// EXTENDED COMPONENTS =================================
