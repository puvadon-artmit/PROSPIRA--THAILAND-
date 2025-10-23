import { CalendarOutlined, RightOutlined } from "@ant-design/icons";
import "../../css/company-news.css";

export default function CompanyNews() {
  const newsItems = [
    {
      date: "เผยแพร่เมื่อวันที่ 27 พฤษภาคม 2025",
      title: "ประกาศงบการเงินประจำปีครั้งที่ 3",
      desc: "ได้เผยแพร่งบการเงินประจำปีงบประมาณครั้งที่ 3 แล้ว",
      category: "การเงิน",
      isNew: true,
    },
    {
      date: "เผยแพร่เมื่อวันที่ 11 มิถุนายน 2024",
      title: "ประกาศงบการเงินประจำปีครั้งที่ 2",
      desc: "งบการเงินประจำปีงบประมาณครั้งที่ 2",
      category: "การเงิน",
      isNew: false,
    },
    {
      date: "เผยแพร่เมื่อวันที่ 11 มิถุนายน 2024",
      title: "ประกาศงบการเงินประจำปีครั้งที่ 2",
      desc: "งบการเงินประจำปีงบประมาณครั้งที่ 2",
      category: "การเงิน",
      isNew: false,
    },
  ];

  return (
    <section className="relative py-24 px-8 sm:px-12 md:px-32 lg:px-32 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-100/10 to-blue-100/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-[10%] w-32 h-32 border-2 border-cyan-200/45 rounded-3xl rotate-45 animate-float"></div>
        <div
          className="absolute top-40 right-[15%] w-24 h-24 border-2 border-blue-200/45 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-[20%] w-20 h-20 border-2 border-cyan-300/45 rounded-2xl rotate-12 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-48 right-[25%] w-28 h-28 border-2 border-blue-300/45 rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        ></div>

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#08a4b8 1px, transparent 1px), linear-gradient(90deg, #08a4b8 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Decorative Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"></div>

        {/* Dots Pattern */}
        <div className="absolute top-10 right-10 grid grid-cols-4 gap-3 opacity-20">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
        <div className="absolute bottom-10 left-10 grid grid-cols-4 gap-3 opacity-20">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#08a4b8]">
            ข่าวสารและประกาศ
          </h2>
          <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-[#08a4b8] to-[#06a1b0]"></div>
          <p className="mt-3 text-sm text-gray-500 uppercase tracking-widest">
            Company News
          </p>
        </header>
      </div>

      {/* News Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-500 rounded-3xl"></div>

            {/* Animated Border Glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(90deg, #08a4b8, #06c8df, #08a4b8)",
                padding: "2px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            ></div>

            {/* New Badge */}
            {item.isNew && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                ใหม่
              </div>
            )}

            <div className="relative z-10">
              {/* Category Badge */}
              <div className="inline-block px-4 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-xs font-semibold rounded-full mb-4">
                {item.category}
              </div>

              {/* Date with Icon */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 group-hover:text-cyan-600 transition-colors duration-300">
                <CalendarOutlined />
                <span className="font-medium">{item.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-300 leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {item.desc}
              </p>

              {/* Read More Link */}
              <div className="flex items-center gap-2 text-cyan-600 font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                <span>อ่านเพิ่มเติม</span>
                <RightOutlined className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 group-hover:w-full transition-all duration-700 ease-out"></div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-16">
        <a
          href="#"
          className="group inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#08a4b8] text-white font-bold text-lg shadow-2xl hover:shadow-[#08a4b8]/50 hover:scale-105 transition-all duration-500 relative overflow-hidden"
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <span className="relative z-10">ดูข่าวทั้งหมด</span>
          <RightOutlined className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
