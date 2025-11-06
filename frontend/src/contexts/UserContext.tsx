import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type User = {
  username: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  role_name: string;
};
type Ctx = {
  user: User | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  logout: () => void;
  hasRole: (r: string) => boolean;
  hasAnyRole: (...r: string[]) => boolean;
  getInitials: (u?: User | null) => string;
};

const UserContext = createContext<Ctx | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]   = useState<User | null>(null);
  const [loading, setL]   = useState(true);
  const [error, setErr]   = useState<string | null>(null);
  const inflightRef       = useRef<Promise<void> | null>(null); 

  const refresh = async () => {
    if (inflightRef.current) return inflightRef.current; 
    const p = (async () => {
      setL(true); setErr(null);
      const token = Cookies.get("auth_token");
      if (!token) { setUser(null); setL(false); return; }
      try {
        const resp = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/get-by-profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const u: User | undefined = resp?.data?.result;
        if (!u) throw new Error("ไม่พบข้อมูลผู้ใช้");
        setUser(u); setErr(null);
      } catch (e: any) {
        setErr(e?.response?.data?.error || e.message || "โหลดโปรไฟล์ไม่สำเร็จ");
        setUser(null);
      } finally {
        setL(false);
        inflightRef.current = null;
      }
    })();
    inflightRef.current = p;
    return p;
  };

  useEffect(() => { refresh(); }, []);

  const logout = () => { Cookies.remove("auth_token"); setUser(null); };
   const hasRole = (role: string) => {
        if (!user?.role_name) return false;
        return user.role_name.toLowerCase() === role.toLowerCase();
    };

    const hasAnyRole = (...roles: string[]) => {
        if (!user?.role_name) return false;
        return roles.some((r) => r.toLowerCase() === user.role_name?.toLowerCase());
    };

  const getInitials = (u?: User | null) => {
    if (!u) return "U";
    const a = u.firstname?.trim()?.[0] ?? "";
    const b = u.lastname?.trim()?.[0] ?? "";
    const fallback = u.username?.trim()?.[0] ?? "U";
    const initials = `${a}${b}`.toUpperCase();
    return initials || fallback.toUpperCase();
  };


  return (
    <UserContext.Provider value={{ user, loading, error, refresh, logout, hasRole, hasAnyRole, getInitials }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within <UserProvider>");
  return ctx;
};
