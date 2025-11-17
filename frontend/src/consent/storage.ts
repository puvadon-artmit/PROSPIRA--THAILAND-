import type { ConsentState } from "./types";

const KEY = "cookie-consent:v1";
const EXPIRES_DAYS = 180;


export function loadConsent(): ConsentState | null {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as ConsentState;
        return parsed;
    } catch {
        return null;
    }
}

export function saveConsent(state: ConsentState) {
    localStorage.setItem(KEY, JSON.stringify(state));
}


export function clearConsent() {
    localStorage.removeItem(KEY);
}


export function isExpired(state: ConsentState | null) {
    if (!state?.updatedAt) return true;
    const updated = new Date(state.updatedAt).getTime();
    const now = Date.now();
    const diffDays = (now - updated) / (1000 * 60 * 60 * 24);
    return diffDays > EXPIRES_DAYS;
}