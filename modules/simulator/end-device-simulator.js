import {
    DATA_EXPIRY_PARAM,
    DATA_SIZE_PARAM,
    DEVICE_ID_PARAM,
} from '../coms/constants.js';
import { DATA_PACKET_SIZE } from '../system-stats/constants.js';
import { getExpiryTime } from '../utils/index.js';

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRequest = () => {
    let check = Array.from({ length: getRandomInteger(1, 10) }, () =>
        getRandomInteger(1, 10)
    );
    check = [...new Set(check)];
    check.sort((a, b) => {
        if (a.length === b.length) return a < b ? -1 : 1;
        return a.length < b.length ? -1 : 1;
    });
    const task = {
        id: getRandomInteger(1000, 10000),
        name: 'dummyname',
        swList: check,
        source: 'end-device',
        hops: 0, // number of times task has hopped from one cloudlet to another
    };
    return task;
};

const dataRequest = () => {
    const data = {
        data: 'qwertyuiopasdfghjklzxcvbnm',
        format: 'string',
        [DEVICE_ID_PARAM]: 'end-device',
        [DATA_SIZE_PARAM]: DATA_PACKET_SIZE,
        [DATA_EXPIRY_PARAM]: getExpiryTime(),
    };
    console.log(
        'Data to be expired in ',
        (data[DATA_EXPIRY_PARAM] - Date.now()) / 1000,
        's'
    );
    return data;
};

const taskSimulator = (timeInterval, callback) => {
    setInterval(() => {
        callback(getRequest());
    }, timeInterval);
};

const dataSimulator = (timeInterval, callback) => {
    setInterval(() => {
        global.stats.dataRx++;
        callback(dataRequest());
    }, timeInterval);
};

export { taskSimulator, dataSimulator };
