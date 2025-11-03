import team from "../../images/home/engineer-people-are-putting-protective-helmet-head-warehouse_33799-11145.jpg";
import styles from "../../css/our-strengths.module.css";
import DataRA from "../../images/home/DataRA.png";

export default function SafetyFirst() {
    return (
        <section className="relative  bg-white">
            <div className="relative h-[350px] md:h-[320px] overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
                    style={{ backgroundImage: `url(${team})` }}
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6 z-10">
                    <h1 className={`text-4xl md:text-5xl font-bold mb-6 drop-shadow-2xl ${styles.animateSlideUp}`}>
                        ปลอดภัยไว้ก่อน
                        <span className="mt-2 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-200 bg-clip-text text-transparent">

                            เสมอ
                        </span>
                    </h1>

                    <p className={`max-w-3xl text-base md:text-lg leading-relaxed text-gray-100 drop-shadow-lg ${styles.animateSlideUp}`} style={{ animationDelay: "0.2s" }}>
                        ที่ Prospira เรามุ่งเน้นความปลอดภัยเป็นคุณค่าทางธุรกิจ
                        การสร้างสถานที่ทำงานที่ปลอดภัยสำหรับทุกคนเป็นความรับผิดชอบของทุกคน
                    </p>
                </div>
            </div>


            <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-8 sm:px-12 md:px-24 lg:px-4 z-10 max-w-7xl mx-auto py-20">
                <div className="flex-1 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-2xl text-black">
                        เราตั้งเป้าหมายด้วยความภาคภูมิใจในการบรรลุความปลอดภัยที่สมบูรณ์แบบ
                    </h1>
                    <p className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-600 drop-shadow-lg">
                        “ความปลอดภัยต้องมาก่อนเสมอ” หมายรวมถึงการป้องกันอุบัติเหตุที่เกี่ยวข้องกับการทำงานทุกประเภท ไม่ว่าจะเป็นภัยพิบัติ อนามัยอุตสาหกรรม และอุบัติเหตุจราจร
                    </p>
                </div>

                <div className="flex-1 max-w-md md:max-w-lg">
                    <img
                        src={DataRA}
                        className="w-full h-auto object-contain"
                        alt="ปลอดภัยไว้ก่อน"
                    />
                </div>
            </div>

        </section>
    );
}
