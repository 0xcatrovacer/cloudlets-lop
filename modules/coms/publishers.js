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
} from './constants';

const storageUpdatePub = (socket, deviceId, storageState) => {
    socket.emit(STORAGE_MSG, {
        [DEVICE_ID_PARAM]: deviceId,
        [STATE_PARAM]: storageState,
    });
};

const cpuUpdatePub = (socket, deviceId, cpuState) => {
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

const transferDataPub = (socket, deviceId, dataBin, format) => {
    socket.emit(TRANSFER_DATA_MSG, {
        [DEVICE_ID_PARAM]: deviceId,
        [DATA_PARAM]: dataBin,
        [DATA_FORMAT_PARAM]: format,
    });
};

const transferTaskPub = (socket, deviceId, taskObject, receiverSocket) => {
    socket.emit(TRANSFER_TASK_MSG, {
        [DEVICE_ID_PARAM]: deviceId,
        [TASK_PARAM]: taskObject,
    });
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
