import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined, UserOutlined, ReadOutlined, QuestionOutlined,
  SettingOutlined, ProfileOutlined,
} from "@ant-design/icons";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import logo_company from "../../../images/logo-company.png";

type NavItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  to?: string;
  children?: NavItem[];
  badge?: number;
};

const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", label: "หน้าหลัก", icon: <HomeOutlined />, to: "/admin/dashboard" },
  { key: "users", label: "ผู้ใช้งาน", icon: <UserOutlined />, to: "/admin/users" },
  { key: "recruitment", label: "สอบถาม", icon: <QuestionOutlined />, to: "/admin/recruitment" },
  { key: "news", label: "ข่าวสาร", icon: <ReadOutlined />, to: "/admin/news" },
  { key: "content", label: "คอนเทนต์", icon: <ProfileOutlined />, to: "/admin/content" },
  { key: "settings", label: "ตั้งค่า", icon: <SettingOutlined />, to: "/admin/settings" },
];

type SidebarProps = {
  initialCollapsed?: boolean;
  fit?: "viewport" | "content";
  autoCollapseBelow?: number;
  className?: string;
};

export default function Sidebar({
  initialCollapsed = false,
  fit = "viewport",
  autoCollapseBelow = 1024,
  className = "",
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState<boolean>(initialCollapsed);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isViewport = fit === "viewport";

  useEffect(() => {
    const apply = () => {
      const shouldCollapse = typeof window !== "undefined" && window.innerWidth < autoCollapseBelow;
      setCollapsed(shouldCollapse || initialCollapsed);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [autoCollapseBelow]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        if (collapsed) setCollapsed(false);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [collapsed]);

  const norm = (s: string) => s.normalize("NFC").toLowerCase().trim();
  const nq = norm(q);
  const filtered = nq
    ? NAV_ITEMS.filter(
        (it) =>
          norm(it.label).includes(nq) ||
          (it.to && norm(it.to).includes(nq))
      )
    : NAV_ITEMS;

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filtered.length > 0 && filtered[0].to) {
      navigate(filtered[0].to!);
    }
  };

  const Highlight: React.FC<{ text: string; query: string }> = ({ text, query }) => {
    if (!query) return <>{text}</>;
    const t = text;
    const qn = query.toLowerCase();
    const idx = t.toLowerCase().indexOf(qn);
    if (idx === -1) return <>{text}</>;
    return (
      <>
        {t.slice(0, idx)}
        <mark className="bg-yellow-300/60 text-inherit rounded px-0.5">{t.slice(idx, idx + qn.length)}</mark>
        {t.slice(idx + qn.length)}
      </>
    );
  };

  return (
    <aside
      className={[
        "relative flex flex-col",
        isViewport ? "sticky top-0 max-h-[100dvh] h-[100dvh]" : "h-auto self-stretch",
        "bg-gradient-to-b from-[#0a0f14] via-[#0a1013] to-[#070b0e]",
        "backdrop-blur supports-[backdrop-filter]:bg-white/5",
        "border-r border-white/10",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.35)]",
        "transition-[width,box-shadow] duration-300",
        collapsed ? "w-16" : "w-68 lg:w-72",
        className,
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-4 border-b border-white/10">
        <div className={`flex items-center gap-2 ${collapsed ? "opacity-0 pointer-events-none select-none w-0" : ""}`}>
          <div className="flex items-center gap-4 cursor-pointer group">
            <div className="relative w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center shadow-lg shadow-[#08a4b8]/30 group-hover:shadow-[#08a4b8]/50 transition-all duration-300 group-hover:scale-105">
              <img src={logo_company} alt="PROSPIRA Logo" className="w-8 h-8 object-contain" />
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[#08a4b8] font-bold text-lg">PROSPIRA</span>
              <span className="text-xs text-gray-400 font-medium tracking-wider">ADMIN PANEL</span>
            </div>
          </div>
        </div>

        <div
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((v) => !v)}
          className="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
        </div>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 pt-3">
          <div className="relative group">
            <input
              ref={inputRef}
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onSearchKeyDown}
              placeholder="ค้นหาเมนู… (⌘K)"
              className="w-full text-sm rounded-lg bg-white/5 text-white/90 placeholder-white/40 px-3 py-2 outline-none border border-white/10 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/30 transition"
            />
            {q ? (
              <button
                onClick={() => setQ("")}
                className="absolute right-7 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 text-xs"
                aria-label="Clear"
                title="เคลียร์"
              >
                ✕
              </button>
            ) : null}
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/40 text-xs">⌘K</span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {filtered.length === 0 ? (
          <div className="px-3 py-6 text-white/60 text-sm">ไม่พบเมนูที่ตรงกับ “{q}”</div>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {filtered.map((item) => {
              const active = item.to ? location.pathname.startsWith(item.to) : false;
              return (
                <li key={item.key} className="relative">
                  <NavLink
                    to={item.to || "#"}
                    className={({ isActive }) =>
                      [
                        "group relative flex items-center gap-3 w-full py-2.5 px-3 rounded-xl",
                        "transition-all duration-200 ease-out",
                        "text-white/80 hover:text-white",
                        active || isActive
                          ? "bg-white/[0.08] ring-1 ring-white/15"
                          : "hover:bg-white/[0.06] hover:ring-1 hover:ring-white/10",
                        collapsed ? "justify-center" : "",
                      ].join(" ")
                    }
                    onClick={() => setQ("")}
                  >
                    <span   
                      className={[
                        "absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 rounded-r-full",
                        "bg-gradient-to-b from-cyan-400 to-emerald-400",
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                        "transition-opacity",
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "text-[18px] flex-shrink-0",
                        active ? "text-white" : "text-white/70 group-hover:text-white",
                        "drop-shadow-[0_1px_6px_rgba(0,255,200,0.15)]",
                      ].join(" ")}
                    >
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className="flex-1 text-sm font-medium tracking-wide">
                        <Highlight text={item.label} query={q} />
                      </span>
                    )}
                    {!collapsed && item.badge ? (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-500/80 to-orange-400/80 text-white shadow">
                        {item.badge}
                      </span>
                    ) : null}
                    {collapsed && (
                      <span className="absolute left-full ml-3 min-w-max rounded-md bg-black/80 text-white/95 text-xs py-1.5 px-2.5 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </nav>

      <div className="pointer-events-none absolute inset-x-0 -bottom-8 h-8 bg-gradient-to-b from-transparent to-black/20" />
    </aside>
  );
}
