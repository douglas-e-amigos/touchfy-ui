# Touchfy UI

Interface do sistema Touchfy.

## Documentação

A documentação está na pasta `docs/`. O principal documento, o [documento de visão](./docs/doc-visao.md) e os demais estão lá.

## Estrutura de pastas

```
docs/
src/
 ├── app/
 │    ├── routes/
 │    └── providers/
 |
 ├── core/
 │
 ├── features/
 │    ├── feature1/
 │    ├── feature2/
 │    └── feature3/
 │
 ├── shared/
 │    ├── components/
 │    ├── hooks/
 │    ├── services/
 |    ├── models/
 │    └── utils/
 │
 └── assets/
```

Cada `feature` do projeto possui as seguintes pastas:

```
components/
services/
models/
pages/
hooks/
```

Abaixo, segue o significado de cada pasta:

|Diretório|Descrição|
|-|-|
|app|Diretório core/configurações do projeto|
|routes|Diretório com arquivos de rotas|
|providers|Diretório com arquivos de contexto|
|features|Diretório com todas as features, cada feature é um sub-diretório|
|shared|Diretório com coisas compartilhadas/reutilizáveis|
|components|Diretório com componentes visuais|
|hooks|Diretório com Hooks|
|models|Diretório com interfaces para tipagem|
|services|Diretório com os arquivos de service|
|pages|Diretório com as páginas das rotas|
|core|Diretório com classes e funções essenciais|

## Comandos

```bash
npm run dev
```