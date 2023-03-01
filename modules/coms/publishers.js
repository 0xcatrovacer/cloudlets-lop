import {
    STORAGE_MSG,
    CPU_MSG,
    TRANSFER_DATA_MSG,
    TRANSFER_TASK_MSG,
    SENDER_PARAM,
    STATE_PARAM,
    DATA_PARAM,
    DATA_FORMAT_PARAM,
    TASK_PARAM,
} from './constants';

const storageUpdate = (socket, senderId, storageState) => {
    socket.emit(STORAGE_MSG, {
        [SENDER_PARAM]: senderId,
        [STATE_PARAM]: storageState,
    });
};

const cpuUpdate = (socket, senderId, cpuState) => {
    socket.emit(CPU_MSG, {
        [SENDER_PARAM]: senderId,
        [STATE_PARAM]: cpuState,
    });
};

const transferData = (socket, senderId, dataBin, format, receiverSocket) => {
    socket.emit(TRANSFER_DATA_MSG, {
        [SENDER_PARAM]: senderId,
        [DATA_PARAM]: dataBin,
        [DATA_FORMAT_PARAM]: format,
    }); 
};

const transferTask = (socket, senderId, taskObject, receiverSocket) => {
    socket.emit(TRANSFER_TASK_MSG, {
        [SENDER_PARAM]: senderId,
        [TASK_PARAM]: taskObject,
    });
};

module.exports = { storageUpdate, cpuUpdate, transferData, transferTask };
