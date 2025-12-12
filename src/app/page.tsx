/**
 * @file page.tsx (Homepage)
 * @description The main landing page of 1co18.
 * 
 * This is an ultra-minimal page featuring:
 * - The 1co18 logo centered on screen
 * - A search bar for finding songs
 * - A subtle "Add a song" link for contributors
 * - A theme toggle in the corner
 * 
 * The design is inspired by Google's homepage - clean and focused.
 */

import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchBar } from "@/components/SearchBar";

/**
 * Homepage component.
 * 
 * The main entry point for users. Renders a centered layout with:
 * 1. Theme toggle button (top right)
 * 2. "1co18" logo with accent-colored "1"
 * 3. Search bar for finding songs
 * 4. "Can't find it? Add a song" link
 */
export default function Home() {
  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      {/* Theme Toggle - positioned absolutely in top right */}
      <header className="absolute top-4 right-4">
        <ThemeToggle />
      </header>

      {/* Main Content - vertically centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-16">
        {/* Logo */}
        <h1
          className="text-6xl md:text-7xl font-bold tracking-tight mb-8 logo-glow"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {/* The "1" is highlighted in the accent color */}
          <span className="text-[var(--accent)]">1</span>co18
        </h1>

        {/* Search Bar */}
        <SearchBar />

        {/* Add Song Link - subtle prompt for contributors */}
        <p className="mt-6 text-sm text-[var(--muted)]">
          Can&apos;t find it?{" "}
          <a
            href="/add"
            className="text-[var(--accent)] hover:underline"
          >
            Add a song
          </a>
        </p>
      </main>
    </div>
  );
}
