<template>
    <div
        class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white relative overflow-hidden"
    >
        <ToastedMessage :message="message" :isShow="showToasted" :type="toastType" />
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

        <main class="relative z-10 max-w-7xl mx-auto px-6 py-12">
            <div class="text-center mb-12">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    <span
                        class="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                    >
                        Transforme seu texto
                    </span>
                </h2>
                <p class="text-gray-400 max-w-2xl mx-auto text-lg">
                    Ferramenta poderosa para converter, formatar e manipular texto de diversas
                    formas. Simples, rápido e elegante.
                </p>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-8 relative">
                <div class="group relative">
                    <div
                        class="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"
                    />
                    <div
                        class="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                    >
                        <div
                            class="px-5 py-3 border-b border-white/5 flex items-center justify-between"
                        >
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-emerald-400/80" />
                                <span class="text-sm font-medium text-gray-400"
                                    >Texto Original</span
                                >
                            </div>
                            <span class="text-xs text-gray-600">Entrada</span>
                        </div>
                        <textarea
                            data-testid="text-input"
                            id="textInput"
                            :value="inputText"
                            @input="reflectInput"
                            placeholder="Digite o texto para converter..."
                            class="w-full h-48 bg-transparent p-5 text-gray-100 placeholder-gray-600 resize-none focus:outline-none font-mono text-sm leading-relaxed"
                        ></textarea>
                    </div>
                </div>

                <div
                    class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                >
                    <div
                        class="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                    >
                        <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-lg" />
                    </div>
                </div>

                <div class="group relative">
                    <div
                        class="absolute -inset-0.5 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"
                    />
                    <div
                        class="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                    >
                        <div
                            class="px-5 py-3 border-b border-white/5 flex items-center justify-between"
                        >
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-teal-400/80" />
                                <span class="text-sm font-medium text-gray-400"
                                    >Texto Convertido</span
                                >
                            </div>
                            <span class="text-xs text-gray-600">Saída</span>
                        </div>
                        <textarea
                            data-testid="text-output"
                            id="textOutput"
                            :value="convertedText"
                            placeholder="Texto convertido aparecerá aqui..."
                            readonly
                            class="w-full h-48 bg-transparent p-5 text-gray-100 placeholder-gray-600 resize-none focus:outline-none font-mono text-sm leading-relaxed"
                        ></textarea>
                    </div>
                </div>
            </div>

            <div
                class="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-4 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-white/5"
            >
                <div class="flex items-center gap-6">
                    <div class="flex items-center gap-2">
                        <div
                            class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"
                        >
                            <span class="text-emerald-400 text-sm font-bold">L</span>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500">Total de letras</p>
                            <p data-testid="letter-count" class="text-lg font-semibold text-white">
                                {{ letterCount }}
                            </p>
                        </div>
                    </div>
                    <div class="w-px h-10 bg-white/10" />
                    <div class="flex items-center gap-2">
                        <div
                            class="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center"
                        >
                            <span class="text-teal-400 text-sm font-bold">P</span>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500">Total de palavras</p>
                            <p data-testid="words-count" class="text-lg font-semibold text-white">
                                {{ wordCount }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <button
                        data-testid="btn-copy"
                        @click="copiarTexto"
                        :disabled="!convertedText"
                        :class="
                            copied
                                ? 'bg-emerald-500 text-gray-900'
                                : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-gray-900 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100'
                        "
                        class="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2"
                    >
                        <font-awesome-icon icon="fa-solid fa-check" class="text-lg" v-if="copied" />
                        <font-awesome-icon icon="fa-solid fa-copy" class="text-lg" v-else />
                        {{ copied ? 'Copiado!' : 'Copiar' }}
                    </button>
                    <button
                        data-testid="btn-clear"
                        @click="clearInputs"
                        class="px-5 py-2.5 rounded-xl font-medium text-sm border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
                    >
                        <font-awesome-icon icon="fa-solid fa-trash-alt" class="text-lg" />
                        Limpar
                    </button>
                </div>
            </div>

            <div class="mb-8">
                <h3 class="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                    <font-awesome-icon icon="fa-solid fa-gears" class="text-lg text-emerald-400" />
                    Ferramentas de Conversão
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                        v-for="tool in tools"
                        :key="tool.id"
                        :data-testid="tool.testId"
                        @click="tool.action"
                        :class="
                            activeTool === tool.id
                                ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/50'
                                : 'bg-gray-900/50 border-white/5 hover:border-emerald-500/30 hover:bg-gray-800/50'
                        "
                        class="group relative p-4 rounded-xl border transition-all duration-300 text-left"
                    >
                        <div class="flex items-center gap-3 mb-2">
                            <div
                                :class="
                                    activeTool === tool.id
                                        ? 'bg-emerald-500 text-gray-900'
                                        : 'bg-gray-800 text-emerald-400 group-hover:bg-emerald-500/20'
                                "
                                class="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                            >
                                <font-awesome-icon
                                    v-if="isFaIcon(tool.icon)"
                                    :icon="tool.icon.name"
                                    class="text-base"
                                />
                                <span v-else class="font-mono font-bold text-sm">
                                    {{ tool.icon }}
                                </span>
                            </div>

                            <font-awesome-icon
                                icon="fa-solid fa-angle-right"
                                class="text-lg text-gray-600 group-hover:text-emerald-400 transition-colors ml-auto"
                            />
                        </div>
                        <p
                            :class="
                                activeTool === tool.id
                                    ? 'text-emerald-400'
                                    : 'text-gray-300 group-hover:text-white'
                            "
                            class="font-medium text-sm transition-colors"
                        >
                            {{ tool.label }}
                        </p>
                        <p class="text-xs text-gray-500 mt-1 truncate">
                            {{ tool.description }}
                        </p>
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import ToastedMessage from '@/components/toasted/ToastedMessage.vue';
import { useTextTools } from '@/composables/useTextTools';

const {
    inputText,
    convertedText,
    copied,
    showToasted,
    message,
    activeTool,
    letterCount,
    wordCount,
    tools,
    isFaIcon,
    reflectInput,
    clearInputs,
    copiarTexto,
    toastType
} = useTextTools();
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

.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
