import Header from "./header";
import Greeting from "./greeting";
import CompanyInformation from "./company-information";
import OurStrengths from "./our-strengths";
import ProductInformation from "./product-information";
import CompanyNews from "./company-news";
import Footer from "../../components/footer";
import SafetyFirst from "./safety-first";
import CreatingCustomer from "./creating-customer";
import EnvironmentalMission from "./environmental-mission";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Greeting />
      <CompanyInformation />
      <OurStrengths />
      <ProductInformation />
      <SafetyFirst />
      <CreatingCustomer />
      <EnvironmentalMission />
      <CompanyNews />
      <Footer />
    </div>
  );
}
