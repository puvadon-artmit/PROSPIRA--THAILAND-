import team from "../../images/home/environmental-bar.png";
import styles from "../../css/our-strengths.module.css";
import DataES from "../../images/home/environmental.png";
import { useTranslation } from "react-i18next";

export default function EnvironmentalMission() {
    const { t } = useTranslation();
    return (
        <section className="relative bg-white">
            <div className="relative h-[350px] md:h-[320px] overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
                    style={{ backgroundImage: `url(${team})` }}
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6 z-10">
                    <h1 className={`text-4xl md:text-5xl font-bold mb-6 drop-shadow-2xl ${styles.animateSlideUp}`}>
                        {t("banner_title_main_3")} 
                        <span className="ml-4 mt-2 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-200 bg-clip-text text-transparent">
                            {t("banner_title_highlight_3")}
                        </span>
                    </h1>
                    <p className={`max-w-3xl text-base md:text-lg leading-relaxed text-gray-100 drop-shadow-lg ${styles.animateSlideUp}`} style={{ animationDelay: "0.2s" }}>
                        {t("banner_desc_3")}
                    </p>
                </div>
            </div>


            <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-8 sm:px-12 md:px-24 lg:px-4 z-10 max-w-7xl mx-auto py-20">
                <div className="flex-1 ">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-2xl text-black">
                        {t("content_title_3")}
                    </h1>
                    
                    <p className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-600 drop-shadow-lg">
                        {t("content_desc_3")}
                    </p>
                </div>

                <div className="flex-1 text-left max-w-md md:max-w-lg">
                  

                      <img
                        src={DataES}
                        className="w-full h-auto object-contain"
                        alt={t("content_title_3")}
                    />
                </div>
            </div>

        </section>
    );
}
