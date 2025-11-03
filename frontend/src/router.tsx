import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/home/page";
import AboutPage from "./pages/about/page";
import Navbar from "./components/navbar";
import JobRecruitment from "./pages/recruitment/page";
import AdminLogin from "./pages/admin/login/page";
import AdminDashboard from "./pages/admin/dashboard/page";
import CompanyNewsPage from "./pages/company-news/page";
import ProductRubberPage from "./pages/product/rubber/page";
import ProductAirSpringPage from "./pages/product/air-spring/page";
import ProductPneumaticChuckPage from "./pages/product/pneumatic-chuck/page";
import ContactPage from "./pages/contact/page";

function Router() {
  const location = useLocation();
  const hideNavbarPaths = ["/admin/login", "/admin/dashboard"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />

        <Route path="/:lang">
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="recruitment" element={<JobRecruitment />} />
          <Route path="company-news" element={<CompanyNewsPage />} />
          <Route path="product/rubber" element={<ProductRubberPage />} />
          <Route path="product/air-spring" element={<ProductAirSpringPage />} />
          <Route path="product/pneumatic-chuck" element={<ProductPneumaticChuckPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="*" element={<div>404 ไม่พบหน้า</div>} />
      </Routes>
    </div>
  );
}

export default Router;
