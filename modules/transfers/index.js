import { DEVICE_ID } from '../cloudlet/constants.js';
import { DEVICE_ID_PARAM } from '../coms/constants.js';
import { transferDataPub, transferTaskPub } from '../coms/publishers.js';
import {
    getAllConnections,
    getClientConnection,
} from '../connections-manager/index.js';
import { CPU_STATE, STORAGE_STATE } from '../information-manager/constants.js';
import { logger } from '../logger/index.js';
import { HIG_STATE, LOW_STATE, MID_STATE } from '../system-stats/constants.js';
import { TRANSFER_DUMMY_DATA, TRANSFER_FORMAT_STRING } from './constants.js';

const transferDataToCloud = data => {
    console.log(`data transfered to cloud: bytes[${data}]`);
};

const transferTaskToCloud = task => {
    console.log('task transfered to cloud', task);
};

const receiveData = (data, format, deviecId) => {
    logger(`receive ${format} data ${data.length}bytes from ${deviecId}`);
};

const transferData = (
    data = TRANSFER_DUMMY_DATA,
    format = TRANSFER_FORMAT_STRING,
    source = 'default'
) => {
    logger('transfer data -- init -- source=' + source);

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
        LX = [],
        XL = [];

    connections.forEach(connection => {
        if (
            connection?.stats[STORAGE_STATE] === LOW_STATE &&
            connection?.stats[CPU_STATE] === LOW_STATE
        )
            LL.push(connection);
        else if (
            connection?.stats[STORAGE_STATE] === LOW_STATE &&
            connection?.stats[CPU_STATE] !== HIG_STATE
        )
            LX.push(connection);
        else if (
            connection?.stats[STORAGE_STATE] !== HIG_STATE &&
            connection?.stats[CPU_STATE] === LOW_STATE
        )
            XL.push(connection);
    });

    if (LL.length > 0) {
        const randomDevice =
            LL[Math.floor(Math.random() * LL.length)][DEVICE_ID_PARAM];
        transferTaskPub(getClientConnection(randomDevice), DEVICE_ID, task);
    } else if (LX.length > 0) {
        const randomDevice =
            LX[Math.floor(Math.random() * LX.length)][DEVICE_ID_PARAM];
        transferTaskPub(getClientConnection(randomDevice), DEVICE_ID, task);
    } else if (XL.length > 0) {
        const randomDevice =
            XL[Math.floor(Math.random() * XL.length)][DEVICE_ID_PARAM];
        transferTaskPub(getClientConnection(randomDevice), DEVICE_ID, task);
    } else {
        transferTaskToCloud(task);
    }
};

export { transferData, transferTask, receiveData };
