import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import logo from "../images/logo_header.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BiWorld } from "react-icons/bi";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = location.pathname.split("/")[1];

  const handleChangeLang = (newLang: string) => {
    const currentPath = window.location.pathname.replace(/^\/(th|en)/, "");
    navigate(`/${newLang}${currentPath}`);
  };
  const isCompanyPage = ["/about", "/history", "/vision", "/team"].includes(
    location.pathname
  );

  useEffect(() => {
    const pathLang = location.pathname.split("/")[1];
    if (pathLang && (pathLang === "th" || pathLang === "en") && i18n.language !== pathLang) {
      i18n.changeLanguage(pathLang);
    }
  }, [location.pathname, i18n]);

  const companyMenuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          href="/about"
          className="block px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          style={{ color: "white" }}
        >
          เกี่ยวกับเรา
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          href="/history"
          className="block px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          style={{ color: "white" }}
        >
          ประวัติบริษัท
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          href="/vision"
          className="block px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          style={{ color: "white" }}
        >
          วิสัยทัศน์และพันธกิจ
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          href="/team"
          className="block px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          style={{ color: "white" }}
        >
          ทีมงาน
        </a>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500  ${isScrolled
        ? "bg-white/30 backdrop-blur-xl"
        : "bg-gradient-to-r from-white via-gray-50 to-white"
        }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-6 sm:h-8 lg:h-8 w-auto" />
            </a>
          </div>

          {/* Desktop Menu with Modern Design */}
          <div className="hidden md:flex items-center space-x-1">
            <a
              href="/"
              className={`relative px-4 py-2 transition-all duration-300 font-medium group ${location.pathname === "/"
                ? "text-[#08a4b8]"
                : "text-black hover:text-[#08a4b8]"
                }`}
            >
              <span className="relative z-10">{t("home")}</span>
            </a>

            {/* Company Dropdown */}
            <Dropdown
              menu={{
                items: companyMenuItems,
                style: { backgroundColor: "#04a5b9" },
              }}
              placement="bottomCenter"
              overlayClassName="navbar-dropdown"
            >
              <a
                href="/about"
                onClick={(e) => e.preventDefault()}
                className={`relative px-4 py-2 transition-all duration-300 font-medium group inline-flex items-center gap-1 ${isCompanyPage
                  ? "text-[#08a4b8]"
                  : "text-black hover:text-[#08a4b8]"
                  }`}
              >
                <span className="relative z-10">{t("company")}</span>
                <DownOutlined className="text-xs relative z-10" />
              </a>
            </Dropdown>

            <a
              href={`/${lang}/services`}
              className={`relative px-4 py-2 transition-all duration-300 font-medium group ${location.pathname === "/services"
                ? "text-[#08a4b8]"
                : "text-black hover:text-[#08a4b8]"
                }`}
            >
              <span className="relative z-10">{t("services")}</span>
            </a>
            <a
              href={`/${lang}/recruitment`}
              className={`relative px-4 py-2 transition-all duration-300 font-medium group ${location.pathname === "/recruitment"
                ? "text-[#08a4b8]"
                : "text-black hover:text-[#08a4b8]"
                }`}
            >
              <span className="relative z-10">{t("recruitment")}</span>
            </a>
            <a
              href={`/${lang}/contact`}
              className="ml-4 px-6 py-3.5 bg-[#08a4b8] hover:bg-black text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>{t("contact")}</span>
            </a>

            <div className="flex items-center gap-3 ml-6 bg-white/10 rounded-full px-3 py-1.5 shadow-sm backdrop-blur-md border border-white/20">
              <BiWorld className="text-2xl text-[#08a4b8]" />

              <div className="flex items-center gap-2">
                <button
                  className={`relative px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300
        ${lang === "th"
                      ? "bg-gradient-to-r from-[#08a4b8] to-[#06b6d4] text-white shadow-[0_0_8px_rgba(8,164,184,0.5)] scale-105"
                      : "text-gray-600 hover:text-[#08a4b8] hover:bg-white/40"
                    }`}
                  onClick={() => handleChangeLang("th")}
                >
                  ไทย
                  {lang === "th" && (
                    <span className="absolute inset-0 rounded-lg bg-white/20 animate-pulse"></span>
                  )}
                </button>

                <button
                  className={`relative px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300
        ${lang === "en"
                      ? "bg-gradient-to-r from-[#08a4b8] to-[#06b6d4] text-white shadow-[0_0_8px_rgba(8,164,184,0.5)] scale-105"
                      : "text-gray-600 hover:text-[#08a4b8] hover:bg-white/40"
                    }`}
                  onClick={() => handleChangeLang("en")}
                >
                  EN
                  {lang === "en" && (
                    <span className="absolute inset-0 rounded-lg bg-white/20 animate-pulse"></span>
                  )}
                </button>
              </div>
            </div>



          </div>

          {/* Mobile Menu Button with Animation */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="relative p-2 text-gray-700 hover:text-blue-600 focus:outline-none rounded-lg hover:bg-blue-50 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-center ${isMobileMenuOpen ? "rotate-45 translate-y-[9px]" : ""
                    }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 scale-0" : ""
                    }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-center ${isMobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""
                    }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Modern Design */}
      <div
        className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-b from-white to-gray-50 backdrop-blur-xl border-t border-gray-100">
          <a
            href="/"
            className={`block px-4 py-3 rounded-xl transition-all duration-300 font-medium transform hover:translate-x-1 ${location.pathname === "/"
              ? "text-[#08a4b8] bg-blue-50"
              : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-[#08a4b8]"
              }`}
            onClick={toggleMobileMenu}
          >
            {t("home")}
          </a>

          {/* Mobile Company Dropdown */}
          <div>
            <button
              onClick={() => setIsCompanyMenuOpen(!isCompanyMenuOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isCompanyPage
                ? "text-[#08a4b8] bg-blue-50"
                : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-[#08a4b8]"
                }`}
            >
              <span>{t("company")}</span>
              <DownOutlined
                className={`text-xs transition-transform duration-300 ${isCompanyMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${isCompanyMenuOpen
                ? "max-h-60 opacity-100 mt-2"
                : "max-h-0 opacity-0"
                }`}
            >
              <div className="ml-4 space-y-1">
                <a
                  href={`/${lang}/about`}
                  className={`block px-4 py-2 text-sm rounded-lg transition-all duration-300 ${location.pathname === "/about"
                    ? "text-[#08a4b8] bg-blue-50"
                    : "text-gray-600 hover:bg-blue-50 hover:text-[#08a4b8]"
                    }`}
                  onClick={toggleMobileMenu}
                >
                  {t("about")}
                </a>
                <a
                  href={`/${lang}/history`}
                  className={`block px-4 py-2 text-sm rounded-lg transition-all duration-300 ${location.pathname === "/history"
                    ? "text-[#08a4b8] bg-blue-50"
                    : "text-gray-600 hover:bg-blue-50 hover:text-[#08a4b8]"
                    }`}
                  onClick={toggleMobileMenu}
                >
                  {t("history")}
                </a>
                <a
                  href={`/${lang}/vision`}
                  className={`block px-4 py-2 text-sm rounded-lg transition-all duration-300 ${location.pathname === "/vision"
                    ? "text-[#08a4b8] bg-blue-50"
                    : "text-gray-600 hover:bg-blue-50 hover:text-[#08a4b8]"
                    }`}
                  onClick={toggleMobileMenu}
                >
                  {t("vision")}
                </a>
                <a
                  href={`/${lang}/team`}
                  className={`block px-4 py-2 text-sm rounded-lg transition-all duration-300 ${location.pathname === "/team"
                    ? "text-[#08a4b8] bg-blue-50"
                    : "text-gray-600 hover:bg-blue-50 hover:text-[#08a4b8]"
                    }`}
                  onClick={toggleMobileMenu}
                >
                  {t("team")}
                </a>
              </div>
            </div>
          </div>

          <a
            href={`/${lang}/services`}
            className={`block px-4 py-3 rounded-xl transition-all duration-300 font-medium transform hover:translate-x-1 ${location.pathname === "/services"
              ? "text-[#08a4b8] bg-blue-50"
              : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-[#08a4b8]"
              }`}
            onClick={toggleMobileMenu}
          >
            {t("services")}
          </a>
          <a
            href={`/${lang}/contact`}
            className="block px-4 py-3 bg-gradient-to-r from-[#08a4b8] to-[#08a4b8] text-white text-center rounded-xl transition-all duration-300 font-medium hover:shadow-lg transform hover:scale-105 mt-2"
            onClick={toggleMobileMenu}
          >
            {t("contact")}
          </a>

          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-3 ml-6 bg-white/10 rounded-full px-3 py-1.5 shadow-sm backdrop-blur-md border border-white/20">
              <BiWorld className="text-2xl text-[#08a4b8]" />

              <div className="flex items-center gap-2">
                <button
                  className={`relative px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300
        ${lang === "th"
                      ? "bg-gradient-to-r from-[#08a4b8] to-[#06b6d4] text-white shadow-[0_0_8px_rgba(8,164,184,0.5)] scale-105"
                      : "text-gray-600 hover:text-[#08a4b8] hover:bg-white/40"
                    }`}
                  onClick={() => handleChangeLang("th")}
                >
                  ไทย
                  {lang === "th" && (
                    <span className="absolute inset-0 rounded-lg bg-white/20 animate-pulse"></span>
                  )}
                </button>

                <button
                  className={`relative px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300
        ${lang === "en"
                      ? "bg-gradient-to-r from-[#08a4b8] to-[#06b6d4] text-white shadow-[0_0_8px_rgba(8,164,184,0.5)] scale-105"
                      : "text-gray-600 hover:text-[#08a4b8] hover:bg-white/40"
                    }`}
                  onClick={() => handleChangeLang("en")}
                >
                  EN
                  {lang === "en" && (
                    <span className="absolute inset-0 rounded-lg bg-white/20 animate-pulse"></span>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;