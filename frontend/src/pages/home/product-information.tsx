import {
  RightOutlined,
  StarOutlined,
  SafetyOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import mainProducts from "../../images/main-products.jpeg";
import product1 from "../../images/product/rubber/item-rubber2.png";
import product2 from "../../images/product/air-spring/item-air-spring.png";
import product3 from "../../images/product/pneumatic-chuck/item-pneumatic-chuck.png";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface FeatureBadgeProps {
  icon: React.ElementType;
  text: string;
}

const FeatureBadge: React.FC<FeatureBadgeProps> = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 hover:border-[#08a4b8] transition-colors duration-300">
    <Icon style={{ color: "#08a4b8", fontSize: 16 }} />
    <span>{text}</span>
  </div>
);

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  gradient: string;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  link,
  gradient,
  index,
}) => {

  const { t } = useTranslation();

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
      style={{
        animation: `slideIn 0.6s ease-out ${index * 0.15}s both`,
      }}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      ></div>

      <div className="relative flex flex-col h-full bg-gradient-to-br from-white via-gray-50 to-[#08a4b8]/5 rounded-3xl overflow-hidden border border-gray-100 group-hover:border-[#08a4b8]/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#08a4b8]/10">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#08a4b8]/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#06c8df]/10 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>

        {/* Content First Layout */}
        <div className="relative z-10 p-6 pb-4">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#08a4b8] transition-colors duration-300">
            {title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
        </div>

        {/* Image with Overlap Effect */}
        <div className="relative z-10 px-6 pb-6 mt-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
            {/* Image */}
            <div className="aspect-[4/3] relative">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient Overlay on Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08a4b8]/80 via-[#08a4b8]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Floating Button on Image */}
            <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <a
                href={link}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-white/95 backdrop-blur-md rounded-xl text-[#08a4b8] font-semibold shadow-lg hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>{t("cta_main_button")}</span>
                <RightOutlined className="text-sm" />
              </a>
            </div>
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#08a4b8]/40 rounded-tl-3xl group-hover:border-[#08a4b8]/80 transition-colors duration-500"></div>
      </div>
    </div>
  );
};

export default function ProductInformation() { 
  const { t } = useTranslation();
  const location = useLocation();
  const lang = location.pathname.split("/")[1];
  const products = [
    {
      image: product1,
      title: t("product1_title"),
      description: t("product1_desc"),
      link: `${lang}/product/rubber`,
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      image: product2,
      title: t("product2_title"),
      description: t("product2_desc"),
      link: `${lang}/product/air-spring`,
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      image: product3,
      title: t("product3_title"),
      description: t("product3_desc"),
      link: `${lang}/product/pneumatic-chuck`,
      gradient: "from-purple-500 to-pink-400",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#08a4b8]/10 via-[#08a4b8]/10 to-[#08a4b8]/10 text-gray-800 overflow-hidden">
      <style>
        {`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}
      </style>

      {/* Decorative backgrounds */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#08a4b8]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-gradient-to-br from-[#06c8df]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl group"
            style={{ animation: "slideIn 0.8s ease-out" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#08a4b8]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <img
              src={mainProducts}
              alt="ผลิตภัณฑ์หลักของบริษัท"
              className="w-full h-72 md:h-[28rem] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />

            <div
              className="absolute bottom-6 right-6 px-6 py-3 rounded-2xl 
             bg-white/10 backdrop-blur-lg border border-white/20 
             shadow-lg text-white 
             transition-all duration-300 hover:bg-white/20 hover:shadow-2xl"
              style={{ animation: "float 3s ease-in-out infinite" }}
            >
              <div className="text-[#08a4b8] font-bold text-lg drop-shadow-sm">
                {t("floating_box_title")}
              </div>
              <div className="text-gray-200 text-sm drop-shadow-sm">
                {t("floating_box_desc")}
              </div>
            </div>
          </div>

          <div style={{ animation: "slideIn 0.8s ease-out 0.2s both" }}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-white/40 to-white/10 backdrop-blur-lg border border-white/30 text-[#08a4b8] text-sm font-semibold shadow-md mb-6 hover:from-white/30 hover:to-white/20 transition-all duration-300">
              <StarOutlined style={{ fontSize: 16 }} />
              <span>{t("badge_main_products")}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#075b60] via-[#08a4b8] to-[#06c8df] bg-clip-text text-transparent">
              {t("hero_title")}
            </h1>
            <div className="mt-4 h-1.5 w-32 rounded-full bg-gradient-to-r from-[#08a4b8] to-[#06c8df] shadow-lg" />
            <p className="mt-8 text-gray-700 text-lg leading-relaxed">
              {t("hero_desc_p1")}
            </p>

            {/* Feature badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              <FeatureBadge
                icon={GlobalOutlined}
                text={t("feature_global")}
              />
              <FeatureBadge icon={SafetyOutlined} text={t("feature_testing")} />
              <FeatureBadge icon={StarOutlined} text={t("feature_oem")} />
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/product/rubber"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#08a4b8] to-[#06c8df] text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <span>{t("cta_main_button")}</span>
                <RightOutlined className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-[#08a4b8] text-[#08a4b8] font-medium hover:bg-[#08a4b8] hover:text-white transition-all duration-300"
              >
                {t("cta_contact_button")}
              </a>
            </div>
          </div>
        </div>

        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#08a4b8]">
            {t("section_header_title")}
          </h2>
          <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-[#08a4b8] to-[#06a1b0]"></div>
          <p className="mt-3 text-sm text-gray-500 uppercase tracking-widest">
            {t("section_header_subtitle")}
          </p>
        </header>

        {/* Vertical Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
