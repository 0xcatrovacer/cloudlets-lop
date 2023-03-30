const { setupCloudlet } = require('./modules/cloudlet');
const { initialiseSystemMonitor } = require('./modules/system-stats');
const { listenEndDevices } = require('./modules/tasks');

require('dotenv').config();

// establish global variables
global.connections = {};

// start monitoring system
initialiseSystemMonitor();

// start cloudlet
setupCloudlet();

// Start listening to devices
listenEndDevices();
