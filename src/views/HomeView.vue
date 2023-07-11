<template>
    <div>
        <div class="bg-gray-900 rounded-lg overflow-hidden mx-10 my-10">
            <div class="p-6">
                <div class="flex items-center mb-6">
                    <textarea
                        data-testid="text-input"
                        id="textInput"
                        class="w-full outline-none bg-gray-800 text-font-color placeholder-font-color h-48 resize-none border border-black rounded-lg px-4 py-2"
                        placeholder="Digite o texto para converter..."
                        v-model="inputText"
                        @input="reflectInput"
                    ></textarea>
                    <font-awesome-icon
                        icon="fa-solid fa-arrow-right-arrow-left"
                        class="mx-5 text-dark-green scale-x-150 -scale-y-125"
                    />
                    <textarea
                        data-testid="text-output"
                        id="textOutput"
                        class="w-full outline-none bg-gray-800 text-font-color placeholder-font-color h-48 resize-none border border-black rounded-lg px-4 py-2"
                        placeholder="Texto convertido..."
                        :value="convertedText"
                        readonly
                    ></textarea>
                </div>

                <div class="flex text-font-color mb-8">
                    <div class="mr-10">
                        <span data-testid="text-letter" class="mr-2 font-semibold"
                            >Total de letras:</span
                        >
                        <span data-testid="letter-count">{{ letterCount }}</span>
                    </div>

                    <div>
                        <span data-testid="text-words" class="mr-2 font-semibold"
                            >Total de palavras:</span
                        >
                        <span data-testid="words-count">{{ wordCount }}</span>
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
                    <button data-testid="btn-textToBinary" class="btn" @click="binaryCreator">
                        Converter para binário
                    </button>
                    <button data-testid="btn-binaryTranslate" class="btn" @click="binaryTranslate">
                        Traduzir binário
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
const convertedText = ref('');

const letterCount = computed(() => countLetters(inputText.value));
const wordCount = computed(() => countWords(inputText.value));

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
    convertedText.value = capitalizeFirstLetters(inputText.value);
};

const allCapitalizer = () => {
    convertedText.value = inputText.value.toUpperCase();
};

const lowerCase = () => {
    convertedText.value = inputText.value.toLowerCase();
};

const hashtagsCreator = () => {
    convertedText.value = createHashtags(inputText.value);
};

const reverseText = () => {
    convertedText.value = reverseString(inputText.value);
};

const binaryCreator = () => {
    convertedText.value = convertToBinary(inputText.value);
};

const binaryTranslate = () => {
    convertedText.value = convertFromBinary(inputText.value);
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

function convertToBinary(str: string): string {
    let binary = '';
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        const binaryCode = charCode.toString(2);
        binary += binaryCode.padStart(8, '0');
    }
    return binary;
}

function convertFromBinary(str: string): string {
    let text = '';
    for (let i = 0; i < str.length; i += 8) {
        const byte = str.slice(i, i + 8);
        const charCode = parseInt(byte, 2);
        const character = String.fromCharCode(charCode);
        text += character;
    }
    return text;
}
</script>

<style lang="postcss">
.btn {
    @apply min-w-[20px] px-4 py-2 mr-4 mb-4 rounded-lg bg-gray-800 text-font-color text-center;
}

.btn:hover {
    @apply cursor-pointer shadow-md bg-gray-700 text-light-green;
}
</style>
