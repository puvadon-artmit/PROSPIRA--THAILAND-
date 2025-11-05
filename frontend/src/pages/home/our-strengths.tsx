import team from "../../images/baner/1695043302429.jpeg";
import { RightOutlined } from "@ant-design/icons";
import styles from "../../css/our-strengths.module.css";
import icon_technology from "../../images/icon-strengths/technology.png";
import icon_production from "../../images/icon-strengths/production.png";
import icon_qa from "../../images/icon-strengths/qa.png";
import icon_customer from "../../images/icon-strengths/service.png";
import { useTranslation } from "react-i18next";


export default function OurStrengths() {
  const { t } = useTranslation();
  const strengths = [
    {
      title: t("strength1_title"),
      desc: t("strength1_desc"),
      icon: (
        <img src={icon_technology} alt="Technology" className="w-8 h-8" />
      ),
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: t("strength2_title"),
      desc: t("strength2_desc"),
      icon: (
        <img src={icon_production} alt="Production" className="w-8 h-8" />
      ),
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: t("strength3_title"),
      desc: t("strength3_desc"),
      icon: (
        <img src={icon_qa} alt="QA" className="w-8 h-8" />
      ),
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: t("strength4_title"),
      desc: t("strength4_desc"),
      icon: (
        <img src={icon_customer} alt="Customer" className="w-8 h-8" />
      ),
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 overflow-hidden">
      <div className="relative h-[350px] md:h-[320px] overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(${team})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6 z-10">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 drop-shadow-2xl ${styles.animateSlideUp}`}>
            {t("section_title_main")}
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-200 bg-clip-text text-transparent">
              {t("section_title_sub")}
            </span>
          </h1>

          <p className={`max-w-3xl text-base md:text-lg leading-relaxed text-gray-100 drop-shadow-lg ${styles.animateSlideUp}`} style={{ animationDelay: "0.2s" }}>
            {t("banner_desc")}
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {strengths.map((s, i) => (
            <div
              key={i}
              className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-7 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/60 hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 font-bold text-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {i + 1}
              </div>

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-[#08a4b8] to-[#08a4b8] text-white grid place-items-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-[#08a4b8]/50`}>
                  {s.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-300">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
              <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${s.gradient} group-hover:w-full transition-all duration-700`}></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="/about"
            className="group inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#08a4b8] text-white font-bold text-lg shadow-2xl hover:shadow-[#08a4b8]/50 hover:scale-105 transition-all duration-500 relative overflow-hidden"
          >
            <div className={styles.shineEffect}></div>
            <span className="relative z-10">{t("cta_button_info")}</span>
            <RightOutlined className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </a>


        </div>
      </div>
    </section>
  );
}
