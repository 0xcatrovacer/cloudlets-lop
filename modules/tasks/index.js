// this file is supposed to receive tasks from the end device purposes we are
// using end device simulator in simulator module

import { TASK_PARAM } from '../coms/constants.js';
import { logger } from '../logger/index.js';
import { taskSimulator } from '../simulator/end-device-simulator.js';
import { transferTask } from '../transfers/index.js';
import { TIME_INTERVAL } from './constants.js';
import { checkTaskRunnable } from './validators.js';

const listenEndDevices = () => {
    taskSimulator(TIME_INTERVAL, task => taskReciever({ [TASK_PARAM]: task }));
};

const taskReciever = ({ [TASK_PARAM]: task }) => {
    console.log('received task from ' + task.source + 'task: ', task);
    // Validate task
    if (checkTaskRunnable(task)) {
        console.log(
            `received task from ${task.source}: validation success: running`
        );
        return;
    }
    // If not runnable transfer task
    console.log(`received task from ${task.source}: validation failed`);
    transferTask(task);
};

export { listenEndDevices, taskReciever };
