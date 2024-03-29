---
title: "Tu primera aplicación htmx."
description: "Vamos a explorar cómo crear una aplicación hypermedia moderna con htmx."
tags: [hypermedia, html, css, htmx]
pubDate: 2024-01-03
---

# Tu primera aplicación htmx

[Continuando con lo anticipado](/blog/devolviendo-un-poco), aquí el primer articulo.

**TLDR:** Les dejo el repo [bertilxi/hola-htmx](https://github.com/bertilxi/hola-htmx)

## El rey

Si has desarrollado por el tiempo suficiente, sabrás que la librería que domina el espacio es `React`. Tanto si usas `create-react-app`, `vite` o `next js`, es el standard defacto de hoy en dia, lo cual tiene sus pro y sus contras.

## Hola htmx

Hoy les vengo a ofrecer una alternativa, algo que cambia prácticamente todo lo de uno esta acostumbrado en una SPA, y algo que es muy familiar si programaste alguna vez PHP o Ruby.

Vamos a pasar de usar `react` a _nada_, si leíste bien, no vamos a usar una librería que haga dom diffing ni nada por el estilo.

Segundo vamos a pasar de usar javascript en el cliente a adivinen, _nada_, vamos a usar server side rendering y no vamos a mandar javascript custom.

Nos vamos a quedar con un par de ideas si, vamos a usar JSX para la vista, que se ve y se siente como `react`, pero no lo es, es estático. Y vamos usar una librería, `htmx`, que va a servir como pegamento entre el cliente y el servidor.

### Por que?

Sobretodo, simplicidad. Aquí solo hay un servidor (en este caso node js), que va a mandar el html + css + js suficiente para tener una aplicación web interactiva.

### Empezamos

Primero inicializamos un proyecto con npm e instalamos un par de dependencias.

```sh title="terminal"
mkdir hola-htmx
cd hola-htmx
npm init -y
npm i tsx hono @hono/node-server
```

Creamos el server.

```tsx title="main.tsx"
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.html(<div>hola</div>));

serve({
  hostname: "0.0.0.0",
  port: 3000,
  fetch: app.fetch,
});

console.log("🚀 http://localhost:3000");
```

Configuramos Typescript para que funcione con `tsx` y `hono`.

```json {10,11} title="tsconfig.json"
{
  "compilerOptions": {
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "module": "esnext",
    "target": "esnext",
    "moduleResolution": "bundler",
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "jsxImportSource": "hono/jsx",
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["**/*"],
  "exclude": ["node_modules"]
}
```

Colocamos 2 scripts en el `package.json`.

```json {2,3} title="package.json"
"scripts": {
  "dev": "tsx watch main.tsx",
  "start": "tsx main.tsx"
},
```

Y ya podemos probar nuestra nueva aplicación.

```sh title="terminal"
npm run dev
```

Aun no usamos htmx pero ya se puede apreciar la simplicidad de tener una pagina web con un par de lineas de código, 100% Typescript.

### Hagamos un to-do

Como prueba de concepto hagamos la aplicación más simple posible, una lista de tareas. En favor de simplificar el articulo no vamos a usar una db real, aunque seria sencillo, escapa del alcance esta vez, para la proxima.

Primero que nada agreguemos htmx, y de paso aprovechemos lo más potente de `jsx`, los componentes, creemos un componente base que traiga htmx como script.

```tsx title="html.tsx"
import { Child } from "hono/jsx";

interface Properties {
  children: Child;
}

export function Html({ children }: Properties) {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>hola htmx</title>
        <script src="https://unpkg.com/htmx.org@1.9.10" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

El to-do va a consistir de 1 pagina que liste las tareas, pueda crearlas y borrarlas.

Aca podemos ver la pagina, con un form para crear las tareas y la lista de tareas.

```tsx title="main.tsx"
app.get("/", (c) => {
  const todos = todoService.getTodos();

  return c.html(
    <Html>
      <div>hola htmx</div>

      <form hx-post="/todo" hx-target="#todo" hx-swap="beforebegin">
        <input name="name" type="text" required />
        <button>Crear</button>
      </form>

      <div>
        {todos.map((todo) => (
          <p hx-delete={`/todo/${todo.id}`} hx-swap="outerHTML">
            {todo.name}
            <button>borrar</button>
          </p>
        ))}
      </div>

      <div id="todo" />
    </Html>
  );
});
```

Hacemos el endpoint para crear.

```tsx title="main.tsx"
app.post("/todo", async (c) => {
  const { name } = await c.req.parseBody();

  const todo = todoService.createTodo({
    id: (Math.random() * 10000).toFixed(),
    name: name as string,
  });

  return c.html(
    <p hx-delete={`/todo/${todo.id}`} hx-swap="outerHTML">
      {todo.name}
      <button>borrar</button>
    </p>
  );
});
```

Y el endpoint para borrar.

```tsx title="main.tsx"
app.delete("/todo/:id", async (c) => {
  const id = c.req.param("id");

  todoService.deleteTodo(id);

  return c.body(null, 200);
});
```

**Felicidades ya tenemos nuestra primera app con htmx.**

## Próximos pasos

Creamos una app sencilla, de pocas lineas de código, que hace lo mínimo para un to-do, sin embargo hay mucho para mejorar, como por ej:

- Usar una base de datos real.
- Usar estilos, ya sea css vanilla o tailwind.
- Separar el código en paginas y componentes.
- Agregar javascript custom donde sea indispensable.
- Mejorar el SEO
- etc

Estas no tan nuevas formas de construir aplicaciones web me despertaron la curiosidad, tanto asi que con un amigo no solo las estamos usando para un par de productos sino que estamos construyendo un conjunto de herramientas para poder crear apps mucho más rápido y que la experiencia de usuario sea optima.

En los próximos artículos voy a ir desglosando cuales son las características que considero importantes a la hora de desarrollar y como podemos implementarlas de manera muy fácil.

## Links relacionados

- [blog.yusu.ke/hono-htmx-cloudflare](https://blog.yusu.ke/hono-htmx-cloudflare)
- [twitter.com/dctanner/status/1681975611546378241](https://twitter.com/dctanner/status/1681975611546378241)
- [github.com/dctanner/htmljs-todo-example](https://github.com/dctanner/htmljs-todo-example)
