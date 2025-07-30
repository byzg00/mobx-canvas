import { readdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { spawn } from 'child_process';

// Текущий путь
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.resolve(__dirname, './db.json');
if (!existsSync(outputPath)) {
    const mocksDir = path.resolve(__dirname, '../src/mocks');


// Собираем все .ts-файлы из папки mocks
    const files = (await readdir(mocksDir)).filter((f) => f.endsWith('.ts'));

    const db: Record<string, unknown> = {};

// eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
        const name = path.basename(file.split('Mock')[0], '.ts');
        const fullPath = path.resolve(mocksDir, file);
        // eslint-disable-next-line no-await-in-loop
        const _module = await import(pathToFileURL(fullPath).href);
        db[name] = _module.default;
    }

// Пишем результат в db.json
    await writeFile(outputPath, JSON.stringify(db, null, 2), 'utf-8');
}

console.log('✅ db.json создан. Запускаем json-server...');

// Запускаем json-server
// spawn('npx', ['tsx', path.resolve(__dirname, './server.ts')], {
//     stdio: 'inherit',
// });
spawn('npx', [
    'json-server',
    '--host',
    '0.0.0.0',
    '--watch',
    path.resolve(__dirname, './db.json'),
    '--port',
    '8000',
    '--middlewares',
    path.resolve(__dirname, './middleware.cjs'),
], {
    stdio: 'inherit',
});
