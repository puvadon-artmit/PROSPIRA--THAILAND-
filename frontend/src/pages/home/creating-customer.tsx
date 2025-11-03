import team from "../../images/home/trust.jpeg";
import styles from "../../css/our-strengths.module.css";
import DataES from "../../images/home/DataES.png";

export default function CreatingCustomer() {
    return (
        <section className="relative bg-white">
            <div className="relative h-[350px] md:h-[320px] overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
                    style={{ backgroundImage: `url(${team})` }}
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6 z-10">
                    <h1 className={`text-4xl md:text-5xl font-bold mb-6 drop-shadow-2xl ${styles.animateSlideUp}`}>
                        การสร้างมูลค่าและความไว้วางใจให้กับ
                        <span className="mt-2 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-200 bg-clip-text text-transparent">
                            ลูกค้า
                        </span>
                    </h1>

                    <p className={`max-w-3xl text-base md:text-lg leading-relaxed text-gray-100 drop-shadow-lg ${styles.animateSlideUp}`} style={{ animationDelay: "0.2s" }}>
                        ภาวะผู้นำส่งเสริมความเป็นเจ้าของของพนักงาน ขับเคลื่อนนวัตกรรม และสนับสนุน TQM
                    </p>
                </div>
            </div>


            <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-8 sm:px-12 md:px-24 lg:px-4 z-10 max-w-7xl mx-auto py-20">
                <div className="flex-1 max-w-md md:max-w-lg">
                    <img
                        src={DataES}
                        className="w-full h-auto object-contain"
                        alt="ปลอดภัยไว้ก่อน"
                    />
                </div>

                <div className="flex-1 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-2xl text-black">
                        พันธกิจด้านคุณภาพ
                    </h1>
                    <p className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-600 drop-shadow-lg">
                        "รับใช้สังคมด้วยคุณภาพที่เหนือกว่า"
                    </p>
                    <p className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-600 drop-shadow-lg">
                        เรามุ่งมั่นที่จะมอบสิ่งที่ดีที่สุดให้กับลูกค้าและสังคม ไม่เพียงแต่ในแง่ของผลิตภัณฑ์ บริการ และเทคโนโลยีเท่านั้น แต่ยังรวมถึงกิจกรรมองค์กรทั้งหมดของเราด้วย ความมุ่งมั่นในคุณภาพของเราไม่ได้มาจากการขาดทุน แต่มาจากความมุ่งมั่นในการพัฒนาความปลอดภัยและคุณภาพชีวิตของผู้คนทั่วโลก ด้วยพันธกิจของเรา เรามุ่งมั่นที่จะเป็นบริษัทที่ได้รับความไว้วางใจจากทั่วโลก เป็นบริษัทที่เราทุกคนสามารถภาคภูมิใจได้
                    </p>
                </div>
            </div>

        </section>
    );
}
