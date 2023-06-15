"use client";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

// COMPONENTS =========================================
import { SearchBar } from "..";

// ===================================================
// HEADER LAYOUT COMPONENT (app/page.tsx) ============
// ===================================================
export default function Header() {
  const { user } = useAppSelector(state => state.auth);

  // RETURN ==========================================
  return (
    <header className="border-b border-b-gray-300 shadow-sm bg-white py-3">
      <div className="container w-[75%] flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {/* logo */}
          <Link href="/" className="text-2xl font-bold">
            News App
          </Link>
          {/* search bar  */}
          <SearchBar />
        </div>
        {user ? (
          <div className="flex gap-4 items-center">
            <p className="capitalize">{user.name}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            {/* buttons  */}
            <Link href="/login" className="text-gray-600 px-4 py-2 rounded-md">
              Login
            </Link>
            <Link
              href="/register"
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md"
            >
              Create account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

// EXTENDED COMPONENTS =================================
