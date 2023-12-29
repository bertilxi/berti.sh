import { ThemeToggle } from "./toggle.tsx";

export function Navbar() {
  return (
    <nav class="container flex max-w-[800px] justify-between py-6 md:py-10">
      <div class="flex items-start gap-4">
        <a href="/" class="inline-flex items-start gap-2">
          <span class="bg-gradient-to-tr from-rose-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent dark:from-rose-400 dark:to-purple-400">
            Berti
          </span>
        </a>
      </div>

      <div class="flex items-start gap-4">
        <a class="font-bold" href="/blog">
          Blog
        </a>

        <ThemeToggle />
      </div>
    </nav>
  );
}
