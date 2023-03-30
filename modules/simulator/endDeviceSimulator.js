function getRandomInteger(min, max) {
    return Math.floor(Math.random * (max - min + 1)) + min;
}

const getRequest = () => {
    let check = Array.from({ length: getRandomInteger(1, 10) }, () =>
        getRandomInteger(1, 10)
    );
    check = [...new Set(check)];
    check.sort(function (a, b) {
        if (a.length === b.length) return a < b ? -1 : 1;
        return a.length < b.length ? -1 : 1;
    });
    const task = {
        id: getRandomInteger(1000, 10000),
        name: 'dummyname',
        swList: check,
    };
    return task;
};

const taskSimulator = (timeInterval, callback) => {
    setInterval(() => {
        const task = getRequest();
        callback(task);
    }, timeInterval);
};

export { taskSimulator };
