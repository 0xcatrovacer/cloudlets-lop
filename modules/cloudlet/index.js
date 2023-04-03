import { Server } from 'socket.io';
import { io } from 'socket.io-client';
import { clientSetup } from './client.js';
import { INITIAL_CONNECT_NODES, SERVER_PORT } from './constants.js';
import { serverSetup } from './server.js';

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
