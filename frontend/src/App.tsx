import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/page";
import AboutPage from "./pages/about/page";
import Navbar from "./components/navbar";
import JobRecruitment from "./pages/recruitment/page";

function App() {
  return (
    <div>
      <Navbar />
    
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recruitment" element={<JobRecruitment />} />
        </Routes>
     
    </div>
  );
}

export default App;
