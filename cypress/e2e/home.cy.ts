describe('Home', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should capitalize first letters when "Primeiras Maiúsculas" button is clicked', () => {
        const inputText = 'hello world';
        const expectedOutput = 'Hello World';
        cy.get('[data-testid="text-input"]').type(inputText);
        cy.get('[data-testid="btn-capitalizerFirst"]').click();
        cy.get('[data-testid="text-output"]').should('have.value', expectedOutput);
    });

    it('should convert text to binary when "Converter para binário" button is clicked', () => {
        const inputText = 'Hello';
        const expectedOutput = '0100100001100101011011000110110001101111';
        cy.get('[data-testid="text-input"]').type(inputText);
        cy.get('[data-testid="btn-textToBinary"]').click();
        cy.get('[data-testid="text-output"]').should('have.value', expectedOutput);
    });

    it('should convert text to lowercase when "Todas minúsculas" button is clicked', () => {
        const inputText = 'Hello World';
        const expectedOutput = 'hello world';
        cy.get('[data-testid="text-input"]').type(inputText);
        cy.get('[data-testid="btn-lowerCase"]').click();
        cy.get('[data-testid="text-output"]').should('have.value', expectedOutput);
    });

    it('should create hashtags when "Criador de hashtag" button is clicked', () => {
        const inputText = 'Hello World';
        const expectedOutput = '#Hello #World';
        cy.get('[data-testid="text-input"]').type(inputText);
        cy.get('[data-testid="btn-hashtagsCreator"]').click();
        cy.get('[data-testid="text-output"]').should('have.value', expectedOutput);
    });

    it('should reverse the input text when "Inverter texto" button is clicked', () => {
        const inputText = 'Hello World';
        const expectedOutput = 'dlroW olleH';
        cy.get('[data-testid="text-input"]').type(inputText);
        cy.get('[data-testid="btn-reverseText"]').click();
        cy.get('[data-testid="text-output"]').should('have.value', expectedOutput);
    });

    it('should clear the input and output text when "Limpar" button is clicked', () => {
        const inputText = 'Hello World';
        cy.get('[data-testid="text-input"]').type(inputText);
        cy.get('[data-testid="btn-clear"]').click();
        cy.get('[data-testid="text-input"]').should('have.value', '');
        cy.get('[data-testid="text-output"]').should('have.value', '');
    });

    it('should display the total number of letters in the input text', () => {
        const inputText = 'Hello World';
        const expectedLetterCount = inputText.length.toString();
        cy.get('[data-testid="text-input"]').type(inputText);
        cy.get('[data-testid="letter-count"]').should('have.text', expectedLetterCount);
    });

    it('should display the total number of words in the input text', () => {
        const inputText = 'Hello World';
        const expectedWordCount = '2';
        cy.get('[data-testid="text-input"]').type(inputText);
        cy.get('[data-testid="words-count"]').should('have.text', expectedWordCount);
    });

    it('should copy the converted text to the clipboard when "Copiar" button is clicked', () => {
        const inputText = 'Hello World';
        const expectedOutput = 'HELLO WORLD';
        cy.get('[data-testid="text-input"]').type(inputText);
        cy.get('[data-testid="btn-allCapitalizer"]').click();
        cy.get('[data-testid="btn-copy"]').click();

        cy.window().then((win) => {
            cy.stub(win.navigator.clipboard, 'writeText').callsFake((text) => {
                expect(text).to.equal(expectedOutput);
            });
        });
    });
});
