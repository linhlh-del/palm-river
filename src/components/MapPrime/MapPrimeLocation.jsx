import React, { useState } from "react";
import mapPoster from "../../assets/images/amen-map-4.jpg"; // ảnh tĩnh, hiện trước khi gif load xong
import mapGif from "../../assets/images/mapgif.gif";
import mapPin from "../../assets/images/map-pin.png"; // đổi tên file theo đúng ảnh pin của bạn
import "./MapPrimeLocation.css";

// Thay link Google Maps thật của dự án vào đây
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/HbfhHJmn4QTjivpZ6";

export default function MapPrimeLocation() {
  const [gifLoaded, setGifLoaded] = useState(false);

  return (
    <div className="map-prime-location">
      {/* Ảnh tĩnh fallback - luôn nằm dưới, mờ dần khi gif đã load */}
      <img
        src={mapPoster}
        className={`img-fluid map-poster ${gifLoaded ? "is-hidden" : ""}`}
        alt="Vị trí Palm City"
      />

      {/* Bản đồ động */}
      <img
        src={mapGif}
        className={`img-fluid map-gif ${gifLoaded ? "is-visible" : ""}`}
        alt="Bản đồ vị trí Palm City"
        onLoad={() => setGifLoaded(true)}
      />

      {/* Ghim vị trí */}
      <img src={mapPin} className="layer-location" alt="Vị trí dự án" />

      {/* Nút Google Maps */}
      <div className="btn-gg-map">
        <span></span>
        <a target="_blank" rel="noopener noreferrer" href={GOOGLE_MAPS_URL}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="12"
            viewBox="0 0 9 12"
            fill="none"
          >
            <path
              d="M4.24239 11.8622C4.10112 11.8622 3.99308 11.8013 3.92937 11.6821C3.86566 11.563 3.82411 11.4467 3.78533 11.3193C3.61912 10.7819 3.45569 10.3747 3.15375 9.89267C2.92383 9.52702 2.68838 9.17245 2.41968 8.83173L1.66067 7.87051C1.18976 7.27494 0.774248 6.71538 0.477849 6.00901C0.270093 5.51317 0.1676 4.99239 0.145439 4.45777C0.128819 4.06441 0.15652 3.68214 0.245162 3.29987C0.383667 2.71261 0.649595 2.1586 1.02356 1.68491C1.5194 1.06164 2.18976 0.59073 2.94322 0.341422C4.1953 -0.0713201 5.5748 0.147516 6.63851 0.9176C7.70223 1.68768 8.37813 3.03394 8.31995 4.40236C8.3061 4.70707 8.28117 5.00624 8.21192 5.30541C8.10666 5.77079 7.93214 6.21123 7.69115 6.62397C7.4917 6.96746 7.27009 7.29156 7.02633 7.60181L6.12328 8.74862C5.84627 9.10043 5.59142 9.46608 5.35042 9.84558C5.01247 10.3774 4.85181 10.7985 4.67175 11.3941C4.64128 11.4993 4.59973 11.5907 4.54987 11.6849C4.48893 11.8013 4.37813 11.8622 4.24239 11.8622ZM3.95707 5.76247C4.5194 5.85943 5.06788 5.65167 5.42799 5.22508C6.06234 4.47439 5.84627 3.33311 4.98477 2.85943C4.56372 2.62951 4.04572 2.60181 3.59973 2.80126C3.33103 2.92037 3.10666 3.1032 2.93768 3.34142C2.75763 3.59627 2.67176 3.89544 2.66621 4.20569C2.65513 4.96746 3.20361 5.63228 3.9543 5.76247H3.95707Z"
              stroke="#D2B57C"
              strokeWidth="0.5"
              strokeMiterlimit="10"
            ></path>
          </svg>
          Google Maps
        </a>
      </div>
    </div>
  );
}
