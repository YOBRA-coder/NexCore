import {Nav} from './components/Nav';
import {Footer} from './components/Footer';
import { G } from "./utils/Global";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Dashboard} from './pages/Dashboard';
import { Articles } from "./pages/Articles";
import {Home}  from "./pages/Home";
import { Services } from "./pages/Services";
import { Products } from "./pages/Products";
import  About  from "./pages/About";
import { Contact } from "./pages/Contact";
import { ArticleView } from './pages/ArticlesView';
import ScrollToTop from './components/ScrollToTopButton';
import ScrollToTops from './components/ScrollToTop';

// ─── APP ROOT ─────────────────────────────────────────────────
export default function App() {

 return (
  <BrowserRouter>
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <style>{G}</style>

      <style>
        {`
          @media(max-width:900px){
            .mmb{display:flex!important}
          }
        `}
      </style>

      <div className="noise" />

      <Nav />
      <ScrollToTops/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleView />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <ScrollToTop/>
      <Footer />
    </div>
  </BrowserRouter>
);
}
