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
import { RequestQuote } from "./pages/RequestQuote";
import { Careers } from "./pages/Careers";
import { JobDetail } from "./pages/JobDetail";
import { ArticleView } from './pages/ArticlesView';
import ScrollToTop from './components/ScrollToTopButton';
import ScrollToTops from './components/ScrollToTop';
import { ChatWidget } from './components/ChatWidget';
import { SITE_URL, SITE_NAME } from './components/SEO';

// Site-wide structured data: tells Google what the brand is (Organization),
// that the site is searchable (WebSite), and — most importantly for
// sitelinks — the primary sections of the site (SiteNavigationElement).
// Google decides algorithmically whether to show sitelinks under your
// search result, but it only has a chance to if this kind of structure
// is present and the pages themselves are indexed and get real traffic.
const SITE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/yobby.png`,
    description:
      "Yobby Technologies builds premium web applications, M-Pesa integration, fintech platforms and digital solutions for businesses in Kenya and Africa.",
    email: "hello@yobbytech.com",
    telephone: "+254726553481",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nakuru",
      addressCountry: "KE",
    },
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { "@type": "SiteNavigationElement", position: 1, name: "Products", url: `${SITE_URL}/products` },
      { "@type": "SiteNavigationElement", position: 2, name: "Services", url: `${SITE_URL}/services` },
      { "@type": "SiteNavigationElement", position: 3, name: "Careers", url: `${SITE_URL}/careers` },
      { "@type": "SiteNavigationElement", position: 4, name: "Request a Quote", url: `${SITE_URL}/request-quote` },
      { "@type": "SiteNavigationElement", position: 5, name: "Contact", url: `${SITE_URL}/contact` },
      { "@type": "SiteNavigationElement", position: 6, name: "About", url: `${SITE_URL}/about` },
    ],
  },
];

// ─── APP ROOT ─────────────────────────────────────────────────
export default function App() {

 return (
  <BrowserRouter>
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {SITE_JSON_LD.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
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
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<JobDetail />} />
          <Route path="/request-quote" element={<RequestQuote />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <ScrollToTop/>
      <Footer />
      <ChatWidget />
    </div>
  </BrowserRouter>
);
}
