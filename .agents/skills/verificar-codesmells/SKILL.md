---

name: verificar-codesmells
description: Detectar code smells relevantes somente no staged diff do projeto. Use quando o AgentMain spawnar o SubAgent verificar-codesmells após o trigger exato "Analise o código" ou "codesmells".
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Verificar Code Smells

Analise somente os arquivos retornados por:

```bash
git diff --cached --name-only --diff-filter=ACMR
```

Use como fonte primária:

```bash
git diff --cached -- <arquivo>
```

Quando precisar ver o conteúdo staged completo:

```bash
git show :<arquivo>
```

Não avaliar arquivos unstaged. Não avaliar o repositório inteiro.

## Foco geral

Procurar code smells que afetem manutenção, legibilidade, evolução ou segurança do código.

Priorizar:

* duplicação relevante;
* funções, métodos ou componentes grandes demais;
* nomes confusos;
* responsabilidades misturadas;
* acoplamento excessivo;
* complexidade desnecessária;
* magic numbers;
* baixa legibilidade;
* padrões frágeis de implementação;
* HTML semântico incorreto;
* problemas básicos de acessibilidade.

Não reportar estilo puramente cosmético.

## HTML semântico e acessibilidade

Em arquivos `.tsx`, `.jsx`, `.html`, `.vue`, `.svelte` ou templates equivalentes, verificar se o HTML usa elementos corretos para suas funções.

Deve ser tratado como code smell relevante:

* `div`, `span` ou outro elemento não interativo com `onClick`;
* elemento não interativo com handlers como `onMouseDown`, `onPointerDown`, `onKeyDown` ou similares;
* `div` ou `span` usado como botão, link, checkbox, tab, menu ou item clicável;
* uso de `role="button"` ou `role="link"` quando uma tag nativa resolveria melhor;
* elemento clicável sem suporte adequado a teclado;
* navegação feita por clique em elemento que não seja link;
* input sem label associado;
* botão somente com ícone sem nome acessível;
* imagem informativa sem `alt`;
* uso de `tabIndex` positivo;
* heading usado apenas para aparência visual;
* estrutura semântica genérica demais quando há tags nativas adequadas.

## Regra obrigatória para elementos interativos

Antes de responder que não há code smells, investigar qualquer ocorrência staged de elementos não interativos com comportamento interativo.

Elementos candidatos:

* `div`
* `span`
* `section`
* `article`
* `aside`
* `main`
* `header`
* `footer`
* `li`
* `p`
* `svg`

Atributos candidatos:

* `onClick`
* `onclick`
* `onMouseDown`
* `onMouseUp`
* `onPointerDown`
* `onPointerUp`
* `onKeyDown`
* `onKeyUp`
* `role="button"`
* `role="link"`
* `tabIndex`
* `tabindex`

Se encontrar uma combinação dessas, deve reportar como achado ou justificar explicitamente por que o caso é aceitável.

Não responder “nenhum code smell” quando houver elemento não interativo com handler interativo sem explicar o motivo.

## Modais, dialogs e backdrops

Em componentes de modal, dialog ou backdrop, considerar smell:

* wrapper com `div onClick` apenas para `stopPropagation`;
* fechamento de modal dependente de bubbling frágil;
* uso de elemento não interativo para controlar interação;
* `<dialog>` sem tratamento adequado de cancelamento quando aplicável;
* `<dialog>` sem nome acessível quando o componente não garantir título, `aria-label` ou `aria-labelledby`.

Preferir comparar `event.target` com `event.currentTarget` no container principal quando o objetivo for detectar clique no backdrop.

Exemplo de smell:

```tsx
<dialog onClick={onClose}>
    <div onClick={(event) => event.stopPropagation()}>
        {children}
    </div>
</dialog>
```

Correção preferida quando for segura:

```tsx
function handleBackdropClick(
    event: React.MouseEvent<HTMLDialogElement>,
): void {
    if (event.target === event.currentTarget) {
        onClose();
    }
}

<dialog onClick={handleBackdropClick}>
    <div>
        {children}
    </div>
</dialog>
```

## Correções esperadas

Quando encontrar code smell relevante:

1. indicar arquivo e trecho/linha aproximada;
2. explicar por que é smell;
3. explicar impacto em manutenção, semântica ou acessibilidade;
4. sugerir correção mínima;
5. aplicar correção diretamente quando estiver rodando como subagent;

Correções devem preservar comportamento, classes, ids, atributos de teste, bindings e handlers existentes.

Não fazer refactor grande.

## Severidade

Usar como referência:

* `alto`: interação inacessível, elemento não interativo com ação importante, input sem label em fluxo crítico, navegação sem link real;
* `médio`: semântica ruim que prejudica manutenção ou acessibilidade, `role` desnecessário, estrutura frágil de modal/backdrop;
* `baixo`: melhoria semântica localizada sem impacto direto no fluxo principal.

## Saída

Produzir saída curta com:

* resumo;
* achados;
* arquivo e linha aproximada;
* impacto;
* sugestão de correção;
* motivo para não corrigir, se a correção não for segura.

Se não houver achados, responder claramente que nenhum code smell relevante foi encontrado nos arquivos staged.
