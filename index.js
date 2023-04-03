import 'dotenv/config'; // for loading configs from .env

import { setupCloudlet } from './modules/cloudlet/index.js';
import { initApplicationsList } from './modules/information-manager/index.js';
import { initialiseSystemMonitor } from './modules/system-stats/index.js';
import { listenEndDevices } from './modules/tasks/index.js';

// establish global variables
global.connections = {};
global.server = {};

// load available applications data
initApplicationsList();

// start monitoring system
initialiseSystemMonitor();

// start cloudlet
setupCloudlet();

// Start listening to devices
listenEndDevices();
