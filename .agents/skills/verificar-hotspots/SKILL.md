---
name: verificar-hotspots
description: Identificar pontos quentes e riscosos somente entre arquivos staged do projeto. Use quando o AgentMain spawnar o SubAgent verificar-hotspots apos o trigger exato "Analise o código".
---

# Verificar Hotstops

Analise somente os arquivos retornados por `git diff --cached --name-only --diff-filter=ACMR`.

Use como fonte primaria:

- `git diff --cached -- <arquivo>` para analisar o staged diff.
- `git show :<arquivo>` quando precisar ver o conteudo staged completo.

Nao avaliar arquivos unstaged. Nao avaliar o repositorio inteiro. Pode usar historico Git somente para os mesmos arquivos staged, sem varrer outros arquivos.

## Foco

Identificar risco por tamanho do diff, complexidade aparente, areas criticas, acoplamento, autenticacao, autorizacao, pagamentos, persistencia, concorrencia, migrations, configs e integracoes externas.

Neste projeto, considerar especialmente criticas as mudancas em `src/proxy.ts`, `src/app/api/auth/**`, `src/app/api/usuarios/**`, `src/infrastructure/http/**`, validacoes, upload/arquivos, configs de build/teste/lint e variaveis de ambiente.

## Quando encontrar hotspot corrigivel

1. Indicar arquivo e trecho/linha aproximada.
2. Explicar o risco.
3. Aplicar correcao minima se for segura e localizada.

Se exigir decisao arquitetural maior, nao corrigir automaticamente; apenas reportar.

## Saida

Produzir saida curta com:

- ranking dos staged files mais arriscados;
- motivo do risco;
- correcao aplicada ou recomendacao.
