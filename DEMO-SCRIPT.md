# Demo Script

Duracion objetivo: 8 a 10 minutos.

| Tiempo | Accion | Que mostrar | Que decir |
| --- | --- | --- | --- |
| 00:00-01:00 | Mostrar la app | Next.js corriendo con `npm run dev` | "Tenemos una pequena pagina turistica del Biotopo del Quetzal hecha como proyecto moderno de Next.js." |
| 01:00-02:00 | Mostrar el codigo | `app/page.tsx`, `components/`, `tests/validate.js`, `validate-site.yml` | "Esto es automatizacion tradicional: instalamos dependencias, ejecutamos validaciones y construimos la app." |
| 02:00-03:00 | Mostrar el cambio | `demo/02-intentional-problem/page.problem.tsx` | "Ahora simulamos que un desarrollador hizo cambios normales en React, pero dejo problemas de calidad faciles de pasar por alto." |
| 03:00-04:00 | Crear o abrir PR | Pull Request en GitHub | "El PR es el punto de colaboracion. Aqui normalmente revisan humanos, checks y ahora tambien un agente." |
| 04:00-06:00 | Mostrar GitHub Actions | Workflow run del agentic workflow | "El agente no solo sigue una lista rigida. Recibe una mision, mira contexto, decide revisar archivos y puede ejecutar herramientas como el validador." |
| 06:00-07:00 | Mostrar resultado | Comentario o review del PR | "El resultado util no es solo rojo o verde: son hallazgos con evidencia y recomendaciones." |
| 07:00-08:00 | Explicar por que es agentico | `.github/workflows/biotopo-pr-review.md` | "La diferencia esta en el objetivo. Le pedimos analizar, investigar y reportar, no solamente ejecutar A, B y C." |
| 08:00-10:00 | Cierre y preguntas | `ARCHITECTURE.md` o el workflow | "Esto no reemplaza CI. Lo complementa donde hace falta interpretacion: revision, diagnostico, triage y explicacion." |

## Comandos En Vivo

```bash
cd /Users/elvysbatzibal/EBSolTech/workeventcoban/biotopo-agentic-demo
npm install
npm run dev
npm run validate
node tests/validate.js --file=demo/02-intentional-problem/page.problem.tsx
```

Si el repo ya tiene remoto:

```bash
git switch -c demo/problemas-intencionales
cp demo/02-intentional-problem/page.problem.tsx app/page.tsx
npm run validate
git add app/page.tsx
git commit -m "Update Biotopo visitor page"
git push -u origin demo/problemas-intencionales
gh pr create --title "Update Biotopo visitor page" --body "Demo PR for GitHub Agentic Workflows."
```

## Si La Demo Falla

Plan B:

- Ejecuta `node tests/validate.js --file=demo/02-intentional-problem/page.problem.tsx` localmente para mostrar fallos.
- Abre `demo/04-agent-result/expected-review.md` como resultado esperado del agente.
- Explica `.github/workflows/biotopo-pr-review.md` linea por linea: trigger, permisos, tools, safe outputs y mision.
- Muestra `validate-site.yml` para comparar automatizacion tradicional contra revision agentica.
- Si `gh` o `gh-aw` no estan disponibles, explica que falta la compilacion local a `.lock.yml`.

Mensaje para mantener ritmo:

> Las demos en vivo dependen de red, permisos y servicios externos. El concepto no depende de que una ejecucion puntual funcione; lo importante es ver como se modela el objetivo, el contexto, las herramientas y el resultado.
