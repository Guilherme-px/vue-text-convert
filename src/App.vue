<template>
    <div
        class="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white relative overflow-hidden"
    >
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                class="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
            />
            <div
                class="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
                style="animation-delay: 1s"
            />
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-3xl"
            />
        </div>

        <AppNavbar class="relative z-10" />

        <main class="relative z-10 flex-1">
            <RouterView />
        </main>

        <AppFooter class="relative z-10" />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppNavbar from './components/navbar/AppNavbar.vue';
import AppFooter from './components/footer/AppFooter.vue';
</script>
