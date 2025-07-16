/// <reference types="cypress" />
const { faker } = require('@faker-js/faker')
import produtoPage from '../support/page_objects/produto.page'
import { produtos } from '../support/data'

describe('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  beforeEach(() => {
    produtoPage.visitarUrl()
  })

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

    //Login e confirmação do usuario
    cy.fixture('perfil').then(login => {
      cy.login(login.usuario, login.senha)

      cy.fixture('usuario').then(usuario => {
        cy.get(usuario.textoElemento).should('contain', usuario.nomeUsuario)
      })
    })

    produtos.forEach(produto => {
      produtoPage.adicionarProduto(
        produto.classe,
        produto.tamanho,
        produto.cor,
        produto.qtd,
        produto.nome
      )
    })

    // Confirmar carrinho e concluir pedido
    produtoPage.confirmacaoCarrinho()
    
    const dadosFake = {
      nome: faker.person.firstName(),
      sobrenome: faker.person.lastName(),
      endereco: faker.location.streetAddress(),
      cidade: faker.location.city(),
      cep: faker.location.zipCode('#####-###'),
      telefone: `1199${faker.number.int({ min: 100000, max: 999999 })}`,
      email: faker.internet.email()
    }

    // Preencher dados no checkout
    cy.checkout(dadosFake)

    // Validação final
    cy.contains(/obrigado.*pedido foi recebido/i, { timeout: 10000 }).should('be.visible')
  })
})
