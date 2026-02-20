<template>
    <transition name="fade">
        <div
            v-if="isShow"
            data-testid="toasted-message"
            :class="wrapperClass"
            class="fixed top-20 right-4 p-4 rounded-xl shadow-lg border flex items-center gap-3 max-w-sm z-[9999]"
        >
            <div
                :class="iconWrapClass"
                class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            >
                <font-awesome-icon :icon="iconName" class="text-base leading-none" />
            </div>

            <p class="m-0 text-sm font-medium leading-tight break-words">
                {{ message }}
            </p>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    message: string;
    isShow: boolean;
    type?: 'success' | 'error' | 'info';
}>();

const iconName = computed(() => {
    switch (props.type) {
        case 'error':
            return 'fa-solid fa-circle-exclamation';
        case 'info':
            return 'fa-solid fa-circle-info';
        default:
            return 'fa-solid fa-circle-check';
    }
});

const wrapperClass = computed(() => {
    switch (props.type) {
        case 'error':
            return 'bg-red-950/80 border-red-500/30 text-red-100 backdrop-blur';
        case 'info':
            return 'bg-sky-950/80 border-sky-500/30 text-sky-100 backdrop-blur';
        default:
            return 'bg-emerald-950/80 border-emerald-500/30 text-emerald-100 backdrop-blur';
    }
});

const iconWrapClass = computed(() => {
    switch (props.type) {
        case 'error':
            return 'bg-red-500/15 text-red-300';
        case 'info':
            return 'bg-sky-500/15 text-sky-300';
        default:
            return 'bg-emerald-500/15 text-emerald-300';
    }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s, transform 0.25s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>
