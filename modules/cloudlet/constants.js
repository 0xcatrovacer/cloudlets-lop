const SERVER_PORT = process.env.SERVER_PORT;
const SERVER_ADDRESS = process.env.SERVER_ADDRESS; // this is local IP for connecting in response
const INITIAL_CONNECT_NODES = JSON.parse(process.env.INITIAL_CONNECT_NODES);

const DEVICE_ID = process.env.DEVICE_ID;

export { SERVER_PORT, SERVER_ADDRESS, INITIAL_CONNECT_NODES, DEVICE_ID };
