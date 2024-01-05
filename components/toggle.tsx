import { Script } from "carbon/script.tsx";

export function ThemeToggle() {
  return (
    <>
      <button id="theme-toggle" class="text-xl">
        <span id="theme-toggle-light" class="hidden">
          🌛
        </span>
        <span id="theme-toggle-dark" class="hidden">
          ☀️
        </span>
      </button>

      <Script url={import.meta.url} src="./toggle.script.ts" />
    </>
  );
}
