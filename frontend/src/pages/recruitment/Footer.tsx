


export default function Footer() {
  return (
    <div>
        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t-4 border-[#08a4b8] text-white py-10 px-4 mt-12">
            <div className="max-w-6xl mx-auto text-center">
                <p style={{ color: 'white', marginBottom: '8px' }}>พร้อมจะเป็นส่วนหนึ่งของทีมแล้วหรือยัง?</p>
                <p className="text-md text-gray-300 mb-3">หากคุณมีคำถามเกี่ยวกับการสมัครงาน</p>
                <div className="flex items-center justify-center gap-6 flex-wrap text-md">
                    <a href="mailto:HR@prospira.co.th" className="text-[#08a4b8] hover:text-cyan-400 transition-colors font-medium">HR@prospira.co.th</a>
                    <span className="text-gray-600">|</span>
                    <a href="tel:02-xxx-xxxx" className="text-[#08a4b8] hover:text-cyan-400 transition-colors font-medium">02-xxx-xxxx</a>
                </div>
            </div>
        </div>
    </div>
  )
}