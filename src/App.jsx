import { Fragment, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Headers from "./components/Header/Header.jsx";
import "./App.css";
import Hero from "./components/Hero/Hero.jsx";
import TongQuan from "./components/TongQuan/TongQuan.jsx";
import Position from "./components/Position/Position.jsx";
import MatbangTang from "./components/MatBang/MatBangTang.jsx";
import { MOBILE_CROP } from "./components/MatBang/data.js";
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
import useRouteTracking from "./utils/useRouteTracking.js";
import { orderSections, cmsSeo } from "./cms/content.js";
import { buildCmsSchema } from './cms/schema.js';
import { cmsPageView } from './cms/tracker';

function CmsRouteTracking() {
  const { pathname } = useLocation();
  useEffect(() => { cmsPageView(pathname); }, [pathname]);
  return null;
}

const seoDefaults = buildCmsSchema('').seo;
function CmsRouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname === '/tin-tuc' ? pathname : '/';
    const fallback = seoDefaults.find((item) => item.path === path)?.default || {};
    const override = cmsSeo(path);
    const value = { ...fallback, ...(override.vi || override) };
    if (value.title) document.title = value.title;
    const description = document.querySelector('meta[name="description"]');
    if (description && value.description) description.setAttribute('content', value.description);
  }, [pathname]);
  return null;
}

function HomePage({ onOpenModal }) {
  const location = useLocation();
  const sections = [
    { id: 'hero', locked: true, node: <Hero /> },
    { id: 'tong-quan', node: <TongQuan /> },
    { id: 'vi-tri', node: <Position /> },
    { id: 'mat-bang-tong-the', node: <TongThe /> },
    { id: 'mat-bang-tang', node: <MatbangTang mobileCrop={MOBILE_CROP} /> },
    { id: 'tien-ich', node: <TienIch /> },
    { id: 'hinh-anh', node: <HinhAnh /> },
    { id: 'tin-tuc', node: <News /> },
    { id: 'lien-he', locked: true, node: <GetInfor /> },
  ];

  // Cuộn tới section được yêu cầu từ trang khác (vd: Header ở NewsDetailPage
  // gửi qua navigate("/", { state: { scrollTo: "tin-tuc" } })).
  // Dùng location.state thay vì query string để URL luôn sạch, không hiện
  // ra dạng /?section=... trên thanh địa chỉ dù chỉ trong tích tắc.
  useEffect(() => {
    const section = location.state?.scrollTo;
    if (!section) return;

    const target = document.getElementById(section);
    if (!target) return;

    const scrollToSection = () => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Xóa state khỏi history entry hiện tại sau khi đã cuộn tới,
      // để reload / back không bị cuộn lại lần nữa.
      window.history.replaceState({}, "");
    };

    requestAnimationFrame(scrollToSection);
  }, [location.state]);

  return (
    <>
      <FloatingButtons onOpenModal={onOpenModal} />
      <Headers onOpenModal={onOpenModal} />
      {orderSections(sections).map((section) => <Fragment key={section.id}>{section.node}</Fragment>)}
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

  // Tracker: bắn pageview mỗi khi đổi route (không render gì)
  useRouteTracking();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <CmsRouteTracking />
      <CmsRouteSeo />
      <Routes>
        <Route path="/" element={<HomePage onOpenModal={openModal} />} />
        <Route path="/tin-tuc" element={<NewsPage />} />
        <Route
          path="/tin-tuc/:articleId"
          element={<NewsDetailPage onOpenModal={openModal} />}
        />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <PopUp isOpen={showModal} onClose={closeModal} />
    </>
  );
}

export default App;
