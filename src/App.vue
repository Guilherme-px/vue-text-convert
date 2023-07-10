<template>
    <div class="flex flex-col min-h-screen">
        <AppNavbar />

        <main class="flex-grow bg-gray-800">
            <RouterView />
        </main>

        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppNavbar from './components/navbar/AppNavbar.vue';
import AppFooter from './components/footer/AppFooter.vue';
</script>
