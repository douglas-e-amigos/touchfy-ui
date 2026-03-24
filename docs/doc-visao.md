# Documento de Visão

Documento construído a partido do **Modelo BSI - Doc 001 - Documento de Visão** que pode ser encontrado no
link: https://docs.google.com/document/d/1DPBcyGHgflmz5RDsZQ2X8KVBPoEF5PdAz9BBNFyLa6A/edit?usp=sharing

## Resumo

É uma cópia acadêmica do spotify.

## Equipe e Definição de Papéis

Membro     |     Papel   |   E-mail   |
---------  | ----------- | ---------- |
Anderson   | Desenvolvedor | anderson@gmail.com
Diana      | Analista | diana@gmail.com
Douglas    | Testador | douglas@gmail.com
Mosiah     | Revisor | mosiah@gmail.com

### Perfis dos Usuários

O sistema poderá ser utilizado por diversos usuários. Temos os seguintes perfis/atores:

| Número | Perfil | Escopo de Visualização | Nível de permissão/Visibilidade |
| :- | :--- | :------------------------------ | :--- |
| 1 | **Artistas** | Gerencia suas músicas e álbuns | **Alto** |
| 2 | **Usuários**| Gerencia suas preferências e playlists | **Médio** |


## Requisitos Funcionais

## 1) Módulo: Música

| ID   | Módulo | Requisito Funcional | Prioridade |
| ---- | -------- | ------------------------------------------------------ | ------- |
| RF01 | Música | O sistema deve permitir reproduzir uma música selecionada pelo usuário. | Alta       |
| RF02 | Música | O sistema deve exibir as informações básicas da música durante a reprodução: título, artistas e duração.  | Alta       |
| RF03 | Música | O sistema deve exibir os créditos da música, incluindo artistas participantes, compositores e produtores, quando disponíveis. | Média      |
| RF04 | Música | O sistema deve permitir que o usuário curta uma música. | Alta       |
| RF05 | Música | O sistema deve manter e exibir uma playlist com todas as músicas curtidas pelo usuário. | Alta       |
| RF06 | Música | O sistema deve permitir que o usuário oculte uma música para que ela deixe de aparecer nas recomendações e reproduções automáticas. | Média      |
| RF07 | Música | O sistema deve permitir compartilhar uma música por meio de link ou recurso equivalente. | Média      |
| RF08 | Música | O sistema deve permitir adicionar uma música a uma playlist criada pelo usuário. | Alta       |
| RF09 | Música | O sistema deve permitir adicionar uma música à fila de reprodução. | Alta       |
| RF10 | Música | O sistema deve recomendar músicas com base no histórico de reprodução e nas interações do usuário, podendo considerar também atividades de amigos. | Média      |
| RF11 | Música | O sistema deve permitir reproduzir músicas em ordem aleatória com embaralhamento da playlist  | Média      |
| RF12 | Música | O sistema deve permitir pausar, retomar, avançar, voltar e repetir músicas durante a reprodução. | Alta       |
| RF13 | Música | O sistema deve exibir a letra da música durante a reprodução, quando disponível. | Média      |

---

## 2) Módulo: Artista

| ID   | Módulo  | Requisito Funcional | Prioridade |
| ---- | -------- | ------------------------------------------------------ | ------- |
| RF14 | Artista | O sistema deve permitir que o usuário siga um artista. | Média      |
| RF15 | Artista | O sistema deve permitir que o usuário bloqueie um artista para que ele não apareça em recomendações e reproduções automáticas.        | Média      |
| RF16 | Artista | O sistema deve permitir navegar pela discografia do artista, organizada por álbuns, singles, EPs e compilações. | Alta       |
| RF17 | Artista | O sistema deve exibir as músicas curtidas pelo usuário que pertencem ao artista visualizado. | Média      |
| RF18 | Artista | O sistema deve permitir reproduzir somente músicas da discografia do artista selecionado. | Alta       |
| RF19 | Artista | O sistema deve permitir compartilhar o perfil do artista por meio de link ou recurso equivalente.                                     | Média      |
| RF20 | Artista | O sistema deve exibir as informações do artista: nome, descrição, posição em ranking (quando aplicável), número de ouvintes e imagem. | Média      |

---

## 3) Módulo: Álbum

| ID   | Módulo | Requisito Funcional | Prioridade |
| ---- | -------- | ------------------------------------------------------ | ------- |
| RF21 | Álbum  | O sistema deve exibir as informações do álbum: título, artista, data de lançamento, quantidade de músicas, duração total e capa. | Alta       |
| RF22 | Álbum  | O sistema deve exibir a quantidade de reproduções de cada música do álbum, quando essa informação estiver disponível. | Baixa      |
| RF23 | Álbum  | O sistema deve permitir compartilhar um álbum por meio de link ou recurso equivalente. | Média      |
| RF24 | Álbum  | O sistema deve permitir adicionar músicas de um álbum a playlists do usuário. | Alta       |
| RF25 | Álbum  | O sistema deve permitir adicionar um álbum à fila de reprodução. | Alta       |

---

## 4) Módulo: Playlist

| ID   | Módulo   | Requisito Funcional | Prioridade |
| ---- | -------- | ------------------------------------------------------ | ------- |
| RF26 | Playlist | O sistema deve exibir as informações da playlist: título, descrição, criador, quantidade de músicas, capa e visibilidade (pública ou privada). | Alta       |
| RF27 | Playlist | O sistema deve permitir definir se uma playlist será exibida ou ocultada no perfil do usuário. | Média      |
| RF28 | Playlist | O sistema deve permitir adicionar uma playlist inteira à fila de reprodução. | Alta       |
| RF29 | Playlist | O sistema deve permitir adicionar músicas de uma playlist a outra playlist do usuário. | Média      |
| RF30 | Playlist | O sistema deve permitir convidar outros usuários para colaborar em uma playlist. | Média      |
| RF31 | Playlist | O sistema deve permitir compartilhar uma playlist por meio de link ou recurso equivalente. | Média      |
| RF32 | Playlist | O sistema deve permitir ordenar as músicas da playlist por diferentes critérios, como título, artista, data de adição e ordem personalizada.   | Alta       |
| RF33 | Playlist | O sistema deve permitir buscar músicas dentro de uma playlist. | Alta       |
| RF34 | Playlist | O sistema deve exibir a data em que cada música foi adicionada à playlist.                                                                     | Média      |

## Modelo Conceitual dos dados

O modelo conceitual do banco de dados pode ser encontrado [aqui](./diagrama-bd.md);

## Requisitos Não Funcionais

| ID    | Categorias | Requisito Não Funcional | Prioridade |
| ----- | ---------- | -------------------------------------- | ---------- |
| RNF01 | Segurança (Acesso | O sistema deve **possuir autenticação** por usuário e/ou e-mail e senha. | Essencial  |
| RNF02 | Segurança (Dados) | O sistema deve **proteger dados sensíveis** dos usuários. | Essencial  |
| RNF03 | Segurança (Sessão) | O sistema deve **manter sessões autenticadas de forma segura** durante o uso da aplicação. | Importante |
| RNF04 | Desempenho (Reprodução) | O sistema deve **iniciar a reprodução de músicas em tempo aceitável** após a seleção do usuário. | Essencial  |
| RNF05 | Desempenho (Interface) | O sistema deve **responder rapidamente às ações principais** do usuário, como abrir páginas, playlists e músicas. | Essencial  |
| RNF06 | Disponibilidade | O sistema deve **manter os serviços principais disponíveis** durante o uso normal da aplicação. | Importante |
| RNF07 | Usabilidade | O sistema deve **possuir interface simples e intuitiva** para navegação entre músicas, artistas, álbuns e playlists. | Essencial  |
| RNF08 | Usabilidade (Consistência) | O sistema deve **manter padrão visual e de navegação consistente** em todas as telas. | Importante |
| RNF09 | Responsividade | O sistema deve **ser adaptável a diferentes tamanhos de tela**, priorizando uso em desktop e dispositivos móveis.    | Importante |
| RNF10 | Compatibilidade | O sistema deve **funcionar corretamente nos principais navegadores modernos**. | Essencial  |
| RNF11 | Escalabilidade | O sistema deve **permitir expansão futura** de funcionalidades sem necessidade de reestruturação completa. | Importante |
| RNF12 | Manutenibilidade | O sistema deve **ser desenvolvido de forma modular**, facilitando manutenção e evolução. | Essencial  |
| RNF13 | Confiabilidade | O sistema deve **manter integridade das informações** de músicas, playlists, curtidas e histórico do usuário.        | Essencial  |
| RNF14 | Persistência | O sistema deve **armazenar dados do usuário de forma persistente**, preservando informações entre sessões. | Essencial  |
| RNF15 | Portabilidade | O sistema deve **permitir implantação em diferentes ambientes**, como desenvolvimento, teste e produção.             | Importante |
| RNF16 | Observabilidade | O sistema deve **registrar eventos e erros relevantes** para apoio à manutenção e depuração. | Importante |
| RNF17 | Acessibilidade | O sistema deve **oferecer navegação minimamente acessível**, com textos legíveis e elementos identificáveis. | Desejável  |
| RNF18 | Backup e Recuperação | O sistema deve **permitir recuperação de dados importantes** em caso de falha. | Desejável  |

