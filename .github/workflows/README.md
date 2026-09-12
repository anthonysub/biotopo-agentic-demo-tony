# Archivos de workflows

Esta carpeta mezcla automatización **tradicional** y **agentica**:

| Archivo | Tipo | Proposito |
|---------|------|-----------|
| `validate-site.yml` | GitHub Actions (YAML) | Validar y construir la app Next.js en cada PR |
| `repo-status.md` | Agentic Workflow | Reporte diario del estado del repositorio |
| `issue-clarifier.md` | Agentic Workflow | Pedir detalles cuando un issue es incompleto |
| `biotopo-pr-review.md` | Agentic Workflow | Revisar PRs de la demo del Biotopo del Quetzal |

## Compilar workflows agenticos

Requiere GitHub CLI y la extension `gh-aw`. Desde la raiz del proyecto:

```bash
gh aw compile
```

O uno por uno:

```bash
gh aw compile .github/workflows/repo-status.md
gh aw compile .github/workflows/issue-clarifier.md
gh aw compile .github/workflows/biotopo-pr-review.md
```

Cada `.md` genera su `.lock.yml` correspondiente. Haz commit del fuente **y** del `.lock.yml`.

## Ejecutar manualmente

```bash
gh aw run repo-status
gh aw status
```

`issue-clarifier` se dispara al abrir o editar un issue; no tiene ejecucion manual tipica.

Prerrequisitos completos en [demo/README.md](../../demo/README.md#prerrequisitos).
