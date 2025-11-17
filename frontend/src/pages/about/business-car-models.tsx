import { motion } from "framer-motion";

// logos
import toyota from "../../images/about/logo-car/toyota.png";
import isuzu from "../../images/about/logo-car/isuzu.png";
import mitsubishi from "../../images/about/logo-car/mitsu.png";
import suzuki from "../../images/about/logo-car/suzuki.png";
import stellantis from "../../images/about/logo-car/stellantis.png";
import perodua from "../../images/about/logo-car/perodua.png";
import daihatsu from "../../images/about/logo-car/daihatsu.png";
import hino from "../../images/about/logo-car/hino.png";
import nissan from "../../images/about/logo-car/nissan.png";

// ------------------------------------
// Types
// ------------------------------------
type ModelRow = {
  name: string;
  eng?: boolean; // Eng. Mtg.
  susp?: boolean; // Susp. Parts
  cab?: boolean; // Cab./Bdy. Mtg.
};

type OEMBlock = {
  brand: string;
  logo: string;
  items: ModelRow[];
};

// ------------------------------------
// Data
// ------------------------------------
const DATA: OEMBlock[] = [
  {
    brand: "TOYOTA",
    logo: toyota,
    items: [
      { name: "Hilux Revo", eng: true, susp: true, cab: true },
      { name: "Fortuner", eng: true, susp: true, cab: true },
      { name: "Camry", susp: true, cab: true },
      { name: "Corolla / C-HR", susp: true },
      { name: "Yaris / Vios", susp: true },
    ],
  },
  {
    brand: "ISUZU",
    logo: isuzu,
    items: [
      { name: "D-Max", eng: true, susp: true, cab: true },
      { name: "Mu-X", eng: true, susp: true, cab: true },
      { name: "ELF",susp: true },
    ],
  },
  {
    brand: "MITSUBISHI",
    logo: mitsubishi,
    items: [
      { name: "Triton / Pajero Sport", susp: true },
      { name: "Mirage / Attrage", eng: true },
    ],
  },
  {
    brand: "NISSAN",
    logo: nissan, 
    items: [
      { name: "March / Almera", eng: true, susp: true },
      { name: "Navara", susp: true },
      { name: "Versa / Micra", eng: true, susp: true },
      { name: "Navara NP300", cab: true },
    ],
  },
  {
    brand: "DAIHATSU",
    logo: daihatsu,
    items: [
      { name: "Sigra (Calya)", susp: true },
      { name: "Alza" , susp: true},
    ],
  },
  {
    brand: "PERODUA",
    logo: perodua,
    items: [{ name: "Axia / Bezza", susp: true }, { name: "Myvi", susp: true }],
  },
  {
    brand: "SUZUKI",
    logo: suzuki,
    items: [
      { name: "APV", eng: true, susp: true },
      { name: "Swift / Ciaz", eng: true },
    ],
  },
  {
    brand: "STELLANTIS",
    logo: stellantis,
    items: [
      { name: "JL", susp: true },
      { name: "J4U", susp: true },
      { name: "RAM", eng: true, susp: true },
    ],
  },
  {
    brand: "HINO",
    logo: hino,
    items: [{ name: "MDT", susp: true }],
  },
];

// ------------------------------------
// Small UI helpers
// ------------------------------------
const Tick = ({ on }: { on?: boolean }) => (
  <div className="flex items-center justify-center">
    {on ? (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
        <path
          d="M20 6L9 17l-5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#08a4b8]"
        />
      </svg>
    ) : (
      <span className="text-slate-300 dark:text-slate-600">—</span>
    )}
  </div>
);

const Badge = ({ label }: { label: string }) => (
  <span
    className="
      inline-flex items-center justify-center
      rounded-full px-3 py-1 text-[12px] font-medium
      text-white
      bg-gradient-to-r from-[#08a4b8] to-cyan-500
      shadow-md border border-white/10
      transition-all duration-300 ease-out
      hover:shadow-lg hover:scale-105
      dark:from-[#08a4b8] dark:to-cyan-400
      select-none
    "
  >
    {label}
  </span>
);


// ------------------------------------
// Component
// ------------------------------------
export default function BusinessCarModels() {
  return (
    <section className="relative py-14 px-6 bg-white">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-extrabold text-black text-center leading-tight mb-5"
      >
        Prospira Thailand – 
        <span className="text-[#08a4b8]"> Business for Thailand </span> Models
      </motion.h2>

      {/* Legend */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <Badge label="Eng. Mtg. = เครื่องยนต์" />
          <Badge label="Susp. Parts = ช่วงล่าง" />
          <Badge label="Cab./Bdy. Mtg. = ตัวถัง/ห้องโดยสาร" />
        </div>
      </div>

      {/* OEM blocks */}
      <div className="max-w-6xl mx-auto space-y-6">
        {DATA.map((oem, i) => (
          <motion.section
            key={oem.brand + i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-200/80 shadow-sm bg-white/90 backdrop-blur"
          >
            {/* OEM header */}
            <div className="flex items-center gap-4 p-4 bg-[#08a4b8] text-white rounded-t-2xl">
              {oem.logo && (
                <img
                  src={oem.logo}
                  alt={oem.brand}
                  className="w-12 h-12 object-contain bg-white/10 rounded-lg p-1"
                  loading="lazy"
                />
              )}
              <h3 className="text-lg md:text-xl font-bold tracking-wide">{oem.brand}</h3>
            </div>

            {/* Desktop: semantic table */}
            <div className="hidden md:block">
              <div className="pb-4">
                <div className="overflow-hidden rounded-b-2xl">
                  <table className="w-full text-sm">
                    <thead className="bg-black">
                      <tr>
                        <th scope="col" className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">
                          Model
                        </th>
                        <th scope="col" className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">
                          Eng. Mtg.
                        </th>
                        <th scope="col" className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">
                          Susp. Parts
                        </th>
                        <th scope="col" className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">
                          Cab./Bdy. Mtg.
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800">
                      {oem.items.map((row, idx) => (
                        <tr
                          key={row.name + idx}
                          className="bg-white/60 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
                          <td className="px-4 py-3 text-center"><Tick on={row.eng} /></td>
                          <td className="px-4 py-3 text-center"><Tick on={row.susp} /></td>
                          <td className="px-4 py-3 text-center"><Tick on={row.cab} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mobile: compact list */}
            <div className="md:hidden divide-y divide-slate-800/80 ">
              {oem.items.map((row, idx) => (
                <div
                  key={row.name + idx}
                  className="px-4 py-3 bg-white/80 transition-colors"
                >
                  <div className="text-slate-900 font-medium">{row.name}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {row.eng && <Badge label="Eng." />}
                    {row.susp && <Badge label="Susp." />}
                    {row.cab && <Badge label="Cab." />}
                    {!row.eng && !row.susp && !row.cab && (
                      <span className="text-xs text-slate-500">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

    </section>
  );
}
