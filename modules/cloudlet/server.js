import { DEVICE_ID } from './constants';
import {
    addClientConnection,
    getServerConnection,
} from '../connections-manager/index';
import { transferDataSub, transferTaskSub } from '../coms/subscribers';
import {
    ADDRESS_PARAM,
    AVAILABLE_APPLICATIONS_PARAM,
    DATA_FORMAT_PARAM,
    DATA_PARAM,
    DEVICE_ID_PARAM,
} from '../coms/constants';
import {
    getNodeStatInformation,
    setNodeInformation,
} from '../information-manager';
import {
    APPLICATIONS_STATE,
    STORAGE_STATE,
} from '../information-manager/constants';
import { HIG_STATE } from '../system-stats/constants';
import { transferData } from '../transfers';
import { taskReciever } from '../tasks';

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
        transferDataSub(
            socket,
            ({ [DATA_PARAM]: data, [DATA_FORMAT_PARAM]: dataFormat }) => {
                if (
                    getNodeStatInformation(DEVICE_ID, STORAGE_STATE) ===
                    HIG_STATE
                )
                    transferData(data, dataFormat);
            }
        );

        transferTaskSub(socket, taskReciever);
    });
};
export { serverSetup };
