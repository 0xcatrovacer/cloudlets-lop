const {
    THRESHOLD0_BANDWIDTH,
    THRESHOLD1_BANDWIDTH,
    TOTAL_BANDWIDTH,
    ADAPTER,
    THRESHOLD0_DISK,
    THRESHOLD1_DISK,
    THRESHOLD0_CPU,
    THRESHOLD1_CPU,
    N_AFFINITY_WEIGHT1,
    N_AFFINITY_WEIGHT2,
    N_AFFINITY_WEIGHT3,
    N_AFFINITY_WINDOW1,
    N_AFFINITY_WINDOW2,
    N_AFFINITY_WINDOW3,
    TIME_INTERVAL,
    TOTAL_DISK_SPACE,
} = process.env;

export {
    THRESHOLD0_BANDWIDTH,
    THRESHOLD1_BANDWIDTH,
    TOTAL_BANDWIDTH,
    ADAPTER,
    THRESHOLD0_DISK,
    THRESHOLD1_DISK,
    THRESHOLD0_CPU,
    THRESHOLD1_CPU,
    N_AFFINITY_WEIGHT1,
    N_AFFINITY_WEIGHT2,
    N_AFFINITY_WEIGHT3,
    N_AFFINITY_WINDOW1,
    N_AFFINITY_WINDOW2,
    N_AFFINITY_WINDOW3,
    TIME_INTERVAL,
    TOTAL_DISK_SPACE,
};

export const DATA_PACKET_SIZE = parseInt(process.env.DATA_PACKET_SIZE);

export const LOW_STATE = 'LOW';
export const MID_STATE = 'MID';
export const HIG_STATE = 'HIG';

export const AFFINITY_THRESHOLD = parseFloat(process.env.N_AFFINITY_TH);

export const TOTAL_CPU_CAPACITY = 100;
