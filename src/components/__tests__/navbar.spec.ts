import { describe, it, expect, beforeEach } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { mount, VueWrapper } from '@vue/test-utils';
import AppNavbar from '../navbar/AppNavbar.vue';

describe('Navbar', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        const router = createRouter({
            history: createWebHistory(),
            routes: [
                { path: '/', name: 'Home', redirect: '' },
                {
                    path: '/sobre',
                    name: 'About',
                    component: { template: '<div>Mock About Page</div>' }
                }
            ]
        });

        wrapper = mount(AppNavbar, {
            global: {
                plugins: [router]
            },
            stubs: {
                RouterView: true
            }
        });
    });

    it('displays the title "TextAlchemy"', () => {
        const title = wrapper.find('h1');
        expect(title.text()).toBe('TextAlchemy');
        expect(title.classes()).toContain('text-font-color');
        expect(title.classes()).toContain('font-semibold');
        expect(title.classes()).toContain('text-lg');
    });

    it('displays the link "Início"', () => {
        const linkHome = wrapper.find('[data-testid="link-home"]');
        expect(linkHome.text()).toBe('Início');
        expect(linkHome.classes()).toContain('text-font-color');
        expect(linkHome.classes()).toContain('hover:text-light-green');
        expect(linkHome.classes()).toContain('text-lg');
    });

    it('displays the link "Sobre"', () => {
        const linkAbout = wrapper.find('[data-testid="link-about"]');
        expect(linkAbout.text()).toBe('Sobre');
        expect(linkAbout.classes()).toContain('text-font-color');
        expect(linkAbout.classes()).toContain('hover:text-light-green');
        expect(linkAbout.classes()).toContain('text-lg');
        expect(linkAbout.classes()).toContain('pr-3');
    });

    it('navigates to the Home page when the link is clicked', async () => {
        const router = wrapper.vm.$router;
        await router.isReady();
        const linkHome = wrapper.find('[data-testid="link-home"]');
        await linkHome.trigger('click');

        expect(wrapper.vm.$route.path).toBe('/');
        expect(linkHome.classes()).toContain('router-link-active');
    });

    it('navigates to the About page when the link is clicked', async () => {
        const router = wrapper.vm.$router;
        const linkAbout = wrapper.find('[data-testid="link-about"]');
        await linkAbout.trigger('click');
        await router.isReady();

        expect(wrapper.vm.$route.path).toBe('/sobre');
        expect(linkAbout.classes()).toContain('router-link-active');
    });
});
