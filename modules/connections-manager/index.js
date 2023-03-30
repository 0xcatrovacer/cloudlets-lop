import { CLIENT_CONNECTION, SERVER_CONNECTION } from './constants';

const addClientConnection = (deviceId, socketId) => {
    if (global.connections[deviceId])
        global.connections[deviceId][CLIENT_CONNECTION] = socketId;
    else
        global.connections[deviceId] = {
            [CLIENT_CONNECTION]: socketId,
        };
};

const addServerConnection = (deviceId, socketId) => {
    if (global.connections[deviceId])
        global.connections[deviceId][SERVER_CONNECTION] = socketId;
    else
        global.connections[deviceId] = {
            [SERVER_CONNECTION]: socketId,
        };
};

const getClientConnection = deviceId => {
    return global.connections[deviceId]?.[CLIENT_CONNECTION];
};

const getServerConnection = deviceId => {
    return global.connections[deviceId]?.[SERVER_CONNECTION];
};

export {
    addClientConnection,
    addServerConnection,
    getClientConnection,
    getServerConnection,
};
