import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

export default function Homeowrk4() {
  const a = ["orange", "apple", "mango"];
  const b = ["ant", "bird", "cat"];
  return (
    <div>
      <Header />
      <Content content={a} />
      <Content content={b} />
      <Footer />
      <a href="/">Back</a>
    </div>
  );
}
