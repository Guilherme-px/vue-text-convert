import { computed, ref, type Ref } from 'vue';
import type { ToolIcon, ToolId } from '@/types/types';
import { buildTools } from '@/utils/toolsList';

export function useTextTools() {
    type ToastType = 'success' | 'error' | 'info';

    const toastType = ref<ToastType>('success');
    const inputText = ref('');
    const convertedText: Ref<string | undefined> = ref('');
    const copied = ref(false);
    const showToasted = ref(false);
    const message = ref('');
    const activeTool = ref<ToolId | null>(null);

    const letterCount = computed(() => countLetters(inputText.value));
    const wordCount = computed(() => countWords(inputText.value));

    function isFaIcon(icon: ToolIcon): icon is { type: 'fa'; name: string } {
        return typeof icon !== 'string' && icon.type === 'fa';
    }

    function showToast(msg: string, type: ToastType = 'success') {
        message.value = msg;
        toastType.value = type;
        showToasted.value = true;

        setTimeout(() => {
            showToasted.value = false;
        }, 2000);
    }

    function countLetters(str: string): number {
        return str.replace(/(\r\n|\n|\r|\s)/g, '').length;
    }

    function countWords(str: string): number {
        const words = str
            .replace(/(\r\n|\n|\r)/g, ' ')
            .trim()
            .split(/\s+/g);
        return words.length === 1 && words[0] === '' ? 0 : words.length;
    }

    function clearInputs() {
        convertedText.value = '';
        inputText.value = '';
        activeTool.value = null;
    }

    async function copiarTexto() {
        if (!convertedText.value) return;

        try {
            await navigator.clipboard.writeText(convertedText.value);
            copied.value = true;
            showToast('Texto copiado com sucesso!', 'success');
            setTimeout(() => {
                copied.value = false;
            }, 2000);
        } catch {
            showToast('Erro ao copiar o texto!', 'error');
        }
    }

    function setConverted(toolId: ToolId, value: string) {
        activeTool.value = toolId;
        convertedText.value = value;
    }

    function capitalizerFirst() {
        setConverted(
            'capitalize',
            inputText.value.toLowerCase().replace(/(?:^|\s)\S/g, (s) => s.toUpperCase())
        );
    }

    function allCapitalizer() {
        setConverted('uppercase', inputText.value.toUpperCase());
    }

    function lowerCase() {
        setConverted('lowercase', inputText.value.toLowerCase());
    }

    function hashtagsCreator() {
        setConverted(
            'hashtag',
            inputText.value
                .split(' ')
                .map((word) => (word.startsWith('#') ? word : `#${word}`))
                .join(' ')
        );
    }

    function reverseText() {
        setConverted('reverse', inputText.value.split('').reverse().join(''));
    }

    function binaryCreator() {
        activeTool.value = 'toBinary';

        let binary = '';
        for (let i = 0; i < inputText.value.length; i++) {
            const charCode = inputText.value.charCodeAt(i);
            const binaryCode = charCode.toString(2);
            binary += binaryCode.padStart(8, '0') + ' ';
        }

        convertedText.value = binary.trim();
    }

    function binaryTranslate() {
        activeTool.value = 'fromBinary';

        const cleanBinary = inputText.value.replace(/\s/g, '');
        if (!/^[01]+$/.test(cleanBinary)) {
            convertedText.value = '';
            showToast('Erro: Binário inválido!', 'error');
            return;
        }

        let text = '';
        for (let i = 0; i < cleanBinary.length; i += 8) {
            const byte = cleanBinary.slice(i, i + 8);
            const charCode = parseInt(byte, 2);
            text += String.fromCharCode(charCode);
        }

        convertedText.value = text;
    }

    function base64TranslateText() {
        activeTool.value = 'decodeBase64';
        try {
            convertedText.value = atob(inputText.value);
        } catch {
            convertedText.value = '';
            showToast('Erro: Não foi possível decodificar o Base64!', 'error');
        }
    }

    const actions: Record<ToolId, () => void> = {
        capitalize: capitalizerFirst,
        uppercase: allCapitalizer,
        lowercase: lowerCase,
        hashtag: hashtagsCreator,
        reverse: reverseText,
        toBinary: binaryCreator,
        fromBinary: binaryTranslate,
        decodeBase64: base64TranslateText
    };

    function runActiveTool() {
        if (!activeTool.value) return;
        actions[activeTool.value]();
    }

    function activateTool(toolId: ToolId) {
        activeTool.value = toolId;

        if (!inputText.value.trim()) {
            convertedText.value = '';
            return;
        }

        actions[toolId]();
    }

    const tools = computed(() =>
        buildTools({
            ...actions,
            capitalize: () => activateTool('capitalize'),
            uppercase: () => activateTool('uppercase'),
            lowercase: () => activateTool('lowercase'),
            hashtag: () => activateTool('hashtag'),
            reverse: () => activateTool('reverse'),
            toBinary: () => activateTool('toBinary'),
            fromBinary: () => activateTool('fromBinary'),
            decodeBase64: () => activateTool('decodeBase64')
        })
    );

    function reflectInput(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        inputText.value = target.value;

        if (inputText.value === '') {
            convertedText.value = '';
            activeTool.value = null;
            return;
        }

        runActiveTool();
    }

    return {
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
    };
}
