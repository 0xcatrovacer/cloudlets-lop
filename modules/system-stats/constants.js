export const THRESHOLD0_BANDWIDTH = 0.4; //Lower threshold for bandwidth
export const THRESHOLD1_BANDWIDTH = 0.8; //Upper threshold for bandwidth

export const TOTAL_BANDWIDTH = process.env.TOTAL_BANDWIDTH; // The Bandwidth capacity
export const ADAPTER = process.env.ADAPTER;

export const THRESHOLD0_DISK = 0.4; //Lower threshold for memory
export const THRESHOLD1_DISK = 0.8; //Upper threshold for memory

export const THRESHOLD0_CPU = 0.2; //Lower threshold for CPU
export const THRESHOLD1_CPU = 0.9; //Upper threshold for CPU


export const infinity = Math.pow(10, 1000); //defined infinity for lowestcpuN
export const AFFINITY_THRESHOLD = 1.5; //Threshold for N
export const N_AFFINITY_WEIGHT1 = 0.8; //Weights for CPU Affinity Calculation
export const N_AFFINITY_WEIGHT2 = 0.1;
export const N_AFFINITY_WEIGHT3 = 0.1;

export const LOW_STATE = 'LOW';
export const MID_STATE = 'MID';
export const HIG_STATE = 'HIG';

export const TIME_INTERVAL = process.env.STAT_POLL_INTERVAL;
