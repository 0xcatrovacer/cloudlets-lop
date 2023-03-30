import { CLIENT_CONNECTION, SERVER_CONNECTION } from './constants';

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

export {
    addClientConnection,
    addServerConnection,
    getClientConnection,
    getServerConnection,
};
