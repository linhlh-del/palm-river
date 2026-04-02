import { useState, useEffect, useRef } from "react";
import Headers from "./components/Header/Header.jsx";
import "./App.css";
import Hero from "./components/Hero/Hero.jsx";
import TongQuan from "./components/TongQuan/TongQuan.jsx";
import Position from "./components/Position/Position.jsx";
import Carousel from "./components/Casourel/Carousel.jsx";
import MatbangTang from "./components/MatBang/MatBangTang.jsx";
import GetInfor from "./components/Getinfor/GetInfor.jsx";
import CanHo from "./components/CanHo/CanHo.jsx";
import Chinhsachuudai from "./components/ChinhSachUuDai/ChinhSachUuDai.jsx";
import CSBH from "./components/CSBH/CSBH.jsx";
import Footer from "./components/Footer/Footer.jsx";
import PositionMap from "./components/PositionMap/PositionMap.jsx";
import FloatingButtons from "./components/FloatingButtons/FloatingButtons.jsx";
import PopUp from "./components/PopUp/PopUp.jsx";
import ScrollDownButton from "./components/ScrollDown/Scrolldownbutton.jsx";
function App() {
  const [showModal, setShowModal] = useState(false);
  const tongQuanRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Auto-open popup when scrolling to TongQuan section (first time only)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setShowModal(true);
        }
      },
      { threshold: 0.3 },
    );

    if (tongQuanRef.current) {
      observer.observe(tongQuanRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <FloatingButtons />
      <Headers onOpenModal={openModal} />
      <Hero />
      <TongQuan ref={tongQuanRef} />
      <Position />
      <PositionMap />
      <Carousel />
      <GetInfor />
      <MatbangTang />
      <CanHo />
      <GetInfor />
      <Chinhsachuudai />
      <CSBH />
      <Footer />
      <PopUp isOpen={showModal} onClose={closeModal} />
      <ScrollDownButton />
    </>
  );
}

export default App;
