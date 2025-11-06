import { Modal, Form, Input, Select, Switch, Space, Button, Spin } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  jobRecruitmentId?: string;
};

export default function UpdateRecruitmentModal({ open, onCancel, onSuccess, jobRecruitmentId }: Props) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  const { user } = useUser();

  // โหลดข้อมูลเดิมทุกครั้งที่เปิดโมดอล + id เปลี่ยน
  useEffect(() => {
    if (!open || !jobRecruitmentId) return;

    const loadDetail = async () => {
      setDetailLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/job-recruitment/get-job-recruitment/${jobRecruitmentId}`
        );
        if (!res.ok) throw new Error("load detail failed");
        const data = await res.json();

        // กัน null/undefined
        const requirements: string[] = Array.isArray(data.requirements) ? data.requirements : [""];

        form.setFieldsValue({
          title: data.title ?? "",
          department: data.department ?? "",
          location: data.location ?? "",
          type: data.type ?? "Full-time",
          salary: data.salary ?? "",
          hot: !!data.hot,
          description: data.description ?? "",
          requirements: requirements.length ? requirements : [""],
        });
      } catch (e) {
        console.error(e);
      } finally {
        setDetailLoading(false);
      }
    };

    // เคลียร์ก่อน แล้วค่อยโหลด
    form.resetFields();
    loadDetail();
  }, [open, jobRecruitmentId, form]);

  // reset ฟอร์มเมื่อปิด
  useEffect(() => {
    if (!open) form.resetFields();
  }, [open, form]);

  const handleSubmit = async () => {
    try {
      if (!jobRecruitmentId) return; // safety
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
        `${import.meta.env.VITE_API_BASE_URL}/api/job-recruitment/update-job-recruitment/${jobRecruitmentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `Update failed with status ${res.status}`);
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

  // ถ้ายังไม่มี id ไม่ต้องเรนเดอร์
  if (!open || !jobRecruitmentId) return null;

  return (
    <Modal
      title="แก้ไขประกาศรับสมัครงาน"
      open={open}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText="บันทึก"
      cancelText="ยกเลิก"
      confirmLoading={submitting}
      maskClosable={false}
      width={700}
    >
      <Spin spinning={detailLoading}>
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="ตำแหน่ง" rules={[{ required: true, message: "กรุณากรอกชื่อตำแหน่ง" }]}>
            <Input placeholder="เช่น พนักงานคลังสินค้า" size="large" />
          </Form.Item>

          <Form.Item name="department" label="แผนก" rules={[{ required: true, message: "กรุณากรอกแผนก" }]}>
            <Input placeholder="เช่น ฝ่ายโลจิสติกส์" size="large" />
          </Form.Item>

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

          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <Form.Item name="salary" label="เงินเดือน" style={{ flex: 1, marginBottom: 0 }}>
              <Input placeholder="เช่น 15,000 - 25,000 บาท" size="large" />
            </Form.Item>

            <Form.Item name="hot" label="ตำแหน่งด่วน (HOT)" valuePropName="checked" style={{ marginBottom: 0 }}>
              <Switch />
            </Form.Item>
          </div>

          <Form.Item name="description" label="รายละเอียดงาน">
            <Input.TextArea
              placeholder="อธิบายหน้าที่และความรับผิดชอบหลัก"
              autoSize={{ minRows: 3, maxRows: 6 }}
              showCount
              maxLength={1000}
            />
          </Form.Item>

          <Form.Item label="คุณสมบัติที่ต้องการ">
            <Form.List name="requirements">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                      <span style={{ color: "#999", minWidth: 24 }}>{index + 1}.</span>
                      <Form.Item
                        {...restField}
                        name={name}
                        rules={[{ max: 300, message: "ยาวเกิน 300 ตัวอักษร" }]}
                        style={{ flex: 1, marginBottom: 0, width: "30rem" }}
                      >
                        <Input placeholder={`คุณสมบัติข้อที่ ${index + 1}`} />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button danger type="text" icon={<MinusCircleOutlined />} onClick={() => remove(name)} />
                      )}
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add("")} block icon={<PlusOutlined />} style={{ marginTop: 8 }}>
                    เพิ่มคุณสมบัติ
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}
