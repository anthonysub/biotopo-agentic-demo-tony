# 00 - CLI y fundamentos de Agentic Workflows

Paso inicial antes de la demo del Biotopo del Quetzal. Aquí los estudiantes aprenden **cómo se instala y usa la CLI `gh aw`**, con tres patrones reales de la colección [githubnext/agentics](https://github.com/githubnext/agentics):

1. Agregar un workflow listo para usar (**Daily Repo Status**).
2. Entender el ejemplo mínimo **Issue Clarifier** y escalar a **Issue Triage** con prompts.
3. Operar **a escala organizacional** desde un repositorio central (**Dependabot inteligente**).

> Prerrequisitos de software y cuentas: [demo/README.md](../README.md#prerrequisitos).

---

## Objetivo pedagógico

Al terminar este paso, el estudiante debe poder explicar:

| Patrón | Pregunta que responde |
|--------|------------------------|
| CLI + colección Agentics | ¿Cómo instalo un workflow existente sin escribir YAML a mano? |
| Issue Clarifier | ¿Cómo se ve un workflow agentico mínimo (trigger + misión + safe output)? |
| Prompts + agente | ¿Cómo describo en lenguaje natural lo que quiero automatizar? |
| Repo centralizado | ¿Cómo aplico la misma automatización en decenas de repos? |

Después continúa con `01-before` … `04-agent-result` para ver el caso concreto del Biotopo (revisión de PR).

---

## Parte 1 — Instalar la CLI y agregar *Daily Repo Status*

### Qué hace este workflow

El workflow **Daily Repo Status** (nombre interno: `repo-status`) revisa actividad del repositorio — PRs, issues, workflows — y publica un reporte periódico. Es el “Hello World” oficial de Agentic Workflows.

### Instalación de la CLI

```bash
gh --version                    # v2.0.0 o posterior
gh auth login --scopes repo,workflow
gh auth status

gh extension install github/gh-aw
gh aw                           # ver ayuda
gh aw doctor                    # opcional: diagnóstico de auth y repo
```

Si la extensión falla por autenticación, GitHub documenta un script alternativo:

```bash
curl -sL https://raw.githubusercontent.com/github/gh-aw/main/install-gh-aw.sh | bash
```

### Agregar el workflow desde la colección Agentics

**En este repositorio** el archivo fuente ya esta en [`.github/workflows/repo-status.md`](../../.github/workflows/repo-status.md). Compilalo con:

```bash
gh aw compile .github/workflows/repo-status.md
git add .github/workflows/repo-status.md .github/workflows/repo-status.lock.yml
git commit -m "Compilar Repo Status"
git push
```

En un **repo sandbox aparte**, puedes instalarlo desde Agentics:

```bash
gh aw add-wizard githubnext/agentics/repo-status
```

Formato de referencia: `OWNER/REPO/NOMBRE-WORKFLOW`. La documentación también lo menciona como `daily-repo-status`; en Agentics el identificador publicado es **`repo-status`**.

El asistente interactivo (`add-wizard`):

1. Verifica permisos del repositorio.
2. Pide elegir motor de IA (`copilot` es el default).
3. Guía la configuración de secretos si hace falta (`COPILOT_GITHUB_TOKEN`, etc.).
4. Genera `.github/workflows/repo-status.md` y su `.lock.yml` compilado.
5. Abre un PR o hace commit directo (según elijas).
6. Opcionalmente ejecuta una corrida inicial.

### Comandos útiles después de instalar

```bash
gh aw status                    # estado de todos los workflows agenticos
gh aw run repo-status           # disparar el reporte manualmente
gh aw compile                   # recompilar tras editar el .md
```

### Personalización mínima

Abre `.github/workflows/repo-status.md` y edita la sección de contenido del reporte (qué quieres que el agente vigile: backlog, CI, calidad, roadmap). Si cambias el **frontmatter** (bloque YAML entre `---`), recompila:

```bash
gh aw compile .github/workflows/repo-status.md
git add .github/workflows/repo-status.md .github/workflows/repo-status.lock.yml
git commit -m "Personalizar Daily Repo Status"
git push
```

**Mensaje para clase:** *“No partimos de cero: la colección Agentics trae workflows probados; la CLI los instala, compila y los deja listos para GitHub Actions.”*

---

## Parte 2 — Issue Clarifier e Issue Triage

### 2a. Issue Clarifier — el ejemplo mínimo

**Issue Clarifier** es el “Hello World” de Agentic Workflows: cuando alguien abre un issue vago, el agente pide **solo** la información que falta. No etiqueta, no clasifica, no cierra — solo comenta si hace falta aclarar.

Es ideal para enseñar la **anatomía** de un workflow antes de ver plantillas más complejas como Issue Triage.

#### Anatomía en tres piezas

```text
Frontmatter YAML   →  cuándo corre, permisos, herramientas, salidas seguras
Cuerpo Markdown  →  misión en lenguaje natural para el agente
gh aw compile    →  genera el .lock.yml que ejecuta GitHub Actions
```

#### Ejemplo completo (incluido en este repo)

Archivo activo: [`.github/workflows/issue-clarifier.md`](../../.github/workflows/issue-clarifier.md)

Copia de referencia en demo: [issue-clarifier.example.md](./issue-clarifier.example.md)

Versión mínima oficial de la documentación de `gh-aw`:

```markdown
---
on:
  issues:
    types: [opened]

permissions: read-all

safe-outputs:
  add-comment:
---

# Issue Clarifier

Analyze the current issue and ask for additional details if the issue is unclear.
```

#### Instalarlo en un repo sandbox

**Opción 1 — Usar el archivo ya incluido en este repositorio:**

```bash
gh aw init
gh aw compile .github/workflows/issue-clarifier.md
git add .github/workflows/issue-clarifier.md .github/workflows/issue-clarifier.lock.yml
git commit -m "Compilar Issue Clarifier"
git push
```

**Opción 1b — Copiar desde otro repo o desde la carpeta demo:**

```bash
gh aw init
cp demo/00-cli-y-agentics/issue-clarifier.example.md .github/workflows/issue-clarifier.md
gh aw compile .github/workflows/issue-clarifier.md
git add .github/workflows/issue-clarifier.md .github/workflows/issue-clarifier.lock.yml
git commit -m "Agregar Issue Clarifier de demo"
git push
```

**Opción 2 — Crearlo con un prompt al agente de desarrollo:**

```text
agentic-workflows crea un workflow Issue Clarifier que, al abrir o editar un issue,
pida detalles faltantes (reproduccion, entorno, error) en un solo comentario en espanol.
Usa safe-outputs add-comment y permisos de solo lectura.
```

**Opción 3 — Escribirlo a mano** siguiendo el ejemplo mínimo de arriba.

#### Probarlo en clase

1. Mergea el workflow en la rama principal del repo sandbox.
2. Abre un issue deliberadamente incompleto, por ejemplo: *“No funciona la pagina.”*
3. Ve a **Actions** y observa la corrida del agente.
4. El issue debería recibir un comentario pidiendo pasos, entorno y error esperado vs. observado.

#### Issue Clarifier vs. Issue Triage

| | Issue Clarifier | Issue Triage |
|---|-----------------|--------------|
| Objetivo | Completar información del autor | Clasificar y priorizar para maintainers |
| Escribe comentarios | Solo si falta info | Siempre (reporte de triage) |
| Etiquetas / tipo | No | Sí |
| Complejidad | Mínima | Media-alta |
| En Agentics | No (ejemplo base de `gh-aw`) | Sí (`issue-triage`) |

**Mensaje para clase:** *“Issue Clarifier demuestra que un workflow agentico puede ser casi tan corto como un párrafo — y aun así ejecutarse con permisos acotados en Actions.”*

---

### 2b. Issue Triage — workflow completo con prompts

**Issue Triage** analiza issues nuevos o reabiertos: clasifica, detecta duplicados, asigna etiquetas y deja un comentario estructurado para maintainers. Se dispara automáticamente; no se ejecuta a mano.

### Opción A — Instalar el template de Agentics (rápido)

```bash
gh aw init                      # prepara skills e instrucciones para el agente
gh aw add-wizard githubnext/agentics/issue-triage
gh aw compile
```

### Opción B — Crear o adaptar con prompts (enfoque agéntico puro)

Tras `gh aw init`, el repositorio incluye la skill `agentic-workflows`. Úsala con **Copilot Chat**, **VS Code Agent Mode** o la pestaña **Agents** en github.com.

Ejemplos de prompts (en español o inglés; el agente entiende ambos):

```text
agentic-workflows crea un workflow que haga triage de issues cuando se abren o reabren
```

```text
agentic-workflows importa issue-triage desde githubnext/agentics y usa engine copilot
```

```text
agentic-workflows actualiza el workflow issue-triage para mejorar la detección de duplicados
```

El agente debería:

- Crear o modificar un `.md` en `.github/workflows/`.
- Definir frontmatter (`on`, `permissions`, `tools`, `safe-outputs`).
- Escribir la misión en lenguaje natural.
- Compilar el `.lock.yml` correspondiente.

Revisa siempre ambos archivos antes del commit.

### Ciclo de refinamiento

```text
1. Prompt al agente  →  genera/edita .md + .lock.yml
2. gh aw compile     →  valida y regenera si hiciste cambios manuales
3. Commit + push   →  el workflow queda activo en GitHub Actions
4. Abrir un issue de prueba  →  observar la corrida y el comentario de triage
5. Nuevo prompt      →  ajustar criterios, etiquetas o tono del comentario
```

**Mensaje para clase:** *“El workflow no es solo YAML fijo: es una misión en Markdown. El agente de desarrollo te ayuda a escribirla; GitHub Actions la ejecuta en producción.”*

Documentación de referencia: [AI issue triage on GitHub](https://github.github.com/gh-aw/guides/ai-issue-triage/).

---

## Parte 3 — Ejecutar a escala desde un repositorio centralizado

### Problema que resuelve

En una organización con decenas o cientos de repos, instalar workflows uno por uno no escala. El patrón **CentralRepoOps** usa un **repositorio de control privado** que orquesta trabajo en muchos repos destino.

Caso de ejemplo: desplegar configuración inteligente de **Dependabot** (`dependabot.yml` personalizado) en toda la organización.

### Arquitectura (vista simple)

```text
Repo central (control plane)
    │
    ├─ Orchestrator workflow  →  lista repos, filtra, prioriza
    │
    └─ dispatch-workflow  ──────►  Worker en repo central
                                        │
                                        └─ checkout del repo destino
                                           analiza dependencias
                                           abre PR o issue con dependabot.yml
```

Referencias oficiales:

- Patrón [CentralRepoOps](https://github.github.com/gh-aw/patterns/central-repo-ops/)
- Ejemplo [Dependabot Rollout](https://github.github.com/gh-aw/examples/multi-repo/dependabot-rollout/)
- Guía [Using at Scale in Organizations](https://github.github.com/gh-aw/guides/using-at-scale/)

### Pasos conceptuales (laboratorio avanzado / demo en slides)

**1. Crear un repo central privado**, por ejemplo `org/agentic-workflows-control`.

**2. Instalar la CLI y preparar el repo:**

```bash
gh extension install github/gh-aw
gh aw init
```

**3. Agregar el orchestrator** (workflow que categoriza repos y despacha workers):

- Filtra repos sin `.github/dependabot.yml`.
- Clasifica por complejidad (simple, complejo, conflictos con Renovate, alertas de seguridad).
- Prioriza el orden de rollout.
- Usa `safe-outputs: dispatch-workflow` para lanzar workers (máximo concurrente configurable).

**4. Agregar el worker** `dependabot-rollout`:

- Recibe `target_repo` como input.
- Hace checkout del repo destino.
- Genera un `dependabot.yml` adaptado al ecosistema detectado.
- Abre PR o issue en el repo destino mediante safe outputs cross-repo.

**5. Compilar y publicar:**

```bash
gh aw compile
git add .github/workflows/
git commit -m "Agregar orchestrator y worker de Dependabot rollout"
git push
```

**6. Secretos organizacionales** (ejemplo mínimo):

| Secreto | Uso |
|---------|-----|
| `GH_AW_READ_ORG_TOKEN` | PAT fine-grained con lectura de repos destino |
| Token de checkout/PR | Permisos para abrir PRs en repos hijos |

Los tokens deben ser **fine-grained**, con alcance mínimo por repositorio o por organización.

**7. Ejecución:**

- Programada (`schedule: weekly on monday`) o manual desde Actions.
- El orchestrator despacha workers en oleadas (`max: 5` concurrentes, por ejemplo).
- Cada worker deja trazabilidad: PR, issue o comentario en el repo destino.

**Mensaje para clase:** *“Mismo concepto agentico, distinta escala: un repo central decide **dónde** actuar; workers especializados actúan **en cada repo** con permisos acotados.”*

> En aula no hace falta ejecutar un rollout real sobre 100 repos. Basta mostrar el diagrama, un repo central de prueba y un dispatch a **un** repo sandbox.

---

## Conexión con esta demo (Biotopo del Quetzal)

Este repositorio usa el **mismo stack**, pero enfocado en revisión de PR:

```bash
# desde la raíz de biotopo-agentic-demo
npm install
gh aw init
gh aw compile .github/workflows/biotopo-pr-review.md
```

| Paso `00` | Demo Biotopo (`01`–`04`) |
|-----------|--------------------------|
| `gh aw add-wizard` → workflow de Agentics | Workflow custom ya incluido: `biotopo-pr-review.md` |
| Issue Clarifier / Triage → evento `issues` | Biotopo → evento `pull_request` |
| CentralRepoOps → muchos repos | Biotopo → un repo, un PR didáctico |

Continúa en [01-before](../01-before/README.md).

---

## Checklist del conferencista

- [ ] `gh` autenticado con scopes `repo,workflow`
- [ ] `gh aw` instalado; `gh aw doctor` sin errores críticos
- [ ] (Opcional demo en vivo) Repo sandbox con `repo-status` instalado
- [ ] (Opcional demo en vivo) `issue-clarifier` en repo sandbox + issue vago de prueba
- [ ] (Slides) Diagrama CentralRepoOps + enlace al ejemplo Dependabot
- [ ] En **este** repo: `biotopo-pr-review.lock.yml` compilado y commiteado
- [ ] Motor Copilot habilitado o secreto `COPILOT_GITHUB_TOKEN` configurado

## Recursos

- Colección Agentics: https://github.com/githubnext/agentics
- CLI `gh aw`: https://github.github.com/gh-aw/setup/cli/
- Quickstart oficial: https://docs.github.com/en/copilot/how-tos/github-agentic-workflows/quickstart
- Daily Repo Status: https://github.com/githubnext/agentics/blob/main/docs/repo-status.md
- Issue Clarifier (ejemplo mínimo `gh-aw`): https://github.com/github/gh-aw#-how-it-works
- Issue Triage: https://github.com/githubnext/agentics/blob/main/docs/issue-triage.md
- Ejemplo local: [issue-clarifier.example.md](./issue-clarifier.example.md)
