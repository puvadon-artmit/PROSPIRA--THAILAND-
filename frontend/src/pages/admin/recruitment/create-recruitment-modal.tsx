import { Modal, Form, Input, Select, Switch, Space, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useUser } from "../../../contexts/UserContext";

type Props = {
    open: boolean;
    onCancel: () => void;
    onSuccess: () => void;
};

export default function CreateRecruitmentModal({ open, onCancel, onSuccess }: Props) {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

    const { user } = useUser();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setSubmitting(true);

            const payload = {
                title: values.title,
                department: values.department,
                location: values.location,
                type: values.type,
                salary: values.salary,
                hot: !!values.hot,
                description: values.description || "",
                requirements: (values.requirements || []).filter((x: string) => x?.trim()),
                username_creator: user?.username,
            };

            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/job-recruitment/create-job-recruitment`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                const errText = await res.text().catch(() => "");
                throw new Error(errText || `Create failed with status ${res.status}`);
            }

            form.resetFields();
            onSuccess();
        } catch (err: any) {
            if (err?.errorFields) return;
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            title="สร้างประกาศรับสมัครงาน"
            open={open}
            onOk={handleSubmit}
            onCancel={onCancel}
            okText="บันทึก"
            cancelText="ยกเลิก"
            confirmLoading={submitting}
            destroyOnClose
            maskClosable={false}
            width={700}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    type: "Full-time",
                    hot: false,
                    username_creator: "admin_user",
                    requirements: [""]
                }}
            >
                {/* ข้อมูลหลัก */}
                <Form.Item
                    name="title"
                    label="ตำแหน่ง"
                    rules={[{ required: true, message: "กรุณากรอกชื่อตำแหน่ง" }]}
                >
                    <Input placeholder="เช่น พนักงานคลังสินค้า" size="large" />
                </Form.Item>

                <Form.Item
                    name="department"
                    label="แผนก"
                    rules={[{ required: true, message: "กรุณากรอกแผนก" }]}
                >
                    <Input placeholder="เช่น ฝ่ายโลจิสติกส์" size="large" />
                </Form.Item>

                {/* แถวคู่: สถานที่และประเภท */}
                <Space.Compact block style={{ marginBottom: 24 }}>
                    <Form.Item
                        name="location"
                        label="สถานที่ทำงาน"
                        rules={[{ required: true, message: "กรุณากรอกสถานที่" }]}
                        style={{ flex: 1, marginBottom: 0, marginRight: 8 }}
                    >
                        <Input placeholder="เช่น พระนครศรีอยุธยา" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="ประเภทงาน"
                        rules={[{ required: true, message: "กรุณาเลือกประเภท" }]}
                        style={{ width: 200, marginBottom: 0 }}
                    >
                        <Select
                            size="large"
                            placeholder="เลือกประเภท"
                            options={[
                                { label: "Full-time", value: "Full-time" },
                                { label: "Part-time", value: "Part-time" },
                                { label: "Intern", value: "Intern" },
                                { label: "Contract", value: "Contract" },
                            ]}
                        />
                    </Form.Item>
                </Space.Compact>

                {/* แถวคู่: เงินเดือนและ HOT */}
                <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                    <Form.Item
                        name="salary"
                        label="เงินเดือน"
                        style={{ flex: 1, marginBottom: 0 }}
                    >
                        <Input placeholder="เช่น 15,000 - 25,000 บาท" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="hot"
                        label="ตำแหน่งด่วน (HOT)"
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                    >
                        <Switch />
                    </Form.Item>
                </div>

                {/* รายละเอียด */}
                <Form.Item name="description" label="รายละเอียดงาน">
                    <Input.TextArea
                        placeholder="อธิบายหน้าที่และความรับผิดชอบหลัก"
                        autoSize={{ minRows: 3, maxRows: 6 }}
                        showCount
                        maxLength={1000}
                    />
                </Form.Item>

                {/* คุณสมบัติ */}
                <Form.Item label="คุณสมบัติที่ต้องการ">
                    <Form.List name="requirements">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }, index) => (
                                    <Space
                                        key={key}
                                        style={{ display: "flex", marginBottom: 8 }}
                                        align="baseline"
                                    >
                                        <span style={{ color: '#999', minWidth: 24 }}>
                                            {index + 1}.
                                        </span>
                                        <Form.Item
                                            {...restField}
                                            name={name}
                                            rules={[{ max: 300, message: "ยาวเกิน 300 ตัวอักษร" }]}
                                            style={{ flex: 1, marginBottom: 0, width: '30rem' }}
                                        >
                                            <Input
                                                placeholder={`คุณสมบัติข้อที่ ${index + 1}`}
                                            />
                                        </Form.Item>
                                        {fields.length > 1 && (
                                            <Button
                                                danger
                                                type="text"
                                                icon={<MinusCircleOutlined />}
                                                onClick={() => remove(name)}
                                                style={{ flexShrink: 0 }}
                                            />
                                        )}
                                    </Space>
                                ))}
                                <Button
                                    type="dashed"
                                    onClick={() => add("")}
                                    block
                                    icon={<PlusOutlined />}
                                    style={{ marginTop: 8 }}
                                >
                                    เพิ่มคุณสมบัติ
                                </Button>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
            </Form>
        </Modal>
    );
}
