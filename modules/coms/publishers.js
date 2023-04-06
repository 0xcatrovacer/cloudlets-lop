import { getDeviceIdFromSocketId } from '../connections-manager/index.js';
import { logger } from '../logger/index.js';
import {
    STORAGE_MSG,
    CPU_MSG,
    TRANSFER_DATA_MSG,
    TRANSFER_TASK_MSG,
    DEVICE_ID_PARAM,
    STATE_PARAM,
    DATA_PARAM,
    DATA_FORMAT_PARAM,
    TASK_PARAM,
    BANDWIDTH_MSG,
    AVAILABLE_APPLICATIONS_MSG,
    AVAILABLE_APPLICATIONS_PARAM,
    DATA_SIZE_PARAM,
} from './constants.js';

const storageUpdatePub = (socket, deviceId, storageState) => {
    // logger('sending storage state update: ', storageState);
    socket.emit(STORAGE_MSG, {
        [DEVICE_ID_PARAM]: deviceId,
        [STATE_PARAM]: storageState,
    });
};

const cpuUpdatePub = (socket, deviceId, cpuState) => {
    // logger('sending cpu state update: ', cpuState);
    socket.emit(CPU_MSG, {
        [DEVICE_ID_PARAM]: deviceId,
        [STATE_PARAM]: cpuState,
    });
};

const bandwidthUpdatePub = (socket, deviceId, bandwidthState) => {
    socket.emit(BANDWIDTH_MSG, {
        [DEVICE_ID_PARAM]: deviceId,
        [STATE_PARAM]: bandwidthState,
    });
};

const transferDataPub = (socket, deviceId, dataBin, format, dataSize) => {
    if (!socket) return;

    logger(
        `transferring data ${dataSize}Mb to ${getDeviceIdFromSocketId(
            socket.id
        )}`
    );
    socket.emit(TRANSFER_DATA_MSG, {
        [DEVICE_ID_PARAM]: deviceId,
        [DATA_PARAM]: dataBin,
        [DATA_FORMAT_PARAM]: format,
        [DATA_SIZE_PARAM]: dataSize,
    });

    global.stats.usedDiskSpace -= dataSize;
    logger(`Used disk space -- ${global.stats.usedDiskSpace}`);

    global.stats.dataTx++;
};

const transferTaskPub = (socket, deviceId, taskObject) => {
    if (!socket) return;

    logger(
        `transferring task ${taskObject} to ${getDeviceIdFromSocketId(
            socket.id
        )}`
    );

    socket.emit(TRANSFER_TASK_MSG, {
        [DEVICE_ID_PARAM]: deviceId,
        [TASK_PARAM]: taskObject,
    });

    global.stats.taskTx++;
};

const applicationsAvailablePub = (
    socket,
    deviceId,
    availableApplications,
    receiverSocket
) => {
    socket.emit(AVAILABLE_APPLICATIONS_MSG, {
        [DEVICE_ID_PARAM]: deviceId,
        [AVAILABLE_APPLICATIONS_PARAM]: availableApplications,
    });
};

const transferTaskBroadcast = (
    socket,
    deviceId,
    taskObject,
    receiverSocket
) => {
    socket.emit(TRANSFER_TASK_MSG, {
        [DEVICE_ID_PARAM]: deviceId,
        [TASK_PARAM]: taskObject,
    });
};

export {
    storageUpdatePub,
    cpuUpdatePub,
    bandwidthUpdatePub,
    transferDataPub,
    transferTaskPub,
    transferTaskBroadcast,
    applicationsAvailablePub,
};
