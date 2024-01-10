import { useHtmlContext } from "carbon/context";
import { Html as Base } from "carbon/html.tsx";
import type { Child } from "hono/jsx";

interface Properties {
  children: Child;
  title?: string;
  description?: string;
  keywords?: string;
  publishedAt?: string;
}

export function Html({ children }: Properties) {
  const { title, description, keywords } = useHtmlContext();

  return (
    <Base
      lang="es"
      class="dark"
      color="#09090b"
      title={title ? `${title} | Fernando Berti` : "Fernando Berti"}
      description={
        description ?? "Comparto mis ideas sobre programación y tecnología"
      }
      keywords={
        keywords ??
        "código,software,programación,ingeniería,html,css,typescript,node,esm,js,javascript"
      }
      url="https://berti.sh"
      image="/static/og.jpg"
    >
      {children}

      <meta name="htmx-config" content='{"globalViewTransitions":true}' />
      <script src="https://unpkg.com/htmx.org@1.9.10" />
    </Base>
  );
}
