import team from "../../images/recruitment/Header_img_1.webp";
import { useTranslation } from 'react-i18next';

export default function RecruitmentHeader() {
  const { t } = useTranslation();
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-8 sm:px-12 md:px-24 lg:px-4 z-10 max-w-7xl mx-auto py-20">
        <div className="flex-1 text-left space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
            <span className="text-cyan-600 font-semibold text-sm">{t("hiring_badge")}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
            {t("main_heading_part1")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600"> {t("main_heading_part2_highlight")}</span>
            <br />
            {t("main_heading_part3")}
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-600">
            {t("description")}
          </p>

          {/* Stats */}
       
        </div>

        <div className="relative flex-1 max-w-md md:max-w-lg">
          <img
            src={team}
            className="w-full h-auto object-contain rounded-t-[6rem] hover:scale-105 transition-transform duration-700"
            alt="ปลอดภัยไว้ก่อน"
          />

          <div
            className="absolute bottom-6 right-6 px-6 py-3 rounded-2xl 
            bg-white/60 backdrop-blur-lg border border-white/20 
            shadow-xl
            transition-all duration-300 hover:bg-white hover:shadow-2xl"
            style={{ animation: "float 3s ease-in-out infinite" }}
          >
            <div className="text-cyan-600 font-bold text-lg">
              {t("cta_floating_title")}
            </div>
            <div className="text-gray-900 text-sm">
              {t("cta_floating_desc")}
            </div>
          </div>

          <div
            className="absolute top-8 left-6 px-6 py-3 rounded-2xl 
            bg-white/90 backdrop-blur-lg border border-white/20 
            shadow-xl
            transition-all duration-300 hover:bg-white hover:shadow-2xl"
          >
            <div className="text-cyan-500 font-bold text-lg">
              {t("cta_static_title")}
            </div>
            <div className="text-gray-600 text-sm">
              {t("cta_static_desc")}
            </div>
          </div>
        </div>
      </div>

      

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}