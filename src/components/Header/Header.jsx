import { useState, useEffect } from "react";
import logoOnePlus from "../../assets/images/logo-oneplus.png";
import logo from "../../assets/images/logo-masterise.png";
import menuIcon from "../../assets/images/logo-menu.png";
import "./Header.css";

const NAV_ITEMS = [
  { label: "TỔNG QUAN", href: "#tong-quan" },
  { label: "VỊ TRÍ", href: "#map" },
  { label: "TIỆN ÍCH", href: "#tien-ich" },
  { label: "MẶT BẰNG", href: "#mat-bang-tang" },
  { label: "CHÍNH SÁCH", href: "#ban-hang" },
  { label: "LIÊN HỆ", href: "#lien-he" },
];

export default function Header({ onOpenModal }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  // Shadow khi scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Đóng menu khi resize lên desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock scroll khi menu mobile mở
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Đóng menu khi click outside
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (
        !e.target.closest(".hd__mobile-menu") &&
        !e.target.closest(".hd__burger")
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  const handleNav = (e, href) => {
    e.preventDefault();
    setActiveHref(href);
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCTA = () => {
    setMenuOpen(false);
    if (onOpenModal) onOpenModal();
  };

  return (
    <>
      <header className={`hd${scrolled ? " hd--scrolled" : ""}`}>
        {/* Logo */}
        <div className="hd__logo">
          <img src={logoOnePlus} alt="OnePlus" />
          <img src={logo} alt="Masterise" />
        </div>

        {/* Desktop nav */}
        <nav className="hd__nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`hd__nav-link${activeHref === item.href ? " hd__nav-link--active" : ""}`}
              onClick={(e) => handleNav(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button className="hd__cta" onClick={handleCTA}>
          NHẬN BÁO GIÁ
        </button>

        {/* Hamburger */}
        <button
          className="hd__burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Mở menu"
          aria-expanded={menuOpen}
        >
          <img src={menuIcon} alt="Menu" />
        </button>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div className="hd__overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile menu */}
      <div
        className={`hd__mobile-menu${menuOpen ? " hd__mobile-menu--open" : ""}`}
      >
        {/* Nav links */}
        <nav className="hd__mobile-nav">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`hd__mobile-link${activeHref === item.href ? " hd__mobile-link--active" : ""}`}
              onClick={(e) => handleNav(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button className="hd__mobile-cta" onClick={handleCTA}>
          NHẬN BÁO GIÁ
        </button>

        {/* Footer: logo + hotline */}
        <div className="hd__mobile-footer">
          <img src={logoOnePlus} alt="OnePlus" />
          <div className="hd__mobile-hotline">
            <span>Hotline</span>
            <a href="tel:0939535111">0939 535 111</a>
          </div>
        </div>
      </div>
    </>
  );
}
