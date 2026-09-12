# 03 - Pull Request

Guía breve para crear el PR de la demo. No publiques nada automáticamente desde esta carpeta.

> Prerrequisitos: repo remoto, GitHub Actions, `gh` autenticado, `gh-aw` instalado y workflow compilado. Ver [demo/README.md](../README.md#prerrequisitos).

Pasos sugeridos:

```bash
git switch -c demo/problemas-intencionales
cp demo/02-intentional-problem/page.problem.tsx app/page.tsx
npm run validate
git add app/page.tsx
git commit -m "Update Biotopo visitor page"
git push -u origin demo/problemas-intencionales
gh pr create --title "Update Biotopo visitor page" --body "Demo PR for GitHub Agentic Workflows."
```

Qué debería pasar:

1. El workflow tradicional `Validate Next.js site` ejecuta `npm run validate` y `npm run build`.
2. El Agentic Workflow `biotopo-pr-review.md`, compilado previamente a `.lock.yml`, se activa en el PR.
3. El agente revisa el cambio, ejecuta validaciones cuando lo considere útil y publica una revisión.

Nota: el comando `gh pr create` requiere GitHub CLI autenticado y un repositorio remoto ya configurado.
