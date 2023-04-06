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
        deviceId: 'end-device',
        dataSize: 50,
    };
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
