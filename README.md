# Biotopo Agentic Demo

Demo en Next.js sobre GitHub Agentic Workflows.

La historia sigue siendo simple: una pagina turistica del Biotopo del Quetzal cambia en un Pull Request, GitHub Actions activa un agente, el agente inspecciona el repositorio, ejecuta herramientas cuando lo considera util y publica una revision educativa.

## Que Demuestra

La demo contrasta dos formas de automatizar trabajo:

- Automatizacion tradicional: "Ejecuta estos pasos exactamente".
- Agentic Workflow: "Analiza este cambio, busca problemas y dime que encuentras".

La aplicacion usa Next.js con App Router, TypeScript y componentes pequeños. 
Es moderna, pero deliberadamente reducida para una demo de 8 a 10 minutos.

## Arquitectura

```text
Developer
    |
    v
Pull Request
    |
    v
GitHub Actions
    |
    v
Agentic Workflow
    |
    v
AI Agent
   /|\
  / | \
Code Tests GitHub
   \ | /
    \|/
 Review
```

Archivos clave:

- `app/page.tsx`: landing page del Biotopo del Quetzal.
- `app/layout.tsx`: metadata y lenguaje del documento.
- `app/globals.css`: estilos responsive.
- `components/`: componentes pequenos de UI.
- `public/cloud-forest-hero.png`: imagen hero local.
- `tests/validate.js`: validaciones locales faciles de leer.
- `.github/workflows/validate-site.yml`: workflow tradicional.
- `.github/workflows/biotopo-pr-review.md`: fuente del GitHub Agentic Workflow.
- `demo/`: escenarios para la presentacion.

## Requisitos

- Git.
- Node.js compatible con Next.js.
- GitHub repository con GitHub Actions habilitado.
- GitHub CLI `gh` v2.0.0 o posterior.
- Extension `gh-aw` para GitHub CLI.
- Acceso a un proveedor de IA compatible. Esta demo usa `engine: copilot`.

Segun la documentacion actual de GitHub, los Agentic Workflows estan en public preview. Un workflow agentic se escribe como Markdown con YAML frontmatter, se compila a `.lock.yml` y se ejecuta por GitHub Actions.

Para Copilot:

- En repositorios de organizacion con Copilot habilitado, agrega `copilot-requests: write`.
- En repositorios personales o configuraciones sin billing de organizacion, puede requerirse el secreto `COPILOT_GITHUB_TOKEN`.

## Instalacion

```bash
cd /Users/elvysbatzibal/EBSolTech/workeventcoban/biotopo-agentic-demo
npm install
```

Verifica GitHub CLI:

```bash
gh --version
gh auth login --scopes repo,workflow
```

Instala la extension:

```bash
gh extension install github/gh-aw
gh aw
```

Inicializa soporte agentic en el repositorio:

```bash
gh aw init
```

Compila el workflow agentic:

```bash
gh aw compile .github/workflows/biotopo-pr-review.md
```

Despues de compilar deberia existir:

```text
.github/workflows/biotopo-pr-review.lock.yml
```

GitHub recomienda revisar y commitear juntos el archivo `.md` fuente y el `.lock.yml` generado.

## Ejecucion Local

Servidor de desarrollo:

```bash
npm run dev
```

Abre la URL que muestre Next.js, normalmente `http://localhost:3000`.

Validar el proyecto:

```bash
npm run validate
npm run build
```

Resultado esperado de `npm run validate`:

```text
Biotopo Next.js Demo Validation
✓ package.json exists
✓ Next.js dependency exists
✓ dev script exists
✓ build script exists
✓ app/page.tsx exists
✓ app layout exists
✓ global stylesheet exists
✓ TrailCard component exists
✓ document language is Spanish
✓ metadata description exists
✓ main heading exists
✓ navigation exists
✓ Next Image component is used
✓ images have non-empty alt text
✓ IDs are unique
✓ internal anchor links resolve
✓ links and buttons have readable text
✓ referenced public assets exist
✓ content mentions bosque nuboso
✓ content avoids dry forest inconsistency

All checks passed
```

## Ejecutar La Demo

1. Muestra la app con `npm run dev`.
2. Muestra `app/page.tsx`, `components/`, `tests/validate.js` y `validate-site.yml`.
3. Explica que el workflow tradicional ejecuta pasos definidos: instalar, validar y construir.
4. Crea una rama de demo.
5. Copia el escenario con problemas sobre `app/page.tsx`.
6. Ejecuta `npm run validate`.
7. Crea commit y Pull Request.
8. Espera GitHub Actions.
9. Abre la ejecucion del Agentic Workflow.
10. Muestra la revision publicada por el agente en el PR.

Comandos para preparar el PR:

```bash
git switch -c demo/problemas-intencionales
cp demo/02-intentional-problem/page.problem.tsx app/page.tsx
npm run validate
git add app/page.tsx
git commit -m "Update Biotopo visitor page"
git push -u origin demo/problemas-intencionales
gh pr create --title "Update Biotopo visitor page" --body "Demo PR for GitHub Agentic Workflows."
```

No hagas `git push` hasta tener un remoto configurado y hasta que quieras publicar la demo.

## Que Deben Aprender Los Estudiantes

1. Un agente no es solamente un chatbot.
2. Un agente recibe un objetivo.
3. Puede inspeccionar contexto.
4. Puede utilizar herramientas.
5. Puede decidir que acciones necesita realizar.
6. Puede analizar los resultados.
7. Puede producir una accion o resultado.
8. GitHub Agentic Workflows integra esta idea dentro de GitHub Actions.

## Problemas Intencionales

El escenario `demo/02-intentional-problem/page.problem.tsx` contiene:

- Componente `Image` sin atributo `alt`.
- Enlaces internos rotos.
- Contenido inconsistente con "bosque nuboso".
- Mensaje que contradice la necesidad de validaciones.
- Se elimina la seccion de visita que la navegacion todavia referencia.

Puedes probarlo sin cambiar el sitio base:

```bash
node tests/validate.js --file=demo/02-intentional-problem/page.problem.tsx
```

## Fuentes Y Notas

- GitHub Docs: crear GitHub Agentic Workflows.
- GitHub Agentic Workflows reference: estructura de workflow, frontmatter, tools y safe outputs.
- Informacion del Biotopo: se mantiene general para evitar datos sensibles o detalles turisticos que cambian con frecuencia. Antes de presentar horarios, tarifas o restricciones reales, confirma con fuentes oficiales.
