describe('Insurance Section', () => {
  it('introduce part', () => {
    cy.visit('/');
    cy.viewport(1720, 1000)  
    introduceTask();
  })

  it('introduce part', () => {
    cy.visit('/');
    cy.viewport(1080, 1000);
    introduceTask();
  })
})

describe('Suggest Section', () => {
  it('introduce part', () => {
    cy.visit('/');
    cy.viewport(1720, 1000)  
    suggestTask();
  })

  it('introduce part', () => {
    cy.visit('/');
    cy.viewport(1080, 1000);
    suggestTask();
  })
})

function introduceTask() {
  cy.get('[data-cy="insurance"]:nth-child(1)').click();
  cy.get('[data-cy="product"]:nth-child(1)').click();
  cy.get('main').first().scrollTo('bottom');
  cy.get('[data-cy="accept"]').click();
  cy.get('[data-cy="introduce"]').trigger("mouseover");
  cy.get('[data-cy="dropdown"]').first().click();
}

function suggestTask() {
  cy.visit('http://localhost:8080/#/');
  cy.get('[data-cy="suggest"]:nth-child(1)').first().click();
  cy.get('[data-cy="accept"]').click();
}
