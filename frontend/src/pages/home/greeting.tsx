import icon_paperairplane from "../../images/paper-airplane.webp";

export default function Greeting() {
  return (
    <section className="relative bg-gradient-to-b from-white via-[#f8fcfc] to-white py-20 px-6 text-gray-800 overflow-hidden"
    style={{
        background: "linear-gradient(135deg, #000000 50%, #08a4b8 50%)",
      }}>
      {/* เส้นตกแต่งพื้นหลังแบบใหม่ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 w-[120px] h-[120px] bg-[#08a4b8]/10 blur-3xl rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 right-1/4 w-[180px] h-[180px] bg-[#08a4b8]/10 blur-3xl rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(8,164,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(8,164,184,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* หัวข้อ */}
      <div className="relative text-center mb-16">
        <div className="inline-block">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#08a4b8]"></div>
            <svg
              className="w-8 h-8 text-[#08a4b8]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#08a4b8]"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#08a4b8] tracking-tight mb-2">
            คำทักทายจากประธานบริษัท
          </h1>
          <p className="text-gray-500 text-sm uppercase tracking-widest">
            Message from CEO
          </p>
        </div>
      </div>

      {/* เนื้อหา */}
      <div className="relative max-w-4xl mx-auto">
        <div className="relative bg-white/85 backdrop-blur-md rounded-2xl shadow-xl border border-[#08a4b8]/10 p-8 md:p-12 hover:shadow-2xl transition-shadow duration-500">
          {/* Accent bar */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#08a4b8] via-[#08a4b8]/50 to-transparent rounded-l-2xl"></div>

          <img
            src={icon_paperairplane}
            alt="Paper Airplane"
            aria-hidden="true"
            className="absolute -top-6 -left-8 md:-top-8 md:-left-12 lg:-top-10 lg:-left-16 w-16 md:w-20 lg:w-28 rotate-[6deg] drop-shadow-lg z-30 pointer-events-none"
          />

        <div className="space-y-6 relative z-10">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 first-letter:text-5xl first-letter:font-bold first-letter:text-[#08a4b8] first-letter:mr-2 first-letter:float-left">
              ธุรกิจผลิตยางกันสั่นสะเทือนของบริษัทเราได้ตอบสนองต่อความคาดหวังของลูกค้าจำนวนมากในประเทศญี่ปุ่น
              รวมถึงผู้ผลิตรถยนต์รายใหญ่ของโลกที่มีความต้องการด้านประสิทธิภาพและคุณภาพสูงสุดมาอย่างยาวนาน
            </p>

            <div className="relative pl-6 border-l-4 border-[#08a4b8]/30">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 italic">
                เราภาคภูมิใจในปรัชญาขององค์กรที่ว่า{" "}
                <span className="font-semibold text-[#08a4b8]">
                  "มุ่งมั่นสร้างคุณภาพสูงสุดเพื่อประโยชน์ต่อสังคม"
                </span>
                และจะยังคงมุ่งมั่นพัฒนาอย่างต่อเนื่องเพื่อมอบคุณภาพและความเชื่อมั่นให้กับลูกค้าทั่วโลก
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 py-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#08a4b8]/30 to-transparent"></div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#08a4b8]/40"></div>
                <div className="w-2 h-2 rounded-full bg-[#08a4b8]/60"></div>
                <div className="w-2 h-2 rounded-full bg-[#08a4b8]"></div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#08a4b8]/30 to-transparent"></div>
            </div>

            {/* ลายเซ็นและชื่อ */}
            <div className="flex justify-end items-end gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1 tracking-wide">
                  ประธานบริษัท
                </p>
                <p className="text-2xl md:text-3xl font-bold text-[#08a4b8] tracking-wide">
                  Hiroshi Tanaka
                </p>
                <div className="mt-2 h-0.5 w-full bg-gradient-to-l from-[#08a4b8] to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
