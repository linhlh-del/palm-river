import heroBg from "../../assets/images/palm-city-hero.webp";
import { cmsImage } from "../../cms/content";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <img
        src={cmsImage('hero.image', heroBg)}
        alt="Palm River — phối cảnh dự án"
        className="hero__image"
        loading="eager"
      />
    </div>
  );
}
