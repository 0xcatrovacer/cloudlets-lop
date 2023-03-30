const seedrandom = require('seedrandom');
const rng = seedrandom();

const getRandomInteger = (min, max) => {
    return Math.floor(rng() * (max - min + 1)) + min;
};

const requestTask = () => {
    let check = Array.from({ length: getRandomInteger(1, 10) }, () =>
        getRandomInteger(1, 10)
    );
    check = [...new Set(check)];
    check.sort((a, b) => {
        if (a.length == b.length) return a < b ? -1 : 1;
        return a.lenght < b.length ? -1 : 1;
    });

    return {
        id: getRandomInteger(1000, 10000),
        name: 'dummyname',
        swList: check,
    };
};

export { requestTask };
