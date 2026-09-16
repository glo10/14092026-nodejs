describe("Testing Homepage", () => {
  beforeEach(() => {
    cy.visit("/"); // Arrange
  });

  it("Should have h1 equals Atelier 4.2 : routes dynamiques", () => {
    // Act et Assert
    cy.get("h1").should("contain.text", "Atelier 4.2 : routes dynamiques");
  });

  it("Should click to /news and follow the link", () => {
    cy.get('a[href="/news"]').click();
    cy.get("h1")
      .should("contain.text", "International")
  });
  
  it("Should have 20 images", () => {
    cy.get('a[href="/news"]').click();
    // cy.wait(2000)
    cy.get("img")
      .should("have.length", 20)
  });
});
