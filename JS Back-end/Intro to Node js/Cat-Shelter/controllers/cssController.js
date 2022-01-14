const fs = require('fs');

function cssAction(req, res) {
    let css = fs.readFileSync('./content/styles/site.css');
    res.writeHead(200, {
        'Content-Type': 'text/css'
    });
    res.write(css);
    res.end();
}

module.exports = cssAction