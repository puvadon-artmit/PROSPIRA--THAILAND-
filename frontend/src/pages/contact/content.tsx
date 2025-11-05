import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import logo from "../../images/logo_footer.svg";
import Video from "/Contact US.mp4";


export default function Content() {
    const lat = 12.889193;
    const lng = 101.097962;

    const mapEmbedSrc = `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`;
    const mapLink =
        "https://www.google.com/maps/place/%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97+%E0%B8%9E%E0%B8%A3%E0%B9%8A%E0%B8%AD%E0%B8%AA%E0%B9%84%E0%B8%9E%E0%B8%A3%E0%B9%88%E0%B8%B2+(%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2)+%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94/@12.889193,101.097962,19z/data=!4m6!3m5!1s0x3102e932f806a7d1:0xefbdea02e26c21ac!8m2!3d12.8893209!4d101.0981139!16s%2Fg%2F11s1_q54nk?hl=en-US&entry=ttu"

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-600 via-slate-800 to-gray-900 text-white pb-20">
            {/* ---------- Banner Section ---------- */}
            <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden flex items-center justify-center">
                {/* วิดีโอพื้นหลัง */}
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={Video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/fallback.jpg"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

                {/* ข้อความบนแบนเนอร์ */}
                <div className="relative z-10 text-center px-4">
                    <div className="flex justify-center mt-[20vh]">
                        <img src={logo} alt="Logo" className="h-10 sm:h-12 lg:h-14 w-auto drop-shadow-lg" />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-cyan-600 shadow-lg"></div>
            </section>

            {/* ---------- Main Content ---------- */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl mt-16">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                    <a
                        href="https://maps.google.com/?q=12.889193,101.097962"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition"
                    >
                        <div className="flex items-start gap-3">
                            <EnvironmentOutlined className="text-cyan-400 text-2xl mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg">ที่อยู่</h3>
                                <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                                    88 8 ซอย 13 ตำบล มะขามคู่ อำเภอนิคมพัฒนา ระยอง 21180
                                </p>
                            </div>
                        </div>
                    </a>

                    <a
                        href="tel:021234567"
                        className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition"
                    >
                        <div className="flex items-start gap-3">
                            <PhoneOutlined className="text-cyan-400 text-2xl mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg">โทรศัพท์</h3>
                                <p className="text-gray-300 text-sm mt-1">02-123-4567</p>
                            </div>
                        </div>
                    </a>

                    <a
                        href="mailto:HRProspira@prospira.com"
                        className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition"
                    >
                        <div className="flex items-start gap-3">
                            <MailOutlined className="text-cyan-400 text-2xl mt-1" />
                            <div>
                                <h3 className="font-semibold text-lg">อีเมล</h3>
                                <p className="text-gray-300 text-sm mt-1">HRProspira@prospira.com</p>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Contact & Form */}
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Left Info */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold mb-4">ข้อมูลการติดต่อ</h2>
                        <ul className="space-y-4 text-gray-200">
                            <li className="flex items-start gap-3">
                                <EnvironmentOutlined className="text-cyan-400 text-xl mt-1" />
                                <span>88 8 ซอย 13 ตำบล มะขามคู่ อำเภอนิคมพัฒนา ระยอง 21180</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <PhoneOutlined className="text-cyan-400 text-xl mt-1" />
                                <span>โทรศัพท์: 02-123-4567</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MailOutlined className="text-cyan-400 text-xl mt-1" />
                                <span>อีเมล: HRProspira@prospira.com</span>
                            </li>
                        </ul>

                        <div className="border-t border-white/10 mt-6 pt-6">
                            <h3 className="text-xl font-semibold">เวลาทำการ</h3>
                            <p className="text-gray-300 mt-2">วันจันทร์ - ศุกร์ : 08:00 - 17:30 น.</p>
                            <p className="text-gray-300">วันเสาร์ - อาทิตย์ : ปิดทำการ</p>
                        </div>
                    </div>

                    {/* Right Form */}
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-lg"
                    >
                        <h2 className="text-2xl font-semibold mb-6">ส่งข้อความถึงเรา</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">ชื่อของคุณ</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none"
                                    placeholder="กรอกชื่อของคุณ"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-1">อีเมล</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none"
                                    placeholder="example@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-1">ข้อความ</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none resize-none"
                                    placeholder="พิมพ์ข้อความของคุณที่นี่..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/40"
                            >
                                ส่งข้อความ
                            </button>
                        </div>
                    </form>
                </div>

                {/* Map */}
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold mb-4">แผนที่บริษัท</h2>
                    <div className="rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-white/5">
                        <div className="relative w-full aspect-video min-h-[320px]">
                            <iframe
                                src={mapEmbedSrc}
                                title="Prospira (Thailand) Co., Ltd. - Google Maps"
                                loading="lazy"
                                className="absolute inset-0 h-full w-full"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <a
                            href={mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition"
                        >
                            เปิดใน Google Maps
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeWidth="2" d="M7 17L17 7M7 7h10v10" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
