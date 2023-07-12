describe('Tests for the Header component', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Verifies if the title is displayed correctly', () => {
        cy.get('header h1').should('have.text', 'TextAlchemy');
    });

    it('Verifies if the link to the home page is functioning', () => {
        cy.get('[data-testid=link-home]').click();
        cy.url().should('include', '/');
    });

    it('Verifies if the link to the "About" page is functioning', () => {
        cy.get('[data-testid=link-about]').click();
        cy.url().should('include', '/sobre');
    });

    it('Verifies if the links have the correct styling', () => {
        cy.get('[data-testid=link-home]').should('have.class', 'text-font-color');
        cy.get('[data-testid=link-about]').should('have.class', 'text-font-color');
    });

    it('Verifies if the links change style on hover', () => {
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.get('[data-testid=link-home]')
            .trigger('mouseover')
            .should('have.class', 'hover:text-light-green');
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.get('[data-testid=link-about]')
            .trigger('mouseover')
            .should('have.class', 'hover:text-light-green');
    });

    it('Verifies if the links navigate correctly on clicking', () => {
        cy.get('[data-testid=link-home]').click();
        cy.go('forward');
        cy.get('[data-testid=link-about]').click();
    });
});
