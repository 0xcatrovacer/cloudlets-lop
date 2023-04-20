import { logger } from '../logger/index.js';
import {
    TASK_CPU_LOAD_PARAM,
    TASK_DISK_LOAD_PARAM,
    TASK_RUNTIME_PARAM,
} from '../tasks/constants.js';

const expireTask = () => {
    let reduceCpu = 0,
        reduceDisk = 0;
    global.taskQueue = global.taskQueue.filter(task => {
        if (task[TASK_RUNTIME_PARAM] > Date.now()) return true;

        reduceCpu += task[TASK_CPU_LOAD_PARAM];
        reduceDisk += task[TASK_DISK_LOAD_PARAM];
    });

    // let currentCpu = 0,
    //     currentDisk = 0;
    // global.taskQueue.forEach(task => {
    //     currentCpu += task[TASK_CPU_LOAD_PARAM];
    //     currentDisk += task[TASK_DISK_LOAD_PARAM];
    // });

    global.stats.usedDiskSpace -= reduceDisk;
    global.stats.usedCpuCapacity -= reduceCpu;

    logger(`Current CPU: ${global.stats.usedCpuCapacity}`);
    logger(`Current Disk: ${global.stats.usedDiskSpace}`);
};

export { expireTask };
