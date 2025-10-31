import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Menu, Dropdown, Avatar, Spin, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { UserProfile } from "../../../types/user";


export default function NavbarAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("auth_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/get-by-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (resp.data && resp.data.result) {
          setUser(resp.data.result as UserProfile);
        } else {
          message.error("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          Cookies.remove("auth_token");
          navigate("/admin/login");
        } else {
          message.error(err.response?.data?.error || "เกิดข้อผิดพลาดขณะดึงโปรไฟล์");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    Cookies.remove("auth_token");
    message.success("ออกจากระบบแล้ว");
    navigate("/admin/login");
  };

  const getInitials = (u?: UserProfile) => {
    if (!u) return "A";
    const a = u.firstname?.trim().charAt(0) || "";
    const b = u.lastname?.trim().charAt(0) || "";
    return (a + b).toUpperCase() || (u.username?.charAt(0).toUpperCase() ?? "U");
  };

  const menu = (
    <Menu
      className="min-w-[200px] bg-white rounded-xl shadow-2xl"
      items={[
        {
          key: "profile",
          label: (
            <span className="flex items-center gap-3 py-2 px-3 text-gray-800 hover:text-[#08a4b8] transition-colors">
              <UserOutlined className="text-lg" />
              <span className="font-medium">โปรไฟล์</span>
            </span>
          ),
          onClick: () => navigate("/admin/profile"),
        },
        {
          key: "settings",
          label: (
            <span className="flex items-center gap-3 py-2 px-3 text-gray-800 hover:text-[#08a4b8] transition-colors">
              <SettingOutlined className="text-lg" />
              <span className="font-medium">ตั้งค่า</span>
            </span>
          ),
          onClick: () => navigate("/admin/settings"),
        },
        { type: "divider", className: "!bg-gray-700/50 !my-2" },
        {
          key: "logout",
          label: (
            <span className="flex items-center gap-3 py-2 px-3 text-red-400 hover:text-red-300 transition-colors">
              <LogoutOutlined className="text-lg" />
              <span className="font-medium">ออกจากระบบ</span>
            </span>
          ),
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 px-6 py-0 h-20 shadow-md">
      <div className="max-w-[1920px] mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-6">
        </div>


        <div className="flex items-center gap-4">
          {loading ? (
            <div className="flex items-center gap-3 px-4 py-2 bg-white shadow-2xl rounded-full border border-gray-200/50">
              <Spin size="small" className="text-[#08a4b8]" />
              <span className="text-gray-400 text-sm font-medium">กำลังโหลด...</span>
            </div>
          ) : (
            <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-2xl hover:bg-gray-100/50 border border-white/50 hover:border-[#08a4b8]/50 cursor-pointer transition-all duration-300 group">
                <Avatar
                  className="shadow-lg shadow-[#08a4b8]/30 group-hover:shadow-[#08a4b8]/50 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #08a4b8 0%, #06849a 100%)",
                    border: "2px solid rgba(8, 164, 184, 0.3)",
                  }}
                  size={42}
                >
                  <span className="font-semibold text-base">
                    {getInitials(user ?? undefined)}
                  </span>
                </Avatar>
                <div className="hidden xl:flex flex-col">
                  <span className="text-black font-semibold text-sm leading-tight">
                    {user ? `${user.firstname} ${user.lastname}` : "ผู้ดูแลระบบ"}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {user?.username ?? "—"}
                  </span>
                </div>
                <div className="hidden xl:block ml-2 text-gray-500 group-hover:text-white transition-colors">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 8L2 4h8L6 8z" />
                  </svg>
                </div>
              </div>
            </Dropdown> 
          )}
        </div>
      </div>
    </div>
  );
}

