import { logger } from '../logger/index.js';
import {
    STORAGE_MSG,
    CPU_MSG,
    TRANSFER_DATA_MSG,
    TRANSFER_TASK_MSG,
    TRANSFER_TASK_BROADCAST_MSG,
    AVAILABLE_APPLICATIONS_MSG,
    DATA_SIZE_PARAM,
} from './constants.js';

const storageUpdateSub = (socket, ...callbacks) => {
    socket.on(STORAGE_MSG, data =>
        callbacks.forEach(callback => callback(data))
    );
};

const cpuUpdateSub = (socket, ...callbacks) => {
    socket.on(CPU_MSG, data => callbacks.forEach(callback => callback(data)));
};

const transferDataSub = (socket, ...callbacks) => {
    logger(
        `Socket ${{ socket }} subscribing to data with subscriber: ${callbacks}`
    );
    socket.on(TRANSFER_DATA_MSG, data => {
        logger('transferData subscriber: received data: ', data);

        global.stats.dataRx++;
        global.stats.usedDiskSpace += data[DATA_SIZE_PARAM];
        logger(`Used disk space -- ${global.stats.usedDiskSpace}`);
        global.dataQueue.push(data);

        callbacks.forEach(callback => {
            logger('transferData subscriber: calling method: ', callback);
            callback(data);
        });
    });
};

const transferTaskSub = (socket, ...callbacks) => {
    socket.on(TRANSFER_TASK_MSG, data => {
        callbacks.forEach(callback => callback(data));
        global.stats.taskRx++;
    });
};

const transferTaskBroadcastSub = (socket, ...callbacks) => {
    socket.on(TRANSFER_TASK_BROADCAST_MSG, data =>
        callbacks.forEach(callback => callback(data))
    );
};

const availableApplicationsSub = (socket, ...callbacks) => {
    socket.on(AVAILABLE_APPLICATIONS_MSG, data =>
        callbacks.forEach(callback => callback(data))
    );
};

export {
    storageUpdateSub,
    cpuUpdateSub,
    transferDataSub,
    transferTaskSub,
    transferTaskBroadcastSub,
    availableApplicationsSub,
};
