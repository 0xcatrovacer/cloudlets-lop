import { DEVICE_ID } from '../cloudlet/constants.js';
import { getNodeStatInformation } from '../information-manager/index.js';
import {
    AFFINITY_STATE,
    APPLICATIONS_STATE,
    CPU_STATE,
    STORAGE_STATE,
} from '../information-manager/constants.js';
import { AFFINITY_THRESHOLD, HIG_STATE } from '../system-stats/constants.js';

const checkSubset = (parentArray, subsetArray) => {
    return subsetArray.every(el => {
        return parentArray.includes(el);
    });
};

const checkTaskRunnable = task => {
    // check cpu and storage not high
    if (
        getNodeStatInformation(DEVICE_ID, CPU_STATE) === HIG_STATE &&
        getNodeStatInformation(DEVICE_ID, STORAGE_STATE) === HIG_STATE
    ) {
        return false;
    }

    // check all applications available
    if (
        !checkSubset(
            getNodeStatInformation(DEVICE_ID, APPLICATIONS_STATE),
            task.swList
        )
    )
        return false;

    // check if affinity is less than affinity threshold
    if (getNodeStatInformation(DEVICE_ID, AFFINITY_STATE) >= AFFINITY_THRESHOLD)
        return false;

    return true;
};

export { checkTaskRunnable };
