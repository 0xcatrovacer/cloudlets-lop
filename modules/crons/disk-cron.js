import { DATA_EXPIRY_PARAM } from '../coms/constants';

const expireData = () => {
    const preSize = global.dataQueue.length;

    global.dataQueue = global.dataQueue.filter(
        data => data[DATA_EXPIRY_PARAM] > Date.now()
    );

    const postSize = global.dataQueue.length;

    logger(`${(preSize - postSize) * 50}Mb data deleted`);

    global.stats.usedDiskSpace -= (preSize - postSize) * 50; //TODO
};

export { expireData };
