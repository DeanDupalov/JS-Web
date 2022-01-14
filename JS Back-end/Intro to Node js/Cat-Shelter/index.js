const http = require('http');
const router = require("./router");
const {homeAction} = require("./controllers/homeController");
const cssAction = require("./controllers/cssController");

const server = http.createServer(router.main);

router.get('/', homeAction);
router.get('/content/styles/site.css', cssAction);
server.listen(3000)

console.log('>>> Node.js server running on port 3000');
