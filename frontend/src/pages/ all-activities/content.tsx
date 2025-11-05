import { useEffect, useMemo, useState } from "react";
import { CalendarOutlined, RightOutlined } from "@ant-design/icons";
import "../../css/company-news.css";
import type { NewsItemApi, NewsItem } from "../../types/company-news";
import { buildImageURL } from "../../../utils/get-image";
import { Link, useLocation } from "react-router-dom";

const PAGE_LIMIT = 6;
const NEW_DAYS = 14;

type ApiListResponse = {
    total: number;
    total_pages: number;
    limit: number;
    offset: number;
    data: NewsItemApi[];
};

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

export default function Content() {
    const [items, setItems] = useState<NewsItem[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [totalPages, setTotalPages] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

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

                const payload: unknown = await res.json();
                console.log("Payload:", payload);

                let arr: NewsItemApi[] = [];
                let tp = 0;
                let tt = 0;

                if (Array.isArray(payload)) {
                    arr = payload as NewsItemApi[];
                    tp = arr.length < PAGE_LIMIT ? Math.floor(offset / PAGE_LIMIT) + 1 : Math.floor(offset / PAGE_LIMIT) + 2; // best effort
                    tt = 0;
                } else {
                    const p = payload as Partial<ApiListResponse>;
                    arr = (p.data ?? []) as NewsItemApi[];
                    tp = Number(p.total_pages ?? 0);
                    tt = Number(p.total ?? 0);
                }

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
                setTotalPages(tp);
                setTotal(tt);
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

    const currentPage = Math.floor(offset / PAGE_LIMIT) + 1;

    const PAGE_NUMBERS = useMemo<number[]>(
        () => Array.from({ length: Math.max(totalPages, 0) }, (_, i) => i + 1),
        [totalPages]
    );

    const skeletons = useMemo<number[]>(() => Array.from({ length: PAGE_LIMIT }, (_, i) => i), []);

    return (
        <div>

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

            {/* Pagination */}
            <div className="text-center mt-16 flex items-center justify-center gap-3">
                <button
                    onClick={() => setOffset((o) => Math.max(0, o - PAGE_LIMIT))}
                    disabled={loading || currentPage === 1}
                    className="px-6 py-2 rounded-full border border-cyan-300 text-cyan-700 disabled:opacity-40 hover:bg-cyan-50 transition"
                >
                    ก่อนหน้า
                </button>

                <div className="flex items-center gap-2">
                    {PAGE_NUMBERS.map((p) => {
                        const pageOffset = (p - 1) * PAGE_LIMIT;
                        const isActive = currentPage === p;
                        return (
                            <button
                                key={p}
                                onClick={() => setOffset(pageOffset)}
                                disabled={loading}
                                className={[
                                    "w-10 h-10 rounded-full border transition font-semibold",
                                    isActive
                                        ? "bg-cyan-600 text-white border-cyan-600"
                                        : "border-cyan-300 text-cyan-700 hover:bg-cyan-50",
                                ].join(" ")}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {p}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => setOffset((o) => o + PAGE_LIMIT)}
                    disabled={loading || (totalPages > 0 && currentPage === totalPages)}
                    className="px-6 py-2 rounded-full border border-cyan-300 text-cyan-700 disabled:opacity-40 hover:bg-cyan-50 transition"
                >
                    ถัดไป
                </button>
            </div>


            {total > 0 && (
                <div className="mt-4 text-center text-sm text-gray-500">
                    {/* ทั้งหมด {total} รายการ  */}
                </div>
            )}
        </div>
    );
}
