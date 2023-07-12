describe('Tests for the "Sobre" view', () => {
    beforeEach(() => {
        cy.visit('/sobre');
    });

    it('Verifies if the title is displayed correctly', () => {
        cy.get('[data-testid=title]').should(($h2) => {
            const actualText = $h2.text().trim();
            const expectedText = 'Sobre o TextAlchemy';
            expect(actualText).to.equal(expectedText);
        });
    });

    it('Verifies if the first paragraph is displayed correctly', () => {
        cy.get('[data-testid=paragraph-1]').should(($p) => {
            const actualText = $p.text().trim();
            const expectedText =
                'Bem-vindo ao TextAlchemy, o seu laboratório de conversão de texto! Aqui, transformamos palavras em ouro, possibilitando a você moldar e personalizar seu texto de maneiras mágicas.';
            expect(actualText).to.equal(expectedText);
        });
    });

    it('Verifies if the second paragraph is displayed correctly', () => {
        cy.get('[data-testid=paragraph-2]').should(($p) => {
            const actualText = $p.text().trim();
            const expectedText =
                'Nossa missão é fornecer uma ferramenta poderosa e fácil de usar, que permita a você converter, modificar e aprimorar seus textos de forma rápida e eficiente. Seja para fins profissionais, acadêmicos ou pessoais, o TextAlchemy oferece uma variedade de recursos para atender às suas necessidades.';
            expect(actualText).to.equal(expectedText);
        });
    });

    it('Verifies if the third paragraph is displayed correctly', () => {
        cy.get('[data-testid=paragraph-3]').should(($p) => {
            const actualText = $p.text().trim();
            const expectedText =
                'Com a nossa ampla gama de ferramentas de conversão, você pode mudar o estilo do texto, converter entre maiúsculas e minúsculas, inverter a ordem das palavras e muito mais. Nossas fórmulas alquímicas exclusivas garantem resultados precisos e confiáveis em cada transformação que você realizar.';
            expect(actualText).to.equal(expectedText);
        });
    });

    it('Verifies if the fourth paragraph is displayed correctly', () => {
        cy.get('[data-testid=paragraph-4]').should(($p) => {
            const actualText = $p.text().trim();
            const expectedText =
                'No TextAlchemy, acreditamos que as palavras têm um poder incrível, e estamos aqui para ajudá-lo a liberar todo esse potencial. Desperte a magia das letras e transforme seus textos em obras-primas com o TextAlchemy.';
            expect(actualText).to.equal(expectedText);
        });
    });

    it('Verifies if the fifth paragraph is displayed correctly', () => {
        cy.get('[data-testid=paragraph-5]').should(($p) => {
            const actualText = $p.text().trim();
            const expectedText =
                'Então, junte-se a nós nesta jornada alquímica do texto. Experimente nossas ferramentas de conversão e deixe sua criatividade fluir. Seja o mestre das palavras com o TextAlchemy.';
            expect(actualText).to.equal(expectedText);
        });
    });
});
