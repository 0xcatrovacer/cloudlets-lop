const io = require('socket.io-client');
const { Server } = require('socket.io');
import { clientSetup } from './client';
import { INITIAL_CONNECT_NODES, SERVER_PORT } from './constants';
import { serverSetup } from './server';

const setupCloudlet = () => {
    const clients = INITIAL_CONNECT_NODES.map(nodeIp => io(nodeIp));
    const server = new Server(SERVER_PORT);

    // setup server
    global.server = server;
    serverSetup(server, clientAddress => clientSetup(io(clientAddress)));

    // setup client
    clients.forEach(client => clientSetup(client));
};

export { setupCloudlet };
