import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ToastedMessage from '../toasted/ToastedMessage.vue';

function mountToast(
    props?: Partial<{ message: string; isShow: boolean; type: 'success' | 'error' | 'info' }>
) {
    return mount(ToastedMessage, {
        props: {
            message: 'Default message',
            isShow: true,
            ...props
        },
        global: {
            stubs: {
                transition: false,
                'font-awesome-icon': {
                    props: ['icon'],
                    template: '<i data-testid="fa" :data-icon="icon"></i>'
                }
            }
        }
    });
}

describe('ToastedMessage', () => {
    it('does not render when isShow=false', () => {
        const wrapper = mountToast({ isShow: false });
        expect(wrapper.find('[data-testid="toasted-message"]').exists()).toBe(false);
    });

    it('renders when isShow=true and shows the message', () => {
        const wrapper = mountToast({ message: 'Hello toast!' });
        const el = wrapper.get('[data-testid="toasted-message"]');
        expect(el.text()).toContain('Hello toast!');
    });

    it('defaults to success styles and icon when type is undefined', () => {
        const wrapper = mountToast({ type: undefined });

        const root = wrapper.get('[data-testid="toasted-message"]');
        expect(root.classes()).toEqual(
            expect.arrayContaining([
                'bg-emerald-950/80',
                'border-emerald-500/30',
                'text-emerald-100',
                'backdrop-blur'
            ])
        );

        const iconWrap = wrapper.get('.w-9.h-9');
        expect(iconWrap.classes()).toEqual(
            expect.arrayContaining(['bg-emerald-500/15', 'text-emerald-300'])
        );

        const fa = wrapper.get('[data-testid="fa"]');
        expect(fa.attributes('data-icon')).toBe('fa-solid fa-circle-check');
    });

    it('applies error styles and icon when type="error"', () => {
        const wrapper = mountToast({ type: 'error' });

        const root = wrapper.get('[data-testid="toasted-message"]');
        expect(root.classes()).toEqual(
            expect.arrayContaining([
                'bg-red-950/80',
                'border-red-500/30',
                'text-red-100',
                'backdrop-blur'
            ])
        );

        const iconWrap = wrapper.get('.w-9.h-9');
        expect(iconWrap.classes()).toEqual(
            expect.arrayContaining(['bg-red-500/15', 'text-red-300'])
        );

        const fa = wrapper.get('[data-testid="fa"]');
        expect(fa.attributes('data-icon')).toBe('fa-solid fa-circle-exclamation');
    });

    it('applies info styles and icon when type="info"', () => {
        const wrapper = mountToast({ type: 'info' });

        const root = wrapper.get('[data-testid="toasted-message"]');
        expect(root.classes()).toEqual(
            expect.arrayContaining([
                'bg-sky-950/80',
                'border-sky-500/30',
                'text-sky-100',
                'backdrop-blur'
            ])
        );

        const iconWrap = wrapper.get('.w-9.h-9');
        expect(iconWrap.classes()).toEqual(
            expect.arrayContaining(['bg-sky-500/15', 'text-sky-300'])
        );

        const fa = wrapper.get('[data-testid="fa"]');
        expect(fa.attributes('data-icon')).toBe('fa-solid fa-circle-info');
    });

    it('keeps the base container layout classes', () => {
        const wrapper = mountToast();
        const root = wrapper.get('[data-testid="toasted-message"]');

        expect(root.classes()).toEqual(
            expect.arrayContaining([
                'fixed',
                'top-20',
                'right-4',
                'p-4',
                'rounded-xl',
                'shadow-lg',
                'border',
                'flex',
                'items-center',
                'gap-3',
                'max-w-sm'
            ])
        );
    });
});
