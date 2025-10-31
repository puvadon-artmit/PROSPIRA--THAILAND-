import { TeamOutlined } from '@ant-design/icons';
import logo_company from "../../images/logo-company.png";
import type { Job } from '../../types/job';
import "../../css/job-header.css";
import { useTranslation } from 'react-i18next';

export default function Header({ jobs }: { jobs: Job[] }) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 px-4 mt-20 border-b-4 border-[#08a4b8]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#08a4b8] to-cyan-500 opacity-10"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#08a4b8] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-700"></div>
          <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-[#08a4b8] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(8,164,184,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#08a4b8] rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-float-delayed opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#08a4b8] rounded-full animate-float-slow opacity-50"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-float opacity-30"></div>

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#08a4b8] backdrop-blur-sm rounded-2xl mb-4 shadow-2xl hover:scale-110 transition-transform">
           <img src={logo_company} alt="logo" className="w-[80%] h-[80%] object-contain" />
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-2xl">
            {t("join")}
          </h1>

          <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
            {t("join_description")}
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="bg-gray-800 border border-[#08a4b8] backdrop-blur-sm px-6 py-2 rounded-full text-md font-semibold shadow-lg flex items-center gap-2 hover:border-cyan-400 transition-colors">
              <TeamOutlined style={{ color: '#08a4b8' }} />
              <span className="text-white">{jobs.length} ตำแหน่งงานว่าง</span>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
}