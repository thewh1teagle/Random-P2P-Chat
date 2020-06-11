const { PeerServer } = require('peer');


const port = 9000
const path = "/myapp"

const randomId = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);

const peerServer = PeerServer({
    port: port,
    path: path,
    generateClientId: randomId
});
console.log(`Server started at localhost:${port}${path}`)