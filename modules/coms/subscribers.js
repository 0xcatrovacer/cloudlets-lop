import {
    STORAGE_MSG,
    CPU_MSG,
    TRANSFER_DATA_MSG,
    TRANSFER_TASK_MSG,
    TRANSFER_TASK_BROADCAST_MSG,
} from './constants';

const storageUpdateSub = (socket, ...callbacks) => {
    socket.on(STORAGE_MSG, data =>
        callbacks.forEach(callback => callback(data))
    );
};

const cpuUpdateSub = (socket, ...callbacks) => {
    socket.on(CPU_MSG, data => callbacks.forEach(callback => callback(data)));
};

const transferDataSub = (socket, ...callbacks) => {
    socket.on(TRANSFER_DATA_MSG, data =>
        callbacks.forEach(callback => callback(data))
    );
};

const transferTaskSub = (socket, ...callbacks) => {
    socket.on(TRANSFER_TASK_MSG, data =>
        callbacks.forEach(callback => callback(data))
    );
};

const transferTaskBroadcastSub = (socket, ...callbacks) => {
    socket.on(TRANSFER_TASK_BROADCAST_MSG, data =>
        callbacks.forEach(callback => callback(data))
    );
};

export {
    storageUpdateSub,
    cpuUpdateSub,
    transferDataSub,
    transferTaskSub,
    transferTaskBroadcastSub,
};
