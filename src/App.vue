<template>
    <main class="p-0 m-0 box-border">
        <AppNavbar />
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppNavbar from './components/navbar/AppNavbar.vue';
</script>
