import path from "node:path";
import { Script } from "carbon/script.tsx";

const dirname = new URL(".", import.meta.url).pathname;

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

      <Script src={path.join(dirname, "toggle.script.ts")} />
    </>
  );
}
