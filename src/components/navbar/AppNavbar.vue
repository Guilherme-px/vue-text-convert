<template>
    <header class="relative z-10 border-b border-white/5 backdrop-blur-xl bg-white/5">
        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <router-link to="/" class="flex items-center gap-3 group">
                <div class="relative">
                    <img
                        src="/text-alchemy-logo.png"
                        alt="Text Alchemy Logo"
                        class="w-10 h-10 rounded-xl shadow-lg shadow-emerald-500/20 transition-transform duration-300 group-hover:scale-110"
                    />
                    <div
                        class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-gray-900 animate-pulse"
                    />
                </div>
                <div>
                    <h1
                        class="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                    >
                        Text Alchemy
                    </h1>
                    <p class="text-xs text-gray-500">Transforme seu texto de forma elegante</p>
                </div>
            </router-link>

            <nav class="flex items-center gap-1">
                <router-link
                    to="/"
                    data-testid="link-home"
                    class="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    :class="{ 'text-emerald-400 bg-emerald-500/10': isActive('/') }"
                >
                    Início
                </router-link>
                <router-link
                    to="/sobre"
                    data-testid="link-about"
                    class="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    :class="{ 'text-emerald-400 bg-emerald-500/10': isActive('/sobre') }"
                >
                    Sobre
                </router-link>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path: string): boolean => {
    return route.path === path;
};
</script>

<style scoped>
@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
