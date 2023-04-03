import { DEVICE_ID } from '../cloudlet/constants';
import { DEVICE_ID_PARAM } from '../coms/constants';
import { transferDataPub, transferTaskPub } from '../coms/publishers';
import { getAllConnections, getClientConnection } from '../connections-manager';
import { STORAGE_STATE } from '../information-manager/constants';
import { LOW_STATE, MID_STATE } from '../system-stats/constants';
import { TRANSFER_DUMMY_DATA, TRANSFER_FORMAT_STRING } from './constants';


const transferDataToCloud = data => {
    console.log('data transfered to cloud', data);
};

const transferTaskToCloud = task => {
    console.log('task transfered to cloud', task);
};

const transferData = (
    data = TRANSFER_DUMMY_DATA,
    format = TRANSFER_FORMAT_STRING
) => {
    const connections = getAllConnections();
    let low = [],
        med = [];
    connections.forEach(connection => {
        if (connection?.stats[STORAGE_STATE] === LOW_STATE)
            low.push(connection);
        else if (connection?.stats[STORAGE_STATE] === MID_STATE)
            med.push(connection);
    });

    if (low.length > 0) {
        const randomDevice =
            low[Math.floor(Math.random() * low.length)][DEVICE_ID_PARAM];
        transferDataPub(
            getClientConnection(randomDevice),
            DEVICE_ID,
            data,
            format
        );
    } else if (med.length > 0) {
        const randomDevice =
            med[Math.floor(Math.random() * med.length)][DEVICE_ID_PARAM];
        transferDataPub(
            getClientConnection(randomDevice),
            DEVICE_ID,
            data,
            format
        );
    } else {
        transferDataToCloud(data);
    }
};

const transferTask = (
    task = {
        id: 10101,
        name: 'dummyname',
        swList: [1],
    }
) => {
    const connections = getAllConnections();
    let LL = [],
        LH = [],
        HL = [];

    connections.forEach(connection => {
        if (
            connection?.stats[STORAGE_STATE] === LOW_STATE &&
            connection?.stats[CPU_STATE] === LOW_STATE
        )
            LL.push(connection);
        else if (
            connection?.stats[STORAGE_STATE] === LOW_STATE &&
            connection?.stats[CPU_STATE] === HIGH_STATE
        )
            LH.push(connection);
        else if (
            connection?.stats[STORAGE_STATE] === HIGH_STATE &&
            connection?.stats[CPU_STATE] === LOW_STATE
        )
            HL.push(connection);
    });

    if (LL.length > 0) {
        const randomDevice =
            low[Math.floor(Math.random() * low.length)][DEVICE_ID_PARAM];
        transferTaskPub(getClientConnection(randomDevice), DEVICE_ID, task);
    } else if (LH.length > 0) {
        const randomDevice =
            low[Math.floor(Math.random() * low.length)][DEVICE_ID_PARAM];
        transferTaskPub(getClientConnection(randomDevice), DEVICE_ID, task);
    } else if (HL.length > 0) {
        const randomDevice =
            low[Math.floor(Math.random() * low.length)][DEVICE_ID_PARAM];
        transferTaskPub(getClientConnection(randomDevice), DEVICE_ID, task);
    } else {
        transferTaskToCloud(task);
    }
};

export { transferData, transferTask };
