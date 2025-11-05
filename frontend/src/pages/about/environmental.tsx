import environmental from "../../images/about/environmental.jpg";
import harmony_nature from "../../images/about/harmony-nature.png";
import natural_resources from "../../images/about/natural-resources.png";
import carbon_neutral from "../../images/about/carbon-neutral.png";

export default function Environmental() {
    return (
        <div className=" bg-gradient-to-b from-white to-gray-50">
            <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 px-4 mt-20 border-b-4 border-[#08a4b8]">
                <div
                    className="absolute inset-0 z-0 bg-fixed bg-center bg-cover "
                    style={{ backgroundImage: `url(${environmental})` }}
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6 z-10">
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

            
            <div className="bg-green-50">
                <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full mb-6">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-green-700 font-semibold text-sm">Our Commitment</span>
                        </div>

                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                            We at Prospira, are committed to continually working towards a sustainable society with integrity and in unity with our customers, partners, communities, and the world around us.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12 px-10">
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
                </div>

            </div>
        </div>
    );
}