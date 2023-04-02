import{
    N_AFFINITY_WEIGHT1,
    N_AFFINITY_WEIGHT2,
    N_AFFINITY_WEIGHT3,
} from './constants.js'
//Redefine these variables depending upon what our Time Window will be and how many tasks should be done in that window.
var P_TASKS_COUNT = Math.random(); //No. of Tasks completed in past window = TP
var C_TASKS_COUNT = Math.random();
var F_TASKS_COUNT = Math.random();

var P_TIME_WINDOW = Math.random(); //NP; It is the Time window of the past tasks
var C_TIME_WINDOW = Math.random();
var F_TIME_WINDOW = Math.random();


const getNAffinity = ({ TP, NP, TC, NC, TF, NF, w1, w2, w3 }) => {
    // No checks are performed to see if NP, NC, NF are 0
    let N = (w1 * TP) / NP + (w2 * TC) / NC + (w3 * TF) / NF;
    return N;
};

const monitorNAffinity = (timeInterval, callback) => {
    setInterval(() => {
        callback(getNAffinity({P_TASKS_COUNT,
                              P_TIME_WINDOW,
                              C_TASKS_COUNT,
                              C_TIME_WINDOW,
                              F_TASKS_COUNT,
                              F_TIME_WINDOW,
                              N_AFFINITY_WEIGHT1,
                              N_AFFINITY_WEIGHT2,
                              N_AFFINITY_WEIGHT3}));
    }, timeInterval);
};


export { monitorNAffinity };
