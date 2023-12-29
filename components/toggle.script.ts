const isDark =
  window.localStorage.theme === "dark" ||
  (!("theme" in window.localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);

const toggle = document.querySelector("#theme-toggle");
const iconDark = document.querySelector("#theme-toggle-dark");
const iconLight = document.querySelector("#theme-toggle-light");

if (isDark) {
  iconDark?.classList.toggle("hidden");
} else {
  iconLight?.classList.toggle("hidden");
}

toggle?.addEventListener("click", () => {
  iconDark?.classList.toggle("hidden");
  iconLight?.classList.toggle("hidden");
});
