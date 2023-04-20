import { DEVICE_ID } from '../cloudlet/constants.js';
import { DEVICE_ID_PARAM } from '../coms/constants.js';
import { CLIENT_CONNECTION, SERVER_CONNECTION } from './constants.js';

const addClientConnection = (deviceId, socket) => {
    if (global.connections[deviceId])
        global.connections[deviceId][CLIENT_CONNECTION] = socket;
    else
        global.connections[deviceId] = {
            [CLIENT_CONNECTION]: socket,
        };
};

const addServerConnection = (deviceId, socket) => {
    if (global.connections[deviceId])
        global.connections[deviceId][SERVER_CONNECTION] = socket;
    else
        global.connections[deviceId] = {
            [SERVER_CONNECTION]: socket,
        };
};

const getClientConnection = deviceId => {
    return global.connections[deviceId]?.[CLIENT_CONNECTION];
};

const getServerConnection = deviceId => {
    return global.connections[deviceId]?.[SERVER_CONNECTION];
};

const getAllConnections = () => {
    return Object.entries(global.connections)
        .map(([deviceId, connection]) => ({
            [DEVICE_ID_PARAM]: deviceId,
            ...connection,
        }))
        .filter(connection => connection[DEVICE_ID_PARAM] !== DEVICE_ID);
};

const getDeviceIdFromSocketId = socketId => {
    for (const conn of getAllConnections()) {
        if (
            conn[CLIENT_CONNECTION]?.id === socketId ||
            conn[SERVER_CONNECTION]?.id === socketId
        )
            return conn[DEVICE_ID_PARAM];
    }
    return undefined;
};

export {
    addClientConnection,
    addServerConnection,
    getClientConnection,
    getServerConnection,
    getAllConnections,
    getDeviceIdFromSocketId,
};
