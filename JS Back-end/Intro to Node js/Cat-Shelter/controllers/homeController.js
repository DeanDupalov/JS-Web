const fs = require('fs');

function homeAction(req, res) {
    let content = fs.readFileSync('./views/home/index.html');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(content);
    res.end();
}

module.exports = {
    homeAction,
};