// this file is supposed to receive tasks from the end device purposes we are
// using end device simulator in simulator module

import { taskSimulator } from '../simulator/endDeviceSimulator';
import { TIME_INTERVAL } from './constants';

const listenEndDevices = () => {
    taskSimulator(TIME_INTERVAL, task => {});
};

export { initApplicationsList, listenEndDevices };
