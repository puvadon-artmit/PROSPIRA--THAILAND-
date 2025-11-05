import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// โหลดทุกไฟล์ JSON ใน src/locales/**/*
const modules = import.meta.glob("./**/*.json", { eager: true });

// แปลงเป็นรูปแบบ resources ของ i18next
const resources: Record<string, { translation: Record<string, any> }> = {};

for (const path in modules) {
  const match = path.match(/\.\/([^/]+)\/.*\.json$/);
  if (!match) continue;

  const lang = match[1]; // เช่น "en" หรือ "th" หรือ "zh"
  const data = modules[path] as Record<string, any>;

  if (!resources[lang]) resources[lang] = { translation: {} };

  // รวม key ของทุกไฟล์ในภาษานั้น
  Object.assign(resources[lang].translation, data);
}

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "th",
  interpolation: { escapeValue: false },
});

export default i18n;
