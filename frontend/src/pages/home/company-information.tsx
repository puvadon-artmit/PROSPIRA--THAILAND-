import icon_spare_parts from "../../images/spare-parts.png";
// import logo_company from "../../images/logo-company.png";
import aboutteam1 from "../../images/home/About_us_img_1.webp";
import aboutteam2 from "../../images/home/About_us_img_2.webp";
import { RightOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import withLang from "../../../utils/normalize-lang";


export default function CompanyInformation() {
  const { t } = useTranslation();
  const location = useLocation();
  const lang = location.pathname.split("/")[1];
  return (
    <section className="relative py-24 px-6 bg-gray-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 sm:w-[20rem] sm:h-[20rem] w-[16rem] h-[16rem] bg-[#06a1b0]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 sm:w-[24rem] sm:h-[24rem] w-[20rem] h-[20rem] bg-[#06a1b0]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#08a4b8]">
            {t("section_header_th")}
          </h2>
          <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-[#08a4b8] to-[#06a1b0]"></div>
          <p className="mt-3 text-sm text-gray-500 uppercase tracking-widest">
            {t("section_header_en")}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left */}
          <div className="lg:col-span-6 space-y-6">

            <div className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
              {/* รูปที่ 1 - ด้านหลัง */}
              <div className="relative z-10 
                w-3/4 sm:w-2/3 lg:w-auto
                ml-auto mr-0 sm:mr-4 lg:ml-32
                mt-0 sm:mt-8 lg:mt-0">

                {/* รูปภาพ */}
                <img
                  src={aboutteam1}
                  alt="about team"
                  className="w-full h-auto rounded-xl shadow-2xl"
                />

                {/* กล่องข้อความบนรูป */}
                <div
                  className="absolute top-6 left-[-6rem] sm:left-[-8rem] px-6 py-3 rounded-2xl 
                bg-white/0 backdrop-blur-lg border border-white/20 
                shadow-xl
                transition-all duration-300 hover:bg-white hover:shadow-2xl"
                >
                  <div className="text-cyan-600 font-bold text-lg">
                    Prospeira
                  </div>
                  <div className="text-gray-900 text-sm">
                    {t("floating_box1_line1")}
                  </div>
                  <div className="text-gray-900 text-sm">
                    {t("floating_box1_line2")}
                  </div>
                  <div className="text-gray-900 text-sm">
                    {t("floating_box1_line3")}
                  </div>
                </div>
              </div>


              {/* รูปที่ 2 - ด้านหน้า */}
              <div className="absolute bottom-0 sm:bottom-[-8rem] lg:bottom-[-2rem] left-0 z-20 w-4/5 sm:w-3/4 lg:w-4/5">
                <div className="relative">
                  {/* รูปภาพ */}
                  <img
                    src={aboutteam2}
                    alt="about team"
                    className="w-full h-auto rounded-xl shadow-2xl border-4 border-white"
                  />

                  {/* กล่องข้อความมุมขวาล่าง */}
                  <div
                    className="absolute bottom-4 right-[-7rem] px-5 py-3 rounded-xl 
                 bg-white/70 backdrop-blur-md border border-white/30 
                 shadow-lg text-right
                 transition-all duration-300 hover:bg-white hover:shadow-2xl"
                  >
                    <div className="text-cyan-600 font-bold text-lg">
                      {t("floating_box2_title")}
                    </div>
                    <div className="text-gray-800 text-sm text-start">
                      {t("floating_box2_desc")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <aside className="lg:col-span-6">

            <p className="text-lg md:text-xl text-gray-700">
              {t("p1_main_content_info")}
              {t("p2_quote_part1")}
              <span className="text-[#08a4b8] font-semibold">
                {" "}
                {t("p2_quote_philosophy")}
              </span>
              {t("p2_quote_part2")}
            </p>

            <p className="text-gray-600 md:text-lg">
              {t("p2_support_content")}
            </p>

            <div className="py-6">
              {[
                {
                  label: t("item_label"),
                  value: t("item_value"),
                  icon: icon_spare_parts,
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex-none w-10 h-10 rounded-lg bg-[#08a4b8]/10 flex items-center justify-center">
                    {/* ใช้ img แทน */}
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                    <div className="font-medium text-gray-700">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow hover:shadow-lg transition">
                <h3 className="text-sm font-semibold text-[#08a4b8]">
                  {t("mission_title")}
                </h3>
                <p className="mt-2 text-gray-600">
                  {t("mission_content")}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow hover:shadow-lg transition">
                <h3 className="text-sm font-semibold text-[#08a4b8]">
                  {t("vision_title")}
                </h3>
                <p className="mt-2 text-gray-600">
                  {t("vision_content")}
                </p>
              </div>
            </div>
            <div className="py-8">
            <a
              href={withLang(lang, `/about`)}
              className="group inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#08a4b8] text-white font-bold text-lg shadow-2xl hover:shadow-[#08a4b8]/50 hover:scale-105 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative z-10">{t("cta_button")}</span>
              <RightOutlined className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
