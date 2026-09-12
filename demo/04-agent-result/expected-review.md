# 04 - Agent Result

Ejemplo de resultado esperado del agente. No requiere GitHub en vivo; úsalo como Plan B.

> Prerrequisitos completos del flujo en vivo: [demo/README.md](../README.md#prerrequisitos).

```markdown
## Resumen de la revision

Revise la pagina Next.js del Biotopo del Quetzal modificada en el PR y ejecute `npm run validate`.
La validacion fallo y los componentes React cambiados tienen varios problemas de calidad que
deben corregirse antes de hacer merge.

### Hallazgos

- Medio: `app/page.tsx` usa `next/image` en el hero sin texto `alt` significativo. Agrega
  texto alternativo descriptivo para que usuarios de lectores de pantalla entiendan la imagen.
- Medio: Los enlaces de navegacion y el CTA apuntan a anclas que no existen, incluyendo
  `#visita` y `#planifica`. Actualiza los destinos o restaura las secciones faltantes.
- Bajo: El contenido etiqueta el ambiente como `Bosque seco`, lo cual contradice la narrativa
  del Biotopo del Quetzal / bosque nuboso.
- Bajo: El texto nuevo dice que las validaciones ya no son necesarias porque el proyecto usa Next.js,
  lo cual contradice el proposito educativo de este repositorio y sus chequeos de calidad.

### Validacion

`npm run validate` fallo por imagen sin `alt` y enlaces internos rotos.
`npm run build` tambien puede fallar porque TypeScript exige `alt` en `next/image`.
```

Usa este archivo como Plan B si GitHub Actions, Copilot o la red fallan durante la conferencia.
