import { Outlet } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

export default function AdminProviderRoute() {
    return (
        <UserProvider>
            <Outlet />
        </UserProvider>
    );
}
