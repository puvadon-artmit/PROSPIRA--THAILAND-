import { useEffect, useMemo, useState } from "react";
import { CalendarOutlined, RightOutlined } from "@ant-design/icons";
import "../../css/company-news.css";
import type { NewsItemApi, NewsItem } from "../../types/company-news";
import { buildImageURL } from "../../../utils/get-image";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PAGE_LIMIT = 3;
const NEW_DAYS = 14;

function isAbortError(e: unknown): e is DOMException {
  return e instanceof DOMException && e.name === "AbortError";
}

function parseDate(input: string): Date | null {
  const d = new Date(input.includes("T") ? input : input.replace(" ", "T"));
  return isNaN(d.getTime()) ? null : d;
}

function formatThaiDate(input: string): string {
  const d = parseDate(input);
  if (!d) return input ?? "";
  return d.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });
}

function isNew(createdAt: string): boolean {
  const d = parseDate(createdAt);
  if (!d) return false;
  const diffDays = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= NEW_DAYS;
}


export default function CompanyNews() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const location = useLocation();
  const lang = location.pathname.split("/")[1];

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      setLoading(true);
      setError("");
      try {
        const base = (import.meta.env.VITE_API_BASE_URL as string);
        const url = `${base}/api/company-news/get-company-news?limit=${PAGE_LIMIT}&offset=${offset}`;

        const res = await fetch(url, { signal: ac.signal });
        console.log("HTTP status:", res.status);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: unknown = await res.json();
        console.log("Payload:", data);
        const arr = Array.isArray(data) ? (data as NewsItemApi[]) : (data as any)?.data ?? [];

        const mapped: NewsItem[] = arr.map((n: NewsItemApi) => ({
          id: n.company_news_id,
          title: n.title,
          desc: n.content,
          category: n.category || "ทั่วไป",
          dateText: `เผยแพร่เมื่อวันที่ ${formatThaiDate(n.created_at)}`,
          created_at: n.created_at,
          photo: buildImageURL(n.company_news_photo, base),
          isNew: isNew(n.created_at),
        }));

        setItems(mapped);
      } catch (e: unknown) {
        if (!isAbortError(e)) {
          console.error(e);
          setError("เกิดข้อผิดพลาดในการโหลดข่าว");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [offset]);



  const skeletons = useMemo<number[]>(() => Array.from({ length: PAGE_LIMIT }, (_, i) => i), []);

  return (
    <section className="relative py-24 px-8 sm:px-12 md:px-32 lg:px-32 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-100/10 to-blue-100/10 rounded-full blur-3xl" />
        <div className="absolute top-20 left-[10%] w-32 h-32 border-2 border-cyan-200/45 rounded-3xl rotate-45 animate-float" />
        <div className="absolute top-40 right-[15%] w-24 h-24 border-2 border-blue-200/45 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-32 left-[20%] w-20 h-20 border-2 border-cyan-300/45 rounded-2xl rotate-12 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-48 right-[25%] w-28 h-28 border-2 border-blue-300/45 rounded-full animate-float" style={{ animationDelay: "3s" }} />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#08a4b8 1px, transparent 1px), linear-gradient(90deg, #08a4b8 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent" />
        <div className="absolute top-10 right-10 grid grid-cols-4 gap-3 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
        <div className="absolute bottom-10 left-10 grid grid-cols-4 gap-3 opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#08a4b8]">ข่าวสารและประกาศ</h2>
        </header>
      </div>

      {loading && (
        <div className="grid md:grid-cols-3 gap-8">
          {skeletons.map((i) => (
            <div key={i} className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl animate-pulse">
              <div className="h-6 w-24 bg-slate-200 rounded-full mb-4" />
              <div className="h-4 w-48 bg-slate-200 rounded mb-3" />
              <div className="h-6 w-3/4 bg-slate-200 rounded mb-3" />
              <div className="h-4 w-full bg-slate-200 rounded mb-2" />
              <div className="h-4 w-5/6 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-center p-8 bg-red-50 text-red-600 rounded-2xl border border-red-100">
          {error}{" "}
          <button onClick={() => setOffset((o) => o)} className="ml-2 underline">
            ลองใหม่
          </button>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="text-center p-8 bg-white rounded-2xl border border-slate-100 text-slate-500">ยังไม่มีข่าวในขณะนี้</div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid md:grid-cols-3 gap-8 px-0 sm:px-6 md:px-12 lg:px-24">
          {items.map((item, index) => (
            <Link
              to={`/${lang}/company-news?title=${encodeURIComponent(item.title)}`}
              key={item.id ?? index}
              className="group relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-500 rounded-3xl" />
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(90deg, #08a4b8, #06c8df, #08a4b8)",
                  padding: "2px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {item.isNew && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                  ใหม่
                </div>
              )}

              {item.photo && (
                <div className="relative z-10 mt-4">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-3xl mb-4"
                  />
                </div>
              )}

              <div className="relative z-10">
                <div className="inline-block px-4 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-xs font-semibold rounded-full mb-4">
                  {item.category}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 group-hover:text-cyan-600 transition-colors duration-300">
                  <CalendarOutlined />
                  <span className="font-medium">{item.dateText}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-300 leading-tight">
                  {item.title}
                </h3>
                {/* <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{item.desc}</p> */}

                <div className="flex items-center gap-2 text-cyan-600 font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                  <span>อ่านเพิ่มเติม</span>
                  <RightOutlined className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 group-hover:w-full transition-all duration-700 ease-out" />
            </Link>
          ))}
        </div>
      )}

      <div className="text-center mt-16 flex items-center justify-center gap-3">
        <button
          onClick={() => setOffset((o) => Math.max(0, o - PAGE_LIMIT))}
          disabled={loading || offset === 0}
          className="px-6 py-2 rounded-full border border-cyan-300 text-cyan-700 disabled:opacity-40 hover:bg-cyan-50 transition"
        >
          ก่อนหน้า
        </button>
        <a
          href="/news"
          className="group inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#08a4b8] text-white font-bold text-lg shadow-2xl hover:shadow-[#08a4b8]/50 hover:scale-105 transition-all duration-500 relative overflow-hidden"
        >
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative z-10">ดูข่าวทั้งหมด</span>
          <RightOutlined className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
        <button
          onClick={() => setOffset((o) => o + PAGE_LIMIT)}
          disabled={loading || items.length < PAGE_LIMIT}
          className="px-6 py-2 rounded-full border border-cyan-300 text-cyan-700 disabled:opacity-40 hover:bg-cyan-50 transition"
        >
          ถัดไป
        </button>
      </div>
    </section>
  );
}
