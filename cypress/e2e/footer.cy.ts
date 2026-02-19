describe('Tests for the Footer component', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Verifies if the LinkedIn link opens in a new tab', () => {
        cy.get('[data-testid=link-linkedin]').should('have.attr', 'target', '_blank');
    });

    it('Verifies if the GitHub link opens in a new tab', () => {
        cy.get('[data-testid=link-github]').should('have.attr', 'target', '_blank');
    });

    it('Verifies if the LinkedIn link has the correct URL', () => {
        cy.get('[data-testid=link-linkedin]').should(
            'have.attr',
            'href',
            'https://www.linkedin.com/in/guilherme-augusto-da-silva/'
        );
    });

    it('Verifies if the GitHub link has the correct URL', () => {
        cy.get('[data-testid=link-github]').should(
            'have.attr',
            'href',
            'https://github.com/Guilherme-px'
        );
    });

    it('Verifies if the links include safe rel attributes', () => {
        cy.get('[data-testid=link-linkedin]')
            .should('have.attr', 'rel')
            .and('include', 'noopener')
            .and('include', 'noreferrer');

        cy.get('[data-testid=link-github]')
            .should('have.attr', 'rel')
            .and('include', 'noopener')
            .and('include', 'noreferrer');
    });

    it('Verifies if the developer text is displayed correctly', () => {
        cy.get('[data-testid=text-dev]')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.eq('Desenvolvido por Guilherme Augusto');
            });
    });

    it('Verifies if the copyright text is displayed correctly', () => {
        cy.get('[data-testid=text-copy]').should(
            'contain.text',
            '© 2023 Todos os direitos reservados'
        );
    });

    it('Verifies if the social links have base styling classes', () => {
        cy.get('[data-testid=link-linkedin]')
            .should('have.class', 'rounded-full')
            .and('have.class', 'text-gray-400')
            .and('have.class', 'hover:text-white');

        cy.get('[data-testid=link-github]')
            .should('have.class', 'rounded-full')
            .and('have.class', 'text-gray-400')
            .and('have.class', 'hover:text-white');
    });
});
