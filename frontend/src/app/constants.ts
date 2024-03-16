const isProd = process.env.TARGET_ENV === 'production';
const isStaging = process.env.TARGET_ENV === 'staging';

const prodBaseUrl = "votes.mikka.systems";
const stagingBaseUrl = "votes-test.mikka.systems"
const devBaseUrl = 'localhost:8080';

export const BASE_URL = getBaseUrl();
export const WEBSOCKET_URL = getWebsocketUrl();

function getBaseUrl() {
  if (isProd) {
    return `https://${prodBaseUrl}`;
  } else if (isStaging) {
    return `https://${stagingBaseUrl}`;
  } else {
    return `http://${devBaseUrl}`;
  }
}

function getWebsocketUrl() {
  if (isProd) {
    return `wss://${prodBaseUrl}/ws`;
  } else if (isStaging) {
    return `wss://${stagingBaseUrl}/ws`;
  } else {
    return `ws://${devBaseUrl}/ws`;
  }
}