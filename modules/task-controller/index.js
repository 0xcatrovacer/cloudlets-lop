import { taskSimulator } from '../simulator/endDeviceSimulator';

const listenEndDevices = () => {
    taskSimulator(process.env.STAT_POLL_INTERVAL, (task) => {});
};

export { listenEndDevices };
