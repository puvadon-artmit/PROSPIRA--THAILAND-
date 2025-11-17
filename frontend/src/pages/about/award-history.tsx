import { motion } from "framer-motion";
import { Award, Star, TrendingUp, Shield } from "lucide-react";
import award_history from "../../images/about/reward/reward1.png";
import award_history2 from "../../images/about/reward/reward2.png";

export default function AwardHistory() {
  const stats = [
    { icon: Award, label: "Certifications", value: "21s+" },
    { icon: Star, label: "Industry Awards", value: "12+" },
    { icon: TrendingUp, label: "Years Excellence", value: "4+" },
    { icon: Shield, label: "Quality Standards", value: "ISO" }
  ];

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-slate-50 via-white to-cyan-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-[#08a4b8] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#08a4b8]/10 rounded-full mb-6"
          >
            <Award className="w-5 h-5 text-[#08a4b8]" />
            <span className="text-sm font-semibold text-[#08a4b8] uppercase tracking-wider">
              Excellence Recognition
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
          >
            Overview of{" "}
            <span className="bg-gradient-to-r from-[#08a4b8] to-cyan-600 bg-clip-text text-transparent">
              Prospira Thailand
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Certificate & Ecovadis Recognition
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#08a4b8] to-cyan-600 flex items-center justify-center mb-4 shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {[award_history, award_history2].map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08a4b8]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                {/* Image */}
                <img
                  src={img}
                  alt={`Certificate ${index + 1}`}
                  className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg z-20">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#08a4b8]" />
                    <span className="text-sm font-bold text-gray-900">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute -top-3 -left-3 w-20 h-20 bg-gradient-to-br from-[#08a4b8] to-cyan-600 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#08a4b8]/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-400/5 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#08a4b8] to-cyan-600 mb-6 shadow-lg">
              <Star className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Committed to Excellence
            </h3>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Prospira Thailand is committed to{" "}
              <span className="font-semibold text-[#08a4b8]">quality</span>,{" "}
              <span className="font-semibold text-[#08a4b8]">sustainability</span>, and{" "}
              <span className="font-semibold text-[#08a4b8]">innovation</span>. 
              This overview showcases our official certifications and recognition through 
              Ecovadis for responsible business excellence.
            </p>           
          </div>
        </motion.div>
      </div>
    </section>
  );
}