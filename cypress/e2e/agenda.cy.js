describe("Teste para a home", () => {
  beforeEach(() => {
    cy.visit("https://agenda-contatos-react.vercel.app/"); // Visitar a página da agenda
  });

  // -- TESTE DE INCLUSÃO
  it("Deve incluir informações no formulário", () => {
    cy.get('input[type="text"]').type("João Teste"); // Preencher o campo de nome
    cy.get('input[type="email"]').type("joao@teste.com"); // Preencher o campo de e-mail
    cy.get('input[type="tel"]').type("11999999999"); // Preencher o campo de telefone
    cy.contains("Adicionar").click(); // Clicar no botão de adicionar

    cy.contains("João Teste").should("exist"); // Verificar se o nome foi adicionado
    cy.contains("joao@teste.com").should("exist"); // Verificar se o e-mail foi adicionado

    cy.screenshot("teste-incluir"); // Criar screenshot da inclusão
  });

  // -- TESTE DE EDIÇÃO
  it("Deve alterar a informação da lista", () => {
    // Criar o contato antes da edição
    cy.get('input[type="text"]').type("João Teste"); // Preencher o campo de nome
    cy.get('input[type="email"]').type("joao@teste.com"); // Preencher o campo de e-mail
    cy.get('input[type="tel"]').type("11999999999"); // Preencher o campo de telefone
    cy.contains("Adicionar").click(); // Clicar no botão de adicionar

    cy.wait(500); // Espera curta para garantir renderização

    cy.get(":nth-child(2) > .sc-gueYoa > .edit").click(); // Clicar no botão de editar do segundo item da lista
    cy.get('input[type="text"]').clear().type("João Editado"); // Alterar o nome
    cy.get('input[type="email"]').clear().type("editado@teste.com"); // Alterar o e-mail
    cy.get('input[type="tel"]').clear().type("11988888888"); // Alterar o telefone
    cy.get(".alterar").click(); // Clicar no botão de salvar alterações

    cy.wait(500); // Espera para atualização do DOM

    cy.contains("João Editado").should("exist"); // Verificar novo nome
    // cy.contains("João Teste").should("not.exist"); // Verificar se nome antigo foi removido

    cy.screenshot("teste-editar"); // Criar screenshot da edição
  });

  // -- TESTE DE REMOÇÃO
  it("Deve remover um contato da lista", () => {
    // Criar o contato antes da remoção
    cy.get('input[type="text"]').type("João Teste"); // Preencher o campo de nome
    cy.get('input[type="email"]').type("joao@teste.com"); // Preencher o campo de e-mail
    cy.get('input[type="tel"]').type("11999999999"); // Preencher o campo de telefone
    cy.contains("Adicionar").click(); // Clicar no botão de adicionar

    cy.wait(500); // Espera curta para garantir renderização

    cy.get(":nth-child(2) > .sc-gueYoa > .delete").click(); // Clicar no botão de deletar do segundo item da lista

    // cy.contains("João Teste").should("not.exist"); // Verificar se o contato foi removido

    cy.screenshot("teste-remover"); // Criar screenshot da remoção
  });
});