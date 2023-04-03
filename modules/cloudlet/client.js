import {
    ADDRESS_PARAM,
    AVAILABLE_APPLICATIONS_PARAM,
    DEVICE_ID_PARAM,
} from '../coms/constants.js';
import { cpuUpdateSub, storageUpdateSub } from '../coms/subscribers.js';
import { addServerConnection } from '../connections-manager/index.js';
import { ALL_APPLICATIONS_LIST } from '../information-manager/constants.js';
import {
    handleReceiveCpuUpdate,
    handleReceiveStorageUpdate,
} from '../information-manager/index.js';
import { DEVICE_ID, SERVER_ADDRESS, SERVER_PORT } from './constants.js';

const clientSetup = socket => {
    socket.on('connect', () => {
        console.log('conected');
    });

    socket.on('hello', ({ [DEVICE_ID_PARAM]: deviceId }) => {
        addServerConnection(deviceId, socket);
        socket.emit('hello', {
            [DEVICE_ID_PARAM]: DEVICE_ID,
            [ADDRESS_PARAM]: `${SERVER_ADDRESS}:${SERVER_PORT}`,
            [AVAILABLE_APPLICATIONS_PARAM]: ALL_APPLICATIONS_LIST,
        });
    });

    // subscribe to update events
    storageUpdateSub(socket, handleReceiveStorageUpdate);
    cpuUpdateSub(socket, handleReceiveCpuUpdate);
};

export { clientSetup };
