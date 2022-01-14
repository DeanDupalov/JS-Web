const routes = {};

function main(req, res) {
    console.log('>>> Node.js server running on port 3000');
    console.log(req.method);

    const url = new URL(req.url, `http://${req.headers.host}`);

    req.url = url;

    let handler;
    const actions = routes[url.pathname];
    if(actions) {
        handler = actions[req.method]
    }
    if(typeof handler === 'function'){
        handler(req, res);
    }else{
        defaultAction(req, res)
    }
    
}

function register(method, pathname, handler) {
    if(routes[pathname] === undefined){
        routes[pathname] = {};
    }
    routes[pathname][method] = handler;
}

function get(pathname, handler) {
    register('GET', pathname, handler);
}
function post(pathname, handler) {
    register('POST', pathname, handler);
}


function defaultAction(req, res) {
    res.statusCode = 404;
    res.write(`
<h1>404 Not Found</h1>
<p>The resource you requested cannot be found</p>`)
    res.end();
}

const router = {
    main,
    register,
    get,
    post
}


module.exports = router