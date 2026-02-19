import type { ToolId, ToolItem } from '@/types/types';

export type ToolMeta = Omit<ToolItem, 'action'> & { id: ToolId };

export const toolsMeta: ToolMeta[] = [
    {
        id: 'capitalize',
        label: 'Primeiras Maiúsculas',
        icon: 'Aa',
        description: 'Capitaliza a primeira letra',
        testId: 'btn-capitalizerFirst'
    },
    {
        id: 'uppercase',
        label: 'Todas Maiúsculas',
        icon: 'AA',
        description: 'Converte para maiúsculas',
        testId: 'btn-allCapitalizer'
    },
    {
        id: 'lowercase',
        label: 'Todas Minúsculas',
        icon: 'aa',
        description: 'Converte para minúsculas',
        testId: 'btn-lowerCase'
    },
    {
        id: 'hashtag',
        label: 'Criador de Hashtag',
        icon: { type: 'fa', name: 'fa-solid fa-hashtag' },
        description: 'Cria hashtags do texto',
        testId: 'btn-hashtagsCreator'
    },
    {
        id: 'reverse',
        label: 'Inverter Texto',
        icon: { type: 'fa', name: 'fa-solid fa-left-right' },
        description: 'Inverte ordem dos caracteres',
        testId: 'btn-reverseText'
    },
    {
        id: 'toBinary',
        label: 'Converter para Binário',
        icon: '001',
        description: 'Converte para código binário',
        testId: 'btn-textToBinary'
    },
    {
        id: 'fromBinary',
        label: 'Traduzir Binário',
        icon: '010',
        description: 'Converte binário para texto',
        testId: 'btn-binaryTranslate'
    },
    {
        id: 'decodeBase64',
        label: 'Decodificar Base64',
        icon: 'B64',
        description: 'Decodifica texto em Base64',
        testId: 'btn-base64Translate'
    }
];

export function buildTools(actions: Record<ToolId, () => void>): ToolItem[] {
    return toolsMeta.map((t) => {
        const action = actions[t.id];
        if (!action) throw new Error(`Missing action for tool: ${t.id}`);
        return { ...t, action };
    });
}
