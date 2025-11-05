import logo_company from "../../images/logo-company.png";
import "../../css/job-header.css";
import team from "../../images/our-strengths/our-strengths-baner.png";

export default function Header() {

  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 px-4 mt-20 border-b-4 border-[#08a4b8]">
        <div
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(${team})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6 z-10">
          <div className="relative max-w-6xl mx-auto text-center z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#08a4b8] backdrop-blur-sm rounded-2xl mb-4 shadow-2xl hover:scale-110 transition-transform">
              <img src={logo_company} alt="logo" className="w-[80%] h-[80%] object-contain" />
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-2xl">
              จุดแข็งของเรา (Our Strengths)
            </h1>

            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
              เราเป็นบริษัทที่มีความมั่นใจในคุณภาพและบริการที่ดีที่สุด
            </p>

            {/* <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-gray-800 border border-[#08a4b8] backdrop-blur-sm px-6 py-2 rounded-full text-md font-semibold shadow-lg flex items-center gap-2 hover:border-cyan-400 transition-colors">
                <TeamOutlined style={{ color: '#08a4b8' }} />
                <span className="text-white">{jobs.length} ตำแหน่งงานว่าง</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}