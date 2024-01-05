import path from "node:path";
import { Footer } from "~/components/footer.tsx";
import { Html } from "~/components/html.tsx";
import { Navbar } from "~/components/navbar.tsx";
import { getPosts } from "carbon/content.ts";
import dayjs from "dayjs";
import { Icon } from "diamond/ui/icon.tsx";
import { root } from "hydrogen/util.ts";

const contentPath = path.join(root, "pages", "blog");
const posts = await getPosts(contentPath);

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
                  <div class="flex flex-wrap items-center gap-3 pb-2">
                    <span class="text-xl font-bold hover:text-rose-600 dark:hover:text-rose-400">
                      {post.title}
                    </span>
                    <span class="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                      <Icon name="bookOpenText" class="h-5 w-5" />
                      {post.readingTime}
                      {post.readingTime === 1 ? " Minuto" : " Minutos"}
                    </span>
                    <span class="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                      <Icon name="calendarDays" class="h-5 w-5" />
                      {dayjs(post.publishedAt).format("DD MMM YYYY")}
                    </span>
                  </div>
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
