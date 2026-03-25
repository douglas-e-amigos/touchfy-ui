# Ducumento de User Stories

## Descrição

Este documento descreve os User Stories criados a partir da Lista de Casos de Uso. Modelo de documento baseado nas características do processo easYProcess (YP).

## Histórico de revisões

| Data | Versão | Descrição | Autor |
| :--------- | :-----: | :-------------------------------------- | :--------- |
| 24/03/2026 | 0.0.1   | Detalhamento dos User Stories (1 ao 10) de música | Diana |
| 25/03/2026 | 0.0.2   | Adicona tabela de reviões; separa o US03 em dois; leva "reproduzir música" para o US02 | Diana |

### Tabelas de Users Stories
| Nome | Título |
|------|-----------|
| US01 | Reproduzir música e visualizar informações básicas      |
| US02 | Controlar reprodução da música      |
| US03 | Curtir música e acessar músicas curtidas      |
| US04 | Acessar músicas curtidas      |
| US05 | Visualizar créditos da música      |
| US06 | Ocultar música das recomendações e reproduções automáticas      |
| US07 | Compartilhar música      |
| US08 | Adicionar música à playlist e à fila de reprodução      |
| US09 | Reproduzir músicas em ordem aleatória      |
| US10 | Receber recomendações de músicas      |
| US11 | Visualizar letra da música      |

---

### User Story US01 - Visualizar informações básicas (US01)

| **Responsáveis**  |             |
| :---------------- | :---------- |
| **Analista**      | [A definir] |
| **Desenvolvedor** | [A definir] |
| **Revisor**       | [A definir] |
| **Testador**      | [A definir] |

| Campo | Descrição |
| :---| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Título** | Visualizar informações básicas |
| **Story**  | Como **usuário**, eu quero **visualizar suas informações básicas**, para **saber qual música está sendo executada**. |
| **Requisitos Relacionados** | RF02 |
| **Critérios de Aceitação**  | **CA01:** O sistema deve exibir o título da música independente de seu estado (reproduzindo ou não). <br> **CA03:** O sistema deve exibir os artistas da música independente de seu estado. <br> **CA03:** O sistema deve exibir a duração total da música independente de seu estado. |
| **Testes de Aceitação** | **TA01.01:** O título, artista e duração da música deve ser exibido corretamente no player. |
| **Estimativa**              | 8h   |
| **Tempo Real Gasto**        |      |
| **Tamanho Funcional**       | x PF |
| **Prioridade**              | Essencial |
| **Protótipo**               | *(inserir link ou imagem do protótipo)*  |

---

### User Story US02 - Controlar reprodução da música (US02)

| **Responsáveis**  |             |
| :---------------- | :---------- |
| **Analista**      | [A definir] |
| **Desenvolvedor** | [A definir] |
| **Revisor**       | [A definir] |
| **Testador**      | [A definir] |

| Campo                       | Descrição |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Título** | Controlar reprodução da música |
| **Story**  | Como **usuário**, eu quero **controlar a reprodução da música**, para **gerenciar a execução conforme minha preferência**. |
| **Requisitos Relacionados** | RF01, RF12 |
| **Critérios de Aceitação**  | **CA01:** O sistema deve iniciar a reprodução quando o usuário selecionar uma música. <br> **CA02:** O sistema deve permitir pausar e retomar a música em reprodução. <br> **CA03:** O sistema deve permitir avançar para a próxima música da fila. <br> **CA04:** O sistema deve permitir voltar para a música anterior da fila <br> **CA05:** O sistema deve permitir repetir a música atual ou repetir a fila/playlist. |
| **Testes de Aceitação** | **TA02.01:** Ao clicar no play de uma música disponível, a reprodução deve iniciar corretamente. <br> **TA02.02:** Ao clicar em “pausar”, a reprodução deve ser interrompida sem perder a posição atual. <br> **TA02.03:** Ao clicar em “retomar”, a música deve continuar a partir da posição pausada. <br> **TA02.04:** Ao clicar em “avançar”, o sistema deve reproduzir a próxima música disponível. <br> **TA02.05:** Ao clicar em “voltar”, o sistema deve reproduzir a música anterior. <br> **TA02.06:** Ao ativar o modo de repetição, o sistema deve repetir a música atual ou a fila/playlist conforme o modo selecionado. |
| **Estimativa**              | 12h  |
| **Tempo Real Gasto**        |      |
| **Tamanho Funcional**       | x PF |
| **Prioridade**              | Essencial |
| **Protótipo**               | *(inserir link ou imagem do protótipo)*  |

---

### User Story US03 - Curtir música (US03)

| **Responsáveis**  |             |
| :---------------- | :---------- |
| **Analista**      | [A definir] |
| **Desenvolvedor** | [A definir] |
| **Revisor**       | [A definir] |
| **Testador**      | [A definir] |

| Campo    | Descrição   |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Título** | Curtir música |
| **Story**  | Como **usuário**, eu quero **curtir uma música**, para **salvá-la entre minhas preferências.** |
| **Requisitos Relacionados** | RF04 |
| **Critérios de Aceitação**  | **CA01:** O sistema deve permitir que o usuário marque uma música como curtida. <br> **CA02:** O sistema deve registrar a música curtida nas preferências do usuário. <br> **CA03:** O sistema deve indicar visualmente que a música foi curtida. <br> **CA04:** Ao curtir novamente uma música já curtida, o sistema deve remover a marcação de curtida. |
| **Testes de Aceitação**     | **TA03.01:** Ao clicar em “curtir” em uma música não curtida, ela deve ser marcada como curtida. <br> **TA03.02:** Após curtir a música, o sistema deve exibir o estado visual correspondente. <br> **TA03.03:** Ao clicar novamente em “curtir” em uma música já curtida, a marcação deve ser removida. <br> **TA03.04:** Após remover a curtida, o sistema deve atualizar o estado visual da música. |
| **Estimativa**              | 5h   |
| **Tempo Real Gasto**        |      |
| **Tamanho Funcional**       | x PF |
| **Prioridade**              | Essencial |
| **Protótipo**               | *(inserir link ou imagem do protótipo)* |

---
### User Story US04 - Acessar músicas curtidas (US04)

| **Responsáveis**  |             |
| :---------------- | :---------- |
| **Analista**      | [A definir] |
| **Desenvolvedor** | [A definir] |
| **Revisor**       | [A definir] |
| **Testador**      | [A definir] |

| Campo    | Descrição   |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Título** | Acessar músicas curtidas   |
| **Story**  | Como **usuário**, eu quero **acessar minha lista de músicas curtidas**, para **encontrar facilmente as músicas que salvei.** |
| **Requisitos Relacionados** | RF05 |
| **Critérios de Aceitação**  | **CA01:** O sistema deve manter uma lista com as músicas curtidas pelo usuário. <br> **CA02:** O sistema deve permitir que o usuário acesse a lista de músicas curtidas. <br> **CA03:** A lista deve exibir todas as músicas atualmente curtidas pelo usuário. <br> **CA04:** Músicas que tiverem a curtida removida não devem permanecer na lista. |
| **Testes de Aceitação**     | **TA04.01:** Ao acessar a área de músicas curtidas, o sistema deve exibir a lista correspondente. <br> **TA04.02:** A lista deve conter todas as músicas previamente curtidas pelo usuário. <br> **TA04.03:** Após remover a curtida de uma música, ela não deve mais aparecer na lista. <br> **TA04.04:** Caso o usuário não possua músicas curtidas, o sistema deve exibir a lista vazia ou uma mensagem apropriada. |
| **Estimativa**              | 5h   |
| **Tempo Real Gasto**        |      |
| **Tamanho Funcional**       | x PF |
| **Prioridade**              | Essencial |
| **Protótipo**               | *(inserir link ou imagem do protótipo)* |

---

### User Story US05 - Visualizar créditos da música (US05)

| **Responsáveis**  |             |
| :---------------- | :---------- |
| **Analista**      | [A definir] |
| **Desenvolvedor** | [A definir] |
| **Revisor**       | [A definir] |
| **Testador**      | [A definir] |

| Campo                       | Descrição  |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Título** | Visualizar créditos da música |
| **Story**  | Como **usuário**, eu quero **visualizar os créditos de uma música**, para **conhecer os artistas e profissionais envolvidos em sua produção**. |
| **Requisitos Relacionados** | RF03 |
| **Critérios de Aceitação**  | **CA01:** O sistema deve permitir acessar os créditos de uma música. <br> **CA02:** O sistema deve exibir os artistas participantes da música. <br> **CA03:** O sistema deve exibir compositores e produtores, quando essas informações estiverem disponíveis. |
| **Testes de Aceitação**     | **TA04.01:** Ao acessar a opção de créditos, o sistema deve abrir a visualização correspondente. <br> **TA04.02:** Os artistas participantes devem ser exibidos corretamente. <br> **TA04.03:** Quando disponíveis, compositores e produtores devem ser exibidos corretamente. |
| **Estimativa**              | 6h   |
| **Tempo Real Gasto**        |      |
| **Tamanho Funcional**       | x PF |
| **Prioridade**              | Importante |
| **Protótipo**               | *(inserir link ou imagem do protótipo)* |

---

### User Story US06 - Ocultar música das recomendações e reproduções automáticas (US06)

| **Responsáveis**  |             |
| :---------------- | :---------- |
| **Analista**      | [A definir] |
| **Desenvolvedor** | [A definir] |
| **Revisor**       | [A definir] |
| **Testador**      | [A definir] |

| Campo                       | Descrição |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------|
| **Título** | Ocultar música das recomendações e reproduções automáticas |
| **Story** | Como **usuário**, eu quero **ocultar uma música**, para **evitar que ela apareça novamente em recomendações e reproduções automáticas**.  |
| **Requisitos Relacionados** | RF06    |
| **Critérios de Aceitação**  | **CA01:** O sistema deve permitir que o usuário oculte uma música. <br> **CA02:** A música ocultada não deve aparecer nas recomendações do usuário. <br> **CA03:** A música ocultada não deve ser incluída em reproduções automáticas. |
| **Testes de Aceitação**     | **TA05.01:** Ao selecionar a opção “ocultar”, a música deve ser marcada como ocultada para o usuário. <br> **TA05.02:** Após ocultar a música, ela não deve ser exibida nas recomendações. <br> **TA05.03:** Após ocultar a música, ela não deve ser reproduzida automaticamente em filas geradas pelo sistema. |
| **Estimativa**              | 8h   |
| **Tempo Real Gasto**        |      |
| **Tamanho Funcional**       | x PF |
| **Prioridade**              | Importante |
| **Protótipo**               | *(inserir link ou imagem do protótipo)*    |

---

### User Story US07 - Compartilhar música (US07)

| **Responsáveis**  |             |
| :---------------- | :---------- |
| **Analista**      | [A definir] |
| **Desenvolvedor** | [A definir] |
| **Revisor**       | [A definir] |
| **Testador**      | [A definir] |

| Campo                       | Descrição |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Título** | Compartilhar música |
| **Story** | Como **usuário**, eu quero **compartilhar uma música**, para **enviar a faixa para outras pessoas**.  |
| **Requisitos Relacionados** | RF07  |
| **Critérios de Aceitação**  | **CA01:** O sistema deve permitir gerar um link ou recurso equivalente para compartilhamento da música. <br> **CA02:** O link ou recurso gerado deve direcionar corretamente para a música compartilhada. <br> **CA03:** O sistema deve exibir confirmação de que o compartilhamento foi realizado ou que o link foi gerado. |
| **Testes de Aceitação**     | **TA06.01:** Ao selecionar a opção “compartilhar”, o sistema deve gerar um link válido. <br> **TA06.02:** Ao acessar o link gerado, o sistema deve abrir a música correspondente. <br> **TA06.03:** Após gerar o link, o sistema deve informar ao usuário que a ação foi concluída. |
| **Estimativa**              | 5h   |
| **Tempo Real Gasto**        |      |
| **Tamanho Funcional**       | x PF |
| **Prioridade**              | Desejável |
| **Protótipo**               | *(inserir link ou imagem do protótipo)*   |

---

### User Story US08 - Adicionar música à playlist e à fila de reprodução (US08)

| **Responsáveis**  |             |
| :---------------- | :---------- |
| **Analista**      | [A definir] |
| **Desenvolvedor** | [A definir] |
| **Revisor**       | [A definir] |
| **Testador**      | [A definir] |

| Campo                       | Descrição  |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Título** | Adicionar música à playlist e à fila de reprodução  |
| **Story** | Como **usuário**, eu quero **adicionar uma música a uma playlist ou à fila de reprodução**, para **organizar o que quero ouvir agora ou salvar para depois**.  |
| **Requisitos Relacionados** | RF08, RF09  |
| **Critérios de Aceitação**  | **CA01:** O sistema deve permitir adicionar uma música a uma playlist do usuário. <br> **CA02:** O sistema deve permitir adicionar uma música à fila de reprodução atual. <br> **CA03:** Ao adicionar a uma playlist, a música deve ficar disponível na playlist selecionada. <br> **CA04:** Ao adicionar à fila, a música deve ser a próxima da fila de reprodução atual. |
| **Testes de Aceitação**     | **TA07.01:** Ao selecionar “adicionar à playlist”, o sistema deve permitir escolher uma playlist existente. <br> **TA07.02:** Após a confirmação, a música deve aparecer na playlist selecionada. <br> **TA07.03:** Ao selecionar “adicionar à fila”, a música deve ser inserida na fila atual. <br> **TA07.04:** Após a música atual terminar, a música adicionada à fila deve poder ser a próxima reproduzida na fila. |
| **Estimativa**              | 10h  |
| **Tempo Real Gasto**        |      |
| **Tamanho Funcional**       | x PF |
| **Prioridade**              | Essencial |
| **Protótipo**               | *(inserir link ou imagem do protótipo)*   |

---

### User Story US09 - Reproduzir músicas em ordem aleatória (US09)

| **Responsáveis**  |             |
| :---------------- | :---------- |
| **Analista**      | [A definir] |
| **Desenvolvedor** | [A definir] |
| **Revisor**       | [A definir] |
| **Testador**      | [A definir] |

| Campo                       | Descrição   |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Título** | Reproduzir músicas em ordem aleatória  |
| **Story**  | Como **usuário**, eu quero **ativar a reprodução aleatória**, para **ouvir músicas em uma ordem embaralhada**.  |
| **Requisitos Relacionados** | RF11   |
| **Critérios de Aceitação**  | **CA01:** O sistema deve permitir ativar e desativar o modo aleatório. <br> **CA02:** Quando o modo aleatório estiver ativo, as músicas devem ser reproduzidas em ordem embaralhada dentro da playlist atual. <br> **CA03:** O sistema não deve repetir a mesma música antes de percorrer todas as músicas disponíveis na lista, quando possível. |
| **Testes de Aceitação**     | **TA08.01:** Ao ativar o modo aleatório, a ordem de reprodução deve ser alterada em relação à ordem original. <br> **TA08.02:** Ao desativar o modo aleatório, o sistema deve voltar a respeitar a ordem padrão da lista. <br> **TA08.03:** Em uma lista sem repetições, o sistema não deve tocar a mesma música duas vezes antes de concluir o ciclo da lista. <br> **TA08.04:** Uma nova ordem aleatória deve ser gerada sempre que ativar o modo aleatório. |
| **Estimativa**              | 8h   |
| **Tempo Real Gasto**        |      |
| **Tamanho Funcional**       | x PF |
| **Prioridade**              | Importante |
| **Protótipo**               | *(inserir link ou imagem do protótipo)*   |

---

### User Story US10 - Receber recomendações de músicas (US10)

| **Responsáveis**  |             |
| :---------------- | :---------- |
| **Analista**      | [A definir] |
| **Desenvolvedor** | [A definir] |
| **Revisor**       | [A definir] |
| **Testador**      | [A definir] |

| Campo                       | Descrição   |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Título** | Receber recomendações de músicas  |
| **Story**  | Como **usuário**, eu quero **receber recomendações de músicas personalizadas**, para **descobrir faixas que combinam com meu gosto musical**.  |
| **Requisitos Relacionados** | RF10   |
| **Critérios de Aceitação**  | **CA01:** O sistema deve gerar recomendações com base no histórico de reprodução do usuário. <br> **CA02:** O sistema pode considerar músicas curtidas e interações do usuário para compor as recomendações. <br> **CA03:** Quando aplicável, o sistema pode considerar atividades de amigos e artistas seguidos para complementar as recomendações. |
| **Testes de Aceitação**     | **TA09.01:** Após o usuário acumular histórico de reprodução, o sistema deve exibir uma lista de recomendações. <br> **TA09.02:** As recomendações devem refletir artistas, gêneros ou padrões semelhantes aos já consumidos pelo usuário. <br> **TA09.03:** Quando houver integração com amigos, as recomendações podem incluir músicas relacionadas às atividades desses usuários. |
| **Estimativa**              | 16h  |
| **Tempo Real Gasto**        |      |
| **Tamanho Funcional**       | x PF |
| **Prioridade**              | Desejável |
| **Protótipo**               | *(inserir link ou imagem do protótipo)*   |

---

### User Story US11 - Visualizar letra da música (US11)

| **Responsáveis**  |             |
| :---------------- | :---------- |
| **Analista**      | [A definir] |
| **Desenvolvedor** | [A definir] |
| **Revisor**       | [A definir] |
| **Testador**      | [A definir] |

| Campo                       | Descrição    |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Título** | Visualizar letra da música    |
| **Story**  | Como **usuário**, eu quero **visualizar a letra da música durante a reprodução**, para **acompanhar a canção enquanto escuto**.  |
| **Requisitos Relacionados** | RF13    |
| **Critérios de Aceitação**  | **CA01:** O sistema deve permitir abrir a visualização da letra da música em reprodução. <br> **CA02:** O sistema deve sincronizar a letra correspondente à música atual em reprodução, quando disponível. <br> **CA03:** Caso a letra não esteja disponível, o sistema deve informar isso ao usuário. |
| **Testes de Aceitação**     | **TA10.01:** Ao selecionar a opção de letra, o sistema deve abrir a área de visualização da letra. <br> **TA10.02:** Se a música possuir letra cadastrada, ela deve ser exibida corretamente. <br> **TA10.03:** A sequência da letra deve ser sincronizada com a reprodução da música atual. <br> **TA10.03:** Se a música não possuir letra cadastrada, o sistema deve exibir uma mensagem informando indisponibilidade. |
| **Estimativa**              | 6h   |
| **Tempo Real Gasto**        |      |
| **Tamanho Funcional**       | x PF |
| **Prioridade**              | Desejável |
| **Protótipo**               | *(inserir link ou imagem do protótipo)*   |

---
