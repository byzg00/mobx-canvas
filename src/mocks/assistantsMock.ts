import { AllAssistantResponseBody } from '@/api/generated_api';
import { SnakeCaseObject } from '@/types';

import promptsMock from './promptsMock';
import collectionsMock from './collectionsMock';

const assistantsMock: SnakeCaseObject<AllAssistantResponseBody>[] = [
    {
        description: 'Ассистент для помощи программистам: отвечает на вопросы, объясняет код, генерирует функции',
        prompt_id: '9c0f4a9a-71a6-4a7c-b5ff-8c3d1a0e6b11',
        collection_id: 'a24f5080-3fd7-4ea9-8d3c-9987a71f0a40',
        id: '4bd88e67-e5c3-4569-bf09-daf1eb014029',
        created_at: '2025-06-09T11:49:06.334Z',
        updated_at: '2025-06-09T11:49:06.334Z',
        enabled: true,
        deleted: false,
        name: 'CodeHelper AI',
    },
    {
        description: 'AI-ассистент для ежедневного планирования задач и управления временем',
        prompt_id: promptsMock[3].id,
        collection_id: collectionsMock[4].id,
        id: 'a8354fcb-d4ae-4c83-a07b-d87c730e3e26',
        created_at: '2025-12-09T11:49:06.334Z',
        updated_at: '2025-06-09T11:49:06.334Z',
        enabled: true,
        deleted: false,
        name: 'TimeMaster AI',
    },
    {
        description: 'Персональный помощник-психотерапевт для поддержки и медитаций',
        prompt_id: 'b9a6676d-fb24-4e58-9a7e-89e1ef2a43bc',
        collection_id: 'e35d55c2-f50f-4769-8e9a-d1e2a3e539db',
        id: 'd11b389f-164f-40cf-8d38-48b8fc6c8cbe',
        created_at: '2025-06-09T11:49:06.334Z',
        updated_at: '2025-06-09T11:49:06.334Z',
        enabled: false,
        deleted: false,
        name: 'CalmMind AI',
    },
    {
        description: 'AI-консьерж для путешествий: бронирование, советы, маршруты',
        prompt_id: '3ea32b15-2b62-45ae-bb1e-7ec82ddcf6ed',
        collection_id: 'fa870f38-c8e4-40cf-a7bc-bd40dc4b05cf',
        id: 'dccefa5d-f118-41c7-a98d-194149a64eaa',
        created_at: '2025-06-09T11:49:06.334Z',
        updated_at: '2025-06-09T11:49:06.334Z',
        enabled: true,
        deleted: false,
        name: 'TravelMate AI',
    },
    {
        description: 'Образовательный ассистент: помогает учиться, сдает экзамены, объясняет темы',
        prompt_id: 'edf9b029-9e4d-4cf9-9b57-09b093f2cf38',
        collection_id: 'fd96f8f2-2a77-41ae-b70d-6d7950f9cba5',
        id: '6a82640e-3d68-46f9-b94e-d5bbcf03e031',
        created_at: '2025-06-09T11:49:06.334Z',
        updated_at: '2025-06-09T11:49:06.334Z',
        enabled: false,
        deleted: false,
        name: 'StudyGenie AI',
    },
    {
        description: 'Маркетинговый AI: анализирует аудитории, предлагает креативы, пишет тексты',
        prompt_id: 'fb4fc412-d9ae-4a95-8586-bb984d178e20',
        collection_id: '2c4ff1a4-7921-4083-83be-2be21f9ef93e',
        id: '3d8d49bb-4b28-4e0e-a417-6517d7e31ba3',
        created_at: '2025-06-09T11:49:06.334Z',
        updated_at: '2025-06-09T11:49:06.334Z',
        enabled: true,
        deleted: false,
        name: 'MarketSage AI',
    },
];
export default assistantsMock;
