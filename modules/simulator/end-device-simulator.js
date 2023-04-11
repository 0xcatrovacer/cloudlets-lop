import {
    DATA_EXPIRY_PARAM,
    DATA_SIZE_PARAM,
    DEVICE_ID_PARAM,
} from '../coms/constants.js';
import { DATA_PACKET_SIZE } from '../system-stats/constants.js';
import {
    TASK_APPS_LIST_PARAM,
    TASK_CPU_LOAD_PARAM,
    TASK_DISK_LOAD_PARAM,
    TASK_DUMMY_NAME,
    TASK_HOPS_PARAM,
    TASK_ID_PARAM,
    TASK_NAME_PARAM,
    TASK_RUNTIME_PARAM,
    TASK_SOURCE_PARAM,
    TASK_SOURCE_END_DEVICE,
} from '../tasks/constants.js';
import {
    getExpiryTime,
    getTaskCpuLoad,
    getTaskRuntime,
} from '../utils/index.js';

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const taskRequest = () => {
    let check = Array.from({ length: getRandomInteger(1, 10) }, () =>
        getRandomInteger(1, 10)
    );
    check = [...new Set(check)];
    check.sort((a, b) => {
        if (a.length === b.length) return a < b ? -1 : 1;
        return a.length < b.length ? -1 : 1;
    });
    const task = {
        [TASK_ID_PARAM]: getRandomInteger(1000, 10000),
        [TASK_NAME_PARAM]: TASK_DUMMY_NAME,
        [TASK_APPS_LIST_PARAM]: check,
        [TASK_SOURCE_PARAM]: TASK_SOURCE_END_DEVICE,
        [TASK_HOPS_PARAM]: 0, // number of times task has hopped from one cloudlet to another
        [TASK_RUNTIME_PARAM]: getTaskRuntime(),
        [TASK_CPU_LOAD_PARAM]: getTaskCpuLoad(),
        [TASK_DISK_LOAD_PARAM]: DATA_PACKET_SIZE,
    };
    return task;
};

const dataRequest = () => {
    const data = {
        data: 'qwertyuiopasdfghjklzxcvbnm',
        format: 'string',
        [DEVICE_ID_PARAM]: 'end-device',
        [DATA_SIZE_PARAM]: DATA_PACKET_SIZE,
        [DATA_EXPIRY_PARAM]: getExpiryTime(),
    };
    console.log(
        'Data to be expired in ',
        (data[DATA_EXPIRY_PARAM] - Date.now()) / 1000,
        's'
    );
    return data;
};

const taskSimulator = (timeInterval, callback) => {
    setInterval(() => {
        callback(taskRequest());
    }, timeInterval);
};

const dataSimulator = (timeInterval, callback) => {
    setInterval(() => {
        global.stats.dataRx++;
        callback(dataRequest());
    }, timeInterval);
};

export { taskSimulator, dataSimulator, taskRequest };
