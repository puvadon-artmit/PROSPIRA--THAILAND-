import icon_spare_parts from "../../images/spare-parts.png";
import logo_company from "../../images/logo-company.png";

export default function content() {
  return (
    <div>
          <div className="py-14 px-6 bg-gray-50 overflow-hidden">
              <div className="max-w-6xl mx-auto">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Left */}
                  <div className="lg:col-span-8 space-y-6">
                    <p className="text-lg md:text-xl text-gray-700">
                      บริษัท <strong>Prospeira Co., Ltd.</strong>{" "}
                      ดำเนินธุรกิจยางกันสั่นสะเทือนมาเป็นเวลายาวนาน
                      โดยยึดมั่นในปรัชญาที่ว่า
                      <span className="text-[#08a4b8] font-semibold">
                        {" "}
                        “มุ่งมั่นสร้างคุณภาพสูงสุดเพื่อประโยชน์ต่อสังคม”
                      </span>
                      ผลิตภัณฑ์ของเราถูกออกแบบเพื่อตอบโจทย์การใช้งานจริงในชีวิตประจำวัน
                      และมุ่งเน้นความทนทาน ประสิทธิภาพ
                      และคุณภาพที่ลูกค้าสามารถไว้วางใจได้
                    </p>
        
                    <p className="text-gray-600 md:text-lg">
                      ทำงานใกล้ชิดกับผู้ผลิตยานยนต์และพันธมิตรชั้นนำในประเทศญี่ปุ่น
                      เพื่อรักษามาตรฐานการผลิตระดับสูงสุด
                      และพัฒนาเทคโนโลยีอย่างต่อเนื่อง
                    </p>
        
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 sm:mt-4 lg:mt-8">
                      {[
                        {
                          label: "ผลิตภัณฑ์หลัก",
                          value: "ยางกันสั่นสะเทือน (Vibration Rubber)",
                          icon: icon_spare_parts,
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <div className="flex-none w-10 h-10 rounded-lg bg-[#08a4b8]/10 flex items-center justify-center">
                            {/* ใช้ img แทน */}
                            <img
                              src={item.icon}
                              alt={item.label}
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">{item.label}</div>
                            <div className="font-medium text-gray-700">
                              {item.value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
        
                    {/* Mission & Vision */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow hover:shadow-lg transition">
                        <h3 className="text-sm font-semibold text-[#08a4b8]">
                          พันธกิจ
                        </h3>
                        <p className="mt-2 text-gray-600">
                          มอบผลิตภัณฑ์คุณภาพสูงที่สร้างคุณค่าและความปลอดภัยให้สังคม
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow hover:shadow-lg transition">
                        <h3 className="text-sm font-semibold text-[#08a4b8]">
                          วิสัยทัศน์
                        </h3>
                        <p className="mt-2 text-gray-600">
                          เป็นผู้นำด้านเทคโนโลยีวัสดุกันสั่นระดับภูมิภาค
                          พร้อมขยายสู่ตลาดโลก
                        </p>
                      </div>
                    </div>
                  </div>
        
                  {/* Right Card */}
                  <aside className="lg:col-span-4">
                    <div className="sticky top-28">
                      <div className="rounded-3xl bg-white/80 backdrop-blur-lg border border-[#08a4b8]/20 shadow-lg p-6 flex flex-col gap-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-none w-16 h-16 rounded-xl bg-[#f2f2f2] text-white grid place-items-center text-2xl font-bold">
                            <img src={logo_company} alt="Logo" className="w-10 h-10" />
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
        
                        <div className="flex gap-3">
                          <a
                            href="/recruitment"
                            className="flex-1 px-4 py-2 rounded-full bg-[#08a4b8] text-white font-medium text-center hover:shadow-lg transition"
                          >
                            ร่วมงานกับเรา
                          </a>
                          <a
                            href="/contact"
                            className="flex-1 px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-center hover:bg-gray-50 transition"
                          >
                            ติดต่อเรา
                          </a>
                        </div>
        
                      
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
    </div>
  )
}