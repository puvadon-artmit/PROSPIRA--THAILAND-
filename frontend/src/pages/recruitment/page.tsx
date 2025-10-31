import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { Tag, Collapse, Typography, Divider, Badge, Spin } from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  FireOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import Header from './header';
import Footer from './footer';
import type { Job } from '../../types/job';
import JobApplyButton from './job-apply-button';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { CheckableTag } = Tag;


export default function JobRecruitment() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedLocation] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const departments = useMemo(() => Array.from(new Set(jobs.map((j) => j.department))), [jobs]);
  const types = useMemo(() => Array.from(new Set(jobs.map((j) => j.type))), [jobs]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchJobs() {
      setLoading(true);
      setError(null);
      try {
        const resp = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/job-recruitment/get-job-recruitments`,
          {
            params: { limit: import.meta.env.VITE_API_LIMIT, offset: 0 },
            signal: controller.signal,
          }
        );

        const apiData = resp.data as Array<any>;

        const mapped: Job[] = apiData.map((item) => ({
          job_recruitment_id: item.job_recruitment_id ?? item.id ?? String(item.job_recruitment_id),
          title: item.title ?? item.job_title ?? '',
          department: item.department ?? 'อื่นๆ',
          location: item.location ?? '',
          type: item.type ?? '',
          salary: item.salary ?? '',
          hot: !!item.hot,
          description: item.description ?? '',
          requirements: Array.isArray(item.requirements) ? item.requirements : [],
        }));

        setJobs(mapped);
      } catch (err: any) {
        if (axios.isCancel(err)) {
        } else {
          console.error(err);
          setError(err?.message ?? 'เกิดข้อผิดพลาดขณะดึงข้อมูล');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();

    return () => {
      controller.abort();
    };
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (selectedDept && job.department !== selectedDept) return false;
      if (selectedType && job.type !== selectedType) return false;
      if (query) {
        const q = query.trim().toLowerCase();
        const inText = `${job.title} ${job.description} ${job.requirements.join(' ')}`.toLowerCase();
        if (!inText.includes(q)) return false;
      }
      return true;
    });
  }, [jobs, selectedDept, selectedLocation, selectedType, query]);

  const resetFilters = () => {
    setSelectedDept(null);
    setSelectedType(null);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Header jobs={jobs} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 overflow-x-auto sm:overflow-visible">
            <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center py-1">
              {departments.map((d) => (
                <CheckableTag
                  key={d}
                  checked={selectedDept === d}
                  onChange={(checked) => setSelectedDept(checked ? d : null)}
                  className={`cursor-pointer whitespace-nowrap border border-gray-300 rounded-md px-3 py-1 hover:bg-[#08a4b8]/10 ${selectedDept === d ? 'bg-[#08a4b8] rounded-full text-white border-[#08a4b8]' : ''
                    }`}
                >
                  {d}
                </CheckableTag>
              ))}

              {types.map((t) => (
                <CheckableTag
                  key={t}
                  checked={selectedType === t}
                  onChange={(checked) => setSelectedType(checked ? t : null)}
                  className={`cursor-pointer whitespace-nowrap border border-gray-300 rounded-md px-3 py-1 hover:bg-[#08a4b8]/10 ${selectedType === t ? 'bg-[#08a4b8] rounded-full text-white border-[#08a4b8]' : ''
                    }`}
                >
                  {t}
                </CheckableTag>
              ))}

              <button
                onClick={resetFilters}
                style={{ fontSize: '14px' }}
                className="ml-auto sm:ml-2 flex items-center gap-1 px-3 py-0.5 text-sm font-medium text-[#08a4b8] border border-[#08a4b8] rounded-md hover:bg-[#08a4b8] hover:text-white transition-all duration-200"
              >
                <ClearOutlined style={{ fontSize: '14px' }} /> ล้าง
              </button>
            </div>

            <div className="w-full md:w-1/2 mt-4">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="ค้นหาตำแหน่งหรือคุณสมบัติ..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-5 py-3.5 pl-12 pr-12 bg-gradient-to-r from-white to-gray-50 backdrop-blur-sm border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#08a4b8] focus:ring-4 focus:ring-[#08a4b8]/20 focus:shadow-xl transition-all shadow-lg"
                />

                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#08a4b8] group-focus-within:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Badge count={filteredJobs.filter((j) => j.hot).length} offset={[-4, 0]}>
              <div className="relative px-4 py-2 bg-gradient-to-r from-[#08a4b8] to-[#0bc9e0] rounded-xl shadow-xl text-sm font-bold text-white border-2 border-[#08a4b8]/30 hover:scale-105 transition-transform overflow-hidden">
                <div className="relative z-10 flex items-center gap-2">
                  ตำแหน่งด่วน
                </div>
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#08a4b8] to-[#0bc9e0] blur opacity-30"></div>
              </div>
            </Badge>
            <div className="px-3 py-1.5 bg-gray-900 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg text-sm font-medium text-white">
              รวม {filteredJobs.length} ตำแหน่ง
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-4">
        {loading && (
          <div className="text-center py-10">
            <Spin tip="กำลังดึงข้อมูลตำแหน่งงาน..." />
          </div>
        )}


        {error && (
          <div className="text-center py-10 text-gray-600 text-lg font-medium">
            ยังไม่เปิดรับสมัครงานในขณะนี้
          </div>
        )}


        {!loading && !error && (
          <Collapse expandIconPosition="end" ghost className="space-y-4">
            {filteredJobs.map((job) => (
              <Panel
                key={job.job_recruitment_id}
                header={
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <Title level={4} style={{ margin: 0, color: 'black', fontSize: '20px' }}>
                          {job.title}
                        </Title>
                        {job.hot && (
                          <Badge
                            count={
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-white">
                                <FireOutlined style={{ fontSize: 12, marginRight: '4px' }} /> ด่วน
                              </span>
                            }
                            style={{
                              background: 'linear-gradient(135deg,#ff3f25,#d81900)',
                              boxShadow: '0 0 6px rgba(255,63,37,0.6)',
                            }}
                          />
                        )}
                      </div>
                      <Text style={{ color: '#08a4b8', fontWeight: 600, fontSize: '15px' }}>
                        {job.department}
                      </Text>
                      <div className="flex items-center gap-2 mt-4 md:mt-2 flex-wrap">
                        <Tag
                          icon={<EnvironmentOutlined />}
                          className="px-3 py-1 text-sm font-medium"
                          style={{ background: '#08a4b8', border: 'none', color: 'white', borderRadius: '8px' }}
                        >
                          {job.location}
                        </Tag>
                        <Tag
                          icon={<ClockCircleOutlined />}
                          className="px-3 py-1 text-sm font-medium"
                          style={{
                            background: 'linear-gradient(135deg, #08a4b8 0%, #0891a3 100%)',
                            border: 'none',
                            color: 'white',
                            borderRadius: '8px',
                          }}
                        >
                          {job.type}
                        </Tag>
                        <Tag
                          icon={<DollarOutlined />}
                          className="px-3 py-1 text-sm font-medium"
                          style={{
                            background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
                            border: 'none',
                            color: 'white',
                            borderRadius: '8px',
                          }}
                        >
                          {job.salary}
                        </Tag>
                      </div>
                    </div>
                  </div>
                }
                style={{ marginBottom: '12px', background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 16px -6px rgba(8,164,184,0.15)' }}
                className="hover:shadow-2xl transition-all duration-300"
              >
                <div className="pt-4 space-y-4 px-2">
                  <div className="relative p-4 rounded-xl bg-white/10 backdrop-blur-md border border-gray-400/20 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#08a4b8] to-cyan-400 rounded-t-xl pointer-events-none"></div>
                    <div className="relative">
                      <Title level={4} className="text-[#08a4b8] font-semibold mb-2 text-[18px]">รายละเอียดงาน</Title>
                      <Text className="text-gray-800 text-[16px] leading-relaxed">{job.description}</Text>
                    </div>
                  </div>

                  <Divider style={{ borderColor: 'rgba(8, 164, 184, 0.2)' }} />

                  <div className="relative p-4 rounded-xl bg-white/10 backdrop-blur-md border border-gray-400/20 shadow-lg overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#08a4b8] to-cyan-400 rounded-t-xl pointer-events-none"></div>
                    <div className="relative">
                      <Title level={4} className="text-[#08a4b8] font-semibold text-[18px] mb-6">✨ คุณสมบัติที่ต้องการ</Title>
                      <div className="space-y-3 mt-4">
                        {job.requirements.map((req, index) => (
                          <div
                            key={index}
                            className="flex items-start bg-white/5 p-3 rounded-lg border border-gray-400/20 shadow-sm transition-shadow duration-200 hover:shadow-md"
                          >
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-[#08a4b8]/80 to-cyan-500/80 flex items-center justify-center text-black font-bold mr-3">
                              {index + 1}
                            </div>
                            <Title level={5} className="text-gray-800 text-[6px] leading-relaxed">{req}</Title>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ paddingTop: '12px', textAlign: 'center' }}>
                    <JobApplyButton job={job} />
                  </div>
                </div>
              </Panel>
            ))}

            {filteredJobs.length === 0 && <div className="text-center py-10 text-gray-600">ไม่พบตำแหน่งงานที่ตรงกับตัวกรองของคุณ</div>}
          </Collapse>
        )}
      </div>

      <Footer />
    </div>
  );
}
