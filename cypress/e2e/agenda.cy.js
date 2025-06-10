describe('Testes na Agenda de Contatos', () => {
  const url = 'https://agenda-contatos-react.vercel.app/'

  beforeEach(() => {
    cy.visit(url)
  })

  it('Deve adicionar um novo contato', () => {
    cy.get('input[name="name"]').type('João Teste')
    cy.get('input[name="email"]').type('joao@teste.com')
    cy.get('input[name="phone"]').type('11999999999')
    cy.get('button[type="submit"]').click()

    // Verifica se o contato foi adicionado
    cy.contains('João Teste').should('exist')
    cy.contains('joao@teste.com').should('exist')
  })

  it('Deve editar um contato existente', () => {
    // Cria o contato antes de editar
    cy.get('input[name="name"]').type('João Teste')
    cy.get('input[name="email"]').type('joao@teste.com')
    cy.get('input[name="phone"]').type('11999999999')
    cy.get('button[type="submit"]').click()

    // Aguarda o contato aparecer e edita
    cy.contains('João Teste').parent().within(() => {
      cy.contains('Editar').click()
    })

    cy.get('input[name="name"]').clear().type('João Editado')
    cy.get('button[type="submit"]').click()

    cy.contains('João Editado').should('exist')
    cy.contains('João Teste').should('not.exist')
  })

  it('Deve remover um contato', () => {
    // Cria o contato antes de remover
    cy.get('input[name="name"]').type('João Teste')
    cy.get('input[name="email"]').type('joao@teste.com')
    cy.get('input[name="phone"]').type('11999999999')
    cy.get('button[type="submit"]').click()

    // Aguarda o contato aparecer e remove
    cy.contains('João Teste').parent().within(() => {
      cy.contains('Excluir').click()
    })

    cy.contains('João Teste').should('not.exist')
  })
})