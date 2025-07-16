Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
})

Cypress.Commands.add('checkout', (dadosFake) => {
cy.get('#billing_first_name').clear().type(dadosFake.nome);
cy.get('#billing_last_name').clear().type(dadosFake.sobrenome);
cy.get('#billing_address_1').clear().type(dadosFake.endereco);
cy.get('#billing_city').clear().type(dadosFake.cidade);
cy.get('#billing_postcode').clear().type(dadosFake.cep);
cy.get('#billing_phone').clear().type(dadosFake.telefone);
cy.get('#billing_email').clear().type(dadosFake.email);
cy.get('#terms').click();
cy.get('#place_order').click();
    
})

