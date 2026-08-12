import heroBg from "../../assets/images/palm-city-hero.webp";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <img
        src={heroBg}
        alt="Lusso Saigon Hero"
        className="hero__image"
        loading="eager"
      />
    </div>
  );
}
