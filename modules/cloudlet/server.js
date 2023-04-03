import { DEVICE_ID } from './constants.js';
import {
    addClientConnection,
    getServerConnection,
} from '../connections-manager/index.js';
import { transferDataSub, transferTaskSub } from '../coms/subscribers.js';
import {
    ADDRESS_PARAM,
    AVAILABLE_APPLICATIONS_PARAM,
    DATA_FORMAT_PARAM,
    DATA_PARAM,
    DEVICE_ID_PARAM,
} from '../coms/constants.js';
import {
    getNodeStatInformation,
    setNodeInformation,
} from '../information-manager/index.js';
import {
    APPLICATIONS_STATE,
    STORAGE_STATE,
} from '../information-manager/constants.js';
import { HIG_STATE } from '../system-stats/constants.js';
import { transferData } from '../transfers/index.js';
import { taskReciever } from '../tasks/index.js';

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
