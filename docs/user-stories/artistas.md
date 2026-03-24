---
# User Stories - Artista

## Descrição
Este documento descreve os User Stories criados a partir da Lista de Requisitos no [Documento 001 - Documento de Visão](#). Modelo de documento baseado nas características do processo easYProcess (YP).

## Histórico de revisões

| Data       | Versão | Descrição                                | Autor    |
| :--------- | :----: | :--------------------------------------- | :------- |
| 23/03/2026 | 0.0.1  | Stories do módulo de artista             | Anderson |
| 24/03/2026 | 0.0.2  | Revisão e adequação aos requisitos RF14–RF20 | Anderson |

### User Story US01 - Seguir Artista

|📌 User Story - US01 | Seguir Artista |
|---------------------|--|
| **Título** | Seguir artista |
| **Identificação** | US01 - Seguir Artista |
| **Story** | Como **usuário**, quero poder seguir um **artista**, para acompanhar suas atualizações e lançamentos. |
| **Requisitos Relacionados** | RF14 |
| **Critérios de Aceitação** | - **Dado** que estou autenticado e no perfil de um artista, **quando** eu clicar na opção de seguir, **então** o sistema deve registrar que estou seguindo esse artista.<br>- **Dado** que o artista foi seguido com sucesso, **então** a quantidade de seguidores exibida deve ser atualizada.<br>- **Dado** que eu não esteja autenticado, **quando** eu tentar seguir um artista, **então** devo ser redirecionado para a tela de login. |
| **Testes de Aceitação** | - **TA01.01** - Seguir artista com usuário autenticado.<br>- **TA01.02** - Tentar seguir artista sem autenticação redireciona para o login.<br>- **TA01.03** - Após seguir artista, a quantidade de seguidores é atualizada corretamente. |
| **Estimativa** | 5h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Média |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

### User Story US02 - Bloquear Artista

|📌 User Story - US02 | Bloquear Artista |
|---------------------|--|
| **Título** | Bloquear artista |
| **Identificação** | US02 - Bloquear Artista |
| **Story** | Como **usuário**, quero poder bloquear um **artista**, para que ele não apareça em recomendações e reproduções automáticas. |
| **Requisitos Relacionados** | RF15 |
| **Critérios de Aceitação** | - **Dado** que estou autenticado e no perfil de um artista, **quando** eu clicar na opção de bloquear artista, **então** o sistema deve solicitar confirmação da ação.<br>- **Dado** que eu confirme o bloqueio, **então** o artista não deve mais aparecer em recomendações e reproduções automáticas.<br>- **Dado** que eu não esteja autenticado, **quando** eu tentar bloquear um artista, **então** devo ser redirecionado para a tela de login. |
| **Testes de Aceitação** | - **TA02.01** - Bloquear artista com confirmação e usuário autenticado.<br>- **TA02.02** - Tentar bloquear artista sem autenticação redireciona para o login.<br>- **TA02.03** - Após o bloqueio, o artista deixa de aparecer em recomendações e reproduções automáticas. |
| **Estimativa** | 5h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Média |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

### User Story US03 - Navegar na Discografia do Artista

|📌 User Story - US03 | Navegar na Discografia do Artista |
|---------------------|--|
| **Título** | Navegar na discografia do artista |
| **Identificação** | US03 - Navegar na Discografia do Artista |
| **Story** | Como **usuário**, quero poder navegar pela discografia do **artista**, para explorar seus conteúdos musicais organizados por tipo de lançamento. |
| **Requisitos Relacionados** | RF16 |
| **Critérios de Aceitação** | - **Dado** que estou no perfil de um artista, **quando** eu acessar sua discografia, **então** o sistema deve exibir os lançamentos organizados por álbuns, singles, EPs e compilações.<br>- **Dado** que existam itens em cada categoria, **então** devo poder navegar entre elas e visualizar seus conteúdos.<br>- **Dado** que o artista não possua itens em alguma categoria, **então** o sistema deve informar a indisponibilidade dessa categoria ou não exibi-la. |
| **Testes de Aceitação** | - **TA03.01** - Visualizar discografia com categorias organizadas corretamente.<br>- **TA03.02** - Navegar entre álbuns, singles, EPs e compilações.<br>- **TA03.03** - Sistema trata corretamente categorias sem conteúdo. |
| **Estimativa** | 5h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Alta |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

### User Story US04 - Exibir Músicas Curtidas do Artista Visualizado

|📌 User Story - US04 | Exibir Músicas Curtidas do Artista Visualizado |
|---------------------|--|
| **Título** | Exibir músicas curtidas do artista visualizado |
| **Identificação** | US04 - Exibir Músicas Curtidas do Artista Visualizado |
| **Story** | Como **usuário**, quero visualizar as músicas que curti e que pertencem ao **artista** visualizado, para identificar rapidamente minhas favoritas desse artista. |
| **Requisitos Relacionados** | RF17 |
| **Critérios de Aceitação** | - **Dado** que estou autenticado e visualizando o perfil de um artista, **quando** eu acessar a listagem de músicas curtidas relacionadas a esse artista, **então** o sistema deve exibir somente as músicas desse artista que eu curti.<br>- **Dado** que eu não tenha músicas curtidas desse artista, **então** o sistema deve informar que não há músicas curtidas relacionadas.<br>- **Dado** que eu não esteja autenticado, **quando** eu tentar acessar essa funcionalidade, **então** devo ser redirecionado para a tela de login. |
| **Testes de Aceitação** | - **TA04.01** - Exibir corretamente as músicas curtidas do artista visualizado para usuário autenticado.<br>- **TA04.02** - Exibir mensagem adequada quando não houver músicas curtidas do artista.<br>- **TA04.03** - Tentar acessar a funcionalidade sem autenticação redireciona para o login. |
| **Estimativa** | 5h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Média |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

### User Story US05 - Reproduzir Somente Músicas da Discografia do Artista

|📌 User Story - US05 | Reproduzir Somente Músicas da Discografia do Artista |
|---------------------|--|
| **Título** | Reproduzir somente músicas da discografia do artista |
| **Identificação** | US05 - Reproduzir Somente Músicas da Discografia do Artista |
| **Story** | Como **usuário**, quero reproduzir somente músicas da discografia do **artista** selecionado, para ouvir conteúdos relacionados exclusivamente a esse artista. |
| **Requisitos Relacionados** | RF18 |
| **Critérios de Aceitação** | - **Dado** que estou no perfil ou na discografia de um artista, **quando** eu iniciar a reprodução, **então** o sistema deve montar uma fila contendo apenas músicas da discografia desse artista.<br>- **Dado** que a fila esteja em reprodução, **então** as próximas músicas executadas devem pertencer somente ao artista selecionado.<br>- **Dado** que o artista não possua músicas disponíveis, **então** o sistema deve informar a indisponibilidade de reprodução. |
| **Testes de Aceitação** | - **TA05.01** - Reproduzir fila contendo apenas músicas do artista selecionado.<br>- **TA05.02** - Validar que as próximas faixas da fila pertencem somente ao artista selecionado.<br>- **TA05.03** - Exibir mensagem apropriada quando não houver músicas disponíveis para reprodução. |
| **Estimativa** | 5h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Alta |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

### User Story US06 - Compartilhar Perfil do Artista

|📌 User Story - US06 | Compartilhar Perfil do Artista |
|---------------------|--|
| **Título** | Compartilhar perfil do artista |
| **Identificação** | US06 - Compartilhar Perfil do Artista |
| **Story** | Como **usuário**, quero compartilhar o perfil de um **artista**, para divulgar seu conteúdo por meio de link ou recurso equivalente. |
| **Requisitos Relacionados** | RF19 |
| **Critérios de Aceitação** | - **Dado** que estou no perfil de um artista, **quando** eu clicar na opção de compartilhar, **então** o sistema deve disponibilizar um link ou recurso equivalente para compartilhamento.<br>- **Dado** que o recurso de compartilhamento seja acionado, **então** devo conseguir copiar o link do perfil ou utilizar o compartilhamento nativo da plataforma, quando disponível.<br>- **Dado** que o perfil do artista esteja acessível, **então** o link gerado deve direcionar corretamente para o perfil compartilhado. |
| **Testes de Aceitação** | - **TA06.01** - Gerar link de compartilhamento do perfil do artista com sucesso.<br>- **TA06.02** - Copiar link do perfil corretamente.<br>- **TA06.03** - Acessar o link compartilhado e visualizar o perfil correspondente. |
| **Estimativa** | 5h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Média |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

### User Story US07 - Exibir Informações do Artista

|📌 User Story - US07 | Exibir Informações do Artista |
|---------------------|--|
| **Título** | Exibir informações do artista |
| **Identificação** | US07 - Exibir Informações do Artista |
| **Story** | Como **usuário**, quero visualizar as informações do **artista**, para conhecer seus dados principais ao acessar seu perfil. |
| **Requisitos Relacionados** | RF20 |
| **Critérios de Aceitação** | - **Dado** que estou visualizando o perfil de um artista, **quando** a página for carregada, **então** o sistema deve exibir nome, descrição, número de ouvintes e imagem do artista.<br>- **Dado** que exista posição em ranking aplicável ao artista, **então** essa informação também deve ser exibida.<br>- **Dado** que alguma informação opcional não esteja disponível, **então** o sistema deve exibir os demais dados sem comprometer a visualização do perfil. |
| **Testes de Aceitação** | - **TA07.01** - Exibir corretamente nome, descrição, número de ouvintes e imagem do artista.<br>- **TA07.02** - Exibir posição em ranking quando essa informação estiver disponível.<br>- **TA07.03** - Carregar perfil corretamente mesmo na ausência de alguma informação opcional. |
| **Estimativa** | 5h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Média |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |