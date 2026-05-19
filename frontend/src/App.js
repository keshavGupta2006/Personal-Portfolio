import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
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
        <Marquee />
        <About />
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
