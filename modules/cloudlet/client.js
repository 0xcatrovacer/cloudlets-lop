import { ADDRESS_PARAM, DEVICE_ID_PARAM } from '../coms/constants';
import { cpuUpdateSub, storageUpdateSub } from '../coms/subscribers';
import { addServerConnection } from '../connections-manager';
import {
    handleReceiveCpuUpdate,
    handleReceiveStorageUpdate,
} from '../information-manager';
import { DEVICE_ID, SERVER_ADDRESS, SERVER_PORT } from './constants';

const clientSetup = socket => {
    socket.on('connect', () => {
        console.log('conected');
    });

    socket.on('hello', ({ [DEVICE_ID_PARAM]: deviceId }) => {
        addServerConnection(deviceId, socket);
        socket.emit('hello', {
            [DEVICE_ID_PARAM]: DEVICE_ID,
            [ADDRESS_PARAM]: `${SERVER_ADDRESS}:${SERVER_PORT}`,
        });
    });

    // subscribe to update events
    storageUpdateSub(socket, handleReceiveStorageUpdate);
    cpuUpdateSub(socket, handleReceiveCpuUpdate);
};

export { clientSetup };
