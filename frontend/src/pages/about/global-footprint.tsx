import global_footprint from "../../images/about/global-footprint.png";
import { motion } from "framer-motion";

export default function GlobalFootprint() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-[#f0fdfa] via-white to-[#e0f2fe] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-200/40 blur-3xl rounded-full mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#08a4b8]/30 blur-3xl rounded-full mix-blend-multiply animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,164,184,0.15)_0%,transparent_70%)]"></div>
      </div>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
      
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-cyan-300/40 to-teal-200/30 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <img
              src={global_footprint}
              alt="Global Footprint"
              className="relative rounded-[2rem] shadow-2xl border border-cyan-100 w-full max-w-[600px] object-contain"
              loading="lazy"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center lg:text-left space-y-6"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our <span className="text-[#08a4b8]">Global Footprint</span>
          </motion.h2>

          <motion.p
            className="text-gray-600 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
          >
            With production and partnerships across Asia and beyond, Prospira’s
            global footprint reflects our dedication to innovation, efficiency,
            and sustainable development. Our network enables seamless
            collaboration and high-quality manufacturing worldwide.
          </motion.p>

        </motion.div>
      </div>
    </section>
  );
}
