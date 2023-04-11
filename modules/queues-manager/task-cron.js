import { logger } from '../logger/index.js';
import {
    TASK_CPU_LOAD_PARAM,
    TASK_DISK_LOAD_PARAM,
    TASK_RUNTIME_PARAM,
} from '../tasks/constants.js';

const expireTask = () => {
    let freeDisk = 0,
        freeCpu = 0;

    global.taskQueue = global.taskQueue.filter(task => {
        if (task[TASK_RUNTIME_PARAM] > Date.now()) return true;

        freeDisk += task[TASK_DISK_LOAD_PARAM];
        freeCpu += task[TASK_CPU_LOAD_PARAM];
        return false;
    });

    logger(`${freeDisk}Mb data deleted`);
    logger(`${freeCpu}% CPU released`);

    global.stats.usedDiskSpace -= freeDisk;
    global.stats.usedCpuCapacity -= freeCpu;
};

export { expireTask };
