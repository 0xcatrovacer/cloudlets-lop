import {
    HIG_STATE,
    LOW_STATE,
    MID_STATE,
    THRESHOLD0_DISK,
    THRESHOLD1_DISK,
} from './constants.js';

const monitorDiskUsage = (timeInterval, callback) => {
    setInterval(() => {
        callback(getDiskStatus());
    }, timeInterval);
};

const getDiskStatus = () => {
    const actualDiskUsage = calcDiskUsage();

    //to return Disk Usage Status - 'HIG'/'MID'/'LOW'
    if (actualDiskUsage <= THRESHOLD0_DISK) {
        return LOW_STATE;
    } else if (
        THRESHOLD0_DISK < actualDiskUsage &&
        actualDiskUsage <= THRESHOLD1_DISK
    ) {
        return MID_STATE;
    } else {
        return HIG_STATE;
    }
};

const calcDiskUsage = () => {
    const actualDiskUsage = Math.random();
    /* const actualDiskUsage = diskSpace.free / diskSpace.size; // use this for production
     Make sure to import check-disk-space npm package.
        ---> const diskUsage = require('check-disk-space').default;
    */
    return actualDiskUsage;
};

export { monitorDiskUsage, getDiskStatus };
