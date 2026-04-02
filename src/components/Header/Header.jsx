// Header.jsx
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
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  // Smooth scroll + đóng menu
  const handleNav = (e, href) => {
    e.preventDefault();
    setActiveHref(href);
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Mở modal
  const handleCTA = () => {
    setMenuOpen(false);
    if (onOpenModal) onOpenModal();
  };

  return (
    <>
      <header
        className={`hd${scrolled ? " hd--scrolled" : ""}`}
        style={{ backgroundColor: "#004380" }}
      >
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

        {/* Mobile: hamburger */}
        <button
          className="hd__burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Mở menu"
          aria-expanded={menuOpen}
        >
          <img src={menuIcon} alt="Menu" />
        </button>
      </header>

      {/* Mobile dropdown menu */}
      <div
        className={`hd__mobile-menu${menuOpen ? " hd__mobile-menu--open" : ""}`}
      >
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
        <button className="hd__mobile-cta" onClick={handleCTA}>
          NHẬN BÁO GIÁ
        </button>
      </div>

      {/* Overlay mờ sau menu mobile */}
      {menuOpen && (
        <div className="hd__overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
