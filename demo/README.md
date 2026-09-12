# Demo Scenarios

Materiales para contar la historia completa del Biotopo del Quetzal con GitHub Agentic Workflows.

## Prerrequisitos

Revisa esto **antes** de la conferencia o del taller. El paso **`00-cli-y-agentics`** desarrolla en detalle la instalación de la CLI y los tres patrones base; aquí va el checklist resumido.

### Software local

| Herramienta | Versión mínima sugerida | Para qué |
|-------------|-------------------------|----------|
| Git | 2.x | ramas, commits y PR |
| Node.js | 20.x o superior | Next.js, validación y build |
| npm | incluido con Node | dependencias y scripts del repo |

Verificación rápida:

```bash
git --version
node --version
npm --version
```

### Cuenta y repositorio en GitHub

- Repositorio remoto creado (organización o personal).
- **GitHub Actions** habilitado en el repo.
- Remoto `origin` configurado y permisos de push.
- Rama principal (`main`) ya publicada al menos una vez.

```bash
git remote -v
git push -u origin main
```

### GitHub CLI y extensión `gh-aw`

```bash
gh --version          # v2.0.0 o posterior
gh auth login --scopes repo,workflow
gh auth status

gh extension install github/gh-aw
gh aw
gh aw doctor          # recomendado antes del evento
```

Guía paso a paso (Daily Repo Status, Issue Triage, escala organizacional): **[00-cli-y-agentics](00-cli-y-agentics/README.md)**.

### Configuración de este repositorio

```bash
# desde la raíz del proyecto
npm install
gh aw init
gh aw compile
```

Deben existir los `.lock.yml` de:

- `.github/workflows/repo-status.md`
- `.github/workflows/issue-clarifier.md`
- `.github/workflows/biotopo-pr-review.md`

Haz commit de cada `.md` fuente **y** de su `.lock.yml` generado.

### Motor de IA (Copilot)

Este repo usa `engine: copilot` en el workflow agentico.

- **Repositorio de organización** con Copilot habilitado: el workflow pide permiso `copilot-requests: write`.
- **Repositorio personal** o sin billing de organización: puede requerirse el secreto `COPILOT_GITHUB_TOKEN`.

Confirma en GitHub que el agente puede ejecutarse en un PR de prueba antes del evento.

### Checklist previo al escenario en vivo

```bash
npm install
npm run validate    # debe pasar en la rama main
npm run build       # debe compilar sin errores
npm run dev         # opcional: revisar http://localhost:3000
```

En GitHub, confirma que existen y están commiteados:

- `.github/workflows/validate-site.yml`
- `.github/workflows/repo-status.md` + `.lock.yml`
- `.github/workflows/issue-clarifier.md` + `.lock.yml`
- `.github/workflows/biotopo-pr-review.md` + `.lock.yml`

### Qué necesita cada escenario

| Escenario | Prerrequisitos |
|-----------|----------------|
| `00-cli-y-agentics` | `gh`, `gh-aw`; repo de prueba opcional para `repo-status` |
| `01-before` | Node.js, `npm install` |
| `02-intentional-problem` | Node.js, `npm install` (solo validación local) |
| `03-pull-request` | Todo lo anterior + repo remoto, `gh` autenticado, workflows compilados y publicados |
| `04-agent-result` | Ninguno extra (Plan B offline si GitHub o la red fallan) |

---

## Escenarios

- `00-cli-y-agentics`: instalar la CLI, colección Agentics y patrones (reporte diario, Issue Clarifier, triage con prompts, escala org).
- `01-before`: app Next.js base funcionando.
- `02-intentional-problem`: versión con errores fáciles de entender en JSX.
- `03-pull-request`: pasos para crear el PR.
- `04-agent-result`: resultado esperado para Plan B.

La demo está pensada para que el conferencista pueda alternar entre una ejecución real en GitHub y una explicación local si algo externo falla.

Archivo clave del escenario problemático: `02-intentional-problem/page.problem.tsx` (se copia sobre `app/page.tsx` para simular el PR).

Más detalle de instalación y arquitectura en el [README principal](../README.md).
