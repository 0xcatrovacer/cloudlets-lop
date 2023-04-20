// this file is supposed to receive tasks from the end device purposes we are
// using end device simulator in simulator module

import { DEVICE_ID } from '../cloudlet/constants.js';
import {
    DATA_FORMAT_PARAM,
    DATA_PARAM,
    DATA_SIZE_PARAM,
    DEVICE_ID_PARAM,
    TASK_PARAM,
} from '../coms/constants.js';
import { logger } from '../logger/index.js';
import {
    dataSimulator,
    taskSimulator,
} from '../simulator/end-device-simulator.js';
import { receiveData, transferTask } from '../transfers/index.js';
import {
    TASK_CPU_LOAD_PARAM,
    TASK_DISK_LOAD_PARAM,
    TASK_SOURCE_PARAM,
    TIME_INTERVAL,
} from './constants.js';
import { checkTaskRunnable } from './validators.js';

const listenEndDevices = () => {
    parseInt(process.env.ENABLE_TASK_SIMULATION) &&
        taskSimulator(TIME_INTERVAL, task =>
            taskReciever({ [TASK_PARAM]: task })
        );
    parseInt(process.env.ENABLE_DATA_SIMULATION) &&
        dataSimulator(TIME_INTERVAL, data => {
            global.stats.dataRx++;
            global.stats.usedDiskSpace += data[DATA_SIZE_PARAM];
            logger(`Used disk space -- ${global.stats.usedDiskSpace}`);
            global.dataQueue.push(data);
            receiveData(data);
        });
};

const taskReciever = ({ [TASK_PARAM]: task }) => {
    console.log(
        'received task from ' + task[TASK_SOURCE_PARAM] + ' task: ',
        task
    );

    // Validate task
    if (checkTaskRunnable(task)) {
        console.log(
            `received task from ${task[TASK_SOURCE_PARAM]}: validation success: running`
        );

        global.stats.taskRx++;
        global.stats.usedDiskSpace += task[TASK_DISK_LOAD_PARAM];
        global.stats.usedCpuCapacity += task[TASK_CPU_LOAD_PARAM];
        logger(`Used disk space -- ${global.stats.usedDiskSpace}`);
        global.taskQueue.push(task);

        return;
    }

    // If not runnable transfer task
    console.log(
        `received task from ${task[TASK_SOURCE_PARAM]}: validation failed`
    );
    transferTask(task, false);
};

export { listenEndDevices, taskReciever };
