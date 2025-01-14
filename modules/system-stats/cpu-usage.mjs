import { logger } from '../logger/index.js';
import { runCronJobs } from '../queues-manager/index.js';
import {
    HIG_STATE,
    LOW_STATE,
    MID_STATE,
    THRESHOLD0_CPU,
    THRESHOLD1_CPU,
} from './constants.js';

const monitorCpuUsage = (timeInterval, callback) => {
    logger('monitor cpu -- init');
    setInterval(() => {
        runCronJobs();
        callback(getCPUStatus());
    }, timeInterval);
};

const getCPUStatus = () => {
    const actualCPUUsage = calcCPUUsage();
    //to return CPU Status - 'HIG'/'MID'/'LOW'
    if (actualCPUUsage <= THRESHOLD0_CPU) {
        return LOW_STATE;
    } else if (
        THRESHOLD0_CPU < actualCPUUsage &&
        actualCPUUsage <= THRESHOLD1_CPU
    ) {
        return MID_STATE;
    } else {
        return HIG_STATE;
    }
};

const calcCPUUsage = () => {
    // const actualCPUUsage = Math.random();
    const actualCPUUsage = global.stats.usedCpuCapacity / 100;
    /* Actual Implementation of actualCPUUsage calculation

    const os = require('os');
    cpu_data_arr = os.cpus();
    total_cpu_util = 0; //Average CPU utilization of all cores.

    cpu_data_arr.forEach((cpu_data,i)=>{
        console.log((1-cpu_data.times.idle/(cpu_data.times.user+cpu_data.times.nice+cpu_data.times.sys+cpu_data.times.idle+cpu_data.times.irq))); --> Debugging purposes
    
        We first find ratio of idle time to total time; then subtract it from one to get "% CPU Usage".
    
        total_cpu_util += 1-cpu_data.times.idle/(cpu_data.times.user+cpu_data.times.nice+cpu_data.times.sys+cpu_data.times.idle+cpu_data.times.irq); --> sum of % CPU usage of all cores
    })
    
    const avg_cpu_util = total_cpu_util/cpu_data_arr.length //averaged cpu usage. This is our actualCPUUsage.
    */
    return actualCPUUsage;
};

export { monitorCpuUsage, calcCPUUsage };
