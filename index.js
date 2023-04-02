const { setupCloudlet } = require('./modules/cloudlet');
const { initialiseSystemMonitor } = require('./modules/system-stats');
const { listenEndDevices } = require('./modules/tasks');
const { initApplicationsList } = require('./modules/tasks');

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
