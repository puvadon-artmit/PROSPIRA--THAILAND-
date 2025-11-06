"use client";
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../../layouts/admin-layout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { Summary, JobApplication } from "../../../types/dashboard";

const API_BASE: string = import.meta.env.VITE_API_BASE_URL;

/** ---------- Types ---------- */

type AppsByDayPoint = { date: string; applications: number };
type PieDatum = { name: string; value: number };
type BarDatum = { name: string; value: number };

const COLORS = [
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EF4444", // red
  "#3B82F6", // blue
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#14B8A6", // teal
  "#F97316", // orange
];

/** ---------- Component ---------- */
export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary>({
    job_applications: 0,
    job_recruitments: 0,
    questionnaires: 0,
    users: 0,
  });
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    async function load(): Promise<void> {
      try {
        setLoading(true);
        const [sumRes, appsRes] = await Promise.all([
          fetch(`${API_BASE}/api/dashboard/summary`),
          fetch(
            `${API_BASE}/api/job-application/get-job-applications?limit=50&offset=0`
          ),
        ]);

        if (!sumRes.ok) throw new Error(`Summary error ${sumRes.status}`);
        if (!appsRes.ok) throw new Error(`Applications error ${appsRes.status}`);

        const sumJson: any = await sumRes.json();
        const appsJson: any = await appsRes.json();

        if (!mounted) return;

        const nextSummary: Summary =
          sumJson?.summary && typeof sumJson.summary === "object"
            ? {
              job_applications: Number(sumJson.summary.job_applications ?? 0),
              job_recruitments: Number(sumJson.summary.job_recruitments ?? 0),
              questionnaires: Number(sumJson.summary.questionnaires ?? 0),
              users: Number(sumJson.summary.users ?? 0),
            }
            : summary;

        const nextApps: JobApplication[] = Array.isArray(appsJson)
          ? appsJson
          : [];

        setSummary(nextSummary);
        setApps(nextApps);
      } catch (e: unknown) {
        console.error(e);
        const msg =
          e instanceof Error ? e.message : "โหลดข้อมูลไม่สำเร็จ (unknown)";
        if (mounted) setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // ----- helpers -----
  const formatDate = (str?: string | null): Date | null => {
    if (!str) return null;
    const d = new Date(str.replace(" ", "T") + "+07:00"); // server returns "YYYY-MM-DD HH:mm:ss"
    return isNaN(d.getTime()) ? null : d;
  };

  const appsByDay = useMemo<AppsByDayPoint[]>(() => {
    // last 30 days line chart
    const today = new Date();
    const days = [...Array(30)].map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (29 - i));
      const key = d.toISOString().slice(0, 10);
      return { key, label: key.slice(5), count: 0 };
    });

    const idx = new Map(days.map((d, i) => [d.key, i]));
    for (const a of apps) {
      const d = formatDate(a.created_at ?? undefined);
      if (!d) continue;
      const key = d.toISOString().slice(0, 10);
      const at = idx.get(key);
      if (typeof at === "number") days[at].count += 1;
    }
    return days.map((d) => ({ date: d.label, applications: d.count }));
  }, [apps]);

  const appsByPosition = useMemo<BarDatum[]>(() => {
    const map = new Map<string, number>();
    for (const a of apps) {
      const p = (a.position ?? "ไม่ระบุ").trim();
      map.set(p, (map.get(p) || 0) + 1);
    }
    return [...map.entries()].map(([name, value]) => ({ name, value }));
  }, [apps]);

  const appsByStatus = useMemo<PieDatum[]>(() => {
    const map = new Map<string, number>();
    for (const a of apps) {
      const s = (a.status ?? "pending").toLowerCase();
      map.set(s, (map.get(s) || 0) + 1);
    }
    return [...map.entries()].map(([name, value]) => ({ name, value }));
  }, [apps]);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
          <span className="text-sm text-slate-500">
            อัปเดตล่าสุด: {new Date().toLocaleString()}
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            เกิดข้อผิดพลาดในการโหลดข้อมูล: {error}
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Applications"
            value={summary.job_applications}
            subtitle="ใบสมัครทั้งหมด"
          />
          <StatCard
            title="Recruitments"
            value={summary.job_recruitments}
            subtitle="ตำแหน่งที่เปิดรับ"
          />
          <StatCard title="Users" value={summary.users} subtitle="ผู้ใช้งาน" />
          <StatCard
            title="Questionnaires"
            value={summary.questionnaires}
            subtitle="แบบสอบถาม"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="col-span-1 xl:col-span-2 rounded-2xl border border-slate-200 p-4 shadow-sm bg-white">
            <SectionHeader title="Applications (30 วันล่าสุด)" />
            <div className="h-72">
              {loading ? (
                <Skeleton />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={appsByDay}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="applications"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4 shadow-sm bg-white">
            <SectionHeader title="สัดส่วนสถานะใบสมัคร" />
            <div className="h-72">
              {loading ? (
                <Skeleton />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={appsByStatus}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      label
                    >
                      {appsByStatus.map((_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]} // เพิ่มสีตามลำดับ
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>

              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 p-4 shadow-sm bg-white">
            <SectionHeader title="Applications ตามตำแหน่ง" />
            <div className="h-80">
              {loading ? (
                <Skeleton />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={appsByPosition}
                    margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-15}
                      textAnchor="end"
                      interval={0}
                      height={60}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4 shadow-sm bg-white">
            <SectionHeader title="ล่าสุดที่สมัคร (5 รายการ)" />
            {loading ? <Skeleton rows={5} /> : <RecentTable apps={apps.slice(0, 5)} />}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/** ---------- Subcomponents ---------- */
function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: number;
  subtitle?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-slate-500 text-sm">{title}</div>
      <div className="mt-1 text-3xl font-semibold text-slate-800">{value}</div>
      <div className="mt-2 text-xs text-slate-500">{subtitle}</div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
    </div>
  );
}

function RecentTable({ apps }: { apps: JobApplication[] }) {
  if (!apps?.length) {
    return <div className="text-sm text-slate-500">ไม่มีข้อมูล</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500">
            <th className="py-2 pr-4">ชื่อ - นามสกุล</th>
            <th className="py-2 pr-4">ตำแหน่ง</th>
            <th className="py-2 pr-4">สถานะ</th>
            <th className="py-2">วันที่สมัคร</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((a) => (
            <tr key={String(a.job_application_id)} className="border-t border-slate-100">
              <td className="py-2 pr-4 text-slate-800">{a.full_name || "-"}</td>
              <td className="py-2 pr-4">{a.position || "-"}</td>
              <td className="py-2 pr-4 capitalize">{a.status || "-"}</td>
              <td className="py-2">
                {a.created_at
                  ? new Date(
                    (a.created_at as string).replace(" ", "T") + "+07:00"
                  ).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Skeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 w-full rounded bg-slate-200" />
      ))}
    </div>
  );
}


