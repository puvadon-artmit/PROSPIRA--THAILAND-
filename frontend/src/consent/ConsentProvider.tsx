import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import type { ConsentState } from "./types";
import { loadConsent, saveConsent, isExpired } from "./storage";


const defaultState: ConsentState = {
    given: false,
    categories: { necessary: true, analytics: false, ads: false },
};


export const ConsentContext = createContext<{
    state: ConsentState;
    acceptAll: () => void;
    rejectAll: () => void;
    update: (next: Partial<ConsentState>) => void;
    setCategories: (cats: Partial<ConsentState["categories"]>) => void;
}>({
    state: defaultState,
    acceptAll: () => { },
    rejectAll: () => { },
    update: () => { },
    setCategories: () => { },
});


export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<ConsentState>(defaultState);


    useEffect(() => {
        const stored = loadConsent();
        if (stored && !isExpired(stored)) setState(stored);
    }, []);


    useEffect(() => {
        saveConsent(state);
        // Optional: Push to Google Consent Mode v2 if used
        if (typeof window !== "undefined") {
            (window as any).dataLayer = (window as any).dataLayer || [];
            const g = (window as any).dataLayer;
            const ad_storage = state.categories.ads ? "granted" : "denied";
            const analytics_storage = state.categories.analytics ? "granted" : "denied";
            g.push({
                event: "consent_update",
                consent: { ad_storage, analytics_storage }
            });
        }
    }, [state]);


    const api = useMemo(() => ({
        state,
        acceptAll: () => setState({ given: true, categories: { necessary: true, analytics: true, ads: true }, updatedAt: new Date().toISOString() }),
        rejectAll: () => setState({ given: true, categories: { necessary: true, analytics: false, ads: false }, updatedAt: new Date().toISOString() }),
        update: (next: Partial<ConsentState>) => setState((s) => ({ ...s, ...next, updatedAt: new Date().toISOString() })),
        setCategories: (cats: Partial<ConsentState["categories"]>) => setState((s) => ({ ...s, given: true, categories: { ...s.categories, ...cats }, updatedAt: new Date().toISOString() })),
    }), [state]);


    return <ConsentContext.Provider value={api}>{children}</ConsentContext.Provider>;
};


export const useConsent = () => useContext(ConsentContext);