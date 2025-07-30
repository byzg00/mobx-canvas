import { type RetrieveSourceResponseBody } from '@/api/generated_api';
import { SnakeCaseObject } from '@/types';

const sourcesMock: SnakeCaseObject<RetrieveSourceResponseBody>[] = [
    {
        source_type_id: 'b65e37ab-dfc4-4b56-9c9c-8bcb70ad0cc1',
        is_directory: false,
        drop_old: true,
        ids: [
            'source_1',
            'source_2',
        ],
        exclude_ids: [
            'exclude_1',
        ],
        preprocessing_steps: [
            'tokenization',
            'stop_word_removal',
        ],
        source_settings: {
            encoding: 'utf-8',
            compression: 'gzip',
        },
        id: 'cc1b0d50-d457-4e9a-bd37-f8fa9ac5402d',
        created_at: '2025-06-25T14:39:51.227Z',
        updated_at: '2025-06-25T14:39:51.227Z',
        enabled: true,
        deleted: false,
        name: 'TechArticlesSource',
    },
    {
        source_type_id: 'f1e39b6e-1b69-4380-8cb2-5ad1c39a2873',
        is_directory: true,
        drop_old: false,
        ids: [
            'article_1',
            'article_2',
        ],
        exclude_ids: [],
        preprocessing_steps: [
            'text_cleaning',
            'lemmatization',
        ],
        source_settings: {
            source: 'wikipedia',
            language: 'en',
        },
        id: 'eaab1f93-c13e-4874-b2d9-03339a545379',
        created_at: '2025-06-25T14:39:51.227Z',
        updated_at: '2025-06-25T14:39:51.227Z',
        enabled: true,
        deleted: false,
        name: 'WikipediaSource',
    },
    {
        source_type_id: '99ea56b1-f8f9-43a5-bfe5-c1c7cbd08b4c',
        is_directory: false,
        drop_old: true,
        ids: [
            'source_3',
        ],
        exclude_ids: [
            'exclude_2',
        ],
        preprocessing_steps: [
            'tokenization',
            'entity_recognition',
        ],
        source_settings: {
            max_results: '100',
            fetch_interval: '5m',
        },
        id: 'd5ef0d63-b89b-41d2-a5d7-44cd205d208d',
        created_at: '2025-06-25T14:39:51.227Z',
        updated_at: '2025-06-25T14:39:51.227Z',
        enabled: true,
        deleted: false,
        name: 'NewsSource',
    },
    {
        source_type_id: '7e73f4b7-0635-4c0a-bba3-bd65e93a10c6',
        is_directory: true,
        drop_old: false,
        ids: [
            'source_4',
        ],
        exclude_ids: [],
        preprocessing_steps: [
            'synonym_expansion',
            'text_cleaning',
        ],
        source_settings: {
            language: 'fr',
            source: 'local_archive',
        },
        id: 'e3b2e42e-8f26-47d5-9155-c581ba5a6015',
        created_at: '2025-06-25T14:39:51.227Z',
        updated_at: '2025-06-25T14:39:51.227Z',
        enabled: true,
        deleted: false,
        name: 'FrenchHistorySource',
    },
    {
        source_type_id: '0fc557c8-d476-47ea-b0f3-b40556cf7b88',
        is_directory: false,
        drop_old: true,
        ids: [
            'source_5',
        ],
        exclude_ids: [],
        preprocessing_steps: [
            'stop_word_removal',
            'part_of_speech_tagging',
        ],
        source_settings: {
            api_key: 'xyz123',
            endpoint: 'https://api.legaldata.com',
        },
        id: '8cb7f3bc-21b0-4f4f-8d4e-4970a13ae022',
        created_at: '2025-06-25T14:39:51.227Z',
        updated_at: '2025-06-25T14:39:51.227Z',
        enabled: true,
        deleted: false,
        name: 'LegalDataSource',
    },
];
export default sourcesMock;
