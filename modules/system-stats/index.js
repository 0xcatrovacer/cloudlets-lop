import { DEVICE_ID } from '../cloudlet/constants';
import {
    bandwidthUpdatePub,
    cpuUpdatePub,
    storageUpdatePub,
} from '../coms/publishers';
import {
    getNodeInformation,
    getNodeStatInformation,
    setNodeInformation,
} from '../information-manager';
import {
    CPU_STATE,
    NETWORK_BANDWIDTH_STATE,
    STORAGE_STATE,
} from '../information-manager/constants';
import { transferData } from '../transfers';
import { monitorBandwidthUsage } from './bandwidth-calc';
import { HIG_STATE, MID_STATE, TIME_INTERVAL } from './constants.js';
import { monitorCpuUsage } from './cpu-usage.mjs';
import { monitorDiskUsage } from './disk-usage.mjs';

const initialiseSystemMonitor = () => {
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

        diskState !== MID_STATE &&
            storageUpdatePub(global.server, DEVICE_ID, diskState);
        setNodeInformation(DEVICE_ID, STORAGE_STATE, diskState);
        if (diskState === HIG_STATE) transferData();
    });
};

export { initialiseSystemMonitor };
