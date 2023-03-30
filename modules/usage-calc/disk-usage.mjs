import {
    THRESHOLD0_DISK,
    THRESHOLD1_DISK,

} from './constants.mjs';

//Add function to calculate DiskSpace Usage

export const sendDiskStatus = () => {
    const actualDiskUsage = calcDiskUsage();

    //to return Disk Usage Status - 'HIG'/'MID'/'LOW'
    if (actualDiskUsage <= THRESHOLD0_DISK) {
        return 'LOW';
    }
    else if (THRESHOLD0_DISK < actualDiskUsage && actualDiskUsage <= THRESHOLD1_DISK){
        return 'MID';
    }
    else {
        return 'HIG';
    }
}

const calcDiskUsage = () => {
    const actualDiskUsage = Math.random();
    /* const actualDiskUsage = diskSpace.free / diskSpace.size; // use this for production
     Make sure to import check-disk-space npm package.
        ---> const diskUsage = require('check-disk-space').default;
    */
    return actualDiskUsage;
}