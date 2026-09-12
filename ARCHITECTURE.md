# Architecture

## Componentes

GitHub repository: contiene la app Next.js, tests, workflows y escenarios de demo.

Pull Request: representa el cambio que un desarrollador propone. Es el evento que activa la revision.

GitHub Actions: ejecuta tanto el workflow tradicional como el workflow agentic compilado.

Next.js app: usa App Router, TypeScript, `app/page.tsx`, `app/layout.tsx`, estilos globales y componentes pequenos.

Agentic Workflow: archivo Markdown en `.github/workflows/biotopo-pr-review.md` con YAML frontmatter y una mision en lenguaje natural. Se compila con `gh aw compile` a `.lock.yml`.

AI agent: usa GitHub Copilot como engine. Recibe el objetivo, inspecciona el PR y decide que revisar.

Tools: el agente puede leer contexto de GitHub y ejecutar comandos permitidos como `npm run validate` y `npm run build`.

Repository context: componentes React, pagina Next.js, diff del PR, workflow tradicional y validador local.

Output: una revision de Pull Request con hallazgos, severidad, evidencia y recomendaciones.

## Flujo

```text
Developer changes Next.js page
        |
        v
Pull Request opened
        |
        v
GitHub Actions starts
        |
        +--> Traditional validation: npm run validate && npm run build
        |
        +--> Agentic workflow: review mission
                    |
                    v
              Agent reads diff
                    |
                    v
              Agent runs useful checks
                    |
                    v
              Agent interprets output
                    |
                    v
              Safe output posts PR review
```

## Diferencias Conceptuales

Script: archivo que ejecuta instrucciones concretas.

Automation: sistema que dispara scripts o pasos definidos ante eventos.

AI assistant: modelo que responde preguntas o ayuda al usuario en una conversacion.

AI agent: sistema que recibe un objetivo, inspecciona contexto, usa herramientas, interpreta resultados y produce una accion.

Agentic workflow: integracion de ese agente dentro de un flujo operativo, en este caso GitHub Actions y Pull Requests.

## Permisos

El workflow usa permisos minimos para la demo:

```yaml
permissions:
  contents: read
  pull-requests: write
  copilot-requests: write
```

- `contents: read`: permite revisar archivos.
- `pull-requests: write`: permite publicar una review mediante safe outputs.
- `copilot-requests: write`: permite usar Copilot como engine cuando aplica la autenticacion integrada.

No se otorga `contents: write` porque el agente no necesita modificar codigo en esta demo.

## Seguridad

Buenas practicas aplicadas:

- No hay tokens, passwords, API keys ni secretos en el repositorio.
- El agente no tiene permisos para hacer push ni merge.
- Las escrituras al PR pasan por `safe-outputs`.
- El scope de herramientas es reducido y comprensible.
- El workflow se mantiene en `strict: true`.

Por que limitar permisos:

Un agente puede razonar y actuar, por eso sus permisos deben expresar solamente lo necesario. En una demo de revision, leer codigo y comentar en el PR es suficiente. Dar permisos de escritura al contenido, secretos o administracion del repo aumentaria el riesgo sin aportar al objetivo pedagogico.

## Archivos Agentic Workflows

La documentacion actual de GitHub indica:

- El workflow fuente es `.github/workflows/*.md`.
- El YAML frontmatter define triggers, permisos, tools, engine y safe outputs.
- El cuerpo Markdown define la mision del agente.
- `gh aw compile` genera `.github/workflows/*.lock.yml`.
- Se deben revisar y commitear el `.md` y el `.lock.yml` juntos.

En este entorno local `gh` no esta instalado, asi que el archivo `.lock.yml` debe generarse despues de instalar GitHub CLI y `gh-aw`.
