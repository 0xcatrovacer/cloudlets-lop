import { Server } from 'socket.io';
import { logger } from '../logger/index.js';
import { clientSetup } from './client.js';
import { INITIAL_CONNECT_NODES, SERVER_PORT } from './constants.js';
import { serverSetup } from './server.js';

const options = {
    cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    },
};

const setupCloudlet = () => {
    logger('setup cloudlet -- init');

    const clients = INITIAL_CONNECT_NODES;
    const server = new Server(SERVER_PORT, options);

    logger('server port -- ', SERVER_PORT);
    logger('INITIAL_CONNECT_NODES=' + INITIAL_CONNECT_NODES);

    // setup server
    global.server = server;
    serverSetup(server, clientAddress => clientSetup(clientAddress));

    // setup client
    clients.forEach(client => clientSetup(client));
};

export { setupCloudlet };
