---
description: "Revisor agentico de Pull Requests para la demo Next.js del Biotopo del Quetzal."
intent: "Analizar cambios de código, ejecutar validaciones y publicar una revisión educativa en el Pull Request."

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

permissions:
  contents: read
  copilot-requests: write

engine: copilot

tools:
  github:
    toolsets: [context, repos, pull_requests]
    allowed:
      - pull_request_read

  bash:
    - "pwd"
    - "ls"
    - "find"
    - "cat"
    - "sed"
    - "grep"
    - "node"
    - "npm run validate"
    - "npm run build"
    - "node tests/validate.js"
    - "git diff"
    - "git diff --stat"
    - "git diff --name-only"

safe-outputs:
  add-comment:
    max: 1
    target: "triggering"

timeout-minutes: 15
max-turns: 30
strict: true
---

# Revisor de Pull Requests — Biotopo del Quetzal

Analiza el Pull Request actual de la aplicación Next.js del Biotopo del Quetzal.

Revisa especialmente:

- Problemas de calidad en componentes Next.js y React.
- Problemas de accesibilidad.
- Uso de `next/image` sin atributo `alt`.
- Enlaces internos que apunten a secciones inexistentes.
- Inconsistencias en el contenido visible.
- Validaciones faltantes o fallidas.
- Errores que puedan afectar la compilación.

Utiliza el contexto del repositorio y revisa los archivos modificados en el Pull Request.

Ejecuta las validaciones disponibles cuando sea apropiado:

```bash
npm run validate