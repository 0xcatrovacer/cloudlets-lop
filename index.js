const { setupCloudlet } = require('./modules/cloudlet');
const { initialiseSystemMonitor } = require('./modules/system-stats');

require('dotenv').config();

// establish global variables
global.connections = {};

// start monitoring system
initialiseSystemMonitor();

// start cloudlet
setupCloudlet();
