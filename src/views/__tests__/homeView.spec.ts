import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Home from '@/views/HomeView.vue';

describe('Home', () => {
    it('should render the component correctly', () => {
        const wrapper = shallowMount(Home);
        expect(wrapper.exists()).toBe(true);
    });

    it('should contain the textInput and textOutput textareas', () => {
        const wrapper = shallowMount(Home);

        const textInput = wrapper.find('#textInput');
        const textOutput = wrapper.find('#textOutput');
        expect(textInput.exists()).toBe(true);
        expect(textOutput.exists()).toBe(true);
    });

    it('should bind inputText to the input value of textInput', async () => {
        const wrapper = shallowMount(Home);
        const textInput = wrapper.find('#textInput');
        await textInput.setValue('Hello');
        expect(wrapper.vm.inputText).toBe('Hello');
    });

    it('should reflect inputText to outputText', async () => {
        const wrapper = shallowMount(Home);
        const textInput = wrapper.find('#textInput');
        await textInput.setValue('Hello');
        expect(wrapper.vm.outputText).toBe('Hello');
    });

    // it('should call reflectInput when @input event is triggered on textInput', async () => {
    //     const wrapper = shallowMount(Home);
    //     const reflectInputSpy = vi.spyOn(wrapper.vm, 'reflectInput');

    //     const textInput = wrapper.find('#textInput');
    //     await textInput.setValue('Hello');
    //     await textInput.trigger('input');
    //     await new Promise((resolve) => setTimeout(resolve, 100));
    //     expect(reflectInputSpy).toHaveBeenCalledTimes(1);
    // });

    // it('should call reflectInput when input event is triggered on textInput', async () => {
    //     const wrapper = shallowMount(Home);
    //     const reflectInputMock = vi.spyOn(wrapper.vm, 'reflectInput');

    //     const textInput = wrapper.find('#textInput');
    //     await textInput.setValue('Hello');

    //     await textInput.trigger('input');

    //     expect(reflectInputMock).toHaveBeenCalled();
    // });

    // it('should not trigger any action on @input event of textOutput', async () => {
    //     const wrapper = shallowMount(Home);
    //     const textOutput = wrapper.find('#textOutput');
    //     const reflectInputMock = vi.spyOn(wrapper.vm, 'reflectInput');

    //     await textOutput.trigger('input');
    //     expect(reflectInputMock).not.toHaveBeenCalled();
    // });

    it('should contain elements for letter count and word count', () => {
        const wrapper = shallowMount(Home);

        const letterCountElement = wrapper.find('.mr-10 span:nth-child(2)');
        expect(letterCountElement.exists()).toBe(true);

        const wordCountElement = wrapper.find('.font-semibold + span');
        expect(wordCountElement.exists()).toBe(true);
    });

    it('should display the correct letter count', async () => {
        const wrapper = shallowMount(Home);

        const textInput = wrapper.find('#textInput');
        await textInput.setValue('Hello');

        const letterCountElement = wrapper.find('#letters');
        expect(letterCountElement.text()).toBe('5');
    });

    it('should display the correct word count', async () => {
        const wrapper = shallowMount(Home);

        const textInput = wrapper.find('#textInput');
        await textInput.setValue('Hello world');

        await textInput.trigger('input');

        const wordCountElement = wrapper.find('#words');
        expect(wordCountElement.text()).toBe('2');
    });

    // it('should return the correct letter count for a given string', () => {
    //     const wrapper = shallowMount(Home);
    //     const countLettersSpy = vi.spyOn(wrapper.vm, 'countLetters');
    //     const str = 'hello';
    //     const result = countLettersSpy(str);

    //     expect(result).toBe(5);
    // });

    // it('should return 0 for an empty string', () => {
    //     const wrapper = shallowMount(Home);
    //     const countLettersSpy = vi.spyOn(wrapper.vm, 'countLetters');
    //     const str = '';
    //     const result = countLettersSpy(str);

    //     expect(result).toBe(0);
    // });

    // it('should return the correct word count for a given string', () => {
    //     const wrapper = shallowMount(Home);
    //     const countWordsSpy = vi.spyOn(wrapper.vm, 'countWords');
    //     const str = 'Hello world';
    //     const result = countWordsSpy(str);

    //     expect(result).toBe(2);
    // });

    // it('should return 0 for an empty string', () => {
    //     const wrapper = shallowMount(Home);
    //     const countWordsSpy = vi.spyOn(wrapper.vm, 'countWords');
    //     const str = '';
    //     const result = countWordsSpy(str);

    //     expect(result).toBe(0);
    // });

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
});
