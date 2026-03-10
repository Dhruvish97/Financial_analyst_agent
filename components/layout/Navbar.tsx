"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/stocks", label: "Stocks" },
  { href: "/crypto", label: "Crypto" },
  { href: "/india", label: "🇮🇳 India" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-900 border-b border-gray-800 flex items-center px-6"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mr-10" aria-label="Financial Analyst Agent home">
        <div
          className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-gray-950 font-bold text-sm"
          aria-hidden="true"
        >
          FA
        </div>
        <span className="text-white font-semibold text-sm tracking-wide hidden sm:block">
          Financial Analyst
        </span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-1 flex-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "text-green-400 bg-green-400/10"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Live Badge */}
      <div className="flex items-center gap-2" aria-label="Live prices active">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-green-400 text-xs font-mono font-semibold">LIVE</span>
      </div>
    </nav>
  );
}
