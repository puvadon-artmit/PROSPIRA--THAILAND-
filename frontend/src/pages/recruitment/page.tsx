import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Tag, Collapse, Typography, Divider, Badge, Input, Spin, Alert } from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  SendOutlined,
  FireOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import Header from './header';
import Footer from './Footer';
import type { Job } from '../../types/job';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { CheckableTag } = Tag;
const { Search } = Input;


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

  const handleApply = (jobTitle: string) => {
    window.alert(`ขอบคุณที่สนใจสมัครตำแหน่ง ${jobTitle}!\nกรุณาส่งเรซูเม่มาที่ HR@prospira.co.th`);
  };

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
                  className={`cursor-pointer whitespace-nowrap border border-gray-300 rounded-md px-3 py-1 hover:bg-[#08a4b8]/10 ${
                    selectedDept === d ? 'bg-[#08a4b8] rounded-full text-white border-[#08a4b8]' : ''
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
                  className={`cursor-pointer whitespace-nowrap border border-gray-300 rounded-md px-3 py-1 hover:bg-[#08a4b8]/10 ${
                    selectedType === t ? 'bg-[#08a4b8] rounded-full text-white border-[#08a4b8]' : ''
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
              <Search
                placeholder="ค้นหาตำแหน่งหรือคุณสมบัติ..."
                allowClear
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onSearch={(value) => setQuery(value)}
                enterButton
              />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Badge count={filteredJobs.filter((j) => j.hot).length} offset={[-4, 0]}>
              <div className="relative px-3 py-1.5 bg-white/10 backdrop-blur-md border border-gray-400/20 rounded-xl shadow-lg text-sm font-medium text-[#08a4b8]">
                ตำแหน่งด่วน
              </div>
            </Badge>
            <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-gray-400/20 rounded-xl shadow-lg text-sm font-medium text-gray-800">
              รวม {filteredJobs.length} รายการ
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
          <div className="py-4">
            <Alert message="เกิดข้อผิดพลาด" description={error} type="error" showIcon />
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
                      <h5 className="text-[#08a4b8] font-semibold mb-2 text-[16px]">รายละเอียดงาน</h5>
                      <p className="text-gray-800 text-sm leading-relaxed">{job.description}</p>
                    </div>
                  </div>

                  <Divider style={{ borderColor: 'rgba(8, 164, 184, 0.2)' }} />

                  <div className="relative p-4 rounded-xl bg-white/10 backdrop-blur-md border border-gray-400/20 shadow-lg overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#08a4b8] to-cyan-400 rounded-t-xl pointer-events-none"></div>
                    <div className="relative">
                      <h5 className="text-[#08a4b8] font-semibold mb-3 text-[16px]">✨ คุณสมบัติที่ต้องการ</h5>
                      <div className="space-y-3">
                        {job.requirements.map((req, index) => (
                          <div
                            key={index}
                            className="flex items-start bg-white/5 p-3 rounded-lg border border-gray-400/20 shadow-sm transition-shadow duration-200 hover:shadow-md"
                          >
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-[#08a4b8]/80 to-cyan-500/80 flex items-center justify-center text-black font-bold mr-3">
                              {index + 1}
                            </div>
                            <span className="text-gray-800 text-sm leading-relaxed">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ paddingTop: '12px', textAlign: 'center' }}>
                    <Button
                      type="primary"
                      size="large"
                      icon={<SendOutlined />}
                      onClick={() => handleApply(job.title)}
                      className="h-12 px-6 text-base font-semibold"
                      style={{
                        background: 'linear-gradient(135deg, #08a4b8 0%, #06b6d4 100%)',
                        border: 'none',
                        borderRadius: '10px',
                        boxShadow: '0 8px 18px rgba(8,164,184,0.35)',
                      }}
                    >
                      ส่งใบสมัครงาน
                    </Button>
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
