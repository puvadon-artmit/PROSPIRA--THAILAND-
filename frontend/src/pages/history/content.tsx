import { motion } from "framer-motion";


export default function HistoryContent() {
    const timelineData = [
        {
            year: "1987",
            title: "Bridgestone APM Established",
            desc: "Bridgestone APM established as a joint venture (Clevite-Bridgestone company) owned by Clevite Elastomers of Milan, Ohio and Bridgestone Corporation of Tokyo Japan.",
        },
        {
            year: "1988",
            title: "Bridgestone APM Begins Manufacturing",
            desc: "Manufacturing operations begin at the Clevite Elastomers plant in Angola, Indiana with three injection presses and 3,000 sq ft of workspace.",
        },
        {
            year: "1991",
            title: "Expansion to Findlay, Ohio",
            desc: "The Findlay, Ohio facility is established and manufacturing operations are moved to Findlay.",
        },
        {
            year: "1993",
            title: "Wholly-owned Subsidiary",
            desc: "Bridgestone Corporation of Japan purchased all shares of the joint venture, establishing BAPM as a wholly-owned subsidiary.",
        },
        {
            year: "1996",
            title: "BAPM Expands Operations",
            desc: "Expanded operations to Upper Sandusky, Ohio, producing similar products as well as performing metal coating operations.",
        },
        {
            year: "2010",
            title: "Consolidation of Operations",
            desc: "Consolidated all Anti-Vibration Division operations and established a new headquarters office building in Findlay, Ohio.",
        },
        {
            year: "2022",
            title: "Acquired by Zhong Ding Incorporated",
            desc: "BAPM Anti-Vibration Division is acquired by Zhong Ding Incorporated and renamed to Prospira America Corporation.",
        },
    ];

    return (
        <div>
            <section className="relative py-24 px-8 sm:px-12 md:px-32 lg:px-32 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-100/10 to-blue-100/10 rounded-full blur-3xl" />
                    <div className="absolute top-20 left-[10%] w-32 h-32 border-2 border-cyan-200/45 rounded-3xl rotate-45 animate-float" />
                    <div className="absolute top-40 right-[15%] w-24 h-24 border-2 border-blue-200/45 rounded-full animate-float" style={{ animationDelay: "2s" }} />
                    <div className="absolute bottom-32 left-[20%] w-20 h-20 border-2 border-cyan-300/45 rounded-2xl rotate-12 animate-float" style={{ animationDelay: "1s" }} />
                    <div className="absolute bottom-48 right-[25%] w-28 h-28 border-2 border-blue-300/45 rounded-full animate-float" style={{ animationDelay: "3s" }} />
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage:
                                "linear-gradient(#08a4b8 1px, transparent 1px), linear-gradient(90deg, #08a4b8 1px, transparent 1px)",
                            backgroundSize: "50px 50px",
                        }}
                    />
                    <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />
                    <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent" />
                    <div className="absolute top-10 right-10 grid grid-cols-4 gap-3 opacity-20">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                        ))}
                    </div>
                    <div className="absolute bottom-10 left-10 grid grid-cols-4 gap-3 opacity-20">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                        ))}
                    </div>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    <section className="relative bg-gradient-to-b from-white to-cyan-50 border-b-4 border-[#08a4b8] rounded-2xl py-20">
                        <div className="max-w-6xl mx-auto px-6">
                            <header className="mb-16 text-center">
                                <h2 className="text-4xl md:text-5xl font-extrabold text-[#08a4b8] drop-shadow-md">
                                    Our History
                                </h2>
                            </header>

                            <div className="relative border-l-4 border-cyan-500 ml-4">
                                {timelineData.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="mb-12 ml-6"
                                    >
                                        {/* จุดกลม */}
                                        <span className="absolute -left-[14px] flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-4 ring-white" />

                                        {/* เนื้อหา */}
                                        <div className="bg-white shadow-lg rounded-2xl p-6 border border-cyan-100 hover:shadow-2xl transition">
                                            <p className="text-sm text-cyan-600 font-semibold">{item.year}</p>
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-1 mb-3">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}