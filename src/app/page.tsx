import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchBar } from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      {/* Theme toggle in top right */}
      <header className="absolute top-4 right-4">
        <ThemeToggle />
      </header>

      {/* Main content - centered vertically */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-16">
        {/* Logo */}
        <h1
          className="text-6xl md:text-7xl font-bold tracking-tight mb-8 logo-glow"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <span className="text-[var(--accent)]">1</span>co18
        </h1>

        {/* Search Bar */}
        <SearchBar />

        {/* Add song link */}
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
