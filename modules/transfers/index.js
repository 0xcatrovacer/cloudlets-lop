import { DEVICE_ID } from '../cloudlet/constants';
import { DEVICE_ID_PARAM } from '../coms/constants';
import { transferDataPub } from '../coms/publishers';
import { getAllConnections, getClientConnection } from '../connections-manager';
import { STORAGE_STATE } from '../information-manager/constants';
import { LOW_STATE, MID_STATE } from '../system-stats/constants';
import { TRANSFER_DUMMY_DATA, TRANSFER_FORMAT_STRING } from './constants';

const transferDataToCloud = data => {
    console.log('data transfered to cloud', data);
};

const transferTaskToCloud = task => {
    console.log('task transfered to cloud', task);
};

const transferData = (
    data = TRANSFER_DUMMY_DATA,
    format = TRANSFER_FORMAT_STRING
) => {
    const connections = getAllConnections();
    let low = [],
        med = [];
    connections.forEach(connection => {
        if (connection?.stats[STORAGE_STATE] === LOW_STATE)
            low.push(connection);
        else if (connection?.stats[STORAGE_STATE] === MID_STATE)
            med.push(connection);
    });

    if (low.length > 0) {
        const randomDevice =
            low[Math.floor(Math.random() * low.length)][DEVICE_ID_PARAM];
        transferDataPub(
            getClientConnection(randomDevice),
            DEVICE_ID,
            data,
            format
        );
    } else if (med.length > 0) {
        const randomDevice =
            med[Math.floor(Math.random() * med.length)][DEVICE_ID_PARAM];
        transferDataPub(
            getClientConnection(randomDevice),
            DEVICE_ID,
            data,
            format
        );
    } else {
        transferDataToCloud(data);
    }
};

const transferTask = () => {
    // TODO:
    // take inspiration from the above function
    // write a method to transfer task
    // check endDeviceSimulator for reference to how a task looks -- line #14
    // then make a param in this function and set the default value as that dummy task
    // now for tasks we check cpu and storage both, so we get 4 combos -- LL, HL, LH, HH (H=HIGH, L=LOW) for each node
    // we check if we have LL or LH or HL nodes in this order and use transferTaskPub to transfer task there :: we ignore HH
    // if there are no nodes which are LL, LH or HL; we simply call the transferTaskToCloud func
};

export { transferData, transferTask };
