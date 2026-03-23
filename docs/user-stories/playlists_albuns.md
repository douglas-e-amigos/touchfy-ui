### User Story US01 - Criar playlist

| 📌 User Story - US01 | Criar playlist |
|---------------------|--|
| *Título* | Criar uma nova playlist |
| *Identificação* | US01 - Criar playlist |
| *Story* | Como usuário, quero criar uma nova playlist informando um nome, opcionalmente uma descrição e definindo sua visibilidade, para organizar minhas músicas. |
| *Requisitos Relacionados* | RF01 |
| *Critérios de Aceitação* | - **Dado** que estou autenticado, **quando** acesso a tela de criação de playlist, **então** devo conseguir informar o nome, uma descrição opcional e definir a visibilidade (pública ou privada).<br><br>- **Dado** que informo um nome válido, **quando** confirmo a criação, **então** a playlist deve ser criada com sucesso.<br><br>- **Dado** que não informo um nome, **quando** tento criar a playlist, **então** o sistema deve exibir uma mensagem de erro.<br><br>- **Dado** que informo uma descrição, **quando** a playlist é criada, **então** a descrição deve ser salva corretamente.<br><br>- **Dado** que seleciono uma visibilidade, **quando** a playlist é criada, **então** ela deve respeitar a configuração escolhida. |
| *Testes de Aceitação* | <ol><li><strong>TA01.01 - Criação de playlist com dados válidos.</strong><ol><li>Acessar a tela de criação de playlist</li><li>Preencher o campo nome com um valor válido</li><li>Preencher o campo descrição (opcional)</li><li>Selecionar visibilidade pública</li><li>Clicar em criar playlist</li><li>Verificar que o sistema cria a playlist com sucesso</li><li>Verificar que a playlist aparece na lista do usuário</li><li>Verificar que a visibilidade está definida como pública</li></ol></li><li><strong>TA01.02 - Criação de playlist sem descrição.</strong><ol><li>Acessar a tela de criação de playlist</li><li>Preencher o campo nome com um valor válido</li><li>Deixar o campo descrição vazio</li><li>Selecionar visibilidade privada</li><li>Clicar em criar playlist</li><li>Verificar que o sistema cria a playlist com sucesso</li><li>Verificar que a playlist aparece na lista do usuário</li><li>Verificar que a visibilidade está definida como privada</li></ol></li><li><strong>TA01.03 - Nome da playlist não informado.</strong><ol><li>Acessar a tela de criação de playlist</li><li>Deixar o campo nome vazio</li><li>Preencher os demais campos corretamente</li><li>Tentar criar a playlist</li><li>Verificar que o sistema não permite a criação</li><li>Forçar o envio (ex: via requisição manual)</li><li>Verificar que o sistema exibe mensagem de erro</li><li>Verificar que a playlist não foi criada</li></ol></li><li><strong>TA01.04 - Persistência da descrição.</strong><ol><li>Acessar a tela de criação de playlist</li><li>Preencher o campo nome com um valor válido</li><li>Preencher o campo descrição</li><li>Selecionar visibilidade pública</li><li>Criar a playlist</li><li>Acessar a playlist criada</li><li>Verificar que a descrição exibida é igual à informada</li></ol></li><li><strong>TA01.05 - Persistência da visibilidade.</strong><ol><li>Acessar a tela de criação de playlist</li><li>Preencher o campo nome com um valor válido</li><li>Selecionar visibilidade privada</li><li>Criar a playlist</li><li>Acessar a playlist criada</li><li>Verificar que a playlist está configurada como privada</li><li>Verificar que outros usuários não conseguem visualizar a playlist</li></ol></li></ol> |
| *Estimativa* |  |
| *Tempo Real Gasto* |  |
| *Tamanho Funcional* |  |
| *Prioridade* | Essencial |
| *Responsáveis* | - *Analista:* Paulo Douglas<br>- *Desenvolvedor:* <br>- *Revisor:* <br>- *Testador:*  |
| *Protótipo* |  |

### User Story US02 - Editar playlist

| 📌 User Story - US02 | Editar playlist |
|---------------------|--|
| *Título* | Editar uma playlist existente |
| *Identificação* | US02 - Editar playlist |
| *Story* | Como usuário, quero editar o nome, a descrição e a visibilidade de uma playlist para mantê-la atualizada. |
| *Requisitos Relacionados* | RF02 |
| *Critérios de Aceitação* | - **Dado** que estou autenticado, **quando** acesso uma playlist de minha autoria, **então** devo conseguir editar suas informações.<br><br>- **Dado** que altero o nome da playlist, **quando** salvo as alterações, **então** o novo nome deve ser atualizado corretamente.<br><br>- **Dado** que altero a descrição, **quando** salvo as alterações, **então** a nova descrição deve ser persistida corretamente.<br><br>- **Dado** que altero a visibilidade, **quando** salvo as alterações, **então** a playlist deve respeitar a nova configuração.<br><br>- **Dado** que não informo um nome válido, **quando** tento salvar, **então** o sistema deve exibir uma mensagem de erro.<br><br>- **Dado** que não sou o dono da playlist, **quando** tento editar, **então** o sistema deve impedir a ação. |
| *Testes de Aceitação* | <ol><li><strong>TA02.01 - Edição de playlist com dados válidos.</strong><ol><li>Acessar uma playlist criada pelo usuário</li><li>Clicar na opção de editar playlist</li><li>Alterar o nome da playlist</li><li>Alterar a descrição</li><li>Alterar a visibilidade</li><li>Salvar alterações</li><li>Verificar que o sistema atualiza os dados com sucesso</li><li>Verificar que as alterações são refletidas na interface</li></ol></li><li><strong>TA02.02 - Alteração apenas do nome.</strong><ol><li>Acessar uma playlist criada pelo usuário</li><li>Clicar em editar playlist</li><li>Alterar apenas o nome</li><li>Salvar alterações</li><li>Verificar que o nome foi atualizado corretamente</li></ol></li><li><strong>TA02.03 - Nome não informado.</strong><ol><li>Acessar uma playlist criada pelo usuário</li><li>Clicar em editar playlist</li><li>Remover o nome da playlist</li><li>Tentar salvar alterações</li><li>Verificar que o sistema não permite salvar</li><li>Forçar o envio (ex: via requisição manual)</li><li>Verificar que o sistema exibe mensagem de erro</li><li>Verificar que os dados não foram alterados</li></ol></li><li><strong>TA02.04 - Alteração de visibilidade.</strong><ol><li>Acessar uma playlist criada pelo usuário</li><li>Clicar em editar playlist</li><li>Alterar visibilidade de pública para privada</li><li>Salvar alterações</li><li>Verificar que a playlist está privada</li><li>Verificar que outros usuários não conseguem acessá-la</li></ol></li><li><strong>TA02.05 - Usuário não autorizado tenta editar.</strong><ol><li>Acessar uma playlist de outro usuário</li><li>Tentar acessar a opção de edição</li><li>Verificar que o sistema bloqueia a ação</li><li>Forçar requisição de edição manual</li><li>Verificar que o sistema retorna erro de autorização</li></ol></li></ol> |
| *Estimativa* |  |
| *Tempo Real Gasto* |  |
| *Tamanho Funcional* |  |
| *Prioridade* | Essencial |
| *Responsáveis* | - *Analista:* Paulo Douglas<br>- *Desenvolvedor:* <br>- *Revisor:* <br>- *Testador:*  |
| *Protótipo* |  |

### User Story US03 - Excluir playlist

| 📌 User Story - US03 | Excluir playlist |
|---------------------|--|
| *Título* | Excluir uma playlist |
| *Identificação* | US03 - Excluir playlist |
| *Story* | Como usuário, quero excluir uma playlist para remover conteúdos que não desejo mais. |
| *Requisitos Relacionados* | RF03 |
| *Critérios de Aceitação* | - **Dado** que estou autenticado, **quando** acesso uma playlist de minha autoria, **então** devo conseguir excluí-la.<br><br>- **Dado** que confirmo a exclusão, **quando** a ação é realizada, **então** a playlist deve ser removida com sucesso.<br><br>- **Dado** que excluo uma playlist, **quando** acesso minha lista de playlists, **então** ela não deve mais aparecer.<br><br>- **Dado** que não confirmo a exclusão, **quando** cancelo a ação, **então** a playlist deve permanecer intacta.<br><br>- **Dado** que não sou o dono da playlist, **quando** tento excluí-la, **então** o sistema deve impedir a ação. |
| *Testes de Aceitação* | <ol><li><strong>TA03.01 - Exclusão de playlist com confirmação.</strong><ol><li>Acessar uma playlist do usuário</li><li>Clicar na opção de excluir</li><li>Confirmar a exclusão</li><li>Verificar que o sistema remove a playlist</li><li>Verificar que a playlist não aparece mais na lista do usuário</li></ol></li><li><strong>TA03.02 - Cancelamento da exclusão.</strong><ol><li>Acessar uma playlist do usuário</li><li>Clicar em excluir</li><li>Cancelar a ação</li><li>Verificar que a playlist continua existente</li></ol></li><li><strong>TA03.03 - Usuário não autorizado tenta excluir.</strong><ol><li>Acessar playlist de outro usuário</li><li>Tentar excluir a playlist</li><li>Verificar que o sistema bloqueia a ação</li><li>Forçar requisição manual</li><li>Verificar erro de autorização</li></ol></li><li><strong>TA03.04 - Persistência da exclusão.</strong><ol><li>Excluir uma playlist</li><li>Atualizar a página</li><li>Verificar que a playlist continua inexistente</li></ol></li></ol> |
| *Estimativa* |  |
| *Tempo Real Gasto* |  |
| *Tamanho Funcional* |  |
| *Prioridade* | Essencial |
| *Responsáveis* | - *Analista:* Paulo Douglas<br>- *Desenvolvedor:* <br>- *Revisor:* <br>- *Testador:*  |
| *Protótipo* |  |