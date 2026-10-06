import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Articles from "./components/Articles";
import Enquiry from "./components/Enquiry";
import InsightArticle from "./pages/InsightArticle";
import ResourceLibrary from "./pages/ResourceLibrary";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

// Sends old /insights/<article> links to /articles/<article>
function OldArticleRedirect() {
  const { id } = useParams();
  return <Navigate to={`/articles/${id}`} replace />;
}

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/articles/:id" element={<InsightArticle />} />
        <Route path="/resources/library" element={<ResourceLibrary />} />
        <Route path="/insights" element={<Navigate to="/articles" replace />} />
        <Route path="/insights/:id" element={<OldArticleRedirect />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
