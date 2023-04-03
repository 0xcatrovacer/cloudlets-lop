import { DEVICE_ID } from '../cloudlet/constants.js';
import { getNodeStatInformation } from '../information-manager/index.js';
import {
    APPLICATIONS_STATE,
    CPU_STATE,
    STORAGE_STATE,
} from '../information-manager/constants.js';
import { HIG_STATE } from '../system-stats/constants.js';

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

    return true;
};

export { checkTaskRunnable };
