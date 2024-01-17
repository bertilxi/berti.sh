---
title: Por qué usar go on 2024?
description: Empezamos el año con un nuevo lenguaje, les cuento por qué.
tags: []
keywords: [go, web, backend]
publishedAt: 2024-01-17
---

# ¿Por qué usar Go en 2024?

En los últimos meses, he estado concentrando mi experiencia en desarrollar un pequeño framework para prototipar ideas de manera más ágil.

Dada mi experiencia con Typescript y React, la decisión inicial fue avanzar en esa dirección. Sin embargo, en el camino, descubrí otras tecnologías como htmx, hono, entre otras, y mediante prueba y error fui eligiendo las más adecuadas.

La herramienta estaba casi lista; las pocas características que propuse estaban funcionando correctamente, la optimicé y respondía rápidamente, cumpliendo con las expectativas.

## La gota que colmó el vaso

Aunque la aplicación generada por el framework era rápida y obtenía una excelente puntuación en Lighthouse, encontré un inconveniente: al iniciar, necesitaba aproximadamente 512 MB de RAM para levantar el contenedor Docker, y además, tardaba varios segundos en estar lista para recibir peticiones.

Después de realizar las últimas optimizaciones para el hot reload y emocionado por la excelente experiencia de desarrollo, realicé el despliegue. Sin embargo, la aplicación no respondía. Tras revisar, determiné que necesitaba más memoria, así que aumenté a 1 GB de RAM y finalmente funcionó.

Aunque este incremento de memoria no era un problema para que la página siguiera funcionando, me pareció inaceptable que un sitio tan pequeño y sin uso consumiera tanta RAM.

## Probando Go

Hacía tiempo que había notado que htmx se integraba bien con Go y que algunos preferían esta combinación. Aunque había programado en Go en el pasado y no me había convencido del todo, decidí darle otra oportunidad debido a sus mejoras.

Go es un lenguaje sencillo con una buena biblioteca estándar, es rápido y tiene una solución sólida para el formato, manejo de dependencias y publicación de módulos.

Tras darle una oportunidad, reescribí el sitio en Go en unas pocas horas y estaba completamente funcional, lo que resultó ser una experiencia maravillosa.

## La diferencia

En términos de bibliotecas y otros aspectos, no hay comparación. Gran parte de la migración consistió en reemplazar una biblioteca con otra; por ejemplo, hono por echo, hono/jsx por templ, y continuando con el uso de Tailwind para el CSS, Lucide para los iconos y esbuild (ahora nativo) para el JavaScript en el cliente.

### Antes

- Consumo de 576 MB de RAM
- Tiempo de inicio: 30 segundos

### Después

- Consumo de 48 MB de RAM
- Tiempo de inicio: 500 ms

La diferencia no solo es evidente, sino también brutal. El inicio en frío del contenedor es tan rápido que solucionó un problema donde, al arrancar tan lentamente, los meta tags no se leían correctamente en Twitter y otros sitios.

Ahora, el contenedor puede escalar a cero y aún así responder a tiempo.

## ¿Qué significa esto?

Si bien JavaScript no desaparecerá mientras sea el lenguaje de los navegadores, para servidores web y aplicaciones, Go se presenta como la respuesta, al menos para mí.

Continuaré desarrollando el framework en Go y veré hasta dónde llega.
