function validateHttpReq(req) {
    const methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    const versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0']
    const regExUni = /(^[\\w.+]+$)/;
    const regExMessage = /(^[\\w.+]+$)/;
    if (!req.method || !methods.includes(req.method)) {
        throw new Error(`Invalid request header: Invalid Method`)
    }
    if (!req.uri || req.uri === '' || !regExUni.test(req.uri)) {
        throw new Error(`Invalid request header: Invalid URI`)
    }
    if (!req.version || !versions.includes(req.version)) {
        throw new Error(`Invalid request header: Invalid Version`)
    }
    if (req.message === undefined || regExMessage.test(req.message)) {
        throw new Error(`Invalid request header: Invalid Message`)
    }
    return req;
}

// console.log(validateHttpReq(
//     {
//         method: 'GET',
//         uri: 'svn.public.catalog',
//         version: 'HTTP/1.1',
//         message: ''
//     }
// ));
// console.log(validateHttpReq(
//     {
//         method: 'OPTIONS',
//         uri: 'git.master',
//         version: 'HTTP/1.1',
//         message: '-recursive'
//     }
// ));
//
// console.log(validateHttpReq(
//     {
//         method: 'POST',
//         uri: 'home.bash',
//         message: 'rm -rf /*'
//     }
// ));
// console.log(validateHttpReq(
//     {
//         method: 'POST',
//         uri: 'home.bash',
//         version: 'HTTP/2.0'
//     }
// ));
const obj =  {
    method: 'POST',
    uri: 'home.bash',
    version: 'HTTP/2.0'
}

console.log(obj.message)