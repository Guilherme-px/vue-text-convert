import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AboutView from '../AboutView.vue';

describe('AppAbout', () => {
    it('renders the component', () => {
        const wrapper = mount(AboutView);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders the correct title', () => {
        const wrapper = mount(AboutView);
        const title = wrapper.find('[data-testid="title"]');
        expect(title.text()).toBe('Sobre o TextAlchemy');
    });

    it('renders the correct number of paragraphs', () => {
        const wrapper = mount(AboutView);
        const paragraphs = wrapper.findAll('[data-testid^="paragraph-"]');
        expect(paragraphs.length).toBe(5);
    });

    it('renders the first paragraph correctly', () => {
        const wrapper = mount(AboutView);
        const firstParagraph = wrapper.find('[data-testid="paragraph-1"]');
        expect(firstParagraph.text()).toContain(
            'Bem-vindo ao TextAlchemy, o seu laboratório de conversão de texto! Aqui, transformamos palavras em ouro, possibilitando a você moldar e personalizar seu texto de maneiras mágicas.'
        );
    });

    it('renders the second paragraph correctly', () => {
        const wrapper = mount(AboutView);
        const firstParagraph = wrapper.find('[data-testid="paragraph-2"]');
        expect(firstParagraph.text()).toContain(
            'Nossa missão é fornecer uma ferramenta poderosa e fácil de usar, que permita a você converter, modificar e aprimorar seus textos de forma rápida e eficiente. Seja para fins profissionais, acadêmicos ou pessoais, o TextAlchemy oferece uma variedade de recursos para atender às suas necessidades.'
        );
    });

    it('renders the third paragraph correctly', () => {
        const wrapper = mount(AboutView);
        const firstParagraph = wrapper.find('[data-testid="paragraph-3"]');
        expect(firstParagraph.text()).toContain(
            'Com a nossa ampla gama de ferramentas de conversão, você pode mudar o estilo do texto, converter entre maiúsculas e minúsculas, inverter a ordem das palavras e muito mais. Nossas fórmulas alquímicas exclusivas garantem resultados precisos e confiáveis em cada transformação que você realizar.'
        );
    });

    it('renders the fourth paragraph correctly', () => {
        const wrapper = mount(AboutView);
        const firstParagraph = wrapper.find('[data-testid="paragraph-4"]');
        expect(firstParagraph.text()).toContain(
            'No TextAlchemy, acreditamos que as palavras têm um poder incrível, e estamos aqui para ajudá-lo a liberar todo esse potencial. Desperte a magia das letras e transforme seus textos em obras-primas com o TextAlchemy.'
        );
    });

    it('renders the fifth paragraph correctly', () => {
        const wrapper = mount(AboutView);
        const firstParagraph = wrapper.find('[data-testid="paragraph-5"]');
        expect(firstParagraph.text()).toContain(
            'Então, junte-se a nós nesta jornada alquímica do texto. Experimente nossas ferramentas de conversão e deixe sua criatividade fluir. Seja o mestre das palavras com o TextAlchemy.'
        );
    });

    it('has the correct title style', () => {
        const wrapper = mount(AboutView);
        const title = wrapper.find('[data-testid="title"]');
        expect(title.classes()).toContain('text-3xl');
        expect(title.classes()).toContain('leading-9');
        expect(title.classes()).toContain('font-semibold');
        expect(title.classes()).toContain('text-font-color');
        expect(title.classes()).toContain('mb-6');
    });

    it('has the correct separator style', () => {
        const wrapper = mount(AboutView);
        const separator = wrapper.find('.border-b');
        expect(separator.classes()).toContain('border-light-green');
        expect(separator.classes()).toContain('mb-10');
        expect(separator.classes()).toContain('mt-1');
        expect(separator.classes()).toContain('w-72');
    });

    it('has the correct paragraph styles', () => {
        const wrapper = mount(AboutView);
        const paragraphs = wrapper.findAll('[data-testid^="paragraph-"]');

        paragraphs.forEach((paragraph, index) => {
            expect(paragraph.classes()).toContain('text-lg');
            expect(paragraph.classes()).toContain('leading-7');
            expect(paragraph.classes()).toContain('text-font-color');

            if (index !== 0) {
                expect(paragraph.classes()).toContain('mt-4');
            }
        });
    });
});
