import { shallowMount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Home from '@/views/HomeView.vue';

describe('Home', () => {
    it('should render the component correctly', () => {
        const wrapper = shallowMount(Home);
        expect(wrapper.exists()).toBe(true);
    });

    it('should contain the textInput and textOutput textareas', () => {
        const wrapper = shallowMount(Home);

        const textInput = wrapper.find('[data-testid="text-input"]');
        const textOutput = wrapper.find('[data-testid="text-output"]');
        expect(textInput.exists()).toBe(true);
        expect(textOutput.exists()).toBe(true);
    });

    it('should bind inputText to the input value of textInput', async () => {
        const wrapper = shallowMount(Home);
        const textInput = wrapper.find('[data-testid="text-input"]');
        await textInput.setValue('Hello');
        expect(wrapper.vm.inputText).toBe('Hello');
    });

    it('should reflect inputText to outputText', async () => {
        const wrapper = shallowMount(Home);
        const textInput = wrapper.find('[data-testid="text-input"]');
        await textInput.setValue('Hello');
        expect(wrapper.vm.outputText).toBe('Hello');
    });

    it('should contain elements for letter count and word count', () => {
        const wrapper = shallowMount(Home);

        const letterCountElement = wrapper.find('[data-testid="text-letter"]');
        expect(letterCountElement.exists()).toBe(true);

        const wordCountElement = wrapper.find('[data-testid="text-words"]');
        expect(wordCountElement.exists()).toBe(true);
    });

    it('should display the correct letter count', async () => {
        const wrapper = shallowMount(Home);

        const textInput = wrapper.find('[data-testid="text-input"]');
        await textInput.setValue('Hello');

        const letterCountElement = wrapper.find('[data-testid="letter-count"]');
        expect(letterCountElement.text()).toBe('5');
    });

    it('should display the correct word count', async () => {
        const wrapper = shallowMount(Home);

        const textInput = wrapper.find('[data-testid="text-input"]');
        await textInput.setValue('Hello world');

        await textInput.trigger('input');

        const wordCountElement = wrapper.find('[data-testid="words-count"]');
        expect(wordCountElement.text()).toBe('2');
    });

    it('should return the correct letter count for a given string', () => {
        const wrapper = shallowMount(Home);
        const countLettersSpy = vi.spyOn(wrapper.vm, 'countLetters');
        const str = 'hello';
        const result = countLettersSpy(str);

        expect(result).toBe(5);
    });

    it('should return 0 for an empty string', () => {
        const wrapper = shallowMount(Home);
        const countLettersSpy = vi.spyOn(wrapper.vm, 'countLetters');
        const str = '';
        const result = countLettersSpy(str);

        expect(result).toBe(0);
    });

    it('should return the correct word count for a given string', () => {
        const wrapper = shallowMount(Home);
        const countWordsSpy = vi.spyOn(wrapper.vm, 'countWords');
        const str = 'Hello world';
        const result = countWordsSpy(str);

        expect(result).toBe(2);
    });

    it('should return 0 for an empty string', () => {
        const wrapper = shallowMount(Home);
        const countWordsSpy = vi.spyOn(wrapper.vm, 'countWords');
        const str = '';
        const result = countWordsSpy(str);

        expect(result).toBe(0);
    });

    it('should render the button "Primeiras Maiúsculas"', () => {
        const wrapper = shallowMount(Home);
        const button = wrapper.find('[data-testid="btn-capitalizerFirst"]');
        expect(button.exists()).toBe(true);
        expect(button.text()).toBe('Primeiras Maiúsculas');
    });

    it('should render the button "Todas maiúsculas"', () => {
        const wrapper = shallowMount(Home);
        const button = wrapper.find('[data-testid="btn-allCapitalizer"]');
        expect(button.exists()).toBe(true);
        expect(button.text()).toBe('Todas maiúsculas');
    });

    it('should render the button "Todas minúsculas"', () => {
        const wrapper = shallowMount(Home);
        const button = wrapper.find('[data-testid="btn-lowerCase"]');
        expect(button.exists()).toBe(true);
        expect(button.text()).toBe('Todas minúsculas');
    });

    it('should render the button "Criador de hashtag"', () => {
        const wrapper = shallowMount(Home);
        const button = wrapper.find('[data-testid="btn-hashtagsCreator"]');
        expect(button.exists()).toBe(true);
        expect(button.text()).toBe('Criador de hashtag');
    });

    it('should render the button "Inverter texto"', () => {
        const wrapper = shallowMount(Home);
        const button = wrapper.find('[data-testid="btn-reverseText"]');
        expect(button.exists()).toBe(true);
        expect(button.text()).toBe('Inverter texto');
    });

    it('should render the button "Converter para binário"', () => {
        const wrapper = shallowMount(Home);
        const button = wrapper.find('[data-testid="btn-textToBinary"]');
        expect(button.exists()).toBe(true);
        expect(button.text()).toBe('Converter para binário');
    });

    it('should capitalize the first letters when "Primeiras Maiúsculas" button is clicked', async () => {
        const wrapper = shallowMount(Home);
        const button = wrapper.find('[data-testid="btn-capitalizerFirst"]');

        const textInput = wrapper.find('#textInput');
        await textInput.setValue('primeiras maiúsculas');
        await button.trigger('click');
        expect(wrapper.vm.inputText).toBe('Primeiras Maiúsculas');
    });

    it('should convert the text to uppercase when "Todas maiúsculas" button is clicked', async () => {
        const wrapper = shallowMount(Home);
        const button = wrapper.find('[data-testid="btn-allCapitalizer"]');
        const textInput = wrapper.find('#textInput');
        await textInput.setValue('todas maiúsculas');
        await button.trigger('click');
        expect(wrapper.vm.inputText).toBe('TODAS MAIÚSCULAS');
    });

    it('should convert the text to lowercase when "Todas minúsculas" button is clicked', async () => {
        const wrapper = shallowMount(Home);
        const button = wrapper.find('[data-testid="btn-lowerCase"]');
        const textInput = wrapper.find('#textInput');
        await textInput.setValue('TODAS MINÚSCULAS');
        await button.trigger('click');

        expect(wrapper.vm.inputText).toBe('todas minúsculas');
    });

    it('should create hashtags when "Criador de hashtag" button is clicked', async () => {
        const wrapper = shallowMount(Home);
        const button = wrapper.find('[data-testid="btn-hashtagsCreator"]');
        const textInput = wrapper.find('#textInput');
        await textInput.setValue('Criador de hashtag');
        await button.trigger('click');
        expect(wrapper.vm.inputText).toBe('#Criador #de #hashtag');
    });

    it('should reverse the text when "Inverter texto" button is clicked', async () => {
        const wrapper = shallowMount(Home);
        const button = wrapper.find('[data-testid="btn-reverseText"]');
        const textInput = wrapper.find('#textInput');
        await textInput.setValue('Inverter texto');
        await button.trigger('click');
        expect(wrapper.vm.inputText).toBe('otxet retrevnI');
    });

    it('should reverse the text when "Converter para binário" button is clicked', async () => {
        const wrapper = shallowMount(Home);
        const button = wrapper.find('[data-testid="btn-textToBinary"]');
        const textInput = wrapper.find('#textInput');
        await textInput.setValue('Binário');
        await button.trigger('click');
        expect(wrapper.vm.inputText).toBe(
            '01000010011010010110111011100001011100100110100101101111'
        );
    });
});
