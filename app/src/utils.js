import store from "./redux/store";

export function checkAuthSession() {
    const accessToken = store?.getState()?.auth?.session?.accessToken;
    const expiresAt = store?.getState()?.auth?.session?.expiresAt;

    const currentTime = new Date().getTime();

    if (!accessToken || !expiresAt) {
        return false;
    }

    if (currentTime > expiresAt) {
        return false;
    }

    return accessToken;
}