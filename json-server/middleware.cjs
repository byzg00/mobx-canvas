// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
//
// server.use(jsonServer.defaults());
// // server.use(jsonServer.bodyParser);
//
// server.use((req, res) => {
// //     if (req.method === 'GET' && req.url.match(/all/)) {
// //         res.status(200);
// //         res.json({
// //             // @ts-ignore
// //             objects: db[req.url.split('/')[1]],
// //         });
// //     }
// });
//
// server.use(router);
// server.listen(8000, () => {
//     console.log('JSON Server is running');
// });
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();
//
// // Set default middlewares (logger, static, cors and no-cache)
// server.use(middlewares);
//
// // Add custom routes before JSON Server router
// server.get('/:entity(assistants|collections|prompts)/all', (req, res) => {
//     res.json({
//         // @ts-ignore
//         objects: db[req.params.entity],
//     });
// });
//
// server.use(jsonServer.bodyParser);
//
// // Use default router
// server.use(router);
// server.listen(8000, () => {
//     console.log('JSON Server is running');
// });
const dayJs = require('dayjs');

const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
    if (req.method === 'GET' && req.url.match(/all/)) {
        const dbRaw = fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8');
        const db = JSON.parse(dbRaw);
        res.json({
            // @ts-ignore
            objects: db[req.url.split('/')[1]],
        });
    } else {
        if (req.method === 'POST') {
            req.body.created_at = dayJs().format();
            req.body.updated_at = dayJs().format();
        }
        next();
    }
};
