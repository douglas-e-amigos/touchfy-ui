# AgentMain

Este projeto usa um AgentMain para coordenar verificações multiagent somente sob trigger explícito.

## Trigger obrigatório

Iniciar o fluxo multiagent apenas quando a mensagem do usuário for exatamente:

* `Analise o código`

Para qualquer outro pedido, não spawnar automaticamente os quatro subagents. Isto inclui pedidos como `verificar tudo`, `revisar staging`, `analisar staged files`, `revisar código`, `code review` ou `conferir alterações`.

## Fluxo principal

Ao receber o trigger obrigatório:

1. Executar `git diff --cached --name-only --diff-filter=ACMR`.
2. Se não houver arquivos staged, responder somente:

```text
Não há arquivos para serem avaliados
```

3. Se houver arquivos staged, spawnar em paralelo:

   * SubAgent `verificar-bugs`, usando `.agents/skills/verificar-bugs/SKILL.md`
   * SubAgent `verificar-codesmells`, usando `.agents/skills/verificar-codesmells/SKILL.md`
   * SubAgent `verificar-coverage`, usando `.agents/skills/verificar-coverage/SKILL.md`
   * SubAgent `verificar-hotstops`, usando `.agents/skills/verificar-hotstops/SKILL.md`

4. Esperar todos os subagents terminarem.

5. Consolidar os resultados por severidade:

   * `crítico`
   * `alto`
   * `médio`
   * `baixo`

6. Aplicar correções mínimas somente quando os problemas forem confirmados e a correção for segura.

## Fonte da verdade

* A lista de arquivos avaliáveis deve vir somente de:

```bash
git diff --cached --name-only --diff-filter=ACMR
```

* Basear análises no staged diff:

```bash
git diff --cached -- <arquivo>
```

* Quando precisar ver o conteúdo staged completo:

```bash
git show :<arquivo>
```

* Não avaliar arquivos unstaged.
* Não avaliar o repositório inteiro.
* Pode usar histórico Git somente para os mesmos arquivos staged, quando isso for necessário para a análise.
* Se um arquivo estiver `MM`, a análise deve considerar somente a versão staged/indexada. Alterações unstaged devem ser ignoradas e o usuário deve ser avisado quando isso impactar o resultado.

## Conduta dos subagents

* Cada subagent deve manter sua própria janela de contexto focada na especialidade da sua skill.
* Os subagents devem rodar em paralelo para reduzir poluição da janela principal.
* Cada subagent deve produzir saída objetiva e curta.
* Cada achado deve citar arquivo e trecho/linha aproximada quando possível.
* Se uma verificação não puder ser feita com segurança, explicar a limitação sem inventar resultado.
* Subagents não devem aplicar correções diretamente.
* Subagents devem reportar achados, evidências, impacto e sugestão de correção.
* O AgentMain é responsável por consolidar os achados e aplicar as correções mínimas seguras.

## Correções

Quando houver bug, code smell, falta de coverage ou hotspot corrigível:

1. Informar arquivo e trecho/linha aproximada.
2. Explicar o problema e o impacto.
3. Aplicar a correção mínima segura.
4. Preservar o comportamento esperado.
5. Evitar refactors grandes.
6. Atualizar ou criar testes somente quando isso for necessário para corrigir falta de coverage relacionada aos arquivos staged.
7. Ao final, mostrar o que foi alterado.

Correções podem alterar os arquivos originalmente staged e testes relacionados necessários.

Não fazer `git add` automaticamente. Deixar as correções no working tree e informar ao usuário quais arquivos precisam de `git add`.

## Restrições permanentes

* Não fazer commit.
* Não avaliar arquivos unstaged.
* Não avaliar o repositório inteiro.
* Não alterar arquivos fora do escopo sem necessidade clara.
* Não instalar dependências sem autorização explícita.
* Não executar comandos destrutivos.
