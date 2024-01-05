import path from "node:path";
import { getPost } from "carbon/content.ts";
import { useHtmlContext } from "carbon/context.ts";
import type { Child } from "hono/jsx";
import { root } from "hydrogen/util.ts";
import { Footer } from "./footer.tsx";
import { Html } from "./html.tsx";
import { Navbar } from "./navbar.tsx";

const contentPath = path.join(root, "pages", "blog");

interface Properties {
  children: Child;
  title?: string;
  description?: string;
  keywords?: string;
  publishedAt?: string;
}

export async function BlogLayout({
  children,
  title,
  description,
  keywords,
}: Properties) {
  const { name } = useHtmlContext();
  const post = await getPost(contentPath, name);

  return (
    <Html title={title} description={description} keywords={keywords}>
      <Navbar />

      <main class="container prose prose-zinc max-w-[800px] py-6 dark:prose-invert">
        {children}
        <div class="flex gap-2 pt-6">
          {post?.prev && (
            <a
              href={path.join(
                "/blog",
                post.prev.path,
                post.prev.name.split(".")[0],
              )}
              class="flex w-1/2 flex-col rounded-xl border p-3 no-underline hover:border-rose-500"
            >
              <span class="text-sm">Articulo Anterior</span>
              <span class="font-bold text-rose-600 dark:text-rose-400">
                {post.prev.title}
              </span>
            </a>
          )}
          <div class="flex-1" />
          {post?.next && (
            <a
              href={path.join(
                "/blog",
                post.next.path,
                post.next.name.split(".")[0],
              )}
              class="flex w-1/2 flex-col rounded-xl border p-3 text-right no-underline hover:border-rose-500"
            >
              <span class="text-sm">Siguiente articulo</span>
              <span class="font-bold text-rose-600 dark:text-rose-400">
                {post.next.title}
              </span>
            </a>
          )}
        </div>
      </main>

      <Footer />
    </Html>
  );
}
