import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/page";
import AboutPage from "./pages/about/page";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
      <Navbar />
    
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
     
    </div>
  );
}

export default App;
