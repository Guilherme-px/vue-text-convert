<template>
    <div>
        <div class="bg-gray-900 rounded-lg overflow-hidden mx-10 my-10">
            <div class="p-6">
                <div class="flex mb-6">
                    <textarea
                        id="textInput"
                        class="w-full outline-none bg-gray-800 text-font-color placeholder-font-color h-48 resize-none border border-black rounded-lg px-4 py-2"
                        placeholder="Digite o texto para converter..."
                        v-model="inputText"
                        @input="reflectInput"
                    ></textarea>
                    <textarea
                        id="textOutput"
                        class="w-full outline-none bg-gray-800 text-font-color placeholder-font-color h-48 resize-none border border-black rounded-lg px-4 py-2 ml-4"
                        placeholder="Texto convertido..."
                        :value="outputText"
                        readonly
                    ></textarea>
                </div>

                <div class="flex text-font-color mb-4">
                    <div class="mr-10">
                        <span class="mr-2 font-semibold">Total de letras:</span>
                        <span id="letters">{{ letterCount }}</span>
                    </div>

                    <div>
                        <span class="mr-2 font-semibold">Total de palavras:</span>
                        <span id="words">{{ wordCount }}</span>
                    </div>
                </div>

                <div>
                    <button
                        data-testid="btn-capitalizerFirst"
                        class="btn"
                        @click="capitalizerFirst"
                    >
                        Primeiras Maiúsculas
                    </button>
                    <button data-testid="btn-allCapitalizer" class="btn" @click="allCapitalizer">
                        Todas maiúsculas
                    </button>
                    <button data-testid="btn-lowerCase" class="btn" @click="lowerCase">
                        Todas minúsculas
                    </button>
                    <button data-testid="btn-hashtagsCreator" class="btn" @click="hashtagsCreator">
                        Criador de hashtag
                    </button>
                    <button data-testid="btn-reverseText" class="btn" @click="reverseText">
                        Inverter texto
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const inputText = ref('');
const reflectedText = ref('');

const letterCount = computed(() => countLetters(inputText.value));
const wordCount = computed(() => countWords(inputText.value));
const outputText = computed(() => reflect(inputText.value));

function reflectInput() {
    reflectedText.value = reflect(inputText.value);
}

function reflect(str: string) {
    return str;
}

function countLetters(str: string): number {
    return str.replace(/(\r\n|\n|\r)/g, ' ').trim().length;
}

function countWords(str: string): number {
    const words = str
        .replace(/(\r\n|\n|\r)/g, ' ')
        .trim()
        .split(/\s+/g);
    return words.length === 1 && words[0] === '' ? 0 : words.length;
}

const capitalizerFirst = () => {
    inputText.value = capitalizeFirstLetters(inputText.value);
};

const allCapitalizer = () => {
    inputText.value = inputText.value.toUpperCase();
};

const lowerCase = () => {
    inputText.value = inputText.value.toLowerCase();
};

const hashtagsCreator = () => {
    inputText.value = createHashtags(inputText.value);
};

const reverseText = () => {
    inputText.value = reverseString(inputText.value);
};

function capitalizeFirstLetters(str: string): string {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, (s) => s.toUpperCase());
}

function createHashtags(str: string, char: string = '#'): string {
    return str
        .split(' ')
        .map((word) => (word.startsWith(char) ? word : `${char}${word}`))
        .join(' ');
}

function reverseString(str: string): string {
    return str.split('').reverse().join('');
}
</script>

<style lang="postcss">
.btn {
    @apply min-w-[20px] h-12 px-4 py-2 mr-4 mb-4 rounded-lg bg-gray-800 text-font-color text-center;
}

.btn:hover {
    @apply cursor-pointer shadow-md bg-gray-700;
}
</style>
