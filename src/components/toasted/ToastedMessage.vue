<template>
    <transition name="fade">
        <div
            data-testid="toasted-message"
            v-if="isShow"
            class="fixed top-20 right-4 p-4 bg-dark-green text-font-color rounded shadow"
        >
            {{ message }}
        </div>
    </transition>
</template>

<script setup lang="ts">
defineProps({
    message: {
        type: String,
        required: true
    },
    isShow: {
        type: Boolean,
        default: true,
        required: true
    }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
