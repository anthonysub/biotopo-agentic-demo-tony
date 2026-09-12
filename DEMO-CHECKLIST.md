# Demo Checklist

## Antes De La Conferencia

- [ ] Instalar Git.
- [ ] Instalar Node.js.
- [ ] Ejecutar `npm install`.
- [ ] Instalar GitHub CLI.
- [ ] Autenticar GitHub CLI con `gh auth login --scopes repo,workflow`.
- [ ] Instalar `gh-aw` con `gh extension install github/gh-aw`.
- [ ] Ejecutar `gh aw`.
- [ ] Ejecutar `gh aw init`.
- [ ] Compilar `.github/workflows/biotopo-pr-review.md` con `gh aw compile`.
- [ ] Confirmar que existe `.github/workflows/biotopo-pr-review.lock.yml`.
- [ ] Revisar permisos del workflow.
- [ ] Confirmar que GitHub Actions esta habilitado.
- [ ] Confirmar acceso a Copilot o configurar `COPILOT_GITHUB_TOKEN` si aplica.

## Validacion Local

- [ ] Ejecutar `npm run dev` y abrir `http://localhost:3000`.
- [ ] Ejecutar `npm run validate`.
- [ ] Ejecutar `npm run build`.
- [ ] Ejecutar `node tests/validate.js --file=demo/02-intentional-problem/page.problem.tsx`.
- [ ] Confirmar que el sitio base pasa.
- [ ] Confirmar que el escenario intencional falla.

## Demo En Vivo

- [ ] Mostrar app base.
- [ ] Mostrar workflow tradicional.
- [ ] Mostrar workflow agentic.
- [ ] Crear rama de demo.
- [ ] Copiar escenario con problemas.
- [ ] Ejecutar test local.
- [ ] Crear commit.
- [ ] Crear Pull Request.
- [ ] Mostrar GitHub Actions.
- [ ] Mostrar resultado del agente en el PR.

## Plan B

- [ ] Tener abierto `demo/04-agent-result/expected-review.md`.
- [ ] Tener lista la salida local del test fallido.
- [ ] Tener capturas o logs previos si el evento depende de red.
- [ ] Explicar que el concepto se sostiene aunque falle una ejecucion externa.

## Seguridad

- [ ] Revisar que no hay tokens ni secretos.
- [ ] No hacer `git push` sin confirmacion.
- [ ] No crear repositorio remoto desde la demo sin pedir permiso.
- [ ] No otorgar permisos innecesarios al agente.
