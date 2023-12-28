import { readdir } from "node:fs/promises";
import { root } from "hydrogen/util.ts";
import path from "node:path";
import { Navbar } from "~/components/navbar.tsx";
import { Html } from "~/components/html.tsx";
import dayjs from "dayjs";

const contentPath = path.join(root, "pages", "blog");
const postEntries = await readdir(contentPath, {
  recursive: true,
  withFileTypes: true,
}).then((entries) => entries.filter((entry) => !entry.isDirectory()));

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

      <main class="container max-w-[800px]">
        <h1 class="text-3xl font-bold py-6">Articles</h1>

        {posts.map((post) => {
          return (
            <a href={path.join("/blog", post.path, post.name.split(".")[0])}>
              <div class="flex gap-2">
                <span class="font-bold text-xl">{post.title}</span>
                {" - "}
                <span class="text-slate-600 dark:text-slate-300">
                  {dayjs(post.publishedAt).format("DD MMM YYYY")}
                </span>
              </div>

              <p class="text-slate-600 dark:text-slate-300">
                {post.description}
              </p>
            </a>
          );
        })}
      </main>
    </Html>
  );
}
