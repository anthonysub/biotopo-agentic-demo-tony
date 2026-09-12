---
description: |
  Reporte diario del estado del repositorio. Recopila actividad reciente
  (issues, PRs, workflows, cambios) y publica un issue de resumen para maintainers.
intent: "Ayudar a estudiantes a ver un workflow agentico programado que observa el repo y genera un reporte accionable."
on:
  schedule: daily
  workflow_dispatch:
permissions:
  contents: read
  issues: read
  pull-requests: read
  copilot-requests: write
engine: copilot
network: defaults
tools:
  bash: ["cat", "ls", "find", "grep", "head", "tail", "wc", "node"]
  github:
    lockdown: false
    min-integrity: none
safe-outputs:
  mentions: false
  allowed-github-references: []
  create-issue:
    title-prefix: "[repo-status] "
    labels: [report, daily-status]
    close-older-issues: true
timeout-minutes: 20
max-turns: 25
strict: true
---

# Repo Status — Biotopo Agentic Demo

Crea un reporte diario del estado de este repositorio como un **issue de GitHub**.

**Publica el issue en espanol claro**, pensando en estudiantes universitarios que aprenden Agentic Workflows.

## Que incluir

- Actividad reciente: issues abiertos o cerrados, PRs, ejecuciones de workflows y cambios relevantes en el codigo.
- Estado de la demo Next.js del Biotopo del Quetzal: validaciones, build y documentacion en `demo/`.
- Workflows agenticos presentes en `.github/workflows/` (`repo-status`, `issue-clarifier`, `biotopo-pr-review`) y si tuvieron corridas recientes.
- Recomendaciones concretas para maintainers o conferencistas (que revisar antes de una presentacion).
- Proximos pasos accionables (maximo cinco bullets).

## Estilo

- Tono positivo, util y conciso.
- Usa emojis con moderacion.
- Ajusta la longitud segun la actividad real; si el repo estuvo quieto, dilo sin inventar novedades.

## Proceso

1. Recopila actividad reciente del repositorio.
2. Revisa issues, pull requests y ejecuciones de Actions.
3. Resume hallazgos y publica un nuevo issue con titulo prefijado `[repo-status]`.
4. Si existe un reporte anterior con el mismo prefijo, dejalo cerrado segun la configuracion del workflow.
