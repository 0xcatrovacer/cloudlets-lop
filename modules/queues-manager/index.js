import { expireData } from './disk-cron.js';
import { expireTask } from './task-cron.js';

const runCronJobs = () => {
    expireData();
    expireTask();
};

export { runCronJobs };
