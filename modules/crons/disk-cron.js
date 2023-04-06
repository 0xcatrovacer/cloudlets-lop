const expireData = () => {
    const preSize = global.dataQueue.length;

    global.dataQueue = global.dataQueue.filter(
        data => data.expiry > Date.now()
    );

    const postSize = global.dataQueue.length;

    global.stats.usedDiskSpace -= (preSize - postSize) * 50; //TODO
};

export { expireData };
