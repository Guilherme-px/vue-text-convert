<template>
    <div>
        <ToastedMessage :message="message" :isShow="showToasted" />
        <div class="bg-gray-900 rounded-lg overflow-hidden mx-10 my-10">
            <div class="p-6">
                <div class="flex flex-col items-center mb-6 justify-center md:flex-row">
                    <textarea
                        data-testid="text-input"
                        id="textInput"
                        class="w-full outline-none bg-gray-800 text-font-color placeholder-font-color h-48 resize-none border border-light-green rounded-lg px-4 py-2"
                        placeholder="Digite o texto para converter..."
                        v-model="inputText"
                        @input="reflectInput"
                    ></textarea>
                    <font-awesome-icon
                        icon="fa-solid fa-arrow-right-arrow-left"
                        class="mx-5 text-dark-green scale-x-150 -scale-y-125 my-5 md:my-0"
                    />
                    <textarea
                        data-testid="text-output"
                        id="textOutput"
                        class="w-full outline-none bg-gray-800 text-font-color placeholder-font-color h-48 resize-none border border-light-green rounded-lg px-4 py-2"
                        placeholder="Texto convertido..."
                        :value="convertedText"
                        readonly
                    ></textarea>
                </div>

                <div
                    class="flex flex-col text-font-color mb-10 justify-between items-center sm:flex-row"
                >
                    <div class="flex flex-col text-center sm:text-left">
                        <div class="mb-2">
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

                    <div class="mt-8">
                        <button
                            data-testid="btn-copy"
                            class="btn-actions mr-6 bg-light-green hover:bg-gray-800"
                            @click="copiarTexto"
                        >
                            Copiar
                        </button>
                        <button
                            data-testid="btn-clear"
                            class="btn-actions border-light-green hover:bg-gray-700"
                            @click="clearInputs"
                        >
                            Limpar
                        </button>
                    </div>
                </div>

                <div
                    class="flex flex-col justify-center items-center sm:flex-row sm:justify-start sm:flex-wrap"
                >
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
                    <button
                        data-testid="btn-base64Translate"
                        class="btn"
                        @click="base64TranslateText"
                    >
                        Decodificar base64
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref } from 'vue';
import ToastedMessage from '../components/toasted/ToastedMessage.vue';

const inputText = ref('');
const reflectedText = ref('');
const convertedText: Ref<string | undefined> = ref('');
const showToasted = ref(false);
const message = ref('');

const letterCount = computed(() => countLetters(inputText.value));
const wordCount = computed(() => countWords(inputText.value));

function clearInputs() {
    convertedText.value = '';
    inputText.value = '';
}

async function copiarTexto() {
    if (convertedText.value) {
        try {
            await navigator.clipboard.writeText(convertedText.value);
            message.value = 'Texto copiado com sucesso!';
            showToasted.value = true;

            setTimeout(() => {
                showToasted.value = false;
            }, 2000);
        } catch (error) {
            message.value = 'Erro ao copiar o texto:';
            showToasted.value = true;

            setTimeout(() => {
                showToasted.value = false;
            }, 2000);
        }
    }
}

function reflectInput() {
    reflectedText.value = reflect(inputText.value);
    if (inputText.value === '') {
        convertedText.value = '';
    }
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

const base64TranslateText = () => {
    convertedText.value = base64Translate(inputText.value);
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
    if (!/^[01]+$/.test(str)) {
        message.value = 'Erro: Binário inválido!';
        showToasted.value = true;

        setTimeout(() => {
            showToasted.value = false;
        }, 2000);
    }

    let text = '';
    for (let i = 0; i < str.length; i += 8) {
        const byte = str.slice(i, i + 8);
        const charCode = parseInt(byte, 2);
        const character = String.fromCharCode(charCode);
        text += character;
    }
    return text;
}

function base64Translate(str: string): string | undefined {
    try {
        const decodeText = atob(str);
        return decodeText;
    } catch (error) {
        message.value = 'Erro: Não foi possivel traduzir o codígo';
        showToasted.value = true;

        setTimeout(() => {
            showToasted.value = false;
        }, 2000);
    }
}
</script>

<style lang="postcss">
.btn {
    @apply min-w-[20px] px-4 py-2 mr-4 mb-4 rounded-lg bg-gray-800 text-font-color text-center border border-light-green;
}

.btn-actions {
    @apply px-4 py-2 rounded-lg text-font-color text-center border;
}

.btn:hover {
    @apply cursor-pointer shadow-md bg-gray-700 text-light-green;
}

.btn-actions:hover {
    @apply cursor-pointer shadow-md text-light-green;
}
</style>
