"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/",                  label: "Dashboard",    color: "#00e5a0", bg: "rgba(0,229,160,0.1)"   },
  { href: "/stocks",            label: "Stocks",       color: "#00d4ff", bg: "rgba(0,212,255,0.1)"   },
  { href: "/crypto",            label: "Crypto",       color: "#ff6b2b", bg: "rgba(255,107,43,0.1)"  },
  { href: "/india",             label: "🇮🇳 India",    color: "#fb923c", bg: "rgba(251,146,60,0.1)"  },
  { href: "/watchlist",         label: "Watchlist",    color: "#fbbf24", bg: "rgba(251,191,36,0.1)"  },
  { href: "/analytics",         label: "Insights",     color: "#f472b6", bg: "rgba(244,114,182,0.1)" },
  { href: "/research-log",      label: "Research Log", color: "#38bdf8", bg: "rgba(56,189,248,0.1)"  },
  { href: "/portfolio-compare", label: "🧠 Advisor",   color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeLink = NAV_LINKS.find((l) => l.href === pathname) ?? NAV_LINKS[0];

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-14"
        style={{
          background: "rgba(7, 6, 15, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
        aria-label="Main navigation"
      >
        {/* Section-aware color bar at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${activeLink.color}55 35%, ${activeLink.color}55 65%, transparent 100%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center gap-3">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 mr-4 shrink-0"
            aria-label="Financial Analyst Agent home"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 animate-glow-pulse"
              style={{
                background: "linear-gradient(135deg, #00e5a0 0%, #00d4ff 100%)",
                color: "#07060f",
              }}
              aria-hidden="true"
            >
              FA
            </div>
            <div className="hidden sm:block leading-none">
              <span className="text-white font-bold text-sm tracking-tight block">Financial</span>
              <span className="font-semibold text-[10px] tracking-[0.12em] uppercase block" style={{ color: "rgba(255,255,255,0.35)" }}>
                Analyst Agent
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5 flex-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className="relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap"
                  style={
                    isActive
                      ? { color: link.color, background: link.bg }
                      : { color: "rgba(255,255,255,0.42)" }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.82)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)";
                  }}
                >
                  {isActive && (
                    <span
                      className="absolute inset-x-3 -bottom-px h-[1.5px] rounded-full"
                      style={{ background: link.color }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            {/* Live indicator */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(0,229,160,0.07)",
                border: "1px solid rgba(0,229,160,0.18)",
              }}
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span
                  className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                  style={{ backgroundColor: "#00e5a0" }}
                />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: "#00e5a0" }} />
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest" style={{ color: "#00e5a0" }}>
                LIVE
              </span>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 rounded-lg transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className={`block w-4 h-0.5 rounded-full bg-white/60 transition-all duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block w-4 h-0.5 rounded-full bg-white/60 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-0.5 rounded-full bg-white/60 transition-all duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden fixed top-14 left-0 right-0 z-40 px-4 py-3 flex flex-col gap-1 shadow-2xl"
          style={{
            background: "rgba(7, 6, 15, 0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={
                  isActive
                    ? {
                        color: link.color,
                        background: link.bg,
                        borderLeft: `2px solid ${link.color}`,
                      }
                    : { color: "rgba(255,255,255,0.48)", paddingLeft: "18px" }
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
