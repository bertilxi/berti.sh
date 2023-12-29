import dayjs from "dayjs";

export function Footer() {
  return (
    <footer class="container flex max-w-[800px] items-center justify-between py-6">
      <span class="font-bold">
        Con 💙 por Fernando Berti - {dayjs().year()}
      </span>
    </footer>
  );
}
