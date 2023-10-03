import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  const a = ["orange", "apple", "mango"];
  const b = ["ant", "bird", "cat"];
  return(
    <>
      <Header />
      <Content content={a}/>
      <Content content={b}/>
      <Footer />
    </>
  );
}

export default App;
