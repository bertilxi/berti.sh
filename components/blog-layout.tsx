import { Html } from "./html.tsx";
import { Navbar } from "./navbar.tsx";
import type { Child } from "hono/jsx";

interface Properties {
  children: Child;
  title?: string;
  description?: string;
  keywords?: string;
  publishedAt?: string;
}

export function BlogLayout({
  children,
  title,
  description,
  keywords,
}: Properties) {
  return (
    <Html title={title} description={description} keywords={keywords}>
      <Navbar />

      <main class="container prose prose-slate dark:prose-invert max-w-[800px] py-6">
        {children}
      </main>
    </Html>
  );
}
