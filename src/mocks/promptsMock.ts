import { AllPromptResponseBody } from '@/api/generated_api';
import { SnakeCaseObject } from '@/types';

const promptsMock: SnakeCaseObject<AllPromptResponseBody>[] = [
    {
        text: 'You are a helpful assistant who always answers politely.',
        description: 'Base personality for assistant mode.',
        id: 'b4a1a3d4-9c4a-4f0b-81b5-d781d01c90f1',
        created_at: '2025-06-11T15:19:47.894Z',
        updated_at: '2025-06-11T15:19:47.894Z',
        enabled: true,
        deleted: false,
        name: 'PoliteAssistant',
    },
    {
        text: 'Respond concisely and focus on delivering key points only.',
        description: 'Used for summary mode.',
        id: '9a6e38e7-4a3e-4e3d-b5df-bd0c725ac3c8',
        created_at: '2025-06-11T15:19:47.894Z',
        updated_at: '2025-06-11T15:19:47.894Z',
        enabled: true,
        deleted: false,
        name: 'SummaryMode',
    },
    {
        text: 'Adopt the tone and language of a senior software engineer.',
        description: 'For technical responses and code reviews.',
        id: 'f64c6eb9-b1c7-4e0a-a15c-df32dececf0c',
        created_at: '2025-06-11T15:19:47.894Z',
        updated_at: '2025-06-11T15:19:47.894Z',
        enabled: true,
        deleted: false,
        name: 'EngineerVoice',
    },
    {
        text: 'Answer in the style of a medieval sage or oracle.',
        description: 'Fun and thematic mode for fantasy-style interactions.',
        id: '1ddc3e29-6f91-4e30-acc3-05f9c9e7e39e',
        created_at: '2025-06-11T15:19:47.894Z',
        updated_at: '2025-06-11T15:19:47.894Z',
        enabled: true,
        deleted: false,
        name: 'OracleMode',
    },
    {
        text: 'Always provide citations and link to original sources when possible.',
        description: 'Used in research or academic environments.',
        id: '70f233c2-2fc7-47b3-874e-9388b6c276b2',
        created_at: '2025-06-11T15:19:47.894Z',
        updated_at: '2025-06-11T15:19:47.894Z',
        enabled: true,
        deleted: false,
        name: 'CitationRequired',
    },
];
export default promptsMock;
