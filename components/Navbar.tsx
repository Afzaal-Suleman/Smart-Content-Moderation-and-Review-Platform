"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated, role, user } = useSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            <Link href="/">ContentPlatform</Link>
          </div>

          {/* Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Links without map */}
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-md font-medium transition ${
                    isActive("/") ? "font-bold text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  All Published Content
                </Link>

                {(role === "user" || role === "moderator" || role === "admin") && (
                  <Link
                    href="/add-content"
                    className={`px-3 py-2 rounded-md font-medium transition ${
                      isActive("/add-content") ? "font-bold text-blue-600" : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    Add Content
                  </Link>
                )}

                {(role === "moderator" || role === "admin") && (
                  <Link
                    href="/human-review/review-content"
                    className={`px-3 py-2 rounded-md font-medium transition ${
                      isActive("/human-review/review-content")
                        ? "font-bold text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    Review Submissions
                  </Link>
                )}

                {role === "admin" && (
                  <Link
                    href="/admin/admin-review-content"
                    className={`px-3 py-2 rounded-md font-medium transition ${
                      isActive("/admin/admin-review-content")
                        ? "font-bold text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    Publish Content
                  </Link>
                )}

                <Link
                  href="/my-content"
                  className={`px-3 py-2 rounded-md font-medium transition ${
                    isActive("/my-content") ? "font-bold text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  My Content
                </Link>

                {/* User info & logout */}
                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-gray-800 font-medium">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-3 py-2 rounded-md font-medium transition ${
                    isActive("/login") ? "font-bold text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={`px-3 py-2 rounded-md font-medium transition ${
                    isActive("/signup") ? "font-bold text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
