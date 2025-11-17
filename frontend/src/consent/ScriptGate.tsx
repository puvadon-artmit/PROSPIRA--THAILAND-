import React from "react";
import { useConsent } from "./ConsentProvider";


type Props = React.PropsWithChildren<{ category: "analytics" | "ads" }>; // necessary is always allowed


export const ScriptGate: React.FC<Props> = ({ category, children }) => {
    const { state } = useConsent();
    if (!state.categories[category]) return null;
    return <>{children}</>;
};