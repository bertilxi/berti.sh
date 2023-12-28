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
      lang="en"
      class="dark"
      color="#000000"
      title={title}
      description={description}
      keywords={keywords}
      url="https://berti.sh"
    >
      {children}
    </Base>
  );
}
