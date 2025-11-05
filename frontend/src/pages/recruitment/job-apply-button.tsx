import { useState } from "react";
import { Button, Modal, Form, Input, Upload } from "antd";
import { SendOutlined, UploadOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import "../../css/job-apply.css";

const JobApplyButton = ({ job }: { job: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();

    const handleApply = (title: string) => {
        console.log(title);
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setIsSubmitting(true);
            const resumeFile =
                values.resume?.file?.originFileObj ||
                (values.resume?.fileList && values.resume.fileList[0]?.originFileObj) ||
                null;

            const formData = new FormData();
            formData.append("full_name", values.name);
            formData.append("email", values.email);
            formData.append("phone", values.phone);
            formData.append("note", values.note || "");
            formData.append("position", job.title);

            if (resumeFile) {
                formData.append("resume", resumeFile);
            }
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/job-application/create-job-application`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (!res.ok) {
                const errText = await res.text().catch(() => "");
                throw new Error(errText || `Server returned ${res.status}`);
            }


            toast.success("ส่งใบสมัครเรียบร้อย!");
            setIsModalOpen(false);
            form.resetFields();
        } catch (err: any) {
            console.error("Submit error:", err);
            if (err?.errorFields) {
            } else {
                toast.error(err?.message || "เกิดข้อผิดพลาดในการส่งใบสมัคร");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position="top-center" />
            <Button
                type="primary"
                size="large"
                icon={<SendOutlined />}
                onClick={() => handleApply(job.title)}
                className="h-12 px-6 text-base font-semibold"
                style={{
                    background: "linear-gradient(135deg, #08a4b8 0%, #06b6d4 100%)",
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0 8px 18px rgba(8,164,184,0.35)",
                }}
            >
                ส่งใบสมัครงาน
            </Button>

            <Modal
                title={
                    <div style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        background: "linear-gradient(135deg, #08a4b8 0%, #06b6d4 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: '8px'
                    }}>
                        <SendOutlined style={{ marginRight: '8px', color: '#08a4b8' }} />
                        ส่งใบสมัครงาน - {job.title}
                    </div>
                }
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
                okText="ส่งใบสมัคร"
                cancelText="ยกเลิก"
                okButtonProps={{
                    style: {
                        background: "linear-gradient(135deg, #08a4b8 0%, #06b6d4 100%)",
                        border: "none",
                        height: '40px',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: 500,
                        boxShadow: "0 4px 12px rgba(8,164,184,0.3)",
                    },
                    loading: isSubmitting,
                }}
                cancelButtonProps={{
                    disabled: isSubmitting,
                    style: {
                        height: '40px',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: 500,
                    }
                }}
                maskClosable={!isSubmitting}
                centered
                width={580}
                styles={{
                    mask: {
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    },
                    header: {
                        borderBottom: '2px solid #e0f2fe',
                        paddingBottom: '16px',
                        marginBottom: '20px',
                        background: 'transparent',
                    },
                    body: {
                        paddingTop: '8px',
                    },
                    footer: {
                        borderTop: '2px solid #e0f2fe',
                        paddingTop: '16px',
                        marginTop: '8px',
                    }
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="jobApplication"
                    style={{
                        animation: 'fadeIn 0.3s ease-in',
                    }}
                >
                    <Form.Item
                        label={<span style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>ชื่อ-นามสกุล</span>}
                        name="name"
                        rules={[{ required: true, message: "กรุณากรอกชื่อ-นามสกุล" }]}
                    >
                        <Input
                            placeholder="เช่น สมชาย "
                            style={{
                                height: '42px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                border: '1.5px solid #e2e8f0',
                                transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#08a4b8';
                                e.target.style.boxShadow = '0 0 0 3px rgba(8,164,184,0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>อีเมล</span>}
                        name="email"
                        rules={[
                            { required: true, message: "กรุณากรอกอีเมล" },
                            { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง" },
                        ]}
                    >
                        <Input
                            placeholder="เช่น somchai@email.com"
                            style={{
                                height: '42px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                border: '1.5px solid #e2e8f0',
                                transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#08a4b8';
                                e.target.style.boxShadow = '0 0 0 3px rgba(8,164,184,0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>เบอร์โทรศัพท์</span>}
                        name="phone"
                        rules={[
                            { required: true, message: "กรุณากรอกเบอร์โทรศัพท์" },
                            { pattern: /^\d{10}$/, message: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก" },
                        ]}
                    >
                        <Input
                            placeholder="เช่น 0812345678"
                            maxLength={10}
                            type="tel"
                            style={{
                                height: '42px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                border: '1.5px solid #e2e8f0',
                                transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#08a4b8';
                                e.target.style.boxShadow = '0 0 0 3px rgba(8,164,184,0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.boxShadow = 'none';
                            }}
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onPaste={(e) => {
                                const paste = e.clipboardData.getData("text");
                                if (!/^\d*$/.test(paste)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>แนบไฟล์เรซูเม่</span>}
                        name="resume"
                    >
                        <Upload
                            beforeUpload={(file) => {
                                const isAllowedType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
                                const isLt10M = file.size / 1024 / 1024 < 10;

                                if (!isAllowedType) {
                                    toast.error('อนุญาตเฉพาะไฟล์ PDF, DOC หรือ DOCX เท่านั้น');
                                    return Upload.LIST_IGNORE;
                                }

                                if (!isLt10M) {
                                    toast.error('ไฟล์ต้องมีขนาดไม่เกิน 10 MB');
                                    return Upload.LIST_IGNORE;
                                }

                                return false;
                            }}
                            maxCount={1}
                            accept=".pdf,.doc,.docx"
                            style={{ width: '100%' }}
                        >
                            <Button
                                icon={<UploadOutlined />}
                                style={{
                                    height: '42px',
                                    width: '100%',
                                    borderRadius: '8px',
                                    border: '1.5px dashed #cbd5e1',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#64748b',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#08a4b8';
                                    e.currentTarget.style.color = '#08a4b8';
                                    e.currentTarget.style.background = '#f0f9ff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#cbd5e1';
                                    e.currentTarget.style.color = '#64748b';
                                    e.currentTarget.style.background = 'white';
                                }}
                            >
                                เลือกไฟล์ PDF, DOC หรือ DOCX
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>ข้อความเพิ่มเติม</span>}
                        name="note"
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="ข้อมูลเพิ่มเติม (ถ้ามี)"
                            style={{
                                borderRadius: '8px',
                                fontSize: '14px',
                                border: '1.5px solid #e2e8f0',
                                transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#08a4b8';
                                e.target.style.boxShadow = '0 0 0 3px rgba(8,164,184,0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e2e8f0';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
};

export default JobApplyButton;
