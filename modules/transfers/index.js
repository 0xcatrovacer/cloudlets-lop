import { DEVICE_ID } from '../cloudlet/constants.js';
import {
    DATA_EXPIRY_PARAM,
    DATA_FORMAT_PARAM,
    DATA_SIZE_PARAM,
    DEVICE_ID_PARAM,
} from '../coms/constants.js';
import { transferDataPub, transferTaskPub } from '../coms/publishers.js';
import {
    getAllConnections,
    getClientConnection,
} from '../connections-manager/index.js';
import { CPU_STATE, STORAGE_STATE } from '../information-manager/constants.js';
import { logger } from '../logger/index.js';
import { taskRequest } from '../simulator/end-device-simulator.js';
import {
    DATA_PACKET_SIZE,
    HIG_STATE,
    LOW_STATE,
    MID_STATE,
} from '../system-stats/constants.js';
import {
    TASK_CPU_LOAD_PARAM,
    TASK_DISK_LOAD_PARAM,
    TASK_HOPS_PARAM,
    TASK_SOURCE_PARAM,
} from '../tasks/constants.js';
import { getExpiryTime } from '../utils/index.js';
import {
    TASK_HOPS_THRESHOLD,
    TRANSFER_DUMMY_DATA,
    TRANSFER_DUMMY_SIZE,
    TRANSFER_FORMAT_STRING,
} from './constants.js';

const transferDataToCloud = (data, dataSize) => {
    console.log(`data transfered to cloud: ${data}, size: ${dataSize}`);
    global.stats.dataCloudTx++;

    global.stats.usedDiskSpace -= dataSize;
    logger(`Used disk space -- ${global.stats.usedDiskSpace}`);
};

const transferTaskToCloud = (task, taskToBePopped) => {
    console.log('task transfered to cloud', task);
    global.stats.taskCloudTx++;
    if (taskToBePopped) {
        logger(`${task[TASK_DISK_LOAD_PARAM]}Mb data deleted`);
        logger(`${task[TASK_CPU_LOAD_PARAM]}% CPU released`);
        global.stats.usedDiskSpace -= task[TASK_DISK_LOAD_PARAM];
        global.stats.usedCpuCapacity -= task[TASK_CPU_LOAD_PARAM];
    }
};

const receiveData = data => {
    logger(
        `receive ${data[DATA_FORMAT_PARAM]} data of size ${data[DATA_SIZE_PARAM]}Mb from ${data[DEVICE_ID_PARAM]}`
    );
};

const transferData = (
    data = TRANSFER_DUMMY_DATA,
    format = TRANSFER_FORMAT_STRING,
    source = 'default',
    dataSize = DATA_PACKET_SIZE,
    expiryTime = getExpiryTime()
) => {
    logger('transfer data -- init -- source=' + source);

    const connections = getAllConnections();
    let low = [],
        med = [];

    connections.forEach(connection => {
        if (connection?.stats?.[STORAGE_STATE] === LOW_STATE)
            low.push(connection);
        else if (connection?.stats?.[STORAGE_STATE] === MID_STATE)
            med.push(connection);
    });

    if (low.length > 0) {
        const randomDevice =
            low[Math.floor(Math.random() * low.length)][DEVICE_ID_PARAM];
        transferDataPub(
            getClientConnection(randomDevice),
            DEVICE_ID,
            data,
            format,
            dataSize,
            expiryTime
        );
    } else if (med.length > 0) {
        const randomDevice =
            med[Math.floor(Math.random() * med.length)][DEVICE_ID_PARAM];
        transferDataPub(
            getClientConnection(randomDevice),
            DEVICE_ID,
            data,
            format,
            dataSize,
            expiryTime
        );
    } else {
        transferDataToCloud(data, dataSize);
    }
};

const transferTask = (task = taskRequest(), taskToBePopped = true) => {
    logger('transfer task -- init -- source=' + task[TASK_SOURCE_PARAM]);
    task[TASK_HOPS_PARAM]++;

    if (task[TASK_HOPS_PARAM] >= TASK_HOPS_THRESHOLD) {
        transferTaskToCloud(task);
        return;
    }

    task[TASK_SOURCE_PARAM] = DEVICE_ID;
    const connections = getAllConnections();
    let LL = [],
        LX = [],
        XL = [];

    connections.forEach(connection => {
        if (
            connection?.stats?.[STORAGE_STATE] === LOW_STATE &&
            connection?.stats?.[CPU_STATE] === LOW_STATE
        )
            LL.push(connection);
        // else if (
        //     connection?.stats?.[STORAGE_STATE] === LOW_STATE &&
        //     connection?.stats?.[CPU_STATE] !== HIG_STATE
        // )
        //     LX.push(connection);
        // else if (
        //     connection?.stats?.[STORAGE_STATE] !== HIG_STATE &&
        //     connection?.stats?.[CPU_STATE] === LOW_STATE
        // )
        //     XL.push(connection);
    });

    if (LL.length > 0) {
        const randomDevice =
            LL[Math.floor(Math.random() * LL.length)][DEVICE_ID_PARAM];
        transferTaskPub(
            getClientConnection(randomDevice),
            DEVICE_ID,
            task,
            taskToBePopped
        );
        // } else if (LX.length > 0) {
        //     const randomDevice =
        //         LX[Math.floor(Math.random() * LX.length)][DEVICE_ID_PARAM];
        //     transferTaskPub(
        //         getClientConnection(randomDevice),
        //         DEVICE_ID,
        //         task,
        //         taskToBePopped
        //     );
        // } else if (XL.length > 0) {
        //     const randomDevice =
        //         XL[Math.floor(Math.random() * XL.length)][DEVICE_ID_PARAM];
        //     transferTaskPub(
        //         getClientConnection(randomDevice),
        //         DEVICE_ID,
        //         task,
        //         taskToBePopped
        //     );
    } else {
        transferTaskToCloud(task, taskToBePopped);
    }
};

export { transferData, transferTask, receiveData };
