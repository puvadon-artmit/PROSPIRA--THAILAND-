import logo from "../images/logo_footer.svg";
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, } from "@ant-design/icons";

export default function Footer() {
  // Generate random stars
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    animationDelay: Math.random() * 3,
    animationDuration: Math.random() * 3 + 2
  }));

  return (
    <footer className="bg-black text-gray-300 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#08a4b8] to-transparent"></div>
      
      {/* Galaxy Stars */}
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
              boxShadow: star.size > 1.5 ? '0 0 4px rgba(8, 164, 184, 0.8)' : '0 0 2px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#08a4b8] rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#08a4b8] rounded-full opacity-5 blur-3xl"></div>

      {/* CSS Animation */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-4">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <img src={logo} alt="PROSPIRA Logo" className="w-40 h-20" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              บริษัทผู้เชี่ยวชาญด้านผลิตภัณฑ์ยางกันสั่นสำหรับอุตสาหกรรมและยานยนต์  
              ให้บริการด้วยเทคโนโลยีระดับโลก มุ่งเน้นคุณภาพและความพึงพอใจสูงสุดของลูกค้า
            </p>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              ข้อมูลบริษัท
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#08a4b8] to-transparent"></span>
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">คำกล่าวจากประธานบริษัท</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">นโยบายธุรกิจ</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">ภาพรวมบริษัท</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">ประวัติความเป็นมา</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">สาขาและสำนักงาน</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">บริษัทจำหน่ายในภูมิภาค</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">ประกาศทางอิเล็กทรอนิกส์</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">จุดแข็งของเรา</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              ผลิตภัณฑ์
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#08a4b8] to-transparent"></span>
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">ยางกันสั่นสำหรับยานยนต์</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">ยางกันสั่นสำหรับอุตสาหกรรม</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">แอร์สปริง (Air Spring)</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">แคลมป์แบบลม (Pneumatic Chuck)</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              ติดต่อเรา
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#08a4b8] to-transparent"></span>
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm mb-6">
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">โรงงาน PROSPIRA ชิซูโอกะ</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">สอบถามข้อมูล</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">ข้อกำหนดการใช้งานเว็บไซต์</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">นโยบายความเป็นส่วนตัว</a></li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#08a4b8] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#08a4b8]/50">
                <FacebookOutlined className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#08a4b8] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#08a4b8]/50">
                <TwitterOutlined className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#08a4b8] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#08a4b8]/50">
                <InstagramOutlined className="text-lg" />
              </a>
           
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} <span className="text-[#08a4b8] font-semibold">PROSPIRA CORPORATION</span>. สงวนลิขสิทธิ์ทุกประการ
          </p>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#08a4b8] to-transparent opacity-50"></div>
    </footer>
  );
}