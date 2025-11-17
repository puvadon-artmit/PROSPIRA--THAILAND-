// import icon_paperairplane from "../../images/paper-airplane.webp";
import { useTranslation } from "react-i18next";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";

export default function Greeting() {
  const { t } = useTranslation();

  function Autoplay(slider: any) {
    let timeout: any;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }
    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, 5000);
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  }

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    renderMode: "precision",
    slides: { perView: 1, spacing: 16 },
    rubberband: false,
  }, [Autoplay]);

  // ข้อมูล 2 สไลด์ (ประธานเดิม + ประธานคนที่สอง)
  const slides = [
    {
      role: t("ceo_title", { defaultValue: "Chief Executive Officer" }),
      name: t("ceo_name", { defaultValue: "Firstname Lastname" }),
      p1: t("p1_main_content", {
        defaultValue:
          "ข้อความหลักของสารจากผู้บริหาร (เพิ่มคีย์ p1_main_content ใน i18n).",
      }),
      q1: t("p2_quote_part1", { defaultValue: "" }),
      qmid: t("p2_quote_philosophy", { defaultValue: "ปรัชญา" }),
      q2: t("p2_quote_part2", { defaultValue: "" }),
    },
    {
      role: t("chair_title", { defaultValue: t("ceo_title", { defaultValue: "Chairman" }) }),
      name: t("chair_name", { defaultValue: "Another Leader" }),
      p1: t("chair_p1_main_content", {
        defaultValue: t("p1_main_content", {
          defaultValue:
            "สารจากประธานอีกคน (เพิ่มคีย์ chair_* เพื่อปรับเนื้อหาแยกได้).",
        }),
      }),
      q1: t("chair_p2_quote_part1", {
        defaultValue: t("p2_quote_part1", { defaultValue: "" }),
      }),
      qmid: t("chair_p2_quote_philosophy", {
        defaultValue: t("p2_quote_philosophy", { defaultValue: "ปรัชญา" }),
      }),
      q2: t("chair_p2_quote_part2", {
        defaultValue: t("p2_quote_part2", { defaultValue: "" }),
      }),
    },
  ];

  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <section
      className="relative bg-gradient-to-b from-white via-[#f8fcfc] to-white py-20 px-6 text-gray-800 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #000000 50%, #08a4b8 50%)",
      }}
    >
      {/* เส้นตกแต่งพื้นหลัง */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 w-[120px] h-[120px] bg-[#08a4b8]/10 blur-3xl rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 right-1/4 w-[180px] h-[180px] bg-[#08a4b8]/10 blur-3xl rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(8,164,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(8,164,184,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* หัวข้อ */}
      <div className="relative text-center mb-16">
        <div className="inline-block">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#08a4b8]" />
            <svg
              className="w-8 h-8 text-[#08a4b8]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#08a4b8]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#08a4b8] tracking-tight mb-2">
            {t("section_title_th", { defaultValue: "สารจากผู้บริหาร" })}
          </h1>
          <p className="text-gray-500 text-sm uppercase tracking-widest">
            {t("section_title_en", { defaultValue: "Message from Executives" })}
          </p>
        </div>
      </div>

      {/* สไลเดอร์ */}
      <div className="relative max-w-4xl mx-auto">
        {/* ปุ่มควบคุมด้านบน/ขวา */}
        {ready && (
          <div className="absolute -top-10 right-0 flex items-center gap-2 z-20">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="px-3 py-1.5 rounded-full border border-white/50 bg-white/70 hover:bg-white shadow transition"
              aria-label="ก่อนหน้า"
            >
              ‹
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="px-3 py-1.5 rounded-full border border-white/50 bg-white/70 hover:bg-white shadow transition"
              aria-label="ถัดไป"
            >
              ›
            </button>
          </div>
        )}

        <div ref={sliderRef} className="keen-slider">
          {slides.map((s, idx) => (
            <div key={idx} className="keen-slider__slide">
              <div className="relative bg-white/85 backdrop-blur-md rounded-2xl shadow-xl border border-[#08a4b8]/10 p-8 md:p-12 hover:shadow-2xl transition-shadow duration-500">
                {/* Accent bar */}
                <div className="absolute top-2 left-0 w-1 h-[80%] bg-gradient-to-b from-[#08a4b8] via-[#08a4b8]/50 to-transparent rounded-l-2xl" />

                <div className="space-y-6 relative z-10">
                  <p className="text-lg md:text-xl leading-relaxed text-gray-700 first-letter:text-5xl first-letter:font-bold first-letter:text-[#08a4b8] first-letter:mr-2 first-letter:float-left">
                    {s.p1}
                  </p>

                  <div className="relative pl-6 border-l-4 border-[#08a4b8]/30">
                    <p className="text-lg md:text-xl leading-relaxed text-gray-700 italic">
                      {s.q1}{" "}
                      <span className="font-semibold text-[#08a4b8]">
                        {s.qmid}
                      </span>
                      {s.q2}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-4 py-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#08a4b8]/30 to-transparent" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#08a4b8]/40" />
                      <div className="w-2 h-2 rounded-full bg-[#08a4b8]/60" />
                      <div className="w-2 h-2 rounded-full bg-[#08a4b8]" />
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#08a4b8]/30 to-transparent" />
                  </div>

                  {/* ลายเซ็นและชื่อ */}
                  <div className="flex justify-end items-end gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1 tracking-wide">
                        {s.role}
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-[#08a4b8] tracking-wide">
                        {s.name}
                      </p>
                      <div className="mt-2 h-0.5 w-full bg-gradient-to-l from-[#08a4b8] to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}

