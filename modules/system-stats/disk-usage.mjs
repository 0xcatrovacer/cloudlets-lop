import { expireData } from '../crons/disk-cron.js';
import { logger } from '../logger/index.js';
import {
    HIG_STATE,
    LOW_STATE,
    MID_STATE,
    THRESHOLD0_DISK,
    THRESHOLD1_DISK,
    TOTAL_DISK_SPACE,
} from './constants.js';

const monitorDiskUsage = (timeInterval, callback) => {
    logger('monitor disk usage -- init');
    setInterval(() => {
        expireData();
        callback(getDiskStatus());
    }, timeInterval);
};

const getDiskStatus = () => {
    const diskUsageRatio = calcDiskUsage();

    //to return Disk Usage Status - 'HIG'/'MID'/'LOW'
    if (diskUsageRatio <= THRESHOLD0_DISK) {
        return LOW_STATE;
    } else if (
        THRESHOLD0_DISK < diskUsageRatio &&
        diskUsageRatio <= THRESHOLD1_DISK
    ) {
        return MID_STATE;
    } else {
        return HIG_STATE;
    }
};

const calcDiskUsage = () => {
    /* const actualDiskUsage = diskSpace.free / diskSpace.size; // use this for production
     Make sure to import check-disk-space npm package.
        ---> const diskUsage = require('check-disk-space').default;
    */
    return (
        parseFloat(global.stats.usedDiskSpace) / parseFloat(TOTAL_DISK_SPACE)
    );
};

export { monitorDiskUsage, getDiskStatus };
