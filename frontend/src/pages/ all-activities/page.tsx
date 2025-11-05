import Content from "./content";
import { useTranslation } from "react-i18next";

export default function AllActivitiesPage() {
  const { t } = useTranslation();
 

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
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#08a4b8]">{t("section_title")}</h2>
                </header>
            </div>

           <Content />

         
        </section>
    );
}

