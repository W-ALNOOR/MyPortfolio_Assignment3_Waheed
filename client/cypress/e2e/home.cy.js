describe("Home Page Navigation", () => {
  it("loads homepage and navigates to About page", () => {
    cy.visit("http://localhost:5173"); // or your Render/Netlify URL

    cy.contains("Learn More About Me").click();

    cy.url().should("include", "/about");
  });
});
