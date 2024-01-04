
describe("home", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit("http://localhost:4200");
  });

  it("no list selected", () => {
    cy.get("p").should(
      "have.text",
      "Keine Liste ausgewählt. Erstellen Sie doch eine neue!"
    );
  });
});
