describe('Home', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('capitalizes first letters when "Primeiras Maiúsculas" is clicked', () => {
        cy.get('[data-testid="text-input"]').type('hello world');
        cy.get('[data-testid="btn-capitalizerFirst"]').click();
        cy.get('[data-testid="text-output"]').should('have.value', 'Hello World');
    });

    it('converts text to binary (with spaces between bytes) when "Converter para Binário" is clicked', () => {
        cy.get('[data-testid="text-input"]').type('Hello');
        cy.get('[data-testid="btn-textToBinary"]').click();

        cy.get('[data-testid="text-output"]').should(
            'have.value',
            '01001000 01100101 01101100 01101100 01101111'
        );
    });

    it('converts text to lowercase when "Todas Minúsculas" is clicked', () => {
        cy.get('[data-testid="text-input"]').type('Hello World');
        cy.get('[data-testid="btn-lowerCase"]').click();
        cy.get('[data-testid="text-output"]').should('have.value', 'hello world');
    });

    it('creates hashtags when "Criador de Hashtag" is clicked', () => {
        cy.get('[data-testid="text-input"]').type('Hello World');
        cy.get('[data-testid="btn-hashtagsCreator"]').click();
        cy.get('[data-testid="text-output"]').should('have.value', '#Hello #World');
    });

    it('reverses text when "Inverter Texto" is clicked', () => {
        cy.get('[data-testid="text-input"]').type('Hello World');
        cy.get('[data-testid="btn-reverseText"]').click();
        cy.get('[data-testid="text-output"]').should('have.value', 'dlroW olleH');
    });

    it('clears input and output when "Limpar" is clicked', () => {
        cy.get('[data-testid="text-input"]').type('Hello World');
        cy.get('[data-testid="btn-clear"]').click();
        cy.get('[data-testid="text-input"]').should('have.value', '');
        cy.get('[data-testid="text-output"]').should('have.value', '');
    });

    it('shows the correct letter count (ignoring spaces and line breaks)', () => {
        cy.get('[data-testid="text-input"]').type('Hello World');
        cy.get('[data-testid="letter-count"]').should('have.text', '10'); // "HelloWorld" = 10
    });

    it('shows the correct word count', () => {
        cy.get('[data-testid="text-input"]').type('Hello World');
        cy.get('[data-testid="words-count"]').should('have.text', '2');
    });

    it('auto-converts while typing after a tool is activated (uppercase)', () => {
        cy.get('[data-testid="btn-allCapitalizer"]').click();

        cy.get('[data-testid="text-input"]').type('hello');
        cy.get('[data-testid="text-output"]').should('have.value', 'HELLO');

        cy.get('[data-testid="text-input"]').type(' world');
        cy.get('[data-testid="text-output"]').should('have.value', 'HELLO WORLD');
    });

    it('copies converted text to clipboard when "Copiar" is clicked', () => {
        cy.window().then((win) => {
            cy.stub(win.navigator.clipboard, 'writeText').as('writeText');
        });

        cy.get('[data-testid="text-input"]').type('Hello World');
        cy.get('[data-testid="btn-allCapitalizer"]').click();
        cy.get('[data-testid="btn-copy"]').click();

        cy.get('@writeText').should('have.been.calledOnceWith', 'HELLO WORLD');
    });
});
