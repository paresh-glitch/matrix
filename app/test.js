const http = require('http');
const app = require('./index');

let passed = 0;
let failed = 0;

function check(name, condition) {
    if (condition) { console.log(`✅ ${name}`); passed++; }
    else { console.log(`❌ ${name}`); failed++; }
}

setTimeout(() => {
    http.get('http://localhost:3000/health', (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
            const body = JSON.parse(data);
            check('health returns 200', res.statusCode === 200);
            check('status is healthy', body.status === 'healthy');
            console.log(`\n${passed} passed, ${failed} failed`);
            app.close();
            process.exit(failed > 0 ? 1 : 0);
        });
    });
}, 500);
