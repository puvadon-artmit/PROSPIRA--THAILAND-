import Header from "./header";
import Greeting from "./greeting";
import CompanyInformation from "./company-information";
import OurStrengths from "./our-strengths";
import ProductInformation from "./product-information";
import CompanyNews from "./company-news";
import Footer from "../../components/footer";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Greeting />
      <CompanyInformation />
      <OurStrengths />
      <ProductInformation />
       <CompanyNews />
       <Footer />
    </div>
  );
}
