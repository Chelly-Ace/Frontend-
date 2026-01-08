import { useState, useEffect } from "react";
import { Link } from "react-scroll";

import "../styles/global.css";
import "../styles/header-button.css";
import "../styles/header.css";
import "../styles/container.css";

import LogoImage from "../images/logo-image.png";
import HomeSection from "./home-section";
import IntroSection from "./intro-section";
import StatisticsSection from "./statistics-section";
import AboutSection from "./about-section";
import HistorySection from "./history-section";
import FooterSection from "./footer-section";
import UserAgreement from "./user-agreement";

function LandingPage() {
  const [active, setActive] = useState("home");

  const offsetNum = -120;

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const handleClick = (sectionId) => (e) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActive(sectionId);
    }
  };

  return (
    <>
      <UserAgreement />

      <header className="header">

        <Link
          to="Intro"
          smooth={false}
          offset={offsetNum}
          className={`logo-link ${active === "Intro" ? "active" : ""}`}
        >
          <img className="image-logo" src={LogoImage} alt="Logo" />
        </Link>

        {/* Navigation - always visible */}
        <nav className="header-buttons">
          <Link
            to="home"
            smooth={false}
            offset={offsetNum}
            className={`button-nav-link ${active === "home" ? "active" : ""}`}
            onClick={handleClick("home")}
          >
            Home
          </Link>

          <Link
            to="statistics"
            smooth={false}
            offset={-98}
            className={`button-nav-link ${active === "statistics" ? "active" : ""}`}
            onClick={handleClick("statistics")}
          >
            Statistics
          </Link>

          <Link
            to="history"
            smooth={false}
            offset={offsetNum}
            className={`button-nav-link ${active === "history" ? "active" : ""}`}
            onClick={handleClick("history")}
          >
            History
          </Link>

          <Link
            to="about-us"
            smooth={false}
            offset={-75}
            className={`button-nav-link ${active === "about-us" ? "active" : ""}`}
            onClick={handleClick("about-us")}
          >
            About Us
          </Link>
        </nav>
      </header>

      <div className="main-content">
        <IntroSection />
        <HomeSection />
        <StatisticsSection />
        <HistorySection />
        <AboutSection />
        <FooterSection />
      </div>
    </>
  );
}

export default LandingPage;
