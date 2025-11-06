// src/hooks/useUserProfile.ts
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import type { AxiosError, AxiosInstance } from "axios";
import Cookies from "js-cookie";

export type UserProfile = {
    id: number | string;
    username: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    role_name: string;
};

export type UseUserProfileOptions = {
    requireAuth?: boolean;
    mustHaveRoles?: string[];
    loginPath?: string;
    axiosInstance?: AxiosInstance;
};

export type UseUserProfileResult = {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    logout: () => void;
    getInitials: (u?: UserProfile | null) => string;
    hasRole: (role: string) => boolean;
    hasAnyRole: (...roles: string[]) => boolean;
};

export function useUserProfile(options: UseUserProfileOptions = {}): UseUserProfileResult {
    const {
        requireAuth = true,
        mustHaveRoles,
        loginPath = "/admin/login",
        axiosInstance,
    } = options;

    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const client = useMemo(() => {
        if (axiosInstance) return axiosInstance;
        return axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL as string,
            timeout: 15000,
        });
    }, [axiosInstance]);

    const mounted = useRef(true);
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    const logout = () => {
        Cookies.remove("auth_token");
        if (requireAuth) navigate(loginPath);
    };

    const getInitials = (u?: UserProfile | null) => {
        if (!u) return "U";
        const a = u.firstname?.trim()?.[0] ?? "";
        const b = u.lastname?.trim()?.[0] ?? "";
        const fallback = u.username?.trim()?.[0] ?? "U";
        const initials = `${a}${b}`.toUpperCase();
        return initials || fallback.toUpperCase();
    };

    const refresh = async () => {
        setLoading(true);
        setError(null);
        const token = Cookies.get("auth_token");

        if (!token) {
            if (requireAuth) navigate(loginPath);
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const resp = await client.get(`/api/user/get-by-profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const result: UserProfile | undefined = resp?.data?.result;
            if (!result) throw new Error("ไม่พบข้อมูลผู้ใช้");

            if (mustHaveRoles && mustHaveRoles.length > 0) {
                const allowed = mustHaveRoles.some((r) => result.role_name === r.toLowerCase());
                if (!allowed) throw new Error("สิทธิ์ไม่เพียงพอในการเข้าถึงหน้านี้");
            }

            if (mounted.current) {
                setUser(result);
                setError(null);
            }
        } catch (err) {
            const e = err as AxiosError<any>;
            const status = e.response?.status;

            if (status === 401) {
                Cookies.remove("auth_token");
                if (requireAuth) {
                    const next = encodeURIComponent(location.pathname + location.search);
                    navigate(`${loginPath}?next=${next}`);
                }
                if (mounted.current) {
                    setUser(null);
                    setError("ไม่ได้รับอนุญาต");
                }
            } else {
                if (mounted.current) {
                    setError(
                        (e.response?.data as any)?.error ||
                        e.message ||
                        "เกิดข้อผิดพลาดขณะดึงโปรไฟล์"
                    );
                }
            }
        } finally {
            if (mounted.current) setLoading(false);
        }
    };

    const hasRole = (role: string) => {
        if (!user?.role_name) return false;
        return user.role_name.toLowerCase() === role.toLowerCase();
    };

    const hasAnyRole = (...roles: string[]) => {
        if (!user?.role_name) return false;
        return roles.some((r) => r.toLowerCase() === user.role_name?.toLowerCase());
    };


    useEffect(() => {
        refresh();
    }, []);

    return { user, loading, error, refresh, logout, getInitials, hasRole, hasAnyRole };
}
