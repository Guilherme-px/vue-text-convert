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

    it('displays the title "Convert Case"', () => {
        const titulo = wrapper.find('h1');
        expect(titulo.text()).toBe('Convert Case');
        expect(titulo.classes()).toContain('text-font-color');
        expect(titulo.classes()).toContain('font-semibold');
        expect(titulo.classes()).toContain('text-lg');
    });

    it('navigates to the Home page when the link is clicked', async () => {
        const router = wrapper.vm.$router;
        await router.isReady();
        const linkHome = wrapper.get('a[href="/"]');
        await linkHome.trigger('click');

        expect(wrapper.vm.$route.path).toBe('/');
        expect(linkHome.classes()).toContain('router-link-active');
    });

    it('navigates to the About page when the link is clicked', async () => {
        const router = wrapper.vm.$router;
        const linkSobre = wrapper.get('a[href="/sobre"]');
        await linkSobre.trigger('click');
        await router.isReady();

        expect(wrapper.vm.$route.path).toBe('/sobre');
        expect(linkSobre.classes()).toContain('router-link-active');
    });
});
