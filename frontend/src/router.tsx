import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/public-layout";
import HomePage from "./pages/home/page";
import AboutPage from "./pages/about/page";
import JobRecruitment from "./pages/recruitment/page";
import AdminLogin from "./pages/admin/login/page";
import AdminDashboard from "./pages/admin/dashboard/page";
import CompanyNewsPage from "./pages/company-news/page";
import ProductRubberPage from "./pages/product/rubber/page";
import ProductAirSpringPage from "./pages/product/air-spring/page";
import ProductPneumaticChuckPage from "./pages/product/pneumatic-chuck/page";
import ContactPage from "./pages/contact/page";
import AllActivitiesPage from "./pages/ all-activities/page";
import OurStrengthsPage from "./pages/our-strengths/page";
import HistoryPage from "./pages/history/page";
import BusinessPolicyPage from "./pages/business-policy/page";

import ManageUserPage from "./pages/admin/manage-user/page";
import { RequireRole } from "./pages/admin/components/require-role";
import RecruitmentAdminPage from "./pages/admin/recruitment/page";
import AdminProviderRoute from "./admin-provider-route";

import NotFound from "./layouts/not-found";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />

        {/* ================================= PUBLIC LAYOUT ==================================== */}
        <Route path="/:lang" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="recruitment" element={<JobRecruitment />} />
          <Route path="company-news" element={<CompanyNewsPage />} />
          <Route path="product/rubber" element={<ProductRubberPage />} />
          <Route path="product/air-spring" element={<ProductAirSpringPage />} />
          <Route path="product/pneumatic-chuck" element={<ProductPneumaticChuckPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="all-activities" element={<AllActivitiesPage />} />
          <Route path="our-strengths" element={<OurStrengthsPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="business-policy" element={<BusinessPolicyPage />} />
        </Route>
        {/* ================================= END PUBLIC LAYOUT ================================ */}
        


        {/* ================================= ADMIN LAYOUT ============================================================= */}
        <Route element={<AdminProviderRoute />}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-user" element={<RequireRole allow={["SU"]}><ManageUserPage /></RequireRole>} />
          <Route path="/admin/recruitment" element={<RequireRole allow={["SU"]}><RecruitmentAdminPage /></RequireRole>} />
        </Route>
        {/* ================================= END ADMIN LAYOUT ========================================================= */}


        {/* ================================= END ROUTE ================================================================ */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Router;
