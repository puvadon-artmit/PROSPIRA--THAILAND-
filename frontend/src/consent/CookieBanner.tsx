import React from "react";
import { useConsent } from "./ConsentProvider";


const brand = "#08a4b8";


export const CookieBanner: React.FC = () => {
    const { state, acceptAll, rejectAll, setCategories } = useConsent();
    const [expanded, setExpanded] = React.useState(false);


    if (state.given) return null;


    return (
        <div className="fixed inset-x-0 bottom-0 z-50">
            <div className="mx-auto max-w-4xl m-3 rounded-2xl shadow-2xl bg-white/95">
                <div className="p-4 sm:p-5">
                    <p className="text-sm text-slate-800">
                        เราใช้คุกกี้เพื่อทำให้เว็บไซต์ทำงานและปรับปรุงประสบการณ์ของคุณ คุณสามารถยอมรับทั้งหมด ปฏิเสธที่ไม่จำเป็น หรือกำหนดเองได้
                        <span className="ml-1">/ We use cookies to run the site and improve your experience. You can accept all, reject non-essential, or customize.</span>
                    </p>

                    {expanded && (
                        <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked disabled className="accent-[#08a4b8]" />
                                <span className="font-medium">จำเป็น / Necessary</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="accent-[#08a4b8]"
                                    onChange={(e) => setCategories({ analytics: e.target.checked })}
                                />
                                <span>วิเคราะห์ / Analytics</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="accent-[#08a4b8]"
                                    onChange={(e) => setCategories({ ads: e.target.checked })}
                                />
                                <span>โฆษณา / Ads</span>
                            </label>
                        </div>
                    )}


                    <div className="mt-4 flex flex-wrap gap-2 justify-end">
                        <button
                            onClick={() => setExpanded((v) => !v)}
                            className="px-3 py-2 text-sm rounded-lg border hover:shadow transition-colors"
                            style={{ borderColor: brand, color: brand }}
                        >
                            {expanded ? "Close / ปิด" : "Customize / กำหนดเอง"}
                        </button>
                        <button
                            onClick={rejectAll}
                            className="px-3 py-2 text-sm rounded-lg border hover:shadow transition-colors"
                            style={{ borderColor: brand, color: brand }}
                        >
                            Reject / ปฏิเสธ
                        </button>
                        <button
                            onClick={acceptAll}
                            className="px-4 py-2 text-sm rounded-lg text-white shadow hover:shadow-lg transition-colors"
                            style={{ backgroundColor: brand }}
                        >
                            Accept all / ยอมรับทั้งหมด
                        </button>
                    </div>

                    <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <a href="/cookie-policy" className="underline" style={{ color: brand }}>Cookie Policy</a> ·
                        <button className="underline ml-1" style={{ color: brand }} onClick={() => setExpanded(true)}>Cookie Settings</button>
                    </div>
                </div>
            </div>
        </div>
    );
};