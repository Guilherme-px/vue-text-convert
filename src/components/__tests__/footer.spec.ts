import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppFooter from '../footer/AppFooter.vue';

describe('Footer', () => {
    const mountFooter = () =>
        mount(AppFooter, {
            global: {
                stubs: {
                    'font-awesome-icon': true
                }
            }
        });

    it('renders correctly', () => {
        const wrapper = mountFooter();
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('footer').exists()).toBe(true);
    });

    it('shows Linkedin and GitHub links', () => {
        const wrapper = mountFooter();
        expect(wrapper.find('[data-testid="link-linkedin"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="link-github"]').exists()).toBe(true);
    });

    it('has correct href, target and rel attributes', () => {
        const wrapper = mountFooter();

        const linkedin = wrapper.get('[data-testid="link-linkedin"]');
        expect(linkedin.attributes('href')).toBe(
            'https://www.linkedin.com/in/guilherme-augusto-da-silva/'
        );
        expect(linkedin.attributes('target')).toBe('_blank');
        expect(linkedin.attributes('rel')).toContain('noopener');
        expect(linkedin.attributes('rel')).toContain('noreferrer');

        const github = wrapper.get('[data-testid="link-github"]');
        expect(github.attributes('href')).toBe('https://github.com/Guilherme-px');
        expect(github.attributes('target')).toBe('_blank');
        expect(github.attributes('rel')).toContain('noopener');
        expect(github.attributes('rel')).toContain('noreferrer');
    });

    it('renders developer text correctly', () => {
        const wrapper = mountFooter();
        const dev = wrapper.get('[data-testid="text-dev"]');
        expect(dev.text().trim()).toContain('Desenvolvido por');
        expect(dev.text()).toContain('Guilherme Augusto');
    });

    it('renders copyright text', () => {
        const wrapper = mountFooter();
        expect(wrapper.get('[data-testid="text-copy"]').text()).toBe(
            '© 2023 Todos os direitos reservados'
        );
    });

    it('applies base styling classes to social links', () => {
        const wrapper = mountFooter();

        const linkedin = wrapper.get('[data-testid="link-linkedin"]');
        expect(linkedin.classes()).toContain('rounded-full');
        expect(linkedin.classes()).toContain('text-gray-400');
        expect(linkedin.classes()).toContain('hover:text-white');

        const github = wrapper.get('[data-testid="link-github"]');
        expect(github.classes()).toContain('rounded-full');
        expect(github.classes()).toContain('text-gray-400');
        expect(github.classes()).toContain('hover:text-white');
    });
});
