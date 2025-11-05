import icon_technology from "../../images/icon-strengths/technology.png";
import icon_production from "../../images/icon-strengths/production.png";
import icon_qa from "../../images/icon-strengths/qa.png";
import icon_customer from "../../images/icon-strengths/service.png";
import { useTranslation } from "react-i18next";



export default function Content() {
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
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex justify-center mb-4">
                    <div className="text-black px-6 py-2 rounded-full text-sm font-semibold border-2 border-[#08a4b8]" style={{ backgroundColor: 'rgba(8, 164, 184, 0.2)' }}>
                        Our Strengths
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    จุดแข็งของเรา (Our Strengths)
                </h1>

                <section className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 overflow-hidden">


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
                    </div>
                </section>

                <div className="space-y-10 text-gray-700 leading-relaxed">

                    <p>
                        <strong>Prospera</strong> มีประวัติศาสตร์อันยาวนานตั้งแต่สมัยที่เป็นส่วนหนึ่งของ
                        <strong> Bridgestone</strong> ซึ่งเป็นรากฐานของเทคโนโลยีที่เชื่อถือได้และได้รับการพิสูจน์แล้ว
                    </p>

                    <p>
                        แต่เท่านั้นยังไม่พอ! บริษัทใหม่แห่งนี้ถูกสร้างขึ้นโดยพนักงานทุกคน
                        เพื่อให้สามารถสร้างสรรค์สิ่งใหม่ ๆ และสร้างมูลค่าใหม่ ๆ ได้มากขึ้น
                    </p>

                    <p>
                        ประสบการณ์อันยาวนานและสภาพแวดล้อมใหม่ ๆ นี่แหละคือสิ่งที่หล่อหลอมให้
                        <strong> Prospera แข็งแกร่ง</strong>
                    </p>

                    <h2 className="text-2xl font-semibold text-cyan-700 mt-12">
                        ประวัติและเทคโนโลยีที่เชื่อถือได้
                    </h2>
                    <p>
                        ธุรกิจยางกันสั่นสะเทือน (Vibration Control Rubber) ของ Prospera
                        มีประวัติศาสตร์การออกแบบและพัฒนายางกันสั่นสะเทือนยาวนานถึง
                        <strong> 86 ปี</strong> ทำให้มีเทคโนโลยีอยู่ในระดับโลกชั้นนำ (World-Class)
                    </p>
                    <p>
                        แม้จะเปลี่ยนมาเป็นบริษัทใหม่ แต่เรายังคงรักษาภูมิปัญญา (Know-how) นั้นไว้
                        เพื่อสานต่อปรัชญาองค์กรที่ว่า
                        <em> “การสร้างคุณูปการต่อสังคมด้วยคุณภาพที่ดีที่สุด”</em> อย่างต่อเนื่อง
                    </p>

                    <h2 className="text-2xl font-semibold text-cyan-700 mt-12">
                        องค์ประกอบแห่งความแข็งแกร่งของ Prospera
                    </h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>ศักยภาพในการพัฒนา (Development Capability)</li>
                        <li>ผลิตภัณฑ์ที่ตอบโจทย์ความต้องการเฉพาะบุคคล (Individual Needs)</li>
                        <li>ระบบซัพพลายเชน (Supply Chain) ที่มีประสิทธิภาพสูง</li>
                        <li>ความมุ่งมั่นในเรื่องความปลอดภัยและคุณภาพ</li>
                        <li>
                            การจัดซื้อ การผลิต และการขนส่งแบบองค์รวม
                            (Integrated Supply Chain Management)
                        </li>
                    </ul>

                    <p>
                        Prospera มุ่งเน้นไปที่ “การรับประกันการจัดหาสินค้าที่มั่นคง” และ
                        “การเพิ่มประสิทธิภาพต้นทุน”
                    </p>
                    <p>
                        เราสร้างสรรค์กิจกรรมการผลิตและจัดส่งที่มีทั้งความมั่นคงและคล่องตัว
                        โดยประสานงานกับฐานการผลิตทั้งในประเทศและต่างประเทศอย่างต่อเนื่อง
                    </p>
                    <p>
                        การควบคุมกิจกรรมทั้งหมดได้ด้วยตนเอง ตั้งแต่การจัดหาวัตถุดิบไปจนถึง
                        การขนส่ง (Logistics) ทำให้เราสามารถจัดหาสินค้าได้อย่างมั่นคงและต่อเนื่องยิ่งขึ้น
                    </p>

                    <h2 className="text-2xl font-semibold text-cyan-700 mt-12">
                        การบริหารจัดการคุณภาพอย่างเข้มงวด
                    </h2>
                    <p>
                        เพื่อให้บรรลุปรัชญาขององค์กรที่ว่า
                        <em> “การสร้างคุณูปการต่อสังคมด้วยคุณภาพที่ดีที่สุด”</em>{' '}
                        Prospera ได้กำหนด <strong>“คำประกาศด้านคุณภาพ (Quality Declaration)”</strong> ขึ้น
                    </p>
                    <p>
                        ภายใต้คำประกาศนี้ เป้าหมายของเราไม่ใช่แค่กระบวนการผลิตเท่านั้น
                        แต่คือการมุ่งมั่นแสวงหาและมอบสิ่งที่ดีที่สุดสำหรับลูกค้า
                        ในทุกกิจกรรมของบริษัท ไม่ว่าจะเป็นผลิตภัณฑ์ บริการ หรือเทคโนโลยี
                    </p>
                </div>
            </div>
        </section>
    );
}
