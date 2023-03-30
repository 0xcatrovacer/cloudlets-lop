import { DEVICE_ID } from './constants';
import {
    addClientConnection,
    getServerConnection,
} from '../connections-manager/index';
import { transferDataSub, transferTaskSub } from '../coms/subscribers';
import {
    ADDRESS_PARAM,
    AVAILABLE_APPLICATIONS_PARAM,
    DEVICE_ID_PARAM,
} from '../coms/constants';
import { setNodeInformation } from '../information-manager';
import { APPLICATIONS_STATE } from '../information-manager/constants';

const serverSetup = (io, reverseConnectClient) => {
    io.on('connection', socket => {
        console.log('listening to new node on socket', socket.id);

        // send device ID
        socket.emit('hello', { [DEVICE_ID_PARAM]: DEVICE_ID });
        socket.on(
            'hello',
            ({
                [DEVICE_ID_PARAM]: deviceId,
                [ADDRESS_PARAM]: address,
                [AVAILABLE_APPLICATIONS_PARAM]: apps,
            }) => {
                addClientConnection(deviceId, socket);
                setNodeInformation(deviceId, APPLICATIONS_STATE, apps);
                !getServerConnection(deviceId) && reverseConnectClient(address);
            }
        );

        // subscribe to transfer events
        transferDataSub(socket, () => {});
        transferTaskSub(socket, () => {});
    });
};
export { serverSetup };
