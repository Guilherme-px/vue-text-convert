describe('Tests for the Header component', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Verifies if the title is displayed correctly', () => {
        cy.get('header h1').should('have.trimmed.text', 'Text Alchemy');
    });

    it('Verifies if the link to the home page is functioning', () => {
        cy.get('[data-testid=link-home]').click();
        cy.location('pathname').should('eq', '/');
    });

    it('Verifies if the link to the "About" page is functioning', () => {
        cy.get('[data-testid=link-about]').click();
        cy.location('pathname').should('eq', '/sobre');
    });

    it('Verifies if the links have the correct base styling classes', () => {
        cy.get('[data-testid=link-home]')
            .should('have.class', 'text-gray-400')
            .and('have.class', 'hover:text-white')
            .and('have.class', 'px-4')
            .and('have.class', 'py-2')
            .and('have.class', 'text-sm');

        cy.get('[data-testid=link-about]')
            .should('have.class', 'text-gray-400')
            .and('have.class', 'hover:text-white')
            .and('have.class', 'px-4')
            .and('have.class', 'py-2')
            .and('have.class', 'text-sm');
    });

    it('Verifies active link styling when route is "/"', () => {
        cy.location('pathname').should('eq', '/');

        cy.get('[data-testid=link-home]')
            .should('have.class', 'text-emerald-400')
            .and('have.class', 'bg-emerald-500/10');

        cy.get('[data-testid=link-about]')
            .should('not.have.class', 'text-emerald-400')
            .and('not.have.class', 'bg-emerald-500/10');
    });

    it('Verifies active link styling when navigating to "/sobre"', () => {
        cy.get('[data-testid=link-about]').click();
        cy.location('pathname').should('eq', '/sobre');

        cy.get('[data-testid=link-about]')
            .should('have.class', 'text-emerald-400')
            .and('have.class', 'bg-emerald-500/10');

        cy.get('[data-testid=link-home]')
            .should('not.have.class', 'text-emerald-400')
            .and('not.have.class', 'bg-emerald-500/10');
    });

    it('Verifies if the links navigate correctly on clicking', () => {
        cy.get('[data-testid=link-about]').click();
        cy.location('pathname').should('eq', '/sobre');

        cy.get('[data-testid=link-home]').click();
        cy.location('pathname').should('eq', '/');
    });
});
