# 02 - Intentional Problem

Este escenario contiene problemas deliberados para abrir un Pull Request de práctica.

> Prerrequisitos: Node.js 20+, `npm install`. Ver [demo/README.md](../README.md#prerrequisitos).

Problemas esperados:

- La imagen del hero usa `next/image` sin atributo `alt`.
- El CTA apunta a `#planifica`, que no existe en la página.
- La navegación sigue enlazando a `#visita`, pero la sección `VisitorInfo` fue removida.
- El contenido dice que el ambiente es `Bosque seco`, inconsistente con el bosque nuboso.
- El texto sugiere que no hacen falta validaciones, contradiciendo el objetivo educativo del repo.

Comando para ver fallos locales sin tocar la app principal:

```bash
node tests/validate.js --file=demo/02-intentional-problem/page.problem.tsx
```

Comando para simular el cambio en una rama:

```bash
git switch -c demo/problemas-intencionales
cp demo/02-intentional-problem/page.problem.tsx app/page.tsx
npm run validate
git add app/page.tsx
git commit -m "Introduce visitor page updates for demo review"
```

Nota: al copiar el archivo problemático sobre `app/page.tsx`, `npm run build` también puede fallar porque TypeScript exige `alt` en `next/image`. Eso refuerza el contraste entre validación local y revisión del agente.
