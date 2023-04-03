import { io } from 'socket.io-client';
import {
    ADDRESS_PARAM,
    AVAILABLE_APPLICATIONS_PARAM,
    DEVICE_ID_PARAM,
} from '../coms/constants.js';
import {
    cpuUpdateSub,
    storageUpdateSub,
    transferDataSub,
} from '../coms/subscribers.js';
import { addServerConnection } from '../connections-manager/index.js';
import { ALL_APPLICATIONS_LIST } from '../information-manager/constants.js';
import {
    handleReceiveCpuUpdate,
    handleReceiveStorageUpdate,
} from '../information-manager/index.js';
import { logger } from '../logger/index.js';
import {
    DEVICE_ID,
    SERVER_ADDRESS,
    SERVER_PORT,
    SERVER_PROTOCOL,
} from './constants.js';

const clientSetup = serverAddr => {
    logger('setup client - initiated', `server addr: ${serverAddr}`);

    const socket = io(serverAddr);

    socket.on('connect', () => {
        logger('client connect to ' + socket.id);
    });

    socket.on('connect_error', () => {
        logger('failed -- client connect to ', socket.id);
    });

    socket.on('hello', ({ [DEVICE_ID_PARAM]: deviceId }) => {
        addServerConnection(deviceId, socket);
        socket.emit('hello', {
            [DEVICE_ID_PARAM]: DEVICE_ID,
            [ADDRESS_PARAM]: `${SERVER_PROTOCOL}://${SERVER_ADDRESS}:${SERVER_PORT}`,
            [AVAILABLE_APPLICATIONS_PARAM]: ALL_APPLICATIONS_LIST,
        });
    });

    // subscribe to update events
    storageUpdateSub(socket, handleReceiveStorageUpdate);
    cpuUpdateSub(socket, handleReceiveCpuUpdate);

    logger('setup client - done');
};

export { clientSetup };
