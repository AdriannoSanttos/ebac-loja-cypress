/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/')
  })

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    // Login como cliente
    cy.get('.icon-user-unfollow').click()
    cy.get('#username').type('irmaodojorel@teste.com.br')
    cy.get('#password').type('teste@001')
    cy.get('.woocommerce-form > .button').click()
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, irmaodojorel')

    

    // Produto 1
    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.post-2559').click()
    cy.get('.button-variable-item-S').click()
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
    cy.get('tbody > :nth-child(1) > .product-name').should('contain', 'Abominable Hoodie - S, Red')
    cy.get('tbody > :nth-child(2) > .product-name').should('contain', 'Aero Daily Fitness Tee - S, Brown')
    cy.get('tbody > :nth-child(3) > .product-name').should('contain', 'Aether Gym Pant - 32, Brown')
    cy.get('tbody > :nth-child(4) > .product-name').should('contain', 'Ajax Full-Zip Sweatshirt - L, Green')
    cy.get('.checkout-button').click()
    
    

    // Preencher dados no checkout
    cy.get('#billing_first_name').clear().type('Jorel')
    cy.get('#billing_last_name').clear().type('Irmão')
    cy.get('#billing_address_1').clear().type('Rua do Limoeiro, 123')
    cy.get('#billing_city').clear().type('São Paulo')
    cy.get('#billing_postcode').clear().type('12345-000')
    cy.get('#billing_phone').clear().type('11999999999')
    cy.get('#billing_email').clear().type('irmaodojorel@teste.com.br')
    cy.get('#terms').click()
    cy.get('#place_order').click()

    // Validação final
    cy.contains(/obrigado.*pedido foi recebido/i, { timeout: 10000 }).should('be.visible')


  })
})
