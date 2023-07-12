describe('Tests for the Footer component', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Verifies if the Instagram link opens in a new tab', () => {
        cy.get('[data-testid=link-insta]').should('have.attr', 'target', '_blank');
    });

    it('Verifies if the LinkedIn link opens in a new tab', () => {
        cy.get('[data-testid=link-linkedin]').should('have.attr', 'target', '_blank');
    });

    it('Verifies if the GitHub link opens in a new tab', () => {
        cy.get('[data-testid=link-github]').should('have.attr', 'target', '_blank');
    });

    it('Verifies if the Instagram link has the correct URL', () => {
        cy.get('[data-testid=link-insta]').should(
            'have.attr',
            'href',
            'https://www.instagram.com/guilherme_jsx/'
        );
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

    it('Verifies if the developer text is displayed correctly', () => {
        cy.get('[data-testid=text-dev]').should(($p) => {
            const actualText = $p.text().trim();
            const expectedText = 'Desenvolvido por: Guilherme Augusto';
            expect(actualText).to.equal(expectedText);
        });
    });

    it('Verifies if the copyright text is displayed correctly', () => {
        cy.get('[data-testid=text-copy]').should(($p) => {
            const actualText = $p.text().trim();
            const expectedText = '© 2023 Todos os direitos reservados';
            expect(actualText).to.equal(expectedText);
        });
    });
});
