const prod_base_url = 'votes.mikka.systems';
const dev_base_url = 'localhost:8080';
export const BASE_URL = process.env.PRODUCTION === 'true'
    ? `https://${prod_base_url}`
    : `http://${dev_base_url}`;
export const WEBSOCKET_URL = process.env.PRODUCTION === 'true'
    ? `wss://${prod_base_url}/ws`
    : `ws://${dev_base_url}/ws`;