import type { Child } from "hono/jsx";
import { Footer } from "./footer.tsx";
import { Html } from "./html.tsx";
import { Navbar } from "./navbar.tsx";

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

      <main class="container prose prose-zinc max-w-[800px] py-6 dark:prose-invert">
        {children}
      </main>

      <Footer />
    </Html>
  );
}
