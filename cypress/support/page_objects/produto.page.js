class ProdutoPage {

  visitarUrl(){
    cy.visit('/minha-conta')

        }
  adicionarProduto(classeProduto, tamanho, cor, quantidade, nomeProduto) {
    cy.visit('/produtos')
    cy.get(`.${classeProduto}`).click()
    cy.get(`.button-variable-item-${tamanho}`).click()
    cy.get(`.button-variable-item-${cor}`).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message').should('contain', `“${nomeProduto}” foi adicionado no seu carrinho.`)
  }

  confirmacaoCarrinho() {
  cy.get('.woocommerce-message > .button').click()

  cy.get('tbody > :nth-child(1) > .product-name')
    .should('contain', 'Abominable Hoodie - XL, Red')

  cy.get('tbody > :nth-child(2) > .product-name')
    .should('contain', 'Aero Daily Fitness Tee - S, Brown')

  cy.get('tbody > :nth-child(3) > .product-name')
    .should('contain', 'Aether Gym Pant - 32, Brown')

  cy.get('tbody > :nth-child(4) > .product-name')
    .should('contain', 'Ajax Full-Zip Sweatshirt - L, Green')

  cy.get('.checkout-button').click()
}

}

export default new ProdutoPage()
