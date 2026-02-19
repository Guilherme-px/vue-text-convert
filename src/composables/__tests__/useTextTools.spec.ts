import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTextTools } from '@/composables/useTextTools';

function makeInputEvent(value: string) {
    return { target: { value } } as unknown as Event;
}

function atobBrowserLike(b64: string) {
    const cleaned = b64.trim();

    const isValidChars = /^[A-Za-z0-9+/]*={0,2}$/.test(cleaned);
    const isValidLength = cleaned.length % 4 === 0;

    if (!cleaned || !isValidChars || !isValidLength) {
        throw new Error('InvalidCharacterError');
    }

    return Buffer.from(cleaned, 'base64').toString('binary');
}

describe('useTextTools composable', () => {
    beforeEach(() => {
        vi.useFakeTimers();

        vi.stubGlobal('atob', atobBrowserLike);

        vi.stubGlobal('navigator', {
            clipboard: {
                writeText: vi.fn().mockResolvedValue(undefined)
            }
        });
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it('initializes with default state', () => {
        const c = useTextTools();

        expect(c.inputText.value).toBe('');
        expect(c.convertedText.value).toBe('');
        expect(c.copied.value).toBe(false);
        expect(c.showToasted.value).toBe(false);
        expect(c.message.value).toBe('');
        expect(c.toastType.value).toBe('success');
        expect(c.activeTool.value).toBeNull();
    });

    it('computes letterCount and wordCount correctly', () => {
        const c = useTextTools();

        c.inputText.value = 'Hello world';
        expect(c.letterCount.value).toBe(10);
        expect(c.wordCount.value).toBe(2);

        c.inputText.value = '  \n  ';
        expect(c.letterCount.value).toBe(0);
        expect(c.wordCount.value).toBe(0);

        c.inputText.value = 'um   dois   três';
        expect(c.wordCount.value).toBe(3);
    });

    it('isFaIcon works as a type guard', () => {
        const c = useTextTools();

        expect(c.isFaIcon('Aa')).toBe(false);
        expect(c.isFaIcon({ type: 'fa', name: 'fa-solid fa-hashtag' })).toBe(true);
    });

    it('activates a tool and converts immediately (uppercase)', () => {
        const c = useTextTools();

        c.reflectInput(makeInputEvent('hello'));
        expect(c.convertedText.value).toBe('');

        const uppercaseTool = c.tools.value.find((t) => t.id === 'uppercase');
        expect(uppercaseTool).toBeTruthy();

        uppercaseTool!.action();

        expect(c.activeTool.value).toBe('uppercase');
        expect(c.convertedText.value).toBe('HELLO');
    });

    it('auto-converts while typing when a tool is active', () => {
        const c = useTextTools();

        c.reflectInput(makeInputEvent('hello'));

        const uppercaseTool = c.tools.value.find((t) => t.id === 'uppercase')!;
        uppercaseTool.action();

        expect(c.convertedText.value).toBe('HELLO');

        c.reflectInput(makeInputEvent('hi there'));
        expect(c.convertedText.value).toBe('HI THERE');
    });

    it('resets convertedText and activeTool when input becomes empty', () => {
        const c = useTextTools();

        c.reflectInput(makeInputEvent('hello'));
        c.tools.value.find((t) => t.id === 'uppercase')!.action();

        expect(c.activeTool.value).toBe('uppercase');
        expect(c.convertedText.value).toBe('HELLO');

        c.reflectInput(makeInputEvent(''));
        expect(c.inputText.value).toBe('');
        expect(c.convertedText.value).toBe('');
        expect(c.activeTool.value).toBeNull();
    });

    it('keeps activeTool but does not convert when input is empty and a tool is clicked', () => {
        const c = useTextTools();

        expect(c.inputText.value).toBe('');
        expect(c.activeTool.value).toBeNull();

        c.tools.value.find((t) => t.id === 'lowercase')!.action();

        expect(c.activeTool.value).toBe('lowercase');
        expect(c.convertedText.value).toBe('');
    });

    it('converts to hashtags correctly', () => {
        const c = useTextTools();

        c.reflectInput(makeInputEvent('hello world'));
        c.tools.value.find((t) => t.id === 'hashtag')!.action();

        expect(c.activeTool.value).toBe('hashtag');
        expect(c.convertedText.value).toBe('#hello #world');

        c.reflectInput(makeInputEvent('vue typescript'));
        expect(c.convertedText.value).toBe('#vue #typescript');
    });

    it('converts text to binary (toBinary)', () => {
        const c = useTextTools();

        c.reflectInput(makeInputEvent('A'));
        c.tools.value.find((t) => t.id === 'toBinary')!.action();

        expect(c.activeTool.value).toBe('toBinary');
        expect(c.convertedText.value).toBe('01000001');
    });

    it('translates binary to text (fromBinary) for valid input', () => {
        const c = useTextTools();

        c.reflectInput(makeInputEvent('01000001'));
        c.tools.value.find((t) => t.id === 'fromBinary')!.action();

        expect(c.activeTool.value).toBe('fromBinary');
        expect(c.convertedText.value).toBe('A');
    });

    it('shows an error toast for invalid binary (fromBinary)', () => {
        const c = useTextTools();

        c.reflectInput(makeInputEvent('0100000X'));
        c.tools.value.find((t) => t.id === 'fromBinary')!.action();

        expect(c.activeTool.value).toBe('fromBinary');
        expect(c.convertedText.value).toBe('');
        expect(c.showToasted.value).toBe(true);
        expect(c.toastType.value).toBe('error');
        expect(c.message.value).toBe('Erro: Binário inválido!');

        vi.advanceTimersByTime(2000);
        expect(c.showToasted.value).toBe(false);
    });

    it('decodes base64 correctly', () => {
        const c = useTextTools();

        c.reflectInput(makeInputEvent('SGVsbG8='));
        c.tools.value.find((t) => t.id === 'decodeBase64')!.action();

        expect(c.activeTool.value).toBe('decodeBase64');
        expect(c.convertedText.value).toBe('Hello');
    });

    it('shows an error toast for invalid base64', () => {
        const c = useTextTools();

        c.reflectInput(makeInputEvent('%%%'));
        c.tools.value.find((t) => t.id === 'decodeBase64')!.action();

        expect(c.activeTool.value).toBe('decodeBase64');
        expect(c.convertedText.value).toBe('');
        expect(c.showToasted.value).toBe(true);
        expect(c.toastType.value).toBe('error');
        expect(c.message.value).toBe('Erro: Não foi possível decodificar o Base64!');

        vi.advanceTimersByTime(2000);
        expect(c.showToasted.value).toBe(false);
    });

    it('does nothing when copiarTexto is called with empty convertedText', async () => {
        const c = useTextTools();

        c.convertedText.value = '';
        await c.copiarTexto();

        expect(c.copied.value).toBe(false);
        expect(c.showToasted.value).toBe(false);
    });

    it('copies text and shows a success toast when copiarTexto succeeds', async () => {
        const c = useTextTools();

        c.convertedText.value = 'abc';

        const writeText = navigator.clipboard.writeText as unknown as ReturnType<typeof vi.fn>;
        writeText.mockResolvedValueOnce(undefined);

        await c.copiarTexto();

        expect(writeText).toHaveBeenCalledWith('abc');
        expect(c.copied.value).toBe(true);
        expect(c.showToasted.value).toBe(true);
        expect(c.toastType.value).toBe('success');
        expect(c.message.value).toBe('Texto copiado com sucesso!');

        vi.advanceTimersByTime(2000);
        expect(c.showToasted.value).toBe(false);
        expect(c.copied.value).toBe(false);
    });

    it('shows an error toast when copiarTexto fails', async () => {
        const c = useTextTools();

        c.convertedText.value = 'abc';

        const writeText = navigator.clipboard.writeText as unknown as ReturnType<typeof vi.fn>;
        writeText.mockRejectedValueOnce(new Error('fail'));

        await c.copiarTexto();

        expect(c.copied.value).toBe(false);
        expect(c.showToasted.value).toBe(true);
        expect(c.toastType.value).toBe('error');
        expect(c.message.value).toBe('Erro ao copiar o texto!');

        vi.advanceTimersByTime(2000);
        expect(c.showToasted.value).toBe(false);
    });

    it('clearInputs resets inputText, convertedText, and activeTool', () => {
        const c = useTextTools();

        c.reflectInput(makeInputEvent('hello'));
        c.tools.value.find((t) => t.id === 'uppercase')!.action();

        expect(c.inputText.value).toBe('hello');
        expect(c.convertedText.value).toBe('HELLO');
        expect(c.activeTool.value).toBe('uppercase');

        c.clearInputs();

        expect(c.inputText.value).toBe('');
        expect(c.convertedText.value).toBe('');
        expect(c.activeTool.value).toBeNull();
    });
});
