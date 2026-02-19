import { shallowMount } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import Home from '@/views/HomeView.vue';
import { toolsMeta } from '@/utils/toolsList';

const ToastedMessageStub = {
    name: 'ToastedMessage',
    props: ['message', 'isShow', 'type'],
    template: `
    <div v-if="isShow" data-testid="toast-stub" :data-type="type">
      {{ message }}
    </div>
  `
};

describe('Home', () => {
    beforeEach(() => {
        vi.useFakeTimers();

        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn().mockResolvedValue(undefined)
            }
        });

        vi.stubGlobal('atob', (b64: string) => Buffer.from(b64, 'base64').toString('binary'));
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    function mountHome() {
        return shallowMount(Home, {
            global: {
                stubs: {
                    ToastedMessage: ToastedMessageStub,
                    'font-awesome-icon': true
                }
            }
        });
    }

    it('renders input/output textareas and counters', () => {
        const wrapper = mountHome();

        expect(wrapper.find('[data-testid="text-input"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="text-output"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="letter-count"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="words-count"]').exists()).toBe(true);
    });

    it('renders all tool buttons from toolsMeta', () => {
        const wrapper = mountHome();

        for (const meta of toolsMeta) {
            const btn = wrapper.find(`[data-testid="${meta.testId}"]`);
            expect(btn.exists()).toBe(true);
            expect(btn.text()).toContain(meta.label);
        }
    });

    it('does not update output when typing with no active tool selected', async () => {
        const wrapper = mountHome();

        const input = wrapper.find('[data-testid="text-input"]');
        const output = wrapper.find('[data-testid="text-output"]');

        await input.setValue('hello');
        expect((output.element as HTMLTextAreaElement).value).toBe('');
    });

    it('activates a tool and auto-converts while typing (uppercase)', async () => {
        const wrapper = mountHome();

        const input = wrapper.find('[data-testid="text-input"]');
        const output = wrapper.find('[data-testid="text-output"]');
        const uppercase = wrapper.find('[data-testid="btn-allCapitalizer"]');

        await input.setValue('hello');
        await uppercase.trigger('click');
        expect((output.element as HTMLTextAreaElement).value).toBe('HELLO');

        await input.setValue('hello world');
        expect((output.element as HTMLTextAreaElement).value).toBe('HELLO WORLD');

        expect(uppercase.classes().join(' ')).toContain('bg-gradient-to-br');
    });

    it('clears input/output and removes the active tool state when clicking Clear', async () => {
        const wrapper = mountHome();

        const input = wrapper.find('[data-testid="text-input"]');
        const output = wrapper.find('[data-testid="text-output"]');
        const uppercase = wrapper.find('[data-testid="btn-allCapitalizer"]');
        const clear = wrapper.find('[data-testid="btn-clear"]');

        await input.setValue('test');
        await uppercase.trigger('click');
        expect((output.element as HTMLTextAreaElement).value).toBe('TEST');

        await clear.trigger('click');

        expect((input.element as HTMLTextAreaElement).value).toBe('');
        expect((output.element as HTMLTextAreaElement).value).toBe('');
        expect(uppercase.classes().join(' ')).not.toContain('bg-gradient-to-br');
    });

    it('copies the converted text to clipboard when Copy is clicked', async () => {
        const wrapper = mountHome();

        const input = wrapper.find('[data-testid="text-input"]');
        const uppercase = wrapper.find('[data-testid="btn-allCapitalizer"]');
        const copy = wrapper.find('[data-testid="btn-copy"]');

        await input.setValue('test text');
        await uppercase.trigger('click');
        await copy.trigger('click');

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('TEST TEXT');
    });

    it('shows an error toast for invalid base64 input (type + message)', async () => {
        const wrapper = mountHome();

        vi.stubGlobal(
            'atob',
            vi.fn(() => {
                throw new Error('InvalidCharacterError');
            })
        );

        const input = wrapper.find('[data-testid="text-input"]');
        const base64 = wrapper.find('[data-testid="btn-base64Translate"]');

        await input.setValue('!!!invalid!!!');
        await base64.trigger('click');

        const toast = wrapper.find('[data-testid="toast-stub"]');
        expect(toast.exists()).toBe(true);
        expect(toast.text()).toMatch(/Erro/i);
        expect(toast.attributes('data-type')).toBe('error');
    });

    it('decodes valid base64 input', async () => {
        const wrapper = mountHome();

        const input = wrapper.find('[data-testid="text-input"]');
        const output = wrapper.find('[data-testid="text-output"]');
        const base64 = wrapper.find('[data-testid="btn-base64Translate"]');

        await input.setValue('SGVsbG8gV29ybGQ=');
        await base64.trigger('click');

        expect((output.element as HTMLTextAreaElement).value).toBe('Hello World');
    });
});
