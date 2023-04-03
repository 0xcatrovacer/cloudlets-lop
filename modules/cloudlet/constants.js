export const SERVER_PORT = process.env.SERVER_PORT;
export const SERVER_ADDRESS = process.env.SERVER_ADDRESS; // this is local IP for connecting in response
export const SERVER_PROTOCOL = process.env.SERVER_PROTOCOL;
export const INITIAL_CONNECT_NODES = JSON.parse(
    process.env.INITIAL_CONNECT_NODES || '[]'
);

export const DEVICE_ID = process.env.DEVICE_ID;
