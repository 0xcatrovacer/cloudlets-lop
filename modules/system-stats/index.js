import { DEVICE_ID } from '../cloudlet/constants.js';
import {
    bandwidthUpdatePub,
    cpuUpdatePub,
    storageUpdatePub,
} from '../coms/publishers.js';
import {
    getNodeInformation,
    getNodeStatInformation,
    setNodeInformation,
} from '../information-manager/index.js';
import {
    CPU_STATE,
    NETWORK_BANDWIDTH_STATE,
    STORAGE_STATE,
    AFFINITY_STATE,
} from '../information-manager/constants.js';
import { transferData } from '../transfers/index.js';
import { monitorBandwidthUsage } from './bandwidth-calc.js';
import { HIG_STATE, MID_STATE, TIME_INTERVAL } from './constants.js';
import { monitorCpuUsage } from './cpu-usage.mjs';
import { monitorDiskUsage } from './disk-usage.mjs';
import { monitorNAffinity } from './naffinity-calc.mjs';
import { logger } from '../logger/index.js';

const initialiseSystemMonitor = () => {
    logger('system monitor -- init');

    // monitor bandwidth
    monitorBandwidthUsage(TIME_INTERVAL, bandwidthState => {
        if (
            getNodeStatInformation(DEVICE_ID, NETWORK_BANDWIDTH_STATE) ===
            bandwidthState
        )
            return;

        bandwidthState !== MID_STATE &&
            bandwidthUpdatePub(global.server, DEVICE_ID, bandwidthState);
        setNodeInformation(DEVICE_ID, NETWORK_BANDWIDTH_STATE, bandwidthState);
    });

    // monitor CPU usage
    monitorCpuUsage(TIME_INTERVAL, cpuState => {
        if (getNodeStatInformation(DEVICE_ID, CPU_STATE) === cpuState) return;

        cpuState !== MID_STATE &&
            cpuUpdatePub(global.server, DEVICE_ID, cpuState);
        setNodeInformation(DEVICE_ID, CPU_STATE, cpuState);
    });

    // monitor disk usage
    monitorDiskUsage(TIME_INTERVAL, diskState => {
        if (getNodeInformation(DEVICE_ID, STORAGE_STATE) === diskState) return;

        // diskState !== MID_STATE &&
        storageUpdatePub(global.server, DEVICE_ID, diskState);
        setNodeInformation(DEVICE_ID, STORAGE_STATE, diskState);
        if (diskState === HIG_STATE) transferData();
    });

    //monitor N Affinity
    monitorNAffinity(TIME_INTERVAL, NAffinity => {
        setNodeInformation(DEVICE_ID, AFFINITY_STATE, NAffinity);
    });
};

export { initialiseSystemMonitor };
