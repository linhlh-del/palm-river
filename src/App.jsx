import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Headers from "./components/Header/Header.jsx";
import "./App.css";
import Hero from "./components/Hero/Hero.jsx";
import TongQuan from "./components/TongQuan/TongQuan.jsx";
import Position from "./components/Position/Position.jsx";
import MatbangTang from "./components/MatBang/MatBangTang.jsx";
import GetInfor from "./components/Getinfor/GetInfor.jsx";
import CanHo from "./components/CanHo/CanHo.jsx";
import Chinhsachuudai from "./components/ChinhSachUuDai/ChinhSachUuDai.jsx";
import CSBH from "./components/CSBH/CSBH.jsx";
import Footer from "./components/Footer/Footer.jsx";
// import PositionMap from "./components/PositionMap/PositionMap.jsx";
import FloatingButtons from "./components/FloatingButtons/FloatingButtons.jsx";
import PopUp from "./components/PopUp/PopUp.jsx";
import ScrollDownButton from "./components/ScrollDown/Scrolldownbutton.jsx";
import ThankYou from "./components/ThankYou/ThankYou.jsx";
import TongThe from "./components/TongThe/TongThe.jsx";
import TienIch from "./components/PositionMap/TienIch.jsx";
import HinhAnh from "./components/HinhAnh/HinhAnh.jsx";
import News from "./components/News/News.jsx";
import NewsPage from "./components/News/NewsPage/NewsPage.jsx";
import NewsDetailPage from "./components/News/NewsDetailPage/NewsDetailPage.jsx";
import Layout from "./components/Layout/Layout.jsx";
function HomePage({ onOpenModal }) {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    if (!section) return;

    const target = document.getElementById(section);
    if (!target) return;

    const scrollToSection = () => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Xóa ?section=... khỏi URL sau khi đã cuộn tới,
      // không tạo thêm entry mới trong lịch sử trình duyệt
      window.history.replaceState(null, "", window.location.pathname);
    };

    requestAnimationFrame(scrollToSection);
  }, [location.search]);

  return (
    <>
      <FloatingButtons onOpenModal={onOpenModal} />
      <Headers onOpenModal={onOpenModal} />
      <Hero />
      <TongQuan />
      <Position />
      <TongThe />
      <MatbangTang />
      <Layout />
      <TienIch />
      <HinhAnh />
      <News />

      <GetInfor />
      {/* <MatbangTang /> */}
      {/* <CanHo onOpenModal={onOpenModal} /> */}
      {/* <GetInfor /> */}
      {/* <Chinhsachuudai /> */}
      {/* <CSBH /> */}
      <Footer onOpenModal={onOpenModal} />
      <ScrollDownButton />
    </>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage onOpenModal={openModal} />} />
        <Route path="/tin-tuc" element={<NewsPage />} />
        <Route path="/tin-tuc/:articleId" element={<NewsDetailPage />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <PopUp isOpen={showModal} onClose={closeModal} />
    </>
  );
}

export default App;
