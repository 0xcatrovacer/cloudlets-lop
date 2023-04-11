import { logger } from '../logger/index.js';
import {
    N_AFFINITY_WEIGHT1,
    N_AFFINITY_WEIGHT2,
    N_AFFINITY_WEIGHT3,
    N_AFFINITY_WINDOW1,
    N_AFFINITY_WINDOW2,
    N_AFFINITY_WINDOW3,
} from './constants.js';

const getNAffinity = ({ TP, NP, TC, NC, TF, NF, w1, w2, w3 }) => {
    // No checks are performed to see if NP, NC, NF are 0
    let N = (w1 * TP) / NP + (w2 * TC) / NC + (w3 * TF) / NF;
    return N;
};

const monitorNAffinity = (timeInterval, callback) => {
    logger('monitor naffinity -- init');
    setInterval(() => {
        //Redefine these variables depending upon what our Time Window will be and how many tasks should be done in that window.
        const P_TASKS_COUNT = Math.random() * 10; //No. of Tasks completed in past window = TP
        const C_TASKS_COUNT = Math.random() * 10;
        const F_TASKS_COUNT = Math.random() * 10;

        const P_TIME_WINDOW = N_AFFINITY_WINDOW1; //NP; It is the Time window of the past tasks
        const C_TIME_WINDOW = N_AFFINITY_WINDOW2;
        const F_TIME_WINDOW = N_AFFINITY_WINDOW3;

        callback(
            getNAffinity({
                P_TASKS_COUNT,
                P_TIME_WINDOW,
                C_TASKS_COUNT,
                C_TIME_WINDOW,
                F_TASKS_COUNT,
                F_TIME_WINDOW,
                N_AFFINITY_WEIGHT1,
                N_AFFINITY_WEIGHT2,
                N_AFFINITY_WEIGHT3,
            })
        );
    }, timeInterval);
};

export { monitorNAffinity };
