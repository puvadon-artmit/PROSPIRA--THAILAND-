import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import logo_company from "../../../images/logo-company.png";
import "../../../css/star-animation.css";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    animationDelay: Math.random() * 3,
    animationDuration: Math.random() * 3 + 2,
  }));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/login`, {
        username,
        password,
      });

      if (response.data?.token) {
        Cookies.set("auth_token", response.data.token, { expires: 1 }); 
        toast.success("เข้าสู่ระบบสำเร็จ");
        window.location.href = "/admin/dashboard"; 
      } else {
        toast.error("เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-gray-300 overflow-hidden flex items-center justify-center">
         <Toaster position="top-right" />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#08a4b8] to-transparent"></div>
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.animationDuration}s infinite`,
              animationDelay: `${star.animationDelay}s`,
              boxShadow:
                star.size > 1.5
                  ? "0 0 4px rgba(8, 164, 184, 0.8)"
                  : "0 0 2px rgba(255, 255, 255, 0.5)",
            }}
          />
        ))}
      </div>

      <div className="absolute top-20 right-10 w-64 h-64 bg-[#08a4b8] rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#08a4b8] rounded-full opacity-5 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md bg-black/40 border border-[#08a4b8]/30 rounded-2xl shadow-2xl backdrop-blur-md p-8">
        <div className="flex flex-col items-center mb-6">
            <img
              src={logo_company}
              alt="PROSPIRA Logo"
              className="w-20 h-12 object-contain mb-4"
            />
          <h2 className="text-2xl font-bold text-white mb-2">เข้าสู่ระบบผู้ดูแล</h2>
          <p className="text-gray-400 text-sm">กรุณากรอกชื่อผู้ใช้และรหัสผ่าน</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 mb-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">ชื่อผู้ใช้</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-[#08a4b8]/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#08a4b8]"
              placeholder="username"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 text-sm">รหัสผ่าน</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-[#08a4b8]/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#08a4b8]"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-[#08a4b8] to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-8">
          © {new Date().getFullYear()} PROSPIRA CORPORATION
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#08a4b8] to-transparent opacity-50"></div>
    </div>
  );
}
