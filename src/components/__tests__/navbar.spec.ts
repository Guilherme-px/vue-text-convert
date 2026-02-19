import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRouter, createMemoryHistory } from 'vue-router';
import { mount, VueWrapper, flushPromises } from '@vue/test-utils';
import AppNavbar from '../navbar/AppNavbar.vue';

describe('Navbar', () => {
    let wrapper: VueWrapper;
    let router: ReturnType<typeof createRouter>;

    beforeEach(async () => {
        router = createRouter({
            history: createMemoryHistory(),
            routes: [
                { path: '/', name: 'Home', component: { template: '<div>Mock Home</div>' } },
                { path: '/sobre', name: 'About', component: { template: '<div>Mock About</div>' } }
            ]
        });

        await router.push('/');
        await router.isReady();

        wrapper = mount(AppNavbar, {
            global: {
                plugins: [router],

                stubs: {
                    RouterLink: false,
                    RouterView: true
                }
            }
        });

        await flushPromises();
    });

    it('navigates to "/sobre" when clicking "Sobre" and marks it active', async () => {
        const pushSpy = vi.spyOn(router, 'push');

        await wrapper.get('[data-testid="link-about"]').trigger('click');

        expect(pushSpy).toHaveBeenCalled();

        await pushSpy.mock.results.at(-1)!.value;
        await flushPromises();

        expect(router.currentRoute.value.path).toBe('/sobre');

        const linkAbout = wrapper.get('[data-testid="link-about"]');
        expect(linkAbout.classes()).toContain('text-emerald-400');
        expect(linkAbout.classes()).toContain('bg-emerald-500/10');
    });

    it('navigates to "/" when clicking "Início" and marks it active', async () => {
        await router.push('/sobre');
        await flushPromises();

        const pushSpy = vi.spyOn(router, 'push');

        await wrapper.get('[data-testid="link-home"]').trigger('click');

        expect(pushSpy).toHaveBeenCalled();
        await pushSpy.mock.results.at(-1)!.value;
        await flushPromises();

        expect(router.currentRoute.value.path).toBe('/');

        const linkHome = wrapper.get('[data-testid="link-home"]');
        expect(linkHome.classes()).toContain('text-emerald-400');
        expect(linkHome.classes()).toContain('bg-emerald-500/10');
    });
});
