/// <reference types="cypress" />
const { faker } = require('@faker-js/faker')

describe('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  beforeEach(() => {
    cy.visit('minha-conta')
  })

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    // Login como cliente
    cy.fixture('perfil').then(login =>{
    cy.login(login.usuario, login.senha)
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, irmaodojorel')
})
    

    // Produto 1
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.post-2559').click()
    cy.get('.button-variable-item-XL').click()
    cy.get('.button-variable-item-Red').click()
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message').should('contain', '“Abominable Hoodie” foi adicionado no seu carrinho.')

    // Produto 2
    cy.visit('/produtos')
    cy.get('.post-3111').click()
    cy.get('.button-variable-item-S').click()
    cy.get('.button-variable-item-Brown').click()
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message').should('contain', '“Aero Daily Fitness Tee” foi adicionado no seu carrinho.')

    // Produto 3
    cy.visit('/produtos')
    cy.get('.post-3073').click()
    cy.get('.button-variable-item-32').click()
    cy.get('.button-variable-item-Brown').click()
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message').should('contain', '“Aether Gym Pant” foi adicionado no seu carrinho.')

    // Produto 4
    cy.visit('/produtos')
    cy.get('.post-2622').click()
    cy.get('.button-variable-item-L').click()
    cy.get('.button-variable-item-Green').click()
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message').should('contain', '“Ajax Full-Zip Sweatshirt” foi adicionado no seu carrinho.')

    // Ver carrinho e finalizar pedido
    cy.get('.woocommerce-message > .button').click()
    cy.get('tbody > :nth-child(1) > .product-name').should('contain', 'Abominable Hoodie - XL, Red')
    cy.get('tbody > :nth-child(2) > .product-name').should('contain', 'Aero Daily Fitness Tee - S, Brown')
    cy.get('tbody > :nth-child(3) > .product-name').should('contain', 'Aether Gym Pant - 32, Brown')
    cy.get('tbody > :nth-child(4) > .product-name').should('contain', 'Ajax Full-Zip Sweatshirt - L, Green')
    cy.get('.checkout-button').click()  
    
const dadosFake = {
  nome: faker.person.firstName(),
  sobrenome: faker.person.lastName(),
  endereco: faker.location.streetAddress(),
  cidade: faker.location.city(),
  cep: faker.location.zipCode('#####-###'),
  telefone: faker.phone.number('1199#######'),
  email: faker.internet.email()
}

    // Preencher dados no checkout
    cy.checkout(dadosFake)


    // Validação final
    cy.contains(/obrigado.*pedido foi recebido/i, { timeout: 10000 }).should('be.visible')


  })
})
