import store from "./redux/store";

export function checkAuthSession() {
    const accessToken = store?.getState()?.auth?.session?.accessToken;
    let expiresAt = store?.getState()?.auth?.session?.expiresAt;
    expiresAt = expiresAt * 1000;

    const currentTime = new Date().getTime();

    if (!accessToken || !expiresAt) {
        throw new Error('Access token or expiry time is missing');
    }

    if (currentTime > expiresAt) {
        throw new Error('Access token has expired');
    }

    return accessToken;
}