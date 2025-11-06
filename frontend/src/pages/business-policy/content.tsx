
export default function BusinessPolicyContent() {


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
                                    Business Policy
                                </h2>
                            </header>

                            <div className="space-y-12">
                                {/* Section: Management Policy */}
                                <section className="bg-white border border-cyan-100 rounded-2xl p-6 md:p-8 shadow-sm">
                                    <h3 className="text-2xl font-bold text-cyan-700 mb-4">Management Policy</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Our anti-vibration rubber business began in 1937. Over the past 80 years, we have built a track record and accumulated expertise, delivering high-quality products to meet the expectations of many domestic customers who require anti-vibration rubber, including Japanese automobile manufacturers, which are said to have the world&apos;s highest demands for performance and quality.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mt-3">
                                        Our employees, from retired predecessors to our current young employees, have taken pride in our corporate philosophy of “contributing to society with the highest quality” and have worked hard every day to achieve it. As a result, we believe that our technology, products, and commitment to meeting and exceeding customer expectations are among the best in the world.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mt-3">
                                        With the establishment of this new company, all of our employees will work even harder together to deliver the various values we offer to even more customers around the world.
                                    </p>
                                </section>

                                {/* Section: Environmental Policy */}
                                <section className="bg-white border border-cyan-100 rounded-2xl p-6 md:p-8 shadow-sm">
                                    <div className="flex items-center justify-between gap-4 flex-wrap">
                                        <h3 className="text-2xl font-bold text-cyan-700">Environmental Policy</h3>
                                        <span className="text-sm text-gray-500">December 15, 2023 • Prospira Co., Ltd. • Corporate Environmental Management Officer</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mt-4">
                                        So that all future children can live in peace of mind.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mt-3">
                                        Prospira Co., Ltd. was established in July 2022 with the primary business of designing, developing, and selling anti-vibration rubber products. Our group companies have production bases in Japan, the United States, China, Thailand, and India, and we oversee these operations. Through the global design, development, and sale of environmentally friendly anti-vibration rubber products, we aim to deliver products that satisfy our customers and contribute to local communities by supporting the continuous improvement of our production bases, thereby contributing to the realization of a sustainable society.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mt-3">
                                        Furthermore, to protect the environment, we prevent environmental pollution, properly manage chemical substances, and comply with environmental laws and regulations throughout the company. To this end, based on our basic environmental policy, the “Environmental Declaration,” we have established and implemented a code of conduct to ensure that all children of the future can live in peace of mind.
                                    </p>

                                    {/* Behavioral Guidelines */}
                                    <div className="mt-6">
                                        <h4 className="text-lg font-semibold text-cyan-700 mb-3">Behavioral Guidelines</h4>
                                        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                            <li>
                                                <span className="font-medium">Coexistence with nature:</span> Minimize the impact on biodiversity while maximizing our contribution.
                                            </li>
                                            <li>
                                                <span className="font-medium">Use resources carefully:</span> Address resource depletion through technological and business model innovation to use sustainable resources.
                                            </li>
                                            <li>
                                                <span className="font-medium">Reduce CO₂:</span> Set targets for reducing total CO₂ emissions and promote reductions across the entire value chain.
                                            </li>
                                        </ol>
                                    </div>
                                </section>

                                {/* Section: Health & Productivity Management Policy */}
                                <section className="bg-white border border-cyan-100 rounded-2xl p-6 md:p-8 shadow-sm">
                                    <div className="flex items-center justify-between gap-4 flex-wrap">
                                        <h3 className="text-2xl font-bold text-cyan-700">Health & Productivity Management Policy</h3>
                                        <span className="text-sm text-gray-500">September 29, 2025 • CEO of Prospira Health Management Co., Ltd.</span>
                                    </div>

                                    <h4 className="text-lg font-semibold text-cyan-700 mt-4">Health Declaration</h4>
                                    <p className="text-gray-700 leading-relaxed mt-2">
                                        The physical and mental health of our employees is a key management foundation for sustainable growth. We adopt “People First” as a basic principle. Based on good health, employees can expand their discretion, enjoy their work, and seek self-realization—promoting “healthy management” to achieve our corporate philosophy and mission of “contributing to society with the highest quality.”
                                    </p>

                                    <h4 className="text-lg font-semibold text-cyan-700 mt-6">Purpose</h4>
                                    <p className="text-gray-700 leading-relaxed mt-2">
                                        Maintaining and improving the mental and physical health of employees and their families.
                                    </p>

                                    <h4 className="text-lg font-semibold text-cyan-700 mt-6">Main Initiatives</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                        <li>Ensure regular health checkups and increase participation in detailed examinations.</li>
                                        <li>Promote early detection and early treatment.</li>
                                        <li>Centralize physical and mental health information (health checkup results, stress checks) in a health management system.</li>
                                        <li>Support employees on leave/returning to work and work–family balance (short-time work system, return-to-work program, industrial physician interviews, etc.).</li>
                                        <li>Enhance care system via industrial physicians, public health nurses, HR, and an external EAP.</li>
                                    </ul>

                                    {/* Disclosure notes */}
                                    <details className="mt-6 bg-cyan-50/50 border border-cyan-100 rounded-xl p-4">
                                        <summary className="cursor-pointer font-medium text-cyan-700">Disclosure Notes (Indicators)</summary>
                                        <ul className="list-disc pl-5 space-y-2 text-gray-700 pt-4">
                                            <li>Absenteeism, presenteeism, and work engagement figures are for the head office only prior to the integration as of May 1, 2013.</li>
                                            <li><span className="font-medium">*1 Absenteeism:</span> Time off due to illness (higher = more days off).</li>
                                            <li><span className="font-medium">*2 Presenteeism:</span> Based on WHO-HPQ absolute presenteeism (0–100), averaged for all employees.</li>
                                            <li><span className="font-medium">*3 Work engagement:</span> Average of vitality, immersion, and enthusiasm.</li>
                                            <li><span className="font-medium">*4 Habitual exercisers:</span> % of people who exercise to the point of sweating at least once a week.</li>
                                        </ul>
                                    </details>

                                    {/* Various initiatives */}
                                    <div className="mt-8">
                                        <h4 className="text-lg font-semibold text-cyan-700">Various Initiatives</h4>

                                        <div className="grid md:grid-cols-2 gap-6 mt-3">
                                            {/* 1) Overtime & Paid Leave */}
                                            <div className="bg-white border border-slate-200 rounded-xl p-4">
                                                <h5 className="font-semibold text-gray-800">1) Long Working Hours & Paid Leave</h5>
                                                <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2">
                                                    <li>Fatigue checks for long-hour workers; optional industrial physician interviews.</li>
                                                    <li>Public announcements at the Health & Safety Committee.</li>
                                                    <li>Set & encourage specific paid leave days.</li>
                                                </ul>
                                            </div>

                                            {/* 2) No Smoking Marathon */}
                                            <div className="bg-white border border-slate-200 rounded-xl p-4">
                                                <h5 className="font-semibold text-gray-800">2) No Smoking Marathon</h5>
                                                <p className="text-gray-700 mt-2"><span className="font-medium">Purpose:</span> Reduce the smoking rate.</p>
                                                <p className="text-gray-700"><span className="font-medium">Method:</span> 4-month program under public health nurse guidance: cessation methods, symptom education, benefits of quitting, and internal awards for achievers.</p>
                                            </div>

                                            {/* 3) Exercise Measures */}
                                            <div className="bg-white border border-slate-200 rounded-xl p-4 md:col-span-2">
                                                <h5 className="font-semibold text-gray-800">3) Exercise Measures (Top: HQ / Bottom: Shizuoka)</h5>
                                                <p className="text-gray-700 mt-2"><span className="font-medium">Objectives:</span> Maintain healthy weight, improve physical/mental health, build exercise habits, enhance productivity.</p>
                                                <p className="text-gray-700"><span className="font-medium">Targets (3 months):</span> Achieve either <strong>3% body-fat reduction</strong> or <strong>3 kg weight loss</strong>.</p>
                                                <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2">
                                                    <li>Explain appropriate values & risks of extreme dietary restrictions.</li>
                                                    <li>Introduce helpful apps; share exercise intensity (METs) and energy expenditure.</li>
                                                </ul>

                                                <div className="mt-4 p-4 bg-cyan-50/60 border border-cyan-100 rounded-lg">
                                                    <p className="text-gray-700"><span className="font-medium">Walking Initiative:</span> Promote health & productivity via daily walking.</p>
                                                    <p className="text-gray-700">Participate in online walking events by the health insurer; organize participants and track progress (Shizuoka).</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>


                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}