# Relatório de Testes de Módulo/Sistema

**Responsabilidade do Testador**

## Legenda

| Campo | Descrição |
|---|---|
| **Teste** | Código ou identificação do teste. |
| **Descrição** | Descrição dos passos e detalhes do teste a ser executado. |
| **Especificação** | Informações sobre a função testada e se ela está de acordo com a especificação do caso de uso. |
| **Resultado** | Resultado do teste, modificações sugeridas ou resultados do teste. No caso de erro ou problema na execução do teste, descrever o erro em detalhes e adicionar prints das telas. |

---

## US001 – Manter Usuário

| Teste | Descrição | Especificação | Resultado |
|---|---|---|---|
| **Teste 01: Incluir Usuário** | **A1 – Incluir Usuário**<br><br>A1.1. O usuário preenche os dados (nome, nome de usuário, senha, email, data de nascimento);<br><br>A1.2. O sistema valida os dados (verifica se estão preenchidos corretamente);<br><br>A1.3. O usuário clica no botão **Criar Conta**;<br><br>A1.4. O sistema envia os dados ao servidor;<br><br>A1.5. O sistema salva os dados;<br><br>A1.6. O sistema retorna a mensagem "Cadastro bem sucedido";<br><br>A1.7. A página sai de registro para login.<br><br>A1.8. Fim do fluxo. | A função implementada segue os passos especificados, incluindo validações e envio ao servidor. | O usuário é criado com sucesso, porém a mensagem não é exibida e não tem redirecionamento para a página de `Login` |
| **Teste 02: Atualizar Usuário** | Testar a atualização parcial de usuário via use case: passar ID e request com novos nome, username e data de nascimento. | A função implementada deve chamar o repositório com os parâmetros corretos, delegando sem alterar os dados. | Teste passou sem problemas: repositório chamado corretamente com ID e request. |
| **Teste 03: Autenticar Usuário** | Testar a autenticação de usuário: verificar retorno de tokens com credenciais válidas, salvamento de refresh token, exceções para usuário não encontrado ou senha inválida, e não geração de tokens sem validação. | A função implementada deve validar credenciais, gerar tokens apenas se válidas, salvar refresh token, e lançar exceções apropriadas para erros. | Todos os testes passaram: tokens retornados corretamente, refresh token salvo, exceções lançadas para credenciais inválidas, e tokens não gerados sem validação. |
| **Teste 04: Atualizar Foto de Perfil do Usuário** | Testar atualização de foto de perfil: sem imagem anterior, removendo imagem anterior, exceções para usuário não encontrado, e propagação de erros no upload ou deleção. | A função implementada deve fazer upload da nova foto, deletar a anterior se existir, atualizar o caminho no repositório, e propagar exceções adequadamente. | Todos os testes passaram: upload e deleção corretos, exceções lançadas para usuário inexistente e erros de upload/deleção. |


---

# Relatório de Bugs e Providências

**Responsabilidade do Gerente**

| Teste | Providência | Tarefas/Tipo |
|---|---|---|
| **Teste 01 – Incluir Usuário** | Corrigir a implementação para exibir a mensagem de sucesso e implementar o redirecionamento para a página de Login após o cadastro. | Tarefa: Bug de Implementação. |
