import icon_spare_parts from "../../images/spare-parts.png";
import logo_company from "../../images/logo-company.png";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }, // ok
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }, // ok
  },
};

export default function Content() {
  return (
    <div>
      <section className="py-14 px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            {/* Left */}
            <div className="lg:col-span-8 space-y-6">
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-700">
                บริษัท <strong>Prospeira Co., Ltd.</strong>{" "}
                ดำเนินธุรกิจยางกันสั่นสะเทือนมาเป็นเวลายาวนาน โดยยึดมั่นในปรัชญาที่ว่า
                <span className="text-[#08a4b8] font-semibold">
                  {" "}
                  “มุ่งมั่นสร้างคุณภาพสูงสุดเพื่อประโยชน์ต่อสังคม”
                </span>
                ผลิตภัณฑ์ของเราถูกออกแบบเพื่อตอบโจทย์การใช้งานจริงในชีวิตประจำวัน
                และมุ่งเน้นความทนทาน ประสิทธิภาพ และคุณภาพที่ลูกค้าสามารถไว้วางใจได้
              </motion.p>

              <motion.p variants={fadeUp} className="text-gray-600 md:text-lg">
                ทำงานใกล้ชิดกับผู้ผลิตยานยนต์และพันธมิตรชั้นนำในประเทศญี่ปุ่น
                เพื่อรักษามาตรฐานการผลิตระดับสูงสุด และพัฒนาเทคโนโลยีอย่างต่อเนื่อง
              </motion.p>

              {/* Features */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 sm:mt-4 lg:mt-8"
              >
                {[
                  {
                    label: "ผลิตภัณฑ์หลัก",
                    value: "ยางกันสั่นสะเทือน (Vibration Rubber)",
                    icon: icon_spare_parts,
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={scaleIn}
                    whileHover={{ y: -4 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex-none w-10 h-10 rounded-lg bg-[#08a4b8]/10 flex items-center justify-center">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-6 h-6 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                      <div className="font-medium text-gray-700">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  variants={scaleIn}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow hover:shadow-lg transition"
                >
                  <h3 className="text-sm font-semibold text-[#08a4b8]">พันธกิจ</h3>
                  <p className="mt-2 text-gray-600">
                    มอบผลิตภัณฑ์คุณภาพสูงที่สร้างคุณค่าและความปลอดภัยให้สังคม
                  </p>
                </motion.div>

                <motion.div
                  variants={scaleIn}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow hover:shadow-lg transition"
                >
                  <h3 className="text-sm font-semibold text-[#08a4b8]">วิสัยทัศน์</h3>
                  <p className="mt-2 text-gray-600">
                    เป็นผู้นำด้านเทคโนโลยีวัสดุกันสั่นระดับภูมิภาค พร้อมขยายสู่ตลาดโลก
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right Card */}
            <aside className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="sticky top-28"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="rounded-3xl bg-white/80 backdrop-blur-lg border border-[#08a4b8]/20 shadow-lg p-6 flex flex-col gap-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-none w-16 h-16 rounded-xl bg-[#f2f2f2] grid place-items-center">
                      <img src={logo_company} alt="Logo" className="w-8 h-10" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">ชื่อบริษัท</div>
                      <div className="text-lg font-semibold text-gray-800">
                        Prospeira Co., Ltd.
                      </div>
                      <div className="text-sm text-gray-500">
                        สำนักงานใหญ่: ระยอง, ประเทศไทย
                      </div>
                    </div>
                  </div>

                  <dl className="grid grid-cols-3 gap-4 text-sm text-start pl-6 text-gray-600">
                    <div>
                      <dt className="text-gray-500">พนักงาน</dt>
                      <dd className="font-medium">180 คน</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">ผลิตภัณฑ์</dt>
                      <dd className="font-medium">กว่า 200 SKU</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">มาตรฐาน</dt>
                      <dd className="font-medium">ISO 9001</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">ตลาด</dt>
                      <dd className="font-medium">ญี่ปุ่น / เอเชีย</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">ปีที่ก่อตั้ง</dt>
                      <dd className="font-medium">1987</dd>
                    </div>
                  </dl>

                  <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex gap-3"
                  >
                    <motion.a
                      variants={fadeUp}
                      whileTap={{ scale: 0.98 }}
                      href="/recruitment"
                      className="flex-1 px-4 py-2 rounded-full bg-[#08a4b8] text-white font-medium text-center hover:shadow-lg transition"
                    >
                      ร่วมงานกับเรา
                    </motion.a>
                    <motion.a
                      variants={fadeUp}
                      whileTap={{ scale: 0.98 }}
                      href="/contact"
                      className="flex-1 px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-center hover:bg-gray-50 transition"
                    >
                      ติดต่อเรา
                    </motion.a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </aside>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
