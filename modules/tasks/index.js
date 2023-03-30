// this file is supposed to receive tasks from the end device purposes we are
// using end device simulator in simulator module

import { DEVICE_ID } from '../cloudlet/constants';
import { setNodeInformation } from '../information-manager';
import { APPLICATIONS_STATE } from '../information-manager/constants';
import { ALL_APPLICATIONS_LIST, TIME_INTERVAL } from './constants';

const initApplicationsList = () => {
    const allApplications = ALL_APPLICATIONS_LIST;
    setNodeInformation(DEVICE_ID, APPLICATIONS_STATE, allApplications);
};

const listenEndDevices = () => {
    taskSimulator(TIME_INTERVAL, task => {});
};

export { initApplicationsList, listenEndDevices };
