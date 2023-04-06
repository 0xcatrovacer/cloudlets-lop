const getExpiryTime = () => {
    // now + expiry seconds +/- 5s
    return (
        Date.now() +
        parseInt(process.env.DATA_EXPIRY) +
        Math.random() * 5000 * (Math.random() < 0.5 ? -1 : 1)
    );
};

export { getExpiryTime };
