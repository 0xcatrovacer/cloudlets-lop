import 'dotenv/config'; // for loading configs from .env

import { setupCloudlet } from './modules/cloudlet/index.js';
import { initApplicationsList } from './modules/information-manager/index.js';
import { initialiseSystemMonitor } from './modules/system-stats/index.js';
import { listenEndDevices } from './modules/tasks/index.js';

// establish global variables
global.connections = {};
global.server = {};
global.stats = {
    usedDiskSpace: 0,
    dataTx: 0,
    dataRx: 0,
    dataCloudTx: 0,
    taskTx: 0,
    taskRx: 0,
    taskCx: 0, // task consumed instantly
    taskCloudTx: 0,
};

// load available applications data
initApplicationsList();

// start monitoring system
initialiseSystemMonitor();

// start cloudlet
setupCloudlet();

// Start listening to devices
listenEndDevices();

const runningTime = parseInt(process.env.TEST_RUNTIME);

if (runningTime !== 0) {
    setTimeout(() => {
        console.log(global.stats);
        process.exit(0);
    }, runningTime * 1000);
}
