const { setupCloudlet } = require('./modules/cloudlet');
const { initApplicationsList } = require('./modules/information-manager');
const { initialiseSystemMonitor } = require('./modules/system-stats');
const { listenEndDevices } = require('./modules/tasks');

require('dotenv').config();

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
