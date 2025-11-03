import { useState } from "react";
import { RightOutlined, InstagramOutlined, FacebookOutlined, XOutlined } from "@ant-design/icons";
import ItemAirSpring from "../../../images/product/air-spring/item-air-spring.png";
import "../../../css/product.css";

type TabKey = "overview" | "specifications";

type TabData = { title: string; content: string };

export default function AirSpringPage() {
    const [activeTab, setActiveTab] = useState<TabKey>("overview");

    const tabContent: Record<TabKey, TabData> = {
  overview: {
    title: "ภาพรวมผลิตภัณฑ์ (Air Spring)",
    content: `Air Spring หรือถุงลมกันสั่น เป็นอุปกรณ์ดูดซับแรงสั่นสะเทือนที่ใช้ลมอัดเป็นตัวกลาง
    ให้สมรรถนะการแยกแรงสั่นได้เหนือกว่ายางตันทั่วไป เหมาะกับทั้งงานเครื่องจักรอุตสาหกรรม
    ระบบรองรับในยานพาหนะ และแพลตฟอร์มที่ต้องการความนิ่งสูง

    จุดเด่นของ Air Spring ของเรา:
    • ปรับระดับความแข็ง/ยืดหยุ่นได้ด้วยแรงดันลม (Tunable)
    • แยกแรงสั่นความถี่ต่ำได้ดี ลดแรงกระแทกขณะสตาร์ท/หยุดเครื่อง
    • อายุการใช้งานยาว ด้วยโครงสร้างยางเสริมใยผ้า (cord fabric) และเพลท/คัพโลหะคุณภาพสูง
    • บำรุงรักษาง่าย อะไหล่พร้อม และเข้ากันได้กับระบบลมมาตรฐาน

    ผลิตด้วยเทคโนโลยีระดับสากล ภายใต้มาตรฐานคุณภาพที่เข้มงวด เหมาะทั้งงาน OEM และ Retrofit`
  },
  specifications: {
    title: "ข้อมูลจำเพาะและการใช้งานของผลิตภัณฑ์ (Air Spring)",
    content: `ข้อมูลจำเพาะทางเทคนิค (โดยสรุป):
    โครงสร้าง: ยางเสริมใยผ้า (เช่น ไนลอน/โพลีเอสเตอร์) พร้อมหน้าแปลน/คัพโลหะ
    ประเภทบู๊ต: แบบพับชั้น (Convoluted) / แบบโรลลิ่งโลบ (Rolling Lobe) แล้วแต่รุ่น
    แรงดันใช้งาน: โดยทั่วไป ~2–8 bar (ปรับได้ตามโหลดและรุ่น)
    ช่วงอุณหภูมิ: ประมาณ -40°C ถึง +70°C (ขึ้นกับเกรดยาง)
    ระยะชัก (Stroke): ตามรุ่น รองรับการเปลี่ยนระดับได้
    ความสามารถรับน้ำหนัก: ขึ้นกับขนาด/รุ่น (เลือกสเปกตามโหลดจริง)
    มาตรฐานโรงงาน: ISO 9001, IATF 16949

    การใช้งานแนะนำ:
    ✓ แท่นเครื่องจักร/ฐานเครื่อง CNC, คอมเพรสเซอร์, ปั๊ม, บลัวเวอร์
    ✓ ระบบกันสะเทือนยานพาหนะเชิงพาณิชย์/พ่วง
    ✓ โต๊ะวัดความเที่ยงตรง/แพลตฟอร์มที่ต้องการลดสั่น
    ✓ ไลน์การผลิต/ระบบลำเลียงที่ต้องการลดการสั่นกระเทือน

    แนวทางติดตั้ง (Best Practice):
    1) ตรวจสอบขนาดหน้าแปลน ระยะยุบ/ยืด และระยะชักให้เหมาะกับโหลดและตำแหน่งติดตั้ง
    2) ติดตั้งวาล์ว/เรกูเลเตอร์/เกจ์วัดแรงดัน และตั้งแรงดันให้ได้ความสูงทำงาน (design height)
    3) จัดแนว (alignment) ให้ผิวสัมผัสบน–ล่างขนานกัน ลดการบิดงอด้านข้าง
    4) ใช้ตัวจำกัดระยะ (bump stop/height limiter) หากมีจังหวะยุบ/ยืดสุดบ่อย
    5) ตรวจสอบการรั่วลม (leak test) และขันสกรูด้วยแรงบิดตามสเปก
    6) บำรุงรักษา: ตรวจสภาพยาง รอยรั่ว และระดับแรงดันตามรอบที่กำหนด`
  }
};


    return (
        <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 mt-14">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#08a4b8]/20 to-[#06b6d4]/20 blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#08a4b8]/20 to-[#06b6d4]/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    <article className="lg:col-span-2">
                        <div className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden">
                            {/* HERO */}
                            <div className="relative h-[240px] sm:h-[300px] md:h-[380px] lg:h-[480px] overflow-hidden group">
                                <img
                                    src={ItemAirSpring}
                                    alt="Air Spring"
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6">
                                    <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-bold bg-white/35 backdrop-blur-sm text-cyan-700 shadow-lg">
                                        Air Spring
                                    </span>
                                </div>
                            </div>

                            {/* BODY */}
                            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                                {/* Title */}
                                <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-4xl font-extrabold leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4 sm:mb-6 lg:mb-8">
                                    {tabContent[activeTab].title}
                                </h1>

                                {/* Content with Animation */}
                                <div
                                    key={activeTab}
                                    className="animate-fade-in"
                                >
                                    <div className="prose max-w-none text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                                        {tabContent[activeTab].content}
                                    </div>
                                </div>

                                {/* Share */}
                                <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                                    <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2 sm:mb-3">
                                        แชร์สินค้า
                                    </p>
                                    <div className="flex gap-2 sm:gap-3">
                                        <button
                                            aria-label="แชร์ไปที่ Facebook"
                                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                                        >
                                            <FacebookOutlined style={{ color: "white" }} className="text-base sm:text-lg" />
                                        </button>
                                        <button
                                            aria-label="แชร์ไปที่ Instagram"
                                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E1306C] hover:bg-[#E1306C]/80 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                                        >
                                            <InstagramOutlined style={{ color: "white" }} className="text-base sm:text-lg" />
                                        </button>
                                        <button
                                            aria-label="แชร์ไปที่ X"
                                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black hover:bg-black/80 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                                        >
                                            <XOutlined style={{ color: "white" }} className="text-base sm:text-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar - Tab Navigation */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            <div className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></span>
                                    รายละเอียดสินค้า
                                </h2>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setActiveTab("overview")}
                                        className={`group w-full flex items-center justify-center gap-2 px-4 py-3 rounded-t-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 ${activeTab === "overview"
                                                ? "bg-gradient-to-r from-black to-black text-white"
                                                : "bg-gradient-to-r from-[#08a4b8] to-[#06b6d4] text-white hover:from-black hover:to-black"
                                            }`}
                                             style={{color:"white"}} 
                                    >
                                        <span>ภาพรวมผลิตภัณฑ์</span>
                                        <RightOutlined className="group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>

                                    <button
                                        onClick={() => setActiveTab("specifications")}
                                        className={`group w-full flex items-center justify-center gap-2 px-4 py-3 rounded-b-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 ${activeTab === "specifications"
                                                ? "bg-gradient-to-r from-black to-black text-white"
                                                : "bg-gradient-to-r from-[#08a4b8] to-[#06b6d4] text-white hover:from-black hover:to-black"
                                            }`}
                                            style={{color:"white"}}
                                    >
                                        <span>ข้อมูลจำเพาะและการใช้งานของผลิตภัณฑ์</span>
                                        <RightOutlined className="group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
                                </div>
                                
                            </div>

                            {/* Info Card */}
                            <div className="bg-[#08a4b8] rounded-3xl shadow-xl p-6 text-white">
                                <h3 className="text-lg font-bold mb-3"> ต้องการคำปรึกษา?</h3>
                                <p className="text-sm text-white/90 leading-relaxed mb-4">
                                    ทีมงานของเราพร้อมให้คำแนะนำเกี่ยวกับผลิตภัณฑ์ที่เหมาะสมกับความต้องการของคุณ
                                </p>
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-100 transition-colors duration-300"
                                >
                                    <span>ติดต่อเรา</span>
                                    <RightOutlined />
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

        </section>
    );
}