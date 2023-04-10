import { DATA_EXPIRY_PARAM } from '../coms/constants.js';
import { logger } from '../logger/index.js';
import { DATA_PACKET_SIZE } from '../system-stats/constants.js';

const expireData = () => {
    const preSize = global.dataQueue.length;

    global.dataQueue = global.dataQueue.filter(
        data => data[DATA_EXPIRY_PARAM] > Date.now()
    );

    const postSize = global.dataQueue.length;

    logger(`${(preSize - postSize) * DATA_PACKET_SIZE}Mb data deleted`);

    global.stats.usedDiskSpace -= (preSize - postSize) * DATA_PACKET_SIZE; //TODO
};

export { expireData };
