import { AllAssistantResponseBody } from '@/api/generated_api';
import { SnakeCaseObject } from '@/types';

import promptsMock from './promptsMock';
import collectionsMock from './collectionsMock';

const assistantsMock: SnakeCaseObject<AllAssistantResponseBody>[] = [
    {
        description: 'Ассистент для помощи программистам: отвечает на вопросы, объясняет код, генерирует функции',
        prompt_id: promptsMock[2].id,
        collection_id: collectionsMock[4].id,
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
        prompt_id: promptsMock[2].id,
        collection_id: collectionsMock[2].id,
        id: 'd11b389f-164f-40cf-8d38-48b8fc6c8cbe',
        created_at: '2025-06-09T11:49:06.334Z',
        updated_at: '2025-06-09T11:49:06.334Z',
        enabled: false,
        deleted: false,
        name: 'CalmMind AI',
    },
    {
        description: 'AI-консьерж для путешествий: бронирование, советы, маршруты',
        prompt_id: promptsMock[1].id,
        collection_id: collectionsMock[1].id,
        id: 'dccefa5d-f118-41c7-a98d-194149a64eaa',
        created_at: '2025-06-09T11:49:06.334Z',
        updated_at: '2025-06-09T11:49:06.334Z',
        enabled: true,
        deleted: false,
        name: 'TravelMate AI',
    },
    {
        description: 'Образовательный ассистент: помогает учиться, сдает экзамены, объясняет темы',
        prompt_id: promptsMock[0].id,
        collection_id: collectionsMock[1].id,
        id: '6a82640e-3d68-46f9-b94e-d5bbcf03e031',
        created_at: '2025-06-09T11:49:06.334Z',
        updated_at: '2025-06-09T11:49:06.334Z',
        enabled: false,
        deleted: false,
        name: 'StudyGenie AI',
    },
    {
        description: 'Маркетинговый AI: анализирует аудитории, предлагает креативы, пишет тексты',
        prompt_id: promptsMock[0].id,
        collection_id: collectionsMock[0].id,
        id: '3d8d49bb-4b28-4e0e-a417-6517d7e31ba3',
        created_at: '2025-06-09T11:49:06.334Z',
        updated_at: '2025-06-09T11:49:06.334Z',
        enabled: true,
        deleted: false,
        name: 'MarketSage AI',
    },
];
export default assistantsMock;
