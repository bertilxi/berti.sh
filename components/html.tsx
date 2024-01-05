import { Html as Base } from "carbon/html.tsx";
import type { Child } from "hono/jsx";

interface Properties {
  children: Child;
  title?: string;
  description?: string;
  keywords?: string;
  publishedAt?: string;
}

export function Html({ children, title, description, keywords }: Properties) {
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
    </Base>
  );
}
