import { describe, expect, it, vi } from 'vitest';
import { buildTools, toolsMeta } from '@/utils/toolsList';
import type { ToolId } from '@/types/types';

type ActionMock = ReturnType<typeof vi.fn>;

function makeActions() {
    const mocks = {} as Record<ToolId, ActionMock>;
    const actions = {} as Record<ToolId, () => void>;

    for (const t of toolsMeta) {
        const mock = vi.fn();
        mocks[t.id] = mock;
        actions[t.id] = () => mock();
    }

    return { mocks, actions };
}

describe('toolsList util', () => {
    it('buildTools should keep toolsMeta order and copy meta fields', () => {
        const { actions } = makeActions();

        const tools = buildTools(actions);

        expect(tools).toHaveLength(toolsMeta.length);

        tools.forEach((tool, i) => {
            const meta = toolsMeta[i];

            expect(tool.id).toBe(meta.id);
            expect(tool.label).toBe(meta.label);
            expect(tool.description).toBe(meta.description);
            expect(tool.testId).toBe(meta.testId);
            expect(tool.icon).toEqual(meta.icon);
            expect(typeof tool.action).toBe('function');
        });
    });

    it('buildTools should attach the correct action for each tool id', () => {
        const { mocks, actions } = makeActions();

        const tools = buildTools(actions);

        for (const tool of tools) {
            tool.action();
            expect(mocks[tool.id]).toHaveBeenCalledTimes(1);
        }
    });

    it('buildTools should throw if an action is missing', () => {
        const broken = {} as unknown as Record<ToolId, () => void>;
        expect(() => buildTools(broken)).toThrow(/Missing action/);
    });
});
