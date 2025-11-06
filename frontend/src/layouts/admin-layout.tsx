import React, { useEffect } from "react";
import Sidebar from "../pages/admin/components/sidebar";
import NavbarAdmin from "../pages/admin/components/navbar-admin";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const msg = (location.state as any)?.toast;
    if (msg) {
      if (msg === "unauthorized") {
        toast.error("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
      } else if (msg === "logout") {
        toast.success("ออกจากระบบเรียบร้อยแล้ว");
      }
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="flex">
      <Toaster position="top-center" reverseOrder={false} />

      <Sidebar
        onLogout={() => {
          Cookies.remove("auth_token");
          navigate("/admin/login", { state: { toast: "logout" } });
        }}
      />
      <div className="flex-1 min-h-screen">
        <NavbarAdmin />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
