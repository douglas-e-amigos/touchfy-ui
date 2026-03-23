# User Stories - Artista

## Descrição
Este documento descreve os User Stories criados a partir da Lista de Requisitos no [Documento 001 - Documento de Visão](#). Modelo de documento baseado nas características do processo easYProcess (YP).

## Histórico de revisões

| Data       | Versão  | Descrição                          | Autor                          |
| :--------- | :-----: | :--------------------------------: | :----------------------------- |
| 23/03/2026 | 0.0.1   | Stories do módulo de artista  | Anderson |

|📌 User Story - US01 |  |
|---------------------|--|
| **Título** | Cadastrar música |
| **Identificação** | US01 - Cadastrar Música |
| **Story** | Como artista, quero cadastrar uma música, para disponibilizá-la no catálogo da plataforma. |
| **Requisitos Relacionados** | |
| **Critérios de Aceitação** | - Deve ser possível informar título da música e adicionar capa.<br>- Deve ser possível associar a música a um álbum ou single.<br>- Deve ser possível informar metadados da música, como artistas envolvidos, álbum, número da faixa, créditos e gênero.<br>- Após o cadastro, a música deve ficar disponível no gerenciamento do artista. |
| **Testes de Aceitação** | - TA01.01 - Cadastro bem-sucedido com título, capa e metadados válidos.<br>- TA01.02 - Cadastro com associação a álbum realizado com sucesso.<br>- TA01.03 - Tentativa de cadastro sem título retorna erro.<br>- TA01.04 - Música cadastrada aparece no gerenciamento do artista. |
| **Estimativa** | 5h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** | |
| **Prioridade** | Essencial |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

|📌 User Story - US02 |  |
|---------------------|--|
| **Título** | Atualizar música |
| **Identificação** | US02 - Atualizar Música |
| **Story** | Como artista, quero atualizar os dados de uma música cadastrada, para corrigir ou melhorar suas informações. |
| **Requisitos Relacionados** |  |
| **Critérios de Aceitação** | - Deve ser possível editar título, capa, metadados e associação com álbum.<br>- A alteração deve refletir no catálogo da plataforma.<br>- O sistema deve manter a integridade da música após a atualização. |
| **Testes de Aceitação** | - TA02.01 - Atualização bem-sucedida do título da música.<br>- TA02.02 - Atualização bem-sucedida da capa e dos metadados.<br>- TA02.03 - Alterações realizadas aparecem corretamente no catálogo.<br>- TA02.04 - Tentativa de atualização com dados inválidos retorna erro. |
| **Estimativa** | 4h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Essencial |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

|📌 User Story - US03 |  |
|---------------------|--|
| **Título** | Excluir música |
| **Identificação** | US03 - Excluir Música |
| **Story** | Como artista, quero excluir uma música cadastrada, para removê-la da plataforma quando necessário. |
| **Requisitos Relacionados** |  |
| **Critérios de Aceitação** | - Deve ser possível selecionar uma música para exclusão.<br>- O sistema deve solicitar confirmação antes da exclusão.<br>- Após a exclusão, a música não deve mais aparecer no catálogo do artista. |
| **Testes de Aceitação** | - TA03.01 - Exclusão bem-sucedida após confirmação.<br>- TA03.02 - Música excluída deixa de aparecer no catálogo.<br>- TA03.03 - Cancelamento da exclusão mantém a música cadastrada. |
| **Estimativa** | 3h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Essencial |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

|📌 User Story - US04 |  |
|---------------------|--|
| **Título** | Ocultar música |
| **Identificação** | US04 - Ocultar Música |
| **Story** | Como artista, quero ocultar uma música cadastrada, para removê-la temporariamente da exibição pública sem excluí-la da plataforma. |
| **Requisitos Relacionados** |  |
| **Critérios de Aceitação** | - Deve ser possível selecionar uma música para ocultação.<br>- A música ocultada não deve aparecer para os ouvintes.<br>- A música deve continuar disponível no gerenciamento do artista.<br>- Deve ser possível reexibir a música posteriormente. |
| **Testes de Aceitação** | - TA04.01 - Ocultação bem-sucedida de música cadastrada.<br>- TA04.02 - Música ocultada deixa de aparecer no perfil público.<br>- TA04.03 - Música ocultada continua acessível no gerenciamento do artista.<br>- TA04.04 - Reexibição da música ocorre com sucesso. |
| **Estimativa** | 3h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Importante |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

|📌 User Story - US05 |  |
|---------------------|--|
| **Título** | Cadastrar biografia |
| **Identificação** | US05 - Cadastrar Biografia |
| **Story** | Como artista, quero cadastrar minha biografia, para apresentar minha trajetória aos ouvintes. |
| **Requisitos Relacionados** |  |
| **Critérios de Aceitação** | - Deve ser possível inserir um texto de biografia.<br>- A biografia deve ser exibida no perfil público do artista.<br>- O sistema deve validar o limite de caracteres, caso exista. |
| **Testes de Aceitação** | - TA05.01 - Cadastro de biografia realizado com sucesso.<br>- TA05.02 - Biografia cadastrada aparece no perfil público.<br>- TA05.03 - Tentativa de salvar biografia acima do limite retorna erro. |
| **Estimativa** | 2h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Importante |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

|📌 User Story - US06 |  |
|---------------------|--|
| **Título** | Atualizar biografia |
| **Identificação** | US06 - Atualizar Biografia |
| **Story** | Como artista, quero atualizar minha biografia, para manter minhas informações sempre atuais. |
| **Requisitos Relacionados** |  |
| **Critérios de Aceitação** | - Deve ser possível editar o texto da biografia.<br>- A nova versão deve substituir a anterior após salvar.<br>- A alteração deve refletir no perfil público do artista. |
| **Testes de Aceitação** | - TA06.01 - Atualização da biografia realizada com sucesso.<br>- TA06.02 - Nova biografia exibida corretamente no perfil.<br>- TA06.03 - Tentativa de atualização com conteúdo inválido retorna erro. |
| **Estimativa** | 2h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Importante |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

|📌 User Story - US07 |  |
|---------------------|--|
| **Título** | Excluir biografia |
| **Identificação** | US07 - Excluir Biografia |
| **Story** | Como artista, quero excluir minha biografia, para removê-la do meu perfil quando desejar. |
| **Requisitos Relacionados** |  |
| **Critérios de Aceitação** | - Deve ser possível remover a biografia cadastrada.<br>- O sistema deve solicitar confirmação antes da exclusão.<br>- Após a exclusão, a biografia não deve mais aparecer no perfil. |
| **Testes de Aceitação** | - TA07.01 - Exclusão da biografia realizada com sucesso.<br>- TA07.02 - Biografia deixa de ser exibida no perfil público.<br>- TA07.03 - Cancelamento da exclusão mantém a biografia visível. |
| **Estimativa** | 2h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Opcional |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

|📌 User Story - US08 |  |
|---------------------|--|
| **Título** | Fixar álbum como destaque |
| **Identificação** | US08 - Destacar Álbum |
| **Story** | Como artista, quero fixar um álbum como destaque no meu perfil, para dar mais visibilidade a um trabalho específico. |
| **Requisitos Relacionados** |  |
| **Critérios de Aceitação** | - Deve ser possível selecionar um álbum já publicado.<br>- Apenas um álbum pode ficar como destaque por vez.<br>- O álbum destacado deve aparecer em posição de evidência no perfil. |
| **Testes de Aceitação** | - TA08.01 - Álbum publicado definido como destaque com sucesso.<br>- TA08.02 - Ao destacar um novo álbum, o anterior deixa de ser destaque.<br>- TA08.03 - Álbum destacado aparece corretamente no perfil público. |
| **Estimativa** | 3h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Importante |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

|📌 User Story - US09 |  |
|---------------------|--|
| **Título** | Alterar foto de perfil |
| **Identificação** | US09 - Alterar Foto de Perfil |
| **Story** | Como artista, quero alterar minha foto de perfil, para manter minha identidade visual atualizada. |
| **Requisitos Relacionados** |  |
| **Critérios de Aceitação** | - Deve ser possível enviar uma nova imagem de perfil.<br>- O sistema deve validar formato e tamanho da imagem.<br>- A nova foto deve substituir a anterior no perfil público. |
| **Testes de Aceitação** | - TA09.01 - Upload de imagem válida realizado com sucesso.<br>- TA09.02 - Nova foto exibida corretamente no perfil.<br>- TA09.03 - Upload de arquivo em formato inválido retorna erro. |
| **Estimativa** | 3h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Importante |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

|📌 User Story - US10 |  |
|---------------------|--|
| **Título** | Ver seguidores |
| **Identificação** | US10 - Ver Seguidores |
| **Story** | Como artista, quero ver meus seguidores, para acompanhar meu público na plataforma. |
| **Requisitos Relacionados** |  |
| **Critérios de Aceitação** | - Deve ser possível visualizar a quantidade total de seguidores.<br>- Deve ser possível visualizar a lista de seguidores, conforme a regra de negócio definida.<br>- As informações devem estar atualizadas. |
| **Testes de Aceitação** | - TA10.01 - Quantidade total de seguidores exibida corretamente.<br>- TA10.02 - Lista de seguidores carregada com sucesso.<br>- TA10.03 - Dados atualizados após novo seguidor ser registrado. |
| **Estimativa** | 3h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Importante |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

|📌 User Story - US11 |  |
|---------------------|--|
| **Título** | Exibir álbuns no perfil |
| **Identificação** | US11 - Exibir Álbuns |
| **Story** | Como artista, quero exibir meus álbuns no meu perfil, para que os ouvintes visualizem minha discografia. |
| **Requisitos Relacionados** |  |
| **Critérios de Aceitação** | - Todos os álbuns publicados devem aparecer no perfil.<br>- Álbuns ocultos ou removidos não devem aparecer para o público.<br>- Os álbuns devem ser organizados de forma clara no perfil. |
| **Testes de Aceitação** | - TA11.01 - Álbuns publicados exibidos corretamente no perfil.<br>- TA11.02 - Álbuns ocultos não aparecem para ouvintes.<br>- TA11.03 - Organização visual dos álbuns respeita a regra definida. |
| **Estimativa** | 3h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Essencial |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

|📌 User Story - US12 |  |
|---------------------|--|
| **Título** | Exibir top 5 músicas mais ouvidas |
| **Identificação** | US12 - Top 5 Músicas |
| **Story** | Como artista, quero exibir no meu perfil o top 5 das minhas músicas mais ouvidas, para destacar meus maiores sucessos. |
| **Requisitos Relacionados** |  |
| **Critérios de Aceitação** | - O sistema deve calcular as 5 músicas com maior número de reproduções.<br>- O ranking deve ser atualizado automaticamente.<br>- O top 5 deve ser exibido no perfil público do artista. |
| **Testes de Aceitação** | - TA12.01 - Ranking top 5 exibido corretamente no perfil.<br>- TA12.02 - Atualização do ranking ocorre após mudança nas reproduções.<br>- TA12.03 - Caso existam menos de 5 músicas, o sistema exibe apenas as disponíveis. |
| **Estimativa** | 4h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Importante |
| **Responsáveis** | - **Analista:** Nome<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |

|📌 User Story - US13 |  |
|---------------------|--|
| **Título** | Compartilhar música com seguidores |
| **Identificação** | US13 - Compartilhar Música |
| **Story** | Como artista, quero compartilhar uma música com meus seguidores, para promover lançamentos ou faixas específicas. |
| **Requisitos Relacionados** |  |
| **Critérios de Aceitação** | - Deve ser possível selecionar uma música para compartilhamento.<br>- O compartilhamento deve alcançar os seguidores do artista.<br>- A ação deve gerar uma publicação, notificação ou destaque no feed.<br>- Apenas músicas do próprio artista podem ser compartilhadas. |
| **Testes de Aceitação** | - TA13.01 - Compartilhamento de música própria realizado com sucesso.<br>- TA13.02 - Seguidores recebem a publicação ou notificação correspondente.<br>- TA13.03 - Tentativa de compartilhar música de outro artista retorna erro. |
| **Estimativa** | 4h |
| **Tempo Real Gasto** |  |
| **Tamanho Funcional** |  |
| **Prioridade** | Importante |
| **Responsáveis** | - **Analista:** Anderson<br>- **Desenvolvedor:** <br>- **Revisor:** <br>- **Testador:** |
