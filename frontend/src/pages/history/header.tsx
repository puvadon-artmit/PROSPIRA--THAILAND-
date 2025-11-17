import logo_company from "../../images/logo-company.png";
import "../../css/job-header.css";

export default function Header() {
  return (
    <div>
      <div className="relative overflow-hidden text-white py-16 px-4 mt-20 border-b-4 border-[#08a4b8] bg-black">
        {/* ดีโอพื้นหลัง */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/A_full_view_202511101016.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-black/50 z-1"></div>

        {/* เนื้อหากลาง */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
          <div className="relative max-w-6xl mx-auto text-center">
            {/* โลโก้ */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#08a4b8] backdrop-blur-sm rounded-2xl mb-4 shadow-2xl hover:scale-110 transition-transform">
              <img
                src={logo_company}
                alt="logo"
                className="w-[80%] h-[80%] object-contain"
              />
            </div>

            {/* หัวข้อ */}
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-2xl">
              ประวัติบริษัท (Our History)
            </h1>

            <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              ประวัติบริษัทของเรา
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
