/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('http://lojaebac.ebaconline.art.br/')
  })

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      //Login como cliente

     cy.get('.icon-user-unfollow').click()
     cy.get('#username').type('irmaodojorel@teste.com.br')
     cy.get('#password').type('teste@001')
     cy.get('.woocommerce-form > .button').click()
     cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, irmaodojorel')

     // Escolher 4 produtos e adicionar ao carrinho

     //primeiro produto 
     cy.get('#primary-menu > .menu-item-629 > a').click()
     cy.get('.post-2559').click()
     cy.get('.button-variable-item-S').click()
     cy.get('.button-variable-item-Red').click()
     cy.get('.single_add_to_cart_button').click()
     cy.get('.woocommerce-message').should('contain', '“Abominable Hoodie” foi adicionado no seu carrinho.')

     //segundo produto 
     cy.visit('/produtos')
     cy.get('.post-3111').click()
     cy.get('.button-variable-item-S').click()
     cy.get('.button-variable-item-Brown').click()
     cy.get('.single_add_to_cart_button').click()
     cy.get('.woocommerce-message').should('contain', '“Aero Daily Fitness Tee” foi adicionado no seu carrinho.')
     
     //terceiro produto 
     cy.visit('/produtos')
     cy.get('.post-3073 ').click()
     cy.get('.button-variable-item-32').click()
     cy.get('.button-variable-item-Brown').click()
     cy.get('.single_add_to_cart_button').click()
     cy.get('.woocommerce-message').should('contain', '“Aether Gym Pant” foi adicionado no seu carrinho.')

      //quarto produto 
     cy.visit('/produtos')
     cy.get('.post-2622').click()
     cy.get('.button-variable-item-L').click()
     cy.get('.button-variable-item-Green').click()
     cy.get('.single_add_to_cart_button').click()
     cy.get('.woocommerce-message').should('contain', '“Ajax Full-Zip Sweatshirt” foi adicionado no seu carrinho.')
     





      
  })


})