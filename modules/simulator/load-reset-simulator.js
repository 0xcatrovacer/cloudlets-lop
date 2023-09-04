import {
    CPU_LOAD_RESET_TIME,
    CPU_LOAD_RESET_VALUE,
    DISK_USAGE_RESET_TIME,
    DISK_USAGE_RESET_VALUE,
} from './constants';

export const loadResetSimulator = () => {
    if (CPU_LOAD_RESET_TIME > -1)
        timeoutForCpu(CPU_LOAD_RESET_TIME, CPU_LOAD_RESET_VALUE);
    if (DISK_USAGE_RESET_TIME > -1)
        timeoutForDisk(DISK_USAGE_RESET_TIME, DISK_USAGE_RESET_VALUE);
};

const timeoutForCpu = (time, value) => {
    setTimeout(() => {
        global.stats.usedCpuCapacity = value;
    }, time);
};

const timeoutForDisk = (time, value) => {
    setTimeout(() => {
        global.stats.usedDiskSpace = value;
    }, time);
};
