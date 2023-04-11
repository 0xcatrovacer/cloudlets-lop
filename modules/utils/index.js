const getExpiryTime = () => {
    // now + expiry seconds +/- 5s
    return (
        Date.now() +
        parseInt(process.env.DATA_EXPIRY) +
        Math.random() * 5000 * (Math.random() < 0.5 ? -1 : 1)
    );
};

const getTaskRuntime = () => {
    // now + 1.5s +/- 0.5s
    return (
        Date.now() +
        (parseInt(process.env.TASK_DEADLINE_MEDIAN) || 1500) +
        Math.random() * 500 * (Math.random() < 0.5 ? -1 : 1)
    );
};

const getTaskCpuLoad = () => {
    // 10% - 50%
    return 30 + Math.random() * 20 * (Math.random() < 0.5 ? -1 : 1);
};

export { getExpiryTime, getTaskRuntime, getTaskCpuLoad };
