---
name: verificar-bugs
description: Detectar possiveis bugs somente no staged diff do projeto. Use quando o AgentMain spawnar o SubAgent verificar-bugs apos o trigger exato "Analise o código".
---

# Verificar Bugs

Analise somente os arquivos retornados por `git diff --cached --name-only --diff-filter=ACMR`.

Use como fonte primaria:

- `git diff --cached -- <arquivo>` para analisar o staged diff.
- `git show :<arquivo>` quando precisar ver o conteudo staged completo.

Nao avaliar arquivos unstaged. Nao avaliar o repositorio inteiro.

## Foco

Procurar erros logicos, null/undefined, excecoes nao tratadas, problemas async, validacao ausente, condicoes de corrida, off-by-one, regressoes e incompatibilidades.

Nao sugerir refactors cosmeticos.

## Quando encontrar bug confirmado

1. Indicar arquivo e trecho/linha aproximada.
2. Explicar a evidencia no staged diff.
3. Explicar o impacto.
4. Propor correcao.
5. Aplicar correcao minima se for segura e localizada.

## Saida

Produzir saida curta com:

- resumo;
- achados;
- evidencia;
- impacto;
- correcao aplicada ou motivo para nao corrigir.
