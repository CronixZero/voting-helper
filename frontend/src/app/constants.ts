const prod_base_url = window?.location?.hostname ? window.location.hostname : "";
const dev_base_url = 'localhost:8080';

export const BASE_URL = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined
    ? `https://${prod_base_url}` // use relative path in production
    : `http://${dev_base_url}`;
export const WEBSOCKET_URL = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined
    ? `wss://${prod_base_url}/ws`
    : `ws://${dev_base_url}/ws`;