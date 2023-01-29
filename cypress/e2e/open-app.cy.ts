// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/tv-shows");
    cy.contains("h2", "Shows");
  });
});
