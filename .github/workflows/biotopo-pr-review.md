---
description: "Revisor agentico de Pull Requests para la demo Next.js del Biotopo del Quetzal."
intent: "Ayudar a estudiantes a ver como un agente de IA inspecciona un PR, elige validaciones utiles, ejecuta herramientas del repositorio y publica una revision clara."
on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
    status-comment: true
permissions:
  contents: read
  pull-requests: write
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
  create-pull-request-review-comment:
    max: 5
    target: "triggering"
    footer: "if-body"
  submit-pull-request-review:
    max: 1
    allowed-events: [COMMENT]
    target: "triggering"
    footer: "always"
timeout-minutes: 15
max-turns: 30
strict: true
---

# Revisor de Pull Requests — Biotopo del Quetzal

Revisa el Pull Request de la demo Next.js del Biotopo del Quetzal.

Tu mision es analizar los archivos cambiados y decidir que validaciones son utiles. Busca:

- Problemas de calidad en componentes Next.js y React.
- Problemas de accesibilidad, especialmente usos de `next/image` sin texto `alt` significativo y controles sin nombre accesible.
- Enlaces internos rotos o referencias a recursos locales que no existen.
- Inconsistencias en el contenido visible.
- Validaciones faltantes o fallidas para el comportamiento modificado.

Usa el contexto del repositorio y los archivos cambiados. Ejecuta las herramientas de validacion disponibles cuando sea apropiado; este repositorio ofrece:

```bash
npm run validate
```

Si el script de validacion senala un problema, inspecciona el codigo fuente relevante antes de reportarlo. No uses la salida de la herramienta como unica evidencia.

Publica una revision concisa del Pull Request usando las herramientas de salida segura. Incluye:

- Un resumen breve de lo que revisaste.
- Hallazgos con severidad (Alto, Medio, Bajo), evidencia en archivo/ruta y una recomendacion concreta.
- Comandos de validacion que ejecutaste y si pasaron o fallaron.
- Una nota breve cuando no encuentres problemas importantes.

**Publica toda la revision en espanol claro**, pensando en estudiantes universitarios de ingenieria que aprenden la diferencia entre automatizacion fija y un flujo agentico.
