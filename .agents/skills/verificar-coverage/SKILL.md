---
name: verificar-coverage
description: Avaliar risco de coverage somente para arquivos staged do projeto. Use quando o AgentMain spawnar o SubAgent verificar-coverage apos o trigger exato "Analise o código".
---

# Verificar Coverage

Analise somente os arquivos retornados por `git diff --cached --name-only --diff-filter=ACMR`.

Use como fonte primaria:

- `git diff --cached -- <arquivo>` para analisar o staged diff.
- `git show :<arquivo>` quando precisar ver o conteudo staged completo.

Nao avaliar arquivos unstaged. Nao avaliar o repositorio inteiro.

## Foco

Avaliar se os staged files alteram logica que deveria ter testes. Procurar testes staged relacionados e testes existentes proximos ao arquivo alterado, sem varrer o repositorio inteiro de forma ampla.

Neste projeto, testes costumam ser `*.spec.tsx` em `src/`, co-localizados com componentes, paginas ou utils. O comando claro de coverage e `npm run test:coverage`.

Se nao for possivel calcular cobertura real com seguranca, declarar isso claramente e fazer analise de risco de cobertura.

## Quando faltar teste relevante

1. Indicar arquivo e trecho/linha aproximada da logica sem cobertura aparente.
2. Indicar teste esperado.
3. Criar ou ajustar teste relacionado se for seguro e necessario.

## Saida

Produzir saida curta com:

- arquivos staged sem teste aparente;
- risco;
- testes recomendados;
- testes criados ou alterados;
- comandos sugeridos ou executados.
