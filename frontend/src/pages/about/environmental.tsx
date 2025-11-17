import { Leaf, Droplets, Wind } from 'lucide-react';
import harmony_nature from "../../images/about/harmony-nature.png";
import natural_resources from "../../images/about/natural-resources.png";
import carbon_neutral from "../../images/about/carbon-neutral.png";
import environmental from "../../images/home/environmental-bar.png";
import tree from "../../images/home/environmental-tree-world.png";

export default function Environmental() {
    return (
        <div className="bg-gradient-to-b from-emerald-50 via-white to-green-50">
            {/* HERO with Parallax Effect */}
            <div className="relative overflow-hidden">
                <div className="relative overflow-hidden text-white py-16 px-4 mb-20 border-b-4 border-[#08a4b8]">
                    <div
                        className="absolute inset-0 z-0 bg-fixed bg-center bg-cover "
                        style={{ backgroundImage: `url(${environmental})` }}
                        aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6 z-10">
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-4">
                            <Leaf className="w-5 h-5 text-green-300" />
                            <span className="text-green-100 font-semibold">Sustainability First</span>
                        </div>
                        <div className="relative max-w-6xl mx-auto text-center z-10">
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-2xl">
                                Environmental Sustainability
                            </h1>

                            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
                                To help ensure a healthy environment for current and future generations.
                            </p>
                        </div>
                    </div>
                </div>

            </div>


            {/* CONTENT */}
            <div className="bg-gradient-to-b from-green-50 to-emerald-50 mt-[-80px]">
                <div className="max-w-7xl mx-auto px-6 py-20">

                    {/* Thai Statement Block with Glass Effect */}
                    <div className="max-w-6xl mx-auto mb-20">
                        <div className="relative rounded-3xl bg-gradient-to-br from-white to-green-50/50 shadow-2xl border border-emerald-200/60 p-8 md:p-12 overflow-hidden">
                            {/* Decorative gradient orbs */}

                            <div className="relative z-10">
                                {/* Commitment Section */}
                                <div className="text-center max-w-4xl mx-auto mb-12">
                                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-200/20 to-emerald-200/20 backdrop-blur-sm border border-green-200/30 rounded-full mb-8 shadow-lg">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                                        </span>
                                        <span className="text-green-800 font-bold text-base">Our Commitment</span>
                                    </div>

                                    <div className="relative flex items-center justify-center pb-8 group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-200/20 to-emerald-200/20 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                                        <img
                                            src={tree}
                                            className="relative w-[80%]  h-auto object-contain rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                                            alt="Tree"
                                        />
                                    </div>
                                </div>


                                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text mb-6 text-center">
                                    นโยบายด้านสิ่งแวดล้อมของพร้อสไพร่า
                                </h2>

                                {/* Features Grid */}
                                <div className="grid md:grid-cols-3 gap-8 lg:gap-12 px-10 py-16">
                                    {/* Item 1 */}
                                    <figure className="group">
                                        <div className="overflow-hidden flex justify-center">
                                            <img
                                                src={harmony_nature}
                                                alt="In harmony with nature"
                                                className="w-[30%] h-[30%]  object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                        <figcaption className="mt-4 text-center">
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                In harmony with nature
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mt-1">
                                                To contribute to biodiversity through habitat enhancement, and through environmental education and research.
                                            </p>
                                        </figcaption>
                                    </figure>

                                    {/* Item 2 */}
                                    <figure className="group">
                                        <div className="overflow-hidden flex justify-center">
                                            <img
                                                src={natural_resources}
                                                alt="Value natural resources"
                                                className="w-[30%] h-[30%] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                        <figcaption className="mt-4 text-center">
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                Value natural resources
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mt-1">
                                                To continually improve natural resource conservation through operational improvements and product design.
                                            </p>
                                        </figcaption>
                                    </figure>

                                    {/* Item 3 */}
                                    <figure className="group">
                                        <div className="overflow-hidden flex justify-center">
                                            <img
                                                src={carbon_neutral}
                                                alt="Reduce CO2 emissions"
                                                className="w-[30%] h-[30%] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                        <figcaption className="mt-4 text-center">
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                Reduce CO2 emissions
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mt-1">
                                                To continually reduce emissions of greenhouse gases, including CO2 from our products' complete life cycle.
                                            </p>
                                        </figcaption>
                                    </figure>
                                </div>

                                <p className="text-gray-700 text-lg leading-relaxed mb-4 text-center max-w-4xl mx-auto">
                                    เรามุ่งมั่นช่วยรักษาและเสริมสร้างสิ่งแวดล้อมที่ดีให้คงอยู่และสืบทอดสู่รุ่นต่อไป
                                    พร้อสไพร่า&nbsp;ร่วมเป็นหนึ่งเดียวกับลูกค้า พันธมิตรธุรกิจ และสังคม
                                    ดำเนินกิจกรรมอย่างซื่อสัตย์ เพื่อมุ่งสู่การสร้างสังคม "ที่ยั่งยืน" ให้เกิดขึ้นได้จริง
                                </p>

                                <p className="text-gray-800 text-lg leading-relaxed text-center mb-8 font-semibold">
                                    ด้วยเหตุนี้ เราจึงดำเนินกิจกรรมหลัก&nbsp;<span className="text-emerald-600 text-xl">3 ประการ</span>&nbsp;ต่อไปนี้
                                </p>

                                {/* 3 Main Principles - Card Style */}
                                <div className="grid gap-4 mb-10 max-w-3xl mx-auto">
                                    {[
                                        { icon: Leaf, text: "อยู่ร่วมกับธรรมชาติ — อุทิศตนเพื่อพิทักษ์ความหลากหลายทางชีวภาพ ผ่านการบำรุงรักษาแหล่งที่อยู่อาศัย รวมถึงการศึกษาและวิจัยด้านสิ่งแวดล้อม", color: "green" },
                                        { icon: Droplets, text: "ใช้ทรัพยากรอย่างทะนุถนอม — พัฒนาประสิทธิภาพอย่างต่อเนื่อง ทั้งการใช้แหล่งน้ำและทรัพยากรธรรมชาติในกระบวนการผลิตสินค้าและบริการโดยรวม", color: "cyan" },
                                        { icon: Wind, text: "ลดการปล่อยก๊าซคาร์บอนไดออกไซด์ — มุ่งสู่สังคมคาร์บอนต่ำ โดยพัฒนาแนวทางที่ลดการปล่อยตลอดวงจรชีวิตผลิตภัณฑ์", color: "teal" }
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className={`group flex gap-4 p-5 rounded-2xl bg-gradient-to-br from-${item.color}-50 to-${item.color}-100/50 border-2 border-gray-50 shadow-xl hover:border-${item.color}-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                                        >
                                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                                <item.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <p className="text-gray-700 leading-relaxed flex-1">
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* 4 Workstreams */}
                                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                    {[
                                        { title: "ด้านผลิตภัณฑ์และบริการ", subtitle: "Products and Services", desc: "ออกแบบและพัฒนาผลิตภัณฑ์ที่คำนึงถึงสิ่งแวดล้อม", gradient: "from-green-500 to-emerald-600" },
                                        { title: "ด้านการดำเนินการ", subtitle: "Operations", desc: "ยกระดับประสิทธิภาพการใช้ทรัพยากรและพลังงานอย่างต่อเนื่อง", gradient: "from-emerald-500 to-teal-600" },
                                        { title: "ด้านกิจกรรมเพื่อสังคม", subtitle: "Community Activities", desc: "ทำงานร่วมกับชุมชนเพื่อสร้างคุณค่าร่วมด้านสิ่งแวดล้อม", gradient: "from-teal-500 to-cyan-600" },
                                        { title: "การสื่อสารด้านสิ่งแวดล้อม", subtitle: "Environmental Communications", desc: "สื่อสารอย่างโปร่งใส สร้างความตระหนักและมีส่วนร่วมจากทุกภาคส่วน", gradient: "from-cyan-500 to-blue-600" }
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="group relative overflow-hidden rounded-2xl border-2 border-emerald-200/60 bg-white p-5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                                        >
                                            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${item.gradient} group-hover:w-full transition-all duration-500 opacity-10 group-hover:opacity-20`}></div>
                                            <div className="relative z-10">
                                                <div className={`font-bold text-base bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-1`}>
                                                    {item.title}
                                                </div>
                                                <div className="text-xs text-gray-500 mb-2 font-medium">
                                                    {item.subtitle}
                                                </div>
                                                <div className="text-gray-700 leading-relaxed">
                                                    {item.desc}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
