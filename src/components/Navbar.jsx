import { Shield, LogIn, LogOut, User } from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Navbar({ onNavigate, onScrollToSection }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const role = user?.unsafeMetadata?.role;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Shield className="h-6 w-6 text-black" />
            <span className="text-xl font-bold tracking-tight text-black">
              TrustNet
            </span>
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate("detect")}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-black"
            >
              Detect
            </button>

            <button
              onClick={() => onScrollToSection("how-trustnet-helps")}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-black"
            >
              How it Works
            </button>

            <button
              onClick={() => onNavigate("report")}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-black"
            >
              Report
            </button>

            <button
              onClick={() => onNavigate("about")}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-black"
            >
              About
            </button>

            {/* AUTH */}
            {isLoaded && (
              <>
                {!isSignedIn ? (
                  <button
                    onClick={() => navigate("/login")}
                    className="text-gray-700 transition-colors hover:text-black"
                  >
                    <LogIn className="h-5 w-5" />
                  </button>
                ) : (
                  <div className="relative" ref={dropdownRef}>
                    {/* Avatar */}
                    <button
                      onClick={() => setOpen((v) => !v)}
                      className="flex items-center focus:outline-none"
                    >
                      <img
                        src={user.imageUrl}
                        alt="profile"
                        className="h-8 w-8 rounded-full border border-gray-300"
                      />
                    </button>

                    {/* Dropdown */}
                    {open && (
                      <div className="absolute right-0 mt-3 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                        {/* User info */}
                        <div className="border-b border-gray-100 px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">
                            {user.fullName || "User"}
                          </p>
                          <p className="truncate text-xs text-gray-500">
                            {user.primaryEmailAddress?.emailAddress}
                          </p>
                        </div>

                        {/* Profile */}
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setOpen(false);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                        >
                          <User className="h-4 w-4" />
                          Profile
                        </button>

                        {/* Admin badge */}
                        {role === "admin" && (
                          <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600">
                            <Shield className="h-4 w-4" />
                            Admin
                          </div>
                        )}

                        {/* Logout */}
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
