# Contagem de Pontos de Função

## 1. Introdução

Neste documento, a APF foi aplicada ao sistema de plataforma musical, considerando:

- os **User Stories** dos módulos de Usuário;
- os **User Stories** dos módulos de Música;
- os **User Stories** dos módulos de Artista;
- os **User Stories** dos módulos de Playlists e Álbuns;
- o **modelo de banco de dados** disponibilizado.

A APF trabalha com dois grandes grupos de funções:

1. **Funções de Dados**
2. **Funções de Transação**

## 2. Conceitos utilizados na contagem

## 2.1 Funções de Dados

As **Funções de Dados** representam os grupos lógicos de informações mantidos ou consultados pelo sistema.

Elas são divididas em:

| Sigla | Nome | Descrição |
|---|---|---|
| **ALI** | Arquivo Lógico Interno | Grupo lógico de dados mantido pelo próprio sistema. |
| **AIE** | Arquivo de Interface Externa | Grupo lógico de dados apenas consultado pelo sistema, mas mantido por outro sistema externo. |

No projeto analisado, o banco de dados é mantido pela própria aplicação (consideramos somente as **ALIS**).

## 2.2 Funções de Transação

| Sigla | Nome | Descrição |
|---|---|---|
| **EE** | Entrada Externa | Operação que recebe dados externos e altera dados internos do sistema. Ex.: cadastrar, editar, excluir, salvar, curtir. |
| **CE** | Consulta Externa | Operação que consulta dados e retorna informações sem processamento derivado relevante. Ex.: listar, visualizar, consultar. |
| **SE** | Saída Externa | Operação que retorna dados com processamento adicional, cálculo, composição, recomendação ou geração de resultado derivado. |


## 2.3 Termos técnicos usados na APF

| Termo | Significado | Aplicação neste documento |
|---|---|---|
| **RLR** | Registro Lógico Referenciado | Subgrupo lógico de dados dentro de um ALI/AIE. |
| **DER** | Dado Elementar Referenciado | Campo reconhecido pelo usuário. |
| **ALR** | Arquivo Lógico Referenciado | ALI/AIE acessado por uma transação. |
| **Complexidade** | Baixa, Média ou Alta | Definida pela combinação de RLR/DER ou ALR/DER. |


# 3. Premissas da contagem

Esta contagem deve ser entendida como uma **contagem detalhada estimada**.

Foram adotadas as seguintes premissas:

1. A fronteira da aplicação é a própria plataforma musical.
3. As tabelas do banco representam dados mantidos internamente pelo sistema.
4. Algumas tabelas associativas foram agrupadas ao ALI principal correspondente.
4. User Stories com múltiplas ações funcionais podem gerar mais de uma função transacional.


# 4. Modelo de Dados

[Diagrama BD](./doc-diagrama-bd.md)

# 5. Contagem Indicativa

## 5.1 Regra da Contagem Indicativa

Na **Contagem Indicativa (Ci)**, considera-se apenas as **Funções de Dados**.

A regra utilizada é:

| Tipo | Valor |
|---|---:|
| **ALI** | 35 PF cada |
| **AIE** | 15 PF cada |


## 5.2 Identificação dos ALIs

As tabelas do banco foram agrupadas em arquivos lógicos internos conforme seu significado funcional.

| Função de Dado | Tipo | Entidades Relacionadas | Justificativa | PF Indicativo |
|---|---|---|---|---:|
| Usuário e Conta | ALI | `USUARIO`, `USARIO_BLOQUEADO` | Mantém dados cadastrais, autenticação, perfil e bloqueios entre usuários. | 35 |
| Controle de Acesso | ALI | `PAPEL`, `PERMISSAO`, `PAPEL_USUARIO`, `PERMISSAO_USUARIO`, `PERMISSAO_PAPEL` | Mantém dados de papéis, permissões e vínculos de acesso. | 35 |
| Música e Classificações | ALI | `MUSICA`, `GENERO_MUSICAL`, `TAG`, `GENERO_MUSICA`, `MUSICA_TAG`, `MUSICA_ARTISTA` | Mantém músicas, arquivos, letras, gêneros, tags e vínculos com artistas. | 35 |
| Interações do Usuário com Músicas e Artistas | ALI | `MUSICA_CURTIDA`, `MUSICA_OCULTADA`, `ARTISTA_OCULTADO` | Mantém preferências, curtidas e ocultações feitas pelo usuário. | 35 |
| Artista | ALI | `ARTISTA`, `MUSICA_ARTISTA` | Mantém dados do perfil artístico e relação com músicas. | 35 |
| Lista de Reprodução, Playlists e Álbuns | ALI | `LISTA_REPRODUCAO`, `LISTA_USUARIO`, `LISTA_MUSICA` | Mantém listas de reprodução, playlists, álbuns e músicas associadas. | 35 |


## 5.3 Resultado da Contagem Indicativa

| Tipo | Quantidade | PF por item | Total |
|---|---:|---:|---:|
| ALI | 6 | 35 | 210 |
| AIE | 0 | 15 | 0 |
| **Total** |  |  | **210 PF** |

**Tamanho Funcional Indicativo: Ci = 210 PF**

# 6. Contagem Detalhada das Funções de Dados

## 6.1 Tabela de complexidade para ALI

| RLR/DER | 1 a 19 DER | 20 a 50 DER | 51 ou mais DER |
|---|---|---|---|
| 1 RLR | Baixa | Baixa | Média |
| 2 a 5 RLR | Baixa | Média | Alta |
| 6 ou mais RLR | Média | Alta | Alta |

Valores de PF para ALI:

| Complexidade | PF |
|---|---:|
| Baixa | 7 |
| Média | 10 |
| Alta | 15 |


## 6.2 Funções de Dados Detalhadas

| Descrição | Tipo | RLR | DER | Complexidade | Tamanho em PF |
|---|---|---:|---:|---|---:|
| ALI Usuário e Conta | ALI | 2 | 11 | Baixa | 7 |
| ALI Controle de Acesso | ALI | 5 | 8 | Baixa | 7 |
| ALI Música e Classificações | ALI | 6 | 11 | Média | 10 |
| ALI Interações do Usuário | ALI | 3 | 7 | Baixa | 7 |
| ALI Artista | ALI | 2 | 7 | Baixa | 7 |
| ALI Lista de Reprodução, Playlists e Álbuns | ALI | 3 | 8 | Baixa | 7 |
| **Total de Funções de Dados** |  |  |  |  | **45 PF** |


# 7. Contagem Detalhada das Funções de Transação

## 7.1 Valores utilizados para transações

| Tipo | Baixa | Média | Alta |
|---|---:|---:|---:|
| **EE** | 3 PF | 4 PF | 6 PF |
| **CE** | 3 PF | 4 PF | 6 PF |
| **SE** | 4 PF | 5 PF | 7 PF |


# 8. Contagem por User Story

## 8.1 Contagem detalhada do módulo Usuário

| User Story | Operação Funcional | Tipo | ALR | DER | Complexidade | PF |
|---|---|---|---:|---:|---|---:|
| US01 | Registrar novo usuário | EE | 1 | 6 | Média | 4 |
| US02 | Login de usuário | CE | 1 | 2 | Média | 4 |
| US03 | Editar dados do usuário | EE | 1 | 6 | Média | 4 |
| US04 | Desativar conta | EE | 1 | 2 | Média | 4 |
| **Total** |  |  |  |  |  | **16 PF** |

## 8.2 Contagem detalhada do módulo Música

| User Story | Operação Funcional | Tipo | ALR | DER | Complexidade | PF |
|---|---|---|---:|---:|---|---:|
| US05 | Visualizar informações básicas da música | CE | 2 | 4 | Média | 4 |
| US06 | Controlar reprodução da música | EE | 2 | 5 | Média | 4 |
| US07 | Curtir/descurtir música | EE | 2 | 3 | Média | 4 |
| US08 | Acessar músicas curtidas | CE | 2 | 5 | Média | 4 |
| US09 | Visualizar créditos da música | CE | 2 | 5 | Média | 4 |
| US10 | Ocultar música das recomendações | EE | 2 | 3 | Média | 4 |
| US11 | Compartilhar música | CE | 1 | 3 | Média | 4 |
| US12 | Adicionar música à playlist | EE | 2 | 3 | Média | 4 |
| US12 | Adicionar música à fila de reprodução | EE | 2 | 3 | Média | 4 |
| US13 | Ativar reprodução aleatória | EE | 2 | 3 | Baixa | 3 |
| US14 | Receber recomendações de músicas | SE | 3 | 6 | Média | 5 |
| US15 | Visualizar letra da música | CE | 1 | 3 | Média | 4 |
| **Total** |  |  |  |  |  | **48 PF** |

## 8.3 Contagem detalhada do módulo Artista

| User Story | Operação Funcional | Tipo | ALR | DER | Complexidade | PF |
|---|---|---|---:|---:|---|---:|
| US16 | Seguir artista | EE | 2 | 3 | Média | 4 |
| US17 | Bloquear artista | EE | 2 | 3 | Média | 4 |
| US18 | Navegar na discografia do artista | CE | 2 | 6 | Média | 4 |
| US19 | Exibir músicas curtidas do artista visualizado | CE | 3 | 5 | Média | 4 |
| US20 | Reproduzir somente músicas da discografia do artista | EE | 2 | 4 | Média | 4 |
| US21 | Compartilhar perfil do artista | CE | 1 | 3 | Média | 4 |
| US22 | Exibir informações do artista | CE | 1 | 5 | Média | 4 |
| US23 | Tornar-se artista | EE | 2 | 5 | Média | 4 |
| US24 | Editar dados de artista | EE | 1 | 5 | Média | 4 |
| US25 | Desativar status de artista | EE | 1 | 3 | Média | 4 |
| **Total** |  |  |  |  |  | **40 PF** |

## 8.4 Contagem detalhada do módulo Playlists e Álbuns

| User Story | Operação Funcional | Tipo | ALR | DER | Complexidade | PF |
|---|---|---|---:|---:|---|---:|
| US26 | Criar playlist | EE | 2 | 4 | Média | 4 |
| US27 | Editar playlist | EE | 2 | 4 | Média | 4 |
| US28 | Excluir playlist | EE | 2 | 3 | Média | 4 |
| US29 | Adicionar música à playlist | EE | 2 | 3 | Média | 4 |
| US30 | Remover música da playlist | EE | 2 | 3 | Média | 4 |
| US31 | Reproduzir playlist | EE | 2 | 4 | Média | 4 |
| US31 | Controlar reprodução da playlist | EE | 3 | 6 | Alta | 6 |
| US32 | Visualizar álbum | CE | 2 | 5 | Média | 4 |
| US33 | Reproduzir álbum | EE | 2 | 4 | Média | 4 |
| US34 | Salvar álbum | EE | 2 | 3 | Média | 4 |
| US35 | Criar álbum | EE | 2 | 4 | Média | 4 |
| US36 | Adicionar músicas ao álbum | EE | 2 | 3 | Média | 4 |
| US37 | Definir data de lançamento do álbum | EE | 2 | 3 | Média | 4 |
| US38 | Editar álbum | EE | 2 | 5 | Média | 4 |
| US39 | Excluir álbum | EE | 2 | 3 | Média | 4 |
| **Total** |  |  |  |  |  | **62 PF** |

# 9. Consolidação Geral da Contagem Detalhada

## 9.1 Total por grupo funcional

| Grupo | Pontos de Função |
|---|---:|
| Funções de Dados | 45 PF |
| Transações — Usuário | 16 PF |
| Transações — Música | 48 PF |
| Transações — Artista | 40 PF |
| Transações — Playlists e Álbuns | 62 PF |
| **Total Detalhado Bruto** | **211 PF** |

A contagem detalhada bruta é calculada por:

**Cd = Funções de Dados + Funções de Transação**

**Cd = 45 PF + 166 PF**

**Cd = 211 PF**


### Tamanho Funcional Consolidado = 200 PF

Esse arredondamento é justificável porque algumas User Stories possuem sobreposição funcional, principalmente:

- controle de reprodução de música;
- controle de reprodução de playlist;
- reprodução de álbum;
- adicionar música à playlist;
- adicionar música à fila;
- funcionalidades de álbum modeladas dentro de lista de reprodução;
- ausência de tabelas específicas para algumas funcionalidades.

Assim, para planejamento inicial, cronograma e estimativa de custo, o valor **200 PF** é uma referência mais conservadora e prática.

# 10. Comparação entre Contagem Indicativa e Detalhada

| Tipo de Contagem | Resultado |
|---|---:|
| Contagem Indicativa | 210 PF |
| Contagem Detalhada Bruta | 211 PF |
| Contagem Detalhada Consolidada Recomendada | 200 PF |

A proximidade entre a contagem indicativa e a contagem detalhada bruta indica que o tamanho funcional estimado está coerente.

# 11. Estimativa de Esforço, Prazo e Custo

## 11.2 Cenário — Produtividade de 1h/PF

Considerando produtividade de **1 hora por Ponto de Função**:

| Item | Cálculo | Resultado |
|---|---|---:|
| Tamanho funcional | 200 PF | 200 PF |
| Produtividade | 1h/PF | 1h/PF |
| Esforço total | 200 × 1 | 200 horas |
| Jornada diária | 8h/dia | 8h/dia |
| Duração para 1 desenvolvedor | 200 ÷ 8 | 25 dias úteis |
| Valor por hora | R$ 17,00 | R$ 17,00 |
| Custo total | 200 × 17 | R$ 3.400,00 |

**Resultado:** com produtividade de **1h/PF**, o sistema teria esforço estimado de **200 horas**, duração aproximada de **25 dias úteis** para um desenvolvedor e custo estimado de **R$ 3.400,00**.

# 16. Síntese Final

| ||
|-|-|
|**Arquivos de Interface Externa (AIE)** | 0
|**Arquivos Lógicos Internos (ALIs)** | 6
|**Contagem Indicativa** | 210 PF
|**Contagem Detalhada Bruta** | 211 PF
|**Tamanho Funcional Consolidade** | 200 PF
