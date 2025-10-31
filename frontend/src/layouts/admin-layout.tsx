import React from "react";
import Sidebar from "../pages/admin/components/sidebar";
import NavbarAdmin from "../pages/admin/components/navbar-admin";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <Sidebar onLogout={() => { 
        Cookies.remove("auth_token");
        navigate("/admin/login"); }} />
      <div className="flex-1 min-h-screen">
        <NavbarAdmin />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}