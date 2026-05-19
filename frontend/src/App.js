import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Contact from "./components/Contact";

function Home() {
  return (
    <div className="App relative" data-testid="home-page">
      <SmoothScroll />
      <Cursor />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
