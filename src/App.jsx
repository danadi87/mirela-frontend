import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Insights from "./components/Insights";
import Enquiry from "./components/Enquiry";
import InsightArticle from "./pages/InsightArticle";
import ResourceLibrary from "./pages/ResourceLibrary";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/insights/:id" element={<InsightArticle />} />
        <Route path="/resources/library" element={<ResourceLibrary />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
