export type ToolIcon =
    | string
    | {
          type: 'fa';
          name: string;
      };

export type ToolId =
    | 'capitalize'
    | 'uppercase'
    | 'lowercase'
    | 'hashtag'
    | 'reverse'
    | 'toBinary'
    | 'fromBinary'
    | 'decodeBase64';

export type ToolItem = {
    id: ToolId;
    label: string;
    icon: ToolIcon;
    description: string;
    testId: string;
    action: () => void;
};
