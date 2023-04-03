import { DEVICE_ID } from '../cloudlet/constants.js';
import { DEVICE_ID_PARAM, STATE_PARAM } from '../coms/constants.js';
import { logger } from '../logger/index.js';
import {
    ALL_APPLICATIONS_LIST,
    APPLICATIONS_STATE,
    CPU_STATE,
    STORAGE_STATE,
} from './constants.js';

const getNodeInformation = deviceId => {
    return global.connections[deviceId].stats;
};

const getNodeStatInformation = (deviceId, statName) => {
    return global.connections[deviceId]?.stats?.[statName];
};

const setNodeInformation = (deviceId, statName, statValue) => {
    if (!global.connections[deviceId]) global.connections[deviceId] = {};

    if (!global.connections[deviceId]?.stats)
        global.connections[deviceId].stats = {};

    global.connections[deviceId].stats[statName] = statValue;
};

const handleReceiveStorageUpdate = ({
    [DEVICE_ID_PARAM]: deviceId,
    [STATE_PARAM]: state,
}) => {
    // logger(`received storage update ${state} from ${deviceId}`);
    setNodeInformation(deviceId, STORAGE_STATE, state);
};

const handleReceiveCpuUpdate = ({
    [DEVICE_ID_PARAM]: deviceId,
    [STATE_PARAM]: state,
}) => {
    // logger(`received cpu update ${state} from ${deviceId}`);
    setNodeInformation(deviceId, CPU_STATE, state);
};

const initApplicationsList = () => {
    const allApplications = ALL_APPLICATIONS_LIST;
    setNodeInformation(DEVICE_ID, APPLICATIONS_STATE, allApplications);
};

export {
    getNodeInformation,
    getNodeStatInformation,
    setNodeInformation,
    handleReceiveStorageUpdate,
    handleReceiveCpuUpdate,
    initApplicationsList,
};
