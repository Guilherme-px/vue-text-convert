import { shallowMount } from '@vue/test-utils';
import Card from '@/components/cards/Card.vue';
import { describe, expect, it } from 'vitest';

describe('Card', () => {
    it('should render the component correctly', () => {
        const wrapper = shallowMount(Card);
        expect(wrapper.exists()).toBe(true);
    });

    it('should have the class "bg-gray-900"', () => {
        const wrapper = shallowMount(Card);
        expect(wrapper.classes()).toContain('bg-gray-900');
    });

    it('should have the class "rounded-lg"', () => {
        const wrapper = shallowMount(Card);
        expect(wrapper.find('.bg-gray-900').classes()).toContain('rounded-lg');
    });

    it('should have the class "overflow-hidden"', () => {
        const wrapper = shallowMount(Card);
        expect(wrapper.find('.bg-gray-900').classes()).toContain('overflow-hidden');
    });

    it('should have the slot present', () => {
        const wrapper = shallowMount(Card, {
            slots: {
                default: '<div id="my-slot"></div>'
            }
        });
        expect(wrapper.find('.p-6 #my-slot').exists()).toBe(true);
    });
});
