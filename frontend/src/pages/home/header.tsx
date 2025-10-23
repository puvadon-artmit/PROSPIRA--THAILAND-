import banner from "../../images/banner-gardx.jpg";
import styles from "../../css/home.module.css";
import logo from "../../images/logo_footer.svg";
import { RightOutlined } from "@ant-design/icons";

export default function Header() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img src={banner} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 h-full flex items-center justify-end">
        <div className="max-w-7xl sm:mx-auto lg:mx-[-6rem] px-4 sm:px-6 lg:px-0 w-full">
          <div className="max-w-3xl space-y-8 animate-fadeIn ml-auto">
            <div className="space-y-4">
              <img src={logo} alt="Logo" className="w-80 h-20" />
              <div className="w-24 h-1 bg-gradient-to-r from-[#08a4b8] to-[#08a4b8] rounded-full"></div>
            </div>

            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed font-light max-w-2xl">
              มุ่งมั่นสร้าง
              <span className="font-semibold text-white"> คุณภาพสูงสุด </span>
              และมีส่วนร่วมในการ
              <span className="font-semibold text-white"> พัฒนาสังคม</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href="/about"
                className="group relative px-8 py-4 bg-gradient-to-r from-[#08a4b8] via-[#08a4b8] to-[#08a4b8] text-white font-semibold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-110 text-center animate-gradient"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  เรียนรู้เพิ่มเติม
                   <RightOutlined className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#70e3f2] via-[#5ccfde] to-[#44c9da] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </a>
            </div>
            
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouseOutline}>
          <svg
            className="w-9 h-14 text-white/80"
            viewBox="0 0 24 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="2"
              y="2"
              width="20"
              height="36"
              rx="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
            />
          </svg>
          <span className={styles.scrollDot} />
        </div>
        <span className="text-white text-xs md:text-sm text-center font-medium mt-2 tracking-wide">
          เลื่อนลง
        </span>
      </div>
    </div>
  );
}
