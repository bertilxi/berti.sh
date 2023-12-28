export function Navbar() {
  return (
    <nav class="container py-10 flex justify-between max-w-[800px]">
      <div class="flex gap-4 items-center">
        <a href="/">
          <span class="font-bold text-xl">Fer Berti</span>
        </a>
      </div>

      <div class="flex gap-4 items-center">
        <a class="font-bold" href="/blog">
          Blog
        </a>
        <button id="theme-toggle" class="font-bold">
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
