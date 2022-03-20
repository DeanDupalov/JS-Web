const express = require('express');
const expressConfig = require('./config/express');
const initDb = require('./config/database')
const routesConfig = require('./config/routes')


start();

async function start() {
    await initDb()
    const app = express();
    expressConfig(app);
    routesConfig(app);

    app.listen(3030, () => console.log('>>> REST Service running on port 3030.'));
}
