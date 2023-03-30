import {
    STORAGE_MSG,
    CPU_MSG,
    TRANSFER_DATA_MSG,
    TRANSFER_TASK_MSG,
} from './constants';

const storageUpdateSub = (socket, callback) => {
    socket.on(STORAGE_MSG, data => callback(data));
};

const cpuUpdateSub = (socket, callback) => {
    socket.on(CPU_MSG, data => callback(data));
};

const transferDataSub = (socket, callback) => {
    socket.on(TRANSFER_DATA_MSG, data => callback(data));
};

const transferTaskSub = (socket, callback) => {
    socket.on(TRANSFER_TASK_MSG, data => callback(data));
};

export { storageUpdateSub, cpuUpdateSub, transferDataSub, transferTaskSub };
