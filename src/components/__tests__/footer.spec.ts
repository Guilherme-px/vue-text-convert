import { mount } from '@vue/test-utils';
import AppFooter from '../footer/AppFooter.vue';
import { describe, expect, it } from 'vitest';

describe('Footer', () => {
    it('renders correctly', () => {
        const wrapper = mount(AppFooter);
        expect(wrapper.exists()).toBe(true);
    });

    it('has correct social media links', () => {
        const wrapper = mount(AppFooter);
        const instagramLink = wrapper.find('[data-testid="link-insta"]');
        const linkedinLink = wrapper.find('[data-testid="link-linkedin"]');
        const githubLink = wrapper.find('[data-testid="link-github"]');

        expect(instagramLink.exists()).toBe(true);
        expect(linkedinLink.exists()).toBe(true);
        expect(githubLink.exists()).toBe(true);
    });

    it('emits "socialMediaClick" event on link click', async () => {
        const wrapper = mount(AppFooter);

        await wrapper.vm.$emit('socialMediaClick', 'instagram');
        await wrapper.vm.$emit('socialMediaClick', 'linkedin');
        await wrapper.vm.$emit('socialMediaClick', 'github');

        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('socialMediaClick')?.[0][0]).toBe('instagram');
        expect(wrapper.emitted('socialMediaClick')?.[1][0]).toBe('linkedin');
        expect(wrapper.emitted('socialMediaClick')?.[2][0]).toBe('github');
    });

    it('emits correct data on "socialMediaClick" event', async () => {
        const wrapper = mount(AppFooter);

        wrapper.vm.$emit('socialMediaClick', 'instagram');
        wrapper.vm.$emit('socialMediaClick', 'linkedin');
        wrapper.vm.$emit('socialMediaClick', 'github');

        await wrapper.vm.$nextTick();

        const emittedEvents = wrapper.emitted('socialMediaClick');
        expect(emittedEvents).toBeDefined();
        expect(emittedEvents!.length).toBe(3);
        expect(emittedEvents![0][0]).toBe('instagram');
        expect(emittedEvents![1][0]).toBe('linkedin');
        expect(emittedEvents![2][0]).toBe('github');
    });

    it('renders correct developer name', () => {
        const wrapper = mount(AppFooter);
        const developerName = wrapper.find('[data-testid="text-dev"]').text();

        expect(developerName).toBe('Desenvolvido por Guilherme Augusto');
    });

    it('renders copy text', () => {
        const wrapper = mount(AppFooter);
        const copyText = wrapper.find('[data-testid="text-copy"]').text();

        expect(copyText).toContain('© 2023 Todos os direitos reservados');
    });

    it('renders a link with target="_blank"', () => {
        const wrapper = mount(AppFooter);

        const link = wrapper.find('a');
        link.element.setAttribute('target', '_blank');

        expect(link.attributes('target')).toBe('_blank');
    });
});
