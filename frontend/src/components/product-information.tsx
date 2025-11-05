import { useEffect, useRef, useState } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import withLang from "../../utils/normalize-lang";

type Item = { key: string; label: string; href: string; desc?: string };


export default function ProductInformation({
  isCompanyPage,
  lang,
}: {
  isCompanyPage?: boolean;
  lang?: string;
}) {
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
    if (hoverTimer.current) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    if (leaveTimer.current) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
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

  const productsCol1: Item[] = [
  {
    key: "p1",
    label: "ชิ้นส่วนยางรองแท่นเครื่อง",
    href: withLang(lang, `/product/rubber`),
    desc: "ลดแรงสั่นและเสียง เพิ่มความทนทานให้เครื่องจักร/ยานยนต์",
  },
];

const productsCol2: Item[] = [
  {
    key: "p2",
    label: "แอร์สปริง",
    href: withLang(lang, `/product/air-spring`),
    desc: "ระบบรองรับแรงสั่นสะเทือน ประสิทธิภาพสูง ดูแลรักษาง่าย",
  },
];

const productsCol3: Item[] = [
  {
    key: "p3",
    label: "Pneumatic Chuck",
    href: withLang(lang, `/product/pneumatic-chuck`),
    desc: "หัวจับชิ้นงานแบบนิวแมติก จับแน่น แม่นยำ คลายเร็ว",
  },
];


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
        onClick={() => !hoverCapable && setOpen((v) => !v)}
        className={`relative px-4 py-2 transition-all duration-300 font-medium inline-flex items-center gap-1
          ${isCompanyPage ? "text-[#08a4b8]" : "text-black hover:text-[#08a4b8]"}`}
      >
        <span className="relative z-10">{t("product_information")}</span>
        <DownOutlined className="text-xs relative z-10" />
      </button>

      {/* เมนูแบบเมก้าเมนู */}
      <div
        className={`absolute left-1/2 top-full mt-3 -translate-x-1/2 w-screen px-4
          ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          role="menu"
          aria-label="Product Menu"
          tabIndex={-1}
          className={`mx-auto max-w-7xl overflow-hidden rounded-sm mt-3
            border border-white/10 bg-black/80 backdrop-blur-md shadow-2xl
            transition-all duration-200
            ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="text-sm font-semibold text-gray-50">{t("product-information")}</div>
          </div>

          {/* 3 คอลัมน์สินค้า */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 md:p-4">
            {/* คอลัมน์ 1 */}
            <section className="space-y-1">
              <h4 className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-200/80">
                ยางรองแท่นเครื่อง
              </h4>
              <ul className="space-y-1">
                {productsCol1.map((it) => (
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

            {/* คอลัมน์ 2 */}
            <section className="space-y-1">
              <h4 className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-50/80">
                ระบบรองรับ/กันสะเทือน
              </h4>
              <ul className="space-y-1">
                {productsCol2.map((it) => (
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

            {/* คอลัมน์ 3 */}
            <section className="space-y-1">
              <h4 className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-50/80">
                อุปกรณ์จับยึดนิวแมติก
              </h4>
              <ul className="space-y-1">
                {productsCol3.map((it) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}
