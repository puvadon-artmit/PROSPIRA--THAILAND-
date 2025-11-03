import { useEffect, useRef, useState } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";


type Item = { key: string; label: string; href: string; desc?: string };

const core: Item[] = [
  { key: "1", label: "เกี่ยวกับเรา", href: "/about", desc: "รู้จักตัวตนและค่านิยมของเรา" },
  { key: "2", label: "ประวัติบริษัท", href: "/history", desc: "เส้นทางและเหตุการณ์สำคัญ" },
];

const vision: Item[] = [
  { key: "3", label: "วิสัยทัศน์และพันธกิจ", href: "/vision", desc: "ทิศทางและเป้าหมายองค์กร" },
  { key: "4", label: "ทีมงาน", href: "/team", desc: "ผู้คนเบื้องหลังความสำเร็จ" },
];

export default function CompanyMenu({ isCompanyPage, lang }: { isCompanyPage?: boolean, lang?: string }) {
  const [open, setOpen] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | null>(null);
  const leaveTimer = useRef<number | null>(null);
  const { t } = useTranslation();
  

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHoverCapable(mq.matches);
    const listener = (e: MediaQueryListEvent) => setHoverCapable(e.matches);
    mq.addEventListener?.("change", listener);
    return () => mq.removeEventListener?.("change", listener);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const clearTimers = () => {
    if (hoverTimer.current) { window.clearTimeout(hoverTimer.current); hoverTimer.current = null; }
    if (leaveTimer.current) { window.clearTimeout(leaveTimer.current); leaveTimer.current = null; }
  };

  const handleEnter = () => {
    if (!hoverCapable) return;
    clearTimers();
    hoverTimer.current = window.setTimeout(() => setOpen(true), 80);
  };

  const handleLeave = () => {
    if (!hoverCapable) return;
    clearTimers();
    leaveTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      ref={wrapRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => !hoverCapable && setOpen(v => !v)}
        className={`relative px-4 py-2 transition-all duration-300 font-medium inline-flex items-center gap-1
          ${isCompanyPage ? "text-[#08a4b8]" : "text-black hover:text-[#08a4b8]"}`}
      >
        <span className="relative z-10">{t("company")}</span>
        <DownOutlined className="text-xs relative z-10" />
      </button>

      <div
        className={`absolute left-1/2 top-full mt-3 -translate-x-1/2 w-screen px-4
          ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          role="menu"
          aria-label="Company Menu"
          tabIndex={-1}
          className={`mx-auto max-w-7xl overflow-hidden rounded-sm mt-3
            border border-white/10 bg-black/80 backdrop-blur-md shadow-2xl
            transition-all duration-200
            ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="text-sm font-semibold text-gray-50">เมนูบริษัท</div>
          
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 md:p-4">
            <section className="space-y-1">
              <h4 className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-200/80">
                ภาพรวม
              </h4>
              <ul className="space-y-1">
                {core.map((it) => (
                  <li key={it.key}>
                    <a
                      href={it.href}
                      className="group flex items-start justify-between gap-3 rounded-lg px-3 py-2
                                 transition-colors hover:bg-white/30 focus:bg-white/30 focus:outline-none"
                      onClick={() => setOpen(false)}
                    >
                      <div>
                        <div className="text-gray-50 font-medium">{it.label}</div>
                        {it.desc && (
                          <div className="text-xs text-gray-50/80">{it.desc}</div>
                        )}
                      </div>
                      <RightOutlined className="mt-1 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-1">
              <h4 className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-50/80">
                ทิศทางองค์กร
              </h4>
              <ul className="space-y-1">
                {vision.map((it) => (
                  <li key={it.key}>
                    <a
                      href={it.href}
                      className="group flex items-start justify-between gap-3 rounded-lg px-3 py-2
                                 transition-colors hover:bg-white/30 focus:bg-white/30 focus:outline-none"
                      onClick={() => setOpen(false)}
                    >
                      <div>
                        <div className="text-gray-50 font-medium">{it.label}</div>
                        {it.desc && (
                          <div className="text-xs text-gray-50/80">{it.desc}</div>
                        )}
                      </div>
                      <RightOutlined className="mt-1 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col justify-between rounded-xl bg-white/20 p-3 md:p-4">
              <div>
                <div className="text-sm font-semibold text-gray-50 mb-1">
                  ร่วมงานกับเรา
                </div>
                <p className="text-xs text-gray-50/90 mb-3">
                  ค้นหาตำแหน่งที่เปิดรับ และสมัครได้ทันที
                </p>
                <a
                  href={`/${lang}/recruitment`}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium
                             bg-[#08a4b8] text-white hover:opacity-90 transition-opacity"
                  onClick={() => setOpen(false)}
                >
                  ดูงานที่เปิดรับ <RightOutlined className="text-[10px]" />
                </a>
              </div>
              <div className="mt-3 text-[10px] text-gray-50/80">
                Tip: กด <kbd className="px-1 py-0.5 border rounded">Esc</kbd> เพื่อปิดเมนู
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
