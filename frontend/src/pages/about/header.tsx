import logo_company from "../../images/logo-company.png";
import "../../css/job-header.css";
// import { useTranslation } from 'react-i18next';
import team from "../../images/about/PSTH_Bird eyes view II.jpg";

export default function Header() {
  // const { t } = useTranslation();

  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 px-4 mt-20 border-b-4 border-[#08a4b8]">
        <div
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover "
          style={{ backgroundImage: `url(${team})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6 z-10">
          <div className="relative max-w-6xl mx-auto text-center z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl mb-4 shadow-2xl hover:scale-110 transition-transform">
              <img src={logo_company} alt="logo" className="w-[80%] h-[80%] object-contain" />
            </div>

            

            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-2xl">
              เกี่ยวกับเรา
            </h1>

            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
             เรื่องราวของบริษัทเรา
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}