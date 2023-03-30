function getRandomInteger(min, max) {
    return Math.floor(Math.random * (max - min + 1)) + min;
}

const taskSimulator = (timeInterval, callback) => {
    setInterval(() => {
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
        console.log(`Request to execute task id: ${task.id}`);
        console.log(`The array is: ${task.swList}`);
        callback(task);
    }, timeInterval);
};

export { taskSimulator };
