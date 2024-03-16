const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined;
const prodBaseUrl = isProd ? window.location.hostname : "";
const devBaseUrl = 'localhost:8080';

export const BASE_URL = isProd
    ? `https://${prodBaseUrl}` // use relative path in production
    : `http://${devBaseUrl}`;
export const WEBSOCKET_URL = isProd
    ? `wss://${prodBaseUrl}/ws`
    : `ws://${devBaseUrl}/ws`;