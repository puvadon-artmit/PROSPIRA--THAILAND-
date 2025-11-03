import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-600 via-slate-800 to-gray-900 flex items-center justify-center px-2 sm:px-4 lg:px-4 py-16">
      <div className="max-w-5xl w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10 text-white">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">ติดต่อเรา</h1>
          <p className="text-gray-300 text-lg">
            มีคำถามหรือข้อเสนอแนะ? เรายินดีรับฟังและให้บริการคุณเสมอ
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">ข้อมูลการติดต่อ</h2>
              <ul className="space-y-4 text-gray-200">
                <li className="flex items-center gap-3">
                  <EnvironmentOutlined className="text-cyan-400 text-xl" />
                  <span>88 8 ซอย 13 ตำบล มะขามคู่ อำเภอนิคมพัฒนา ระยอง 21180</span>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneOutlined className="text-cyan-400 text-xl" />
                  <span>โทรศัพท์: 02-123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <MailOutlined className="text-cyan-400 text-xl" />
                  <span>อีเมล: HRProspira@prospira.com</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-white/20 pt-6">
              <h3 className="text-xl font-semibold mb-3">เวลาทำการ</h3>
              <p className="text-gray-300">วันจันทร์ - ศุกร์ : 08:00 - 17:30 น.</p>
              <p className="text-gray-300">วันเสาร์ - อาทิตย์ และวันหยุดนักขัตฤกษ์ : ปิดทำการ</p>
            </div>
          </div>

          {/* Right Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 border border-white/10 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">ส่งข้อความถึงเรา</h2>

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
          </form>
        </div>
      </div>
    </div>
  );
}
