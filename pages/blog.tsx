import { readdir } from "node:fs/promises";
import path from "node:path";
import { Footer } from "~/components/footer.tsx";
import { Html } from "~/components/html.tsx";
import { Navbar } from "~/components/navbar.tsx";
import dayjs from "dayjs";
import { root } from "hydrogen/util.ts";

const contentPath = path.join(root, "pages", "blog");
const postEntries = await readdir(contentPath, {
  recursive: true,
  withFileTypes: true,
}).then((entries) =>
  entries
    .filter((entry) => !entry.isDirectory())
    .filter((entry) => !entry.name.startsWith("_")),
);

const posts = (await Promise.all(
  postEntries.map((entry) =>
    import(path.join(entry.path, entry.name)).then((m) => ({
      ...m.config,
      path: entry.path.replace(contentPath, ""),
      name: entry.name,
    })),
  ),
)) as {
  name: string;
  path: string;
  title?: string;
  description?: string;
  keywords?: string;
  publishedAt?: string;
}[];

export default function BlogPage() {
  return (
    <Html>
      <Navbar />

      <main class="container max-w-[800px] space-y-6 py-6">
        <h1 class="text-3xl font-bold">Artículos</h1>

        {posts
          .toSorted((a, b) => dayjs(b.publishedAt).diff(a.publishedAt))
          .map((post) => {
            return (
              <div>
                <a
                  href={path.join("/blog", post.path, post.name.split(".")[0])}
                >
                  <span class="text-xl font-bold hover:text-rose-600 dark:hover:text-rose-400">
                    {post.title}
                  </span>
                  {" - "}
                  <span class="inline-flex text-zinc-600 dark:text-zinc-300">
                    {dayjs(post.publishedAt).format("DD MMM YYYY")}
                  </span>
                  <p class="text-zinc-600 dark:text-zinc-300">
                    {post.description}
                  </p>
                </a>
              </div>
            );
          })}
      </main>

      <Footer />
    </Html>
  );
}
