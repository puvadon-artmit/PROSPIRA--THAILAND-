import React from "react";
import { useConsent } from "./ConsentProvider";


const brand = "#08a4b8";


export const CookieSettings: React.FC = () => {
    const { state, setCategories, update } = useConsent();


    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">การตั้งค่าคุกกี้ / Cookie Settings</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                ปรับความยินยอมตามหมวดหมู่ด้านล่าง แล้วกดบันทึก / Adjust your consent by category and click Save.
            </p>
            <div className="space-y-3">
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked disabled className="accent-[#08a4b8]" />
                    <span className="font-medium">จำเป็น / Necessary</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="accent-[#08a4b8]"
                        checked={!!state.categories.analytics}
                        onChange={(e) => setCategories({ analytics: e.target.checked })}
                    />
                    <span>วิเคราะห์ / Analytics</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="accent-[#08a4b8]"
                        checked={!!state.categories.ads}
                        onChange={(e) => setCategories({ ads: e.target.checked })}
                    />
                    <span>โฆษณา / Ads</span>
                </label>
            </div>
            <div className="mt-6 flex gap-2">
                <button
                    onClick={() => update({})}
                    className="px-4 py-2 rounded-lg text-white shadow"
                    style={{ backgroundColor: brand }}
                >
                    Save / บันทึก
                </button>
                <a href="/" className="px-4 py-2 rounded-lg border" style={{ borderColor: brand, color: brand }}>
                    Back / กลับ
                </a>
            </div>
        </div>
    );
};