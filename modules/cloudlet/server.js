import { DEVICE_ID } from './constants';
import {
    addClientConnection,
    getServerConnection,
} from '../connections-manager/index';
import { transferDataSub, transferTaskSub } from '../coms/subscribers';
import { ADDRESS_PARAM, DEVICE_ID_PARAM } from '../coms/constants';

const serverSetup = (io, addClient) => {
    io.on('connection', socket => {
        console.log('listening to new node on socket', socket.id);

        // send device ID
        socket.emit('hello', { [DEVICE_ID_PARAM]: DEVICE_ID });
        socket.on(
            'hello',
            ({ [DEVICE_ID_PARAM]: deviceId, [ADDRESS_PARAM]: address }) => {
                addClientConnection(deviceId, socket);
                !getServerConnection(deviceId) && addClient(address);
            }
        );

        // subscribe to transfer events
        transferDataSub(socket, () => {});
        transferTaskSub(socket, () => {});
    });
};
export { serverSetup };
