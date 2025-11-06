import { useEffect, useMemo, useState, useCallback } from "react";
import AdminLayout from "../../../layouts/admin-layout";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Table, Input, Select, Tag, Space, Button, message } from "antd";
import { SearchOutlined, FireOutlined, ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/th";
import type { JobRecruitment } from "../../../types/recruitment";
import CreateRecruitmentModal from "./create-recruitment-modal";
import { toast, Toaster } from "react-hot-toast";
import UpdateRecruitmentModal from "./update-recruitment-modal";

export default function RecruitmentAdminPage() {
    const [rawData, setRawData] = useState<JobRecruitment[]>([]);
    const [loading, setLoading] = useState(true);
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [editingId, setEditingId] = useState<string | undefined>(undefined);

    const [searchText, setSearchText] = useState("");
    const [filterDept, setFilterDept] = useState<string | undefined>(undefined);
    const [filterLoc, setFilterLoc] = useState<string | undefined>(undefined);
    const [filterType, setFilterType] = useState<string | undefined>(undefined);
    const [filterHot, setFilterHot] = useState<string | undefined>(undefined);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/job-recruitment/get-job-recruitments?limit=150&offset=0`
            );
            const data = (await res.json()) as JobRecruitment[];
            setRawData(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
            setRawData([]);
            message.error("โหลดรายการประกาศล้มเหลว");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const deptOptions = useMemo(
        () =>
            Array.from(new Set(rawData.map((d) => d.department).filter(Boolean))).map((v) => ({
                label: v,
                value: v,
            })),
        [rawData]
    );
    const locOptions = useMemo(
        () =>
            Array.from(new Set(rawData.map((d) => d.location).filter(Boolean))).map((v) => ({
                label: v,
                value: v,
            })),
        [rawData]
    );
    const typeOptions = useMemo(
        () =>
            Array.from(new Set(rawData.map((d) => d.type).filter(Boolean))).map((v) => ({
                label: v,
                value: v,
            })),
        [rawData]
    );

    const filteredData = useMemo(() => {
        const s = searchText.trim().toLowerCase();
        return rawData.filter((r) => {
            const globalHit =
                !s ||
                [r.title, r.department, r.location, r.type, r.salary, r.description]
                    .join(" ")
                    .toLowerCase()
                    .includes(s) ||
                r.requirements?.some((q) => q.toLowerCase().includes(s));

            const deptHit = !filterDept || r.department === filterDept;
            const locHit = !filterLoc || r.location === filterLoc;
            const typeHit = !filterType || r.type === filterType;
            const hotHit =
                !filterHot ||
                (filterHot === "true" && r.hot) ||
                (filterHot === "false" && !r.hot);

            return globalHit && deptHit && locHit && typeHit && hotHit;
        });
    }, [rawData, searchText, filterDept, filterLoc, filterType, filterHot]);

    const resetFilters = () => {
        setSearchText("");
        setFilterDept(undefined);
        setFilterLoc(undefined);
        setFilterType(undefined);
        setFilterHot(undefined);
    };

    const columns: ColumnsType<JobRecruitment> = [
        { title: "#", dataIndex: "index", width: 60, render: (_v, _r, i) => i + 1 },
        { title: "ตำแหน่ง", dataIndex: "title", sorter: (a, b) => a.title.localeCompare(b.title) },
        {
            title: "แผนก",
            dataIndex: "department",
            filters: deptOptions.map((o) => ({ text: o.label, value: o.value })),
            onFilter: (value, record) => record.department === value,
            sorter: (a, b) => a.department.localeCompare(b.department),
        },
        {
            title: "สถานที่",
            dataIndex: "location",
            filters: locOptions.map((o) => ({ text: o.label, value: o.value })),
            onFilter: (value, record) => record.location === value,
            sorter: (a, b) => a.location.localeCompare(b.location),
        },
        {
            title: "ประเภท",
            dataIndex: "type",
            filters: typeOptions.map((o) => ({ text: o.label, value: o.value })),
            onFilter: (value, record) => record.type === value,
            sorter: (a, b) => a.type.localeCompare(b.type),
            width: 140,
        },
        { title: "เงินเดือน", dataIndex: "salary" },
        {
            title: "HOT",
            dataIndex: "hot",
            width: 90,
            filters: [
                { text: "เฉพาะ HOT", value: "true" },
                { text: "เฉพาะไม่ HOT", value: "false" },
            ],
            onFilter: (value, record) =>
                (value === "true" && record.hot) || (value === "false" && !record.hot),
            render: (v: boolean) =>
                v ? <Tag icon={<FireOutlined />} color="red">HOT</Tag> : <Tag>-</Tag>,
        },
        {
            title: "วันที่สร้าง",
            dataIndex: "created_at",
            sorter: (a, b) => dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf(),
            render: (v: string) => {
                const d = dayjs(v);
                return d.isValid() ? d.locale("th").format("DD/MM/YYYY") : "-";
            },
            width: 150,
        },
        {
            title: "จัดการ",
            key: "actions",
            width: 120,
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => {
                            setEditingId(record.job_recruitment_id);
                            setOpenUpdate(true);
                        }}
                    >
                        แก้ไข
                    </Button>
                </Space>
            ),
        },
    ];

    const tableProps: TableProps<JobRecruitment> = {
        rowKey: (r) => r.job_recruitment_id,
        loading,
        columns,
        dataSource: filteredData,
        pagination: { pageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 50] },
        expandable: {
            expandedRowRender: (record) => (
                <div className="text-sm">
                    <p className="mb-2"><strong>รายละเอียดงาน: </strong>{record.description || "-"}</p>
                    <p className="mb-1"><strong>คุณสมบัติ:</strong></p>
                    <ul className="list-disc ml-5">
                        {record.requirements?.length
                            ? record.requirements.map((req, i) => <li key={i}>{req}</li>)
                            : <li>-</li>}
                    </ul>
                    <p className="mt-2 text-gray-500">ผู้สร้าง: {record.username_creator}</p>
                </div>
            ),
        },
    };

    return (
        <AdminLayout>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">รายการประกาศรับสมัครงาน</h1>

                <Space wrap className="mb-3">
                    <Input
                        allowClear
                        prefix={<SearchOutlined />}
                        placeholder="ค้นหาทุกคอลัมน์..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 280 }}
                    />
                    <Select allowClear placeholder="กรองตามแผนก" options={deptOptions} value={filterDept} onChange={setFilterDept} style={{ width: 200 }} />
                    <Select allowClear placeholder="กรองตามสถานที่" options={locOptions} value={filterLoc} onChange={setFilterLoc} style={{ width: 200 }} />
                    <Select allowClear placeholder="กรองตามประเภท" options={typeOptions} value={filterType} onChange={setFilterType} style={{ width: 200 }} />
                    <Select
                        allowClear
                        placeholder="HOT"
                        options={[{ label: "เฉพาะ HOT", value: "true" }, { label: "เฉพาะไม่ HOT", value: "false" }]}
                        value={filterHot}
                        onChange={setFilterHot}
                        style={{ width: 160 }}
                    />
                    <Button icon={<ReloadOutlined />} onClick={resetFilters}>ล้างตัวกรอง</Button>

                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenCreate(true)}>
                        สร้างประกาศ
                    </Button>
                </Space>

                <Table<JobRecruitment> {...tableProps} />
            </div>

            <CreateRecruitmentModal
                open={openCreate}
                onCancel={() => setOpenCreate(false)}
                onSuccess={() => {
                    setOpenCreate(false);
                    loadData();
                    toast.success("สร้างประกาศสำเร็จ");
                }}
            />

            <UpdateRecruitmentModal
                open={openUpdate}
                jobRecruitmentId={editingId}
                onCancel={() => {
                    setOpenUpdate(false);
                    setEditingId(undefined);
                }}
                onSuccess={() => {
                    setOpenUpdate(false);
                    setEditingId(undefined);
                    loadData();
                    toast.success("อัปเดตประกาศสำเร็จ");
                }}
            />
        </AdminLayout>
    );
}
