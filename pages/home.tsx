import { Footer } from "~/components/footer.tsx";
import { Html } from "~/components/html.tsx";
import { Navbar } from "~/components/navbar.tsx";

export default function HomePage() {
  return (
    <Html>
      <Navbar />

      <main class="container max-w-[800px] space-y-6 py-6 text-xl">
        <h1 class="text-4xl font-bold">
          Hola 👋 soy Fernando Berti, me dicen Berti.
        </h1>

        <div>
          Me encanta construir productos digitales con mis propias manos y
          disfruto mucho de programar.
        </div>

        <div>
          Tengo algo asi como 8 años de experiencia creando sitios web,
          servidores y todo lo que hay en el medio.
        </div>

        <div>
          Soy curioso, me gusta explorar, aprender y poner al limite las nuevas
          tecnologías.
        </div>

        <div class="font-bold">
          La idea de este sitio es poder devolver a la comunidad un poco de todo
          lo que me han dado y enseñado.
        </div>
      </main>

      <Footer />
    </Html>
  );
}
