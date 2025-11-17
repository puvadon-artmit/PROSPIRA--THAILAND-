import overview from "../../images/about/overview.png";
import { motion } from "framer-motion";

export default function Overview() {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 px-6 bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center drop-shadow-xl leading-tight mb-10"
      >
        Overview of{" "}
        <span className="text-[#08a4b8]">Prospira Thailand</span> – Certificate
        & Ecovadis
      </motion.h2>

      {/* Image */}
      <motion.img
        src={overview}
        alt="Overview"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="rounded-3xl shadow-2xl w-full max-w-5xl object-contain border border-gray-200 hover:scale-[1.02] transition-transform duration-500 ease-in-out"
      />

      {/* Optional description */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="pt-8 text-gray-600 max-w-3xl text-center text-lg leading-relaxed"
      >
        Prospira Thailand is committed to quality, sustainability, and
        innovation. This overview showcases our official certifications and
        recognition through Ecovadis for responsible business excellence.
      </motion.p>
    </section>
  );
}
