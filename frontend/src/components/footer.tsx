import logo from "../images/logo_footer.svg";
// import { InstagramOutlined, FacebookOutlined, TwitterOutlined, } from "@ant-design/icons";
import "../css/star-animation.css"
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
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
              boxShadow: star.size > 1.5 ? '0 0 4px rgba(8, 164, 184, 0.8)' : '0 0 2px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>

      <div className="absolute top-20 right-10 w-64 h-64 bg-[#08a4b8] rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#08a4b8] rounded-full opacity-5 blur-3xl"></div>



      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-4">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <img src={logo} alt="PROSPIRA Logo" className="w-40 h-20" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("about_desc")}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              {t("menu_company_info_title")}
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#08a4b8] to-transparent"></span>
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_company_info_1")}</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_company_info_2")}</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_company_info_3")}</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_company_info_4")}</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_company_info_5")}</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_company_info_6")}</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_company_info_7")}</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_company_info_8")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              {t("menu_products_title")}
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#08a4b8] to-transparent"></span>
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_products_1")}</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_products_2")}</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_products_3")}</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_products_4")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
              {t("menu_contact_title")}
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#08a4b8] to-transparent"></span>
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm mb-6">
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_contact_1")}</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_contact_2")}</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_contact_3")}</a></li>
              <li><a href="#" className="hover:text-[#08a4b8] transition-all duration-300 hover:translate-x-1 inline-block">{t("menu_contact_4")}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} <span className="text-[#08a4b8] font-semibold">PROSPIRA CORPORATION</span>. {t("copyright_prefix")}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#08a4b8] to-transparent opacity-50"></div>
    </footer>
  );
}