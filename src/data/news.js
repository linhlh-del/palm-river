/**
 * src/data/news.js
 * ---------------------------------------------------------------------------
 * Palm City — NGUỒN DỮ LIỆU DUY NHẤT cho toàn bộ khu vực Tin tức & Sự kiện:
 *   - News.jsx            (carousel ở trang chủ)
 *   - NewsPage.jsx         (trang /tin-tuc)
 *   - NewsDetailPage.jsx   (trang /tin-tuc/:articleId)
 *
 * TRƯỚC ĐÂY 3 component trên có 3 file data.js riêng, ID không khớp nhau
 * (vd: "xu-huong-do-thi-nghi-duong" vs "xu-huong-do-thi-duong"), và link
 * trỏ thẳng ra domain ngoài palm-city.com.vn -> đó là lý do các trang
 * không liên kết được với nhau.
 *
 * Từ giờ: MỌI nơi cần dữ liệu tin tức chỉ import từ file này.
 * MỌI nơi cần link tới 1 bài viết chỉ dùng getHref(id) + <Link>.
 *
 * Khi có API/CMS thật, chỉ cần sửa NEWS_ARTICLES thành 1 hàm fetch,
 * các component KHÔNG cần đổi gì.
 * ---------------------------------------------------------------------------
 * LƯU Ý VỀ ĐƯỜNG DẪN ẢNH:
 * File này giả định ảnh nằm ở "src/assets/images/news/1.webp" ... "9.webp"
 * (lấy từ NewsPage/data.js cũ, import "../../../assets/images/news/1.webp").
 * Nếu cấu trúc thư mục thực tế của bạn khác, chỉ cần sửa 9 dòng import bên
 * dưới cho khớp, phần còn lại không cần đổi.
 * ---------------------------------------------------------------------------
 */

import n1 from "../assets/images/news/1.webp";
import n2 from "../assets/images/news/2.webp";
import n3 from "../assets/images/news/3.webp";
import n4 from "../assets/images/news/4.webp";
import n5 from "../assets/images/news/5.webp";
import n6 from "../assets/images/news/6.webp";
import n7 from "../assets/images/news/7.webp";
import n8 from "../assets/images/news/8.webp";
import n9 from "../assets/images/news/9.webp";

import banner2 from "../assets/images/news/banner/xu-huong-do-thi-duong/banner.webp";
/**
 * content block types dùng cho NewsDetailPage:
 *   { type: "p", text }
 *   { type: "h2", id, text }
 *   { type: "img", src, caption }
 *   { type: "source", text }
 *
 * Bài nào chưa soạn nội dung chi tiết đầy đủ thì để `content` là mảng chứa
 * 1 đoạn "p" lấy từ excerpt (NewsDetailPage sẽ tự fallback), bạn có thể bổ
 * sung dần nội dung thật cho từng bài sau.
 */
export const NEWS_ARTICLES = [
  {
    id: "tin-hieu-tich-cuc-phap-ly",
    tag: "Tin tức",
    date: "08/07/2026",
    title: "Những tín hiệu tích cực về pháp lý và triển khai của Palm City",
    excerpt:
      "Việc khởi công phân khu Palm River mới đây được xem là dấu mốc mở đầu cho giai đoạn phát triển tiếp theo của Palm City, khu đô thị quy mô hơn 30 ha tại Nam Rạch Chiếc, TP.HCM.",
    image: n1,
    readingTime: "4 phút đọc",
    content: [
      {
        type: "p",
        text: "Việc khởi công phân khu Palm River mới đây được xem là dấu mốc mở đầu cho giai đoạn phát triển tiếp theo của Palm City, khu đô thị quy mô hơn 30 ha tại Nam Rạch Chiếc, TP.HCM.",
      },
      {
        type: "h2",
        text: "Đảm bảo sự kết nối trong toàn khu",
      },
      {
        type: "p",
        text: "Sự kiện khởi công phân khu Palm River, Khu nhà ở chung cư cao tầng kết hợp thương mại – dịch vụ 3 tiếp tục đánh dấu quá trình triển khai các hạng mục theo kế hoạch tổng thể của dự án Palm City, dự án trung tâm Nam Rạch Chiếc, trong đó các phân khu nhà ở, hạ tầng kỹ thuật và hệ thống tiện ích được triển khai đảm bảo sự kết nối trong toàn khu đô thị.",
      },
      {
        type: "p",
        text: "Trong lĩnh vực phát triển bất động sản, quy hoạch chi tiết 1/500 được xem là cơ sở quan trọng để triển khai đầu tư xây dựng, xác định rõ chức năng sử dụng đất, chỉ tiêu quy hoạch kiến trúc, hệ thống hạ tầng kỹ thuật, mạng lưới giao thông nội khu và các hạng mục công trình trong dự án.",
      },
      {
        type: "p",
        text: "Đồng thời, quy hoạch chi tiết còn là căn cứ để quản lý việc triển khai xây dựng theo đúng định hướng đã được phê duyệt, bảo đảm tính thống nhất trong toàn bộ khu đô thị.",
      },
      {
        type: "p",
        text: "Việc hoàn thiện quy hoạch chi tiết từ sớm cũng tạo điều kiện để các hạng mục được triển khai theo hướng đồng bộ, từ hạ tầng kỹ thuật đến không gian cảnh quan và các tiện ích công cộng, đồng thời giúp quá trình cung cấp thông tin quy hoạch đến khách hàng và cư dân được thực hiện rõ ràng hơn trong từng giai đoạn phát triển.",
      },
      {
        type: "p",
        text: "Song song với việc phát triển các phân khu mới, chủ đầu tư cho biết đang tiếp tục hoàn thiện hạ tầng và hệ tiện ích cho toàn khu đô thị, bao gồm công viên ven sông dài gần 3 km, hệ thống công viên nội khu, khu thể thao và chăm sóc sức khỏe, khu sinh hoạt cộng đồng và mạng lưới đường nội khu kết nối các phân khu hiện hữu.",
      },
      {
        type: "p",
        text: "Các hạng mục cảnh quan như cây xanh, lối dạo bộ, khu vực sinh hoạt ngoài trời và không gian công cộng cũng đang tiếp tục được triển khai theo từng giai đoạn, gắn với tiến độ hoàn thiện hạ tầng kỹ thuật chung của dự án.",
      },
      {
        type: "img",
        src: "https://palm-city.com.vn/wp-content/uploads/2026/07/Transform_this_architectural_l_Nano_Banana_2_48866-1.png.webp",
        alt: "Phối cảnh Palm City",
        caption: "Phối cảnh Palm City",
      },
      {
        type: "h2",
        text: "Hoàn thiện dần hệ thống tiện ích",
      },
      {
        type: "p",
        text: "Việc bổ sung thêm không gian xanh và hệ tiện ích nội khu được thực hiện đồng thời với các hạng mục xây dựng, nhằm hoàn thiện dần hệ thống tiện ích phục vụ nhu cầu sinh hoạt của cư dân trong khu đô thị.",
      },
      {
        type: "p",
        text: "Bên cạnh hoạt động đầu tư xây dựng, doanh nghiệp cũng đang tiếp tục triển khai các thủ tục pháp lý đối với những khu đã đưa vào sử dụng.",
      },
      {
        type: "img",
        src: "https://palm-city.com.vn/wp-content/uploads/2026/07/260619_CC3_F1-2_Drop-off_NoWTM-1.jpg.webp",
        alt: "Phối cảnh Palm River thuộc Palm City",
        caption: "Phối cảnh Palm River – thuộc Palm City",
      },
      {
        type: "p",
        text: "Theo đại diện doanh nghiệp, công tác cấp giấy chứng nhận quyền sở hữu nhà ở tại Palm Heights, chung cư cao tầng 2, đang được thúc đẩy theo tiến độ để sớm hoàn tất việc bàn giao cho cư dân.",
      },
      {
        type: "p",
        text: "Đối với phân khu Palm Residence, nhà ở thấp tầng OTM2, các thủ tục pháp lý liên quan đang được triển khai theo quy định nhằm hoàn thiện cơ sở cho việc ký kết hợp đồng mua bán chính thức, đồng thời thực hiện các thủ tục cấp giấy chứng nhận quyền sở hữu nhà ở trong thời gian tới.",
      },
      {
        type: "p",
        text: "Song song với đó, công tác quản lý vận hành hạ tầng chung trong khu đô thị cũng đang được phối hợp triển khai giữa các đơn vị liên quan, bao gồm hệ thống giao thông nội khu, cảnh quan, cây xanh và các khu tiện ích công cộng, nhằm đảm bảo hoạt động vận hành đồng bộ trong toàn khu.",
      },
      {
        type: "p",
        text: "Trong thời gian tới Palm City dự kiến tiếp tục được đầu tư hoàn thiện theo định hướng phát triển dài hạn, tập trung vào việc hoàn thiện hạ tầng kỹ thuật, hệ thống tiện ích và các hạng mục phục vụ cư dân, theo kế hoạch phát triển tổng thể tại khu Đông TP.HCM.",
      },
    ],
  },
  {
    id: "xu-huong-do-thi-duong",
    tag: "Sự kiện",
    date: "06/07/2026",
    title:
      'Palm City và xu hướng "đô thị nghỉ dưỡng giữa lòng thành phố" tại khu Đông TP.HCM',
    excerpt:
      "Khi đô thị bước vào giai đoạn phát triển theo chiều sâu, chất lượng sống đang trở thành tiêu chí được quan tâm hàng đầu khi lựa chọn nơi an cư.",
    image: banner2,
    readingTime: "7 phút đọc",
    content: [
      {
        type: "p",
        text: "Trong nhiều năm, phát triển đô thị tại TP.HCM được đo bằng tốc độ mở rộng không gian và nguồn cung nhà ở. Tuy nhiên, khi đô thị bước vào giai đoạn phát triển theo chiều sâu, chất lượng sống đang trở thành một trong những tiêu chí được quan tâm khi lựa chọn nơi an cư.",
      },
      {
        type: "p",
        text: "Sự dịch chuyển này thúc đẩy những mô hình phát triển tích hợp không gian xanh, mặt nước, tiện ích và khả năng kết nối hạ tầng. Trong đó, “đô thị nghỉ dưỡng giữa lòng thành phố” đang nổi lên như một hướng phát triển phản ánh nhu cầu sống của cư dân đô thị.",
      },
      {
        type: "h2",
        id: "nhu-cau",
        text: "Từ nhu cầu nhà ở đến nhu cầu chất lượng sống",
      },
      {
        type: "p",
        text: "Thực tế phát triển đô thị những năm qua cho thấy không ít khu đô thị mới đạt tỷ lệ bán trong khi tốc độ lấp đầy dân cư không như kỳ vọng.",
      },
      {
        type: "p",
        text: "Tại một hội thảo về phát triển đô thị gần đây, ông Nguyễn Đỗ Dũng, chuyên gia quốc tế về quy hoạch đô thị, cho rằng nhiều khu đô thị vệ tinh trước đây “bán hết nhà nhưng dân về ở ít”. Theo ông, nguyên nhân không nằm ở khoảng cách địa lý mà ở thời gian di chuyển, việc làm và khả năng tiếp cận dịch vụ.",
      },
      {
        type: "p",
        text: "Đồng quan điểm, bà Dương Thùy Dung, Giám đốc Điều hành CBRE Việt Nam, cho rằng một khu đô thị bền vững không thể chỉ là nơi cư trú mà phải tạo ra hệ sinh thái việc làm, giáo dục, y tế và dịch vụ đủ sức hình thành cộng đồng cư dân thực sự.",
      },
      {
        type: "p",
        text: "Những nhận định này cho thấy trọng tâm của đô thị hóa đang dịch chuyển từ đáp ứng nhu cầu nhà ở sang nâng cao chất lượng sống. Mặt nước, cây xanh hay các tiện ích chăm sóc sức khỏe vì thế không còn là giá trị cộng thêm mà đang dần trở thành một phần quan trọng trong cấu trúc đô thị hiện đại.",
      },
      {
        type: "h2",
        id: "xu-huong",
        text: "Xu hướng “Đô Thị Nghỉ Dưỡng Giữa Lòng Thành Phố”",
      },
      {
        type: "p",
        text: "Sự xuất hiện của mô hình “đô thị nghỉ dưỡng giữa lòng thành phố” cho thấy sự thay đổi trong nhu cầu của cư dân đô thị. Bên cạnh vị trí, khả năng kết nối và quy mô phát triển, chất lượng môi trường sống đang trở thành một tiêu chí ngày càng được quan tâm trong lựa chọn nơi an cư.",
      },
      {
        type: "p",
        text: "Mô hình này đưa mặt nước, cây xanh, không gian mở và các tiện ích chăm sóc sức khỏe vào đời sống thường nhật. Dưới góc độ quy hoạch, đây không chỉ là câu chuyện cảnh quan mà còn là cách gia tăng chất lượng môi trường đô thị, góp phần cải thiện vi khí hậu và mở rộng không gian công cộng cho cư dân.",
      },
      {
        type: "p",
        text: "Tuy nhiên, yếu tố nghỉ dưỡng chỉ thực sự có ý nghĩa khi đi cùng khả năng kết nối. Bản chất của mô hình này là sự kết hợp giữa chất lượng sống và khả năng tiếp cận thuận tiện với việc làm, giáo dục, y tế và các dịch vụ thiết yếu.",
      },
      {
        type: "p",
        text: "Tại TP.HCM, khu Đông đang nổi lên như một trong những địa bàn hội tụ nhiều điều kiện cho xu hướng này. Sự hình thành thành phố Thủ Đức cùng hàng loạt công trình hạ tầng trọng điểm như nút giao An Phú, cao tốc TP.HCM – Long Thành – Dầu Giây, tuyến Metro Thủ Thiêm – Long Thành theo quy hoạch và các tuyến kết nối sân bay quốc tế Long Thành đang tạo nền tảng cho những khu đô thị được quy hoạch đồng bộ ngay từ đầu.",
      },
      {
        type: "img",
        src: n2,
        caption:
          "Phối cảnh dự án Palm City, biểu tượng kiến trúc mới tại khu Đông TP.HCM.",
      },
      {
        type: "p",
        text: "Trong bối cảnh đó, Palm City tại phường Bình Trưng được thiết kế theo định hướng của một khu đô thị tích hợp quy mô 30,2 ha, bao gồm các phân khu nhà ở, thương mại – dịch vụ, giáo dục, y tế và hệ thống tiện ích cộng đồng.",
      },
      {
        type: "p",
        text: "Nằm liền kề Trung tâm tài chính quốc tế Thủ Thiêm và Trung tâm thể thao Nam Rạch Chiếc, Palm City kết nối thuận tiện với mạng lưới hạ tầng đang hoàn thiện của khu Đông.",
      },
      {
        type: "p",
        text: "Theo định hướng phát triển mới được công bố, Hướng Việt Properties lựa chọn mô hình “đô thị nghỉ dưỡng giữa lòng thành phố” làm nền tảng cho các giai đoạn tiếp theo của dự án. Cách tiếp cận này hướng đến việc hoàn thiện một hệ sinh thái đồng bộ thay vì tập trung vào từng sản phẩm riêng lẻ.",
      },
      {
        type: "p",
        text: "Ông Nguyễn Sĩ Toàn, Giám đốc Điều hành Khối Kinh doanh Bất động sản Nhà cao tầng Hướng Việt Properties, cho biết việc triển khai Palm River không chỉ đánh dấu bước phát triển tiếp theo của Palm City mà còn thể hiện cam kết phát triển một khu đô thị được đầu tư bài bản và hướng đến giá trị bền vững.",
      },
      {
        type: "p",
        text: "Theo ông, giá trị của một khu đô thị không nằm ở tốc độ phát triển mà ở khả năng kiến tạo môi trường sống ngày càng tốt hơn theo thời gian.",
      },
      {
        type: "img",
        src: n2,
        caption:
          "Ông Nguyễn Sĩ Toàn, Giám đốc Điều hành Khối Kinh doanh Bất động sản Nhà cao tầng Hướng Việt Properties chia sẻ định vị Palm River là “đô thị nghỉ dưỡng giữa lòng thành phố”. Ảnh: Hướng Việt Properties.",
      },
      {
        type: "p",
        text: "Hiện nhiều hạng mục của Palm City đã đi vào vận hành như Palm Residence, Palm Heights, hệ thống trường quốc tế và công viên ven sông, từng bước hình thành cộng đồng cư dân hiện hữu và tạo nền tảng cho các giai đoạn phát triển tiếp theo.",
      },
      { type: "h2", id: "thuc-te", text: "Từ định hướng đến thực tế" },
      {
        type: "p",
        text: "Ngày 16/6, Công ty TNHH Nam Rạch Chiếc cùng Hướng Việt Properties chính thức khởi động Palm River, phân khu đầu tiên trong giai đoạn phát triển mới của Palm City.",
      },
      {
        type: "p",
        text: "Palm City định vị là khu đô thị nghỉ dưỡng giữa lòng thành phố và Palm River là phân khu thể hiện rõ nét định hướng này. Tọa lạc ven sông, dự án được thiết kế lấy cảm hứng từ thiên nhiên, tối ưu ánh sáng tự nhiên, hệ tiện ích được phát triển gắn với mặt nước và cảnh quan ven sông làm gia tăng trải nghiệm sống trong môi trường đô thị.",
      },
      {
        type: "p",
        text: "Theo Hướng Việt Properties, Palm River có quy mô sản phẩm từ 34,86 m² đến hơn 300 m² và dự kiến ra mắt thị trường trong năm 2026. Dự án hợp tác với các đối tác tư vấn, thiết kế quốc tế giàu kinh nghiệm trong các lĩnh vực kiến trúc, nội thất, cảnh quan, công trình xanh và quản lý dự án.",
      },
      {
        type: "img",
        src: n2,
        caption:
          "Lễ khởi động Palm City, chính thức khởi công phân khu Palm River. Ảnh: Hướng Việt Properties.",
      },
      {
        type: "p",
        text: "Trong bối cảnh TP.HCM chuyển dần từ phát triển theo chiều rộng sang chiều sâu, giá trị của một khu đô thị được gia tăng qua khả năng tạo nên môi trường sống bền vững bên cạnh quy mô đầu tư và vị trí.",
      },
      {
        type: "p",
        text: "Các mô hình đô thị tích hợp theo hướng nghỉ dưỡng giữa thành phố đang trở thành một xu hướng phát triển mới. Tại khu Đông TP.HCM, Palm City được phát triển theo định hướng này, đồng thời bổ sung thêm một lựa chọn nơi an cư tại khu vực này.",
      },
      { type: "source", text: "Nguồn: Thu Hà – VnEconomy" },
    ],
  },
  {
    id: "giai-doan-phat-trien-moi",
    tag: "Tin tức",
    date: "06/07/2026",
    title:
      "Palm City bước vào giai đoạn phát triển mới với nhiều chuyển động tích cực",
    excerpt:
      "Dự án Palm City đang bước vào giai đoạn phát triển mới khi phân khu Palm River chính thức khởi công, đồng thời đẩy mạnh đầu tư hạ tầng và hoàn thiện pháp lý cho các phân khu hiện hữu.",
    image: n3,
    readingTime: "4 phút đọc",
    content: [
      {
        type: "p",
        text: "Dự án Palm City đang bước vào giai đoạn phát triển mới khi phân khu Palm River chính thức khởi công, đồng thời tiếp tục đẩy mạnh đầu tư hạ tầng, hoàn thiện pháp lý cho các phân khu hiện hữu. Doanh nghiệp khẳng định minh bạch và phát triển dự án theo hướng bền vững.",
      },

      {
        type: "h2",
        id: "dong-bo-ha-tang",
        text: "Đồng bộ hạ tầng, hoàn thiện nền tảng pháp lý",
      },

      {
        type: "p",
        text: "Mới đây, Công ty TNHH Nam Rạch Chiếc cùng Hướng Việt Properties (HVP) đã chính thức khởi công phân khu Palm River thuộc dự án Palm City, khu đô thị quy mô hơn 30 ha tại Nam Rạch Chiếc, TP.HCM. Sự kiện này đánh dấu giai đoạn phát triển mới của Palm City và là minh chứng cho thấy dự án triển khai tích cực, đúng tiến độ và tuân thủ đầy đủ quy định pháp luật.",
      },

      {
        type: "p",
        text: "Chia sẻ về cơ sở pháp lý của phân khu Palm River, đại diện doanh nghiệp cho biết phân khu này thuộc trường hợp được miễn giấy phép xây dựng theo quy định và đã có quy hoạch chi tiết 1/500 được cơ quan có thẩm quyền phê duyệt. Việc hoàn thiện quy hoạch từ sớm giúp bảo đảm các hạng mục triển khai đồng bộ, đồng thời tạo cơ sở pháp lý rõ ràng để khách hàng tiếp cận thông tin quy hoạch và định hướng phát triển khu đô thị.",
      },

      {
        type: "p",
        text: "Song song với quá trình phát triển các phân khu mới, doanh nghiệp tiếp tục đầu tư hoàn thiện đồng bộ hệ thống hạ tầng, cảnh quan và tiện ích của toàn khu đô thị. Trong đó, nhiều hạng mục đang được triển khai như công viên ven sông dài gần 3 km, hệ thống công viên nội khu, trung tâm thể thao và chăm sóc sức khỏe, mạng lưới đường nội khu cùng các tiện ích phục vụ cộng đồng cư dân hiện hữu.",
      },

      {
        type: "p",
        text: "Việc gia tăng diện tích cây xanh và bổ sung hệ tiện ích góp phần nâng cao chất lượng sống cho cư dân, từng bước đưa Palm City trở thành khu đô thị nghỉ dưỡng xanh giữa lòng thành phố, nơi cư dân tận hưởng không gian sống gần gũi thiên nhiên ngay tại trung tâm TP.HCM.",
      },

      {
        type: "img",
        src: n3,
        caption: "Phối cảnh Palm City – Dòng Sông ôm trọn khu đô thị.",
      },

      {
        type: "p",
        text: "Cùng với quá trình đầu tư hạ tầng và triển khai các phân khu mới, Nam Rạch Chiếc cũng tập trung hoàn thiện các thủ tục pháp lý đối với các phân khu đã đưa vào vận hành. Trong đó, công tác cấp giấy chứng nhận quyền sở hữu nhà ở (sổ hồng) cho cư dân tại Palm Heights đang được đẩy nhanh tiến độ.",
      },

      {
        type: "p",
        text: "Đối với phân khu Palm Residence, các thủ tục pháp lý tiếp tục được thực hiện theo đúng quy định nhằm tiến tới ký kết hợp đồng mua bán và cấp sổ hồng cho cư dân trong thời gian tới.",
      },

      {
        type: "p",
        text: "Đại diện doanh nghiệp cho biết, việc từng bước hoàn thiện pháp lý cho các phân khu đã đi vào hoạt động không chỉ thể hiện cam kết đồng hành lâu dài với cộng đồng cư dân mà còn góp phần củng cố giá trị tài sản cũng như niềm tin của khách hàng đối với Palm City.",
      },

      {
        type: "h2",
        id: "minh-bach-thong-tin",
        text: "Minh bạch thông tin, kiên định chiến lược phát triển dài hạn",
      },

      {
        type: "p",
        text: "Trong quá trình triển khai dự án Palm City, đại diện Công ty TNHH Nam Rạch Chiếc khẳng định tiếp tục theo đuổi định hướng phát triển minh bạch, tuân thủ đầy đủ quy định pháp luật và đầu tư dài hạn. Doanh nghiệp cũng khẳng định sẽ đảm bảo minh bạch và tuân thủ nghiêm các quy định trong toàn bộ quá trình phát triển dự án.",
      },

      {
        type: "img",
        src: n3,
        caption: "Phối cảnh dự án Palm City.",
      },

      {
        type: "p",
        text: "Liên quan đến Quyết định số 335/QĐ-XPHC của Thanh tra Ủy ban Chứng khoán Nhà nước (UBCKNN) xử phạt vi phạm hành chính đối với Công ty TNHH Nam Rạch Chiếc được công bố gần đây, đại diện doanh nghiệp cho biết quyết định này liên quan đến việc sử dụng một phần nguồn vốn thu được từ đợt phát hành trái phiếu riêng lẻ chưa đúng với phương án đã công bố với nhà đầu tư trong giai đoạn trước.",
      },

      {
        type: "p",
        text: "Theo doanh nghiệp, nội dung xử phạt không liên quan đến pháp lý dự án, tiến độ xây dựng hay quyền lợi của khách hàng và cư dân tại Palm City. Đây là vấn đề về thủ tục công bố thông tin tài chính trong quá khứ và toàn bộ nội dung liên quan đã được công bố đầy đủ tới UBCKNN từ ngày 09/05/2025 theo đúng quy định.",
      },

      {
        type: "p",
        text: "Công ty TNHH Nam Rạch Chiếc cũng đã mua lại trước hạn toàn bộ hai lô trái phiếu NRCCH2125001 trị giá 1.300 tỷ đồng và NRCCH2226001 trị giá 700 tỷ đồng. Doanh nghiệp đã hoàn thành toàn bộ nghĩa vụ tài chính đối với trái chủ, bao gồm khoản lãi gần 149 tỷ đồng đã thanh toán trong năm 2024, thể hiện cam kết tài chính có trách nhiệm đối với nhà đầu tư.",
      },

      {
        type: "p",
        text: "Trong thời gian tới, Công ty TNHH Nam Rạch Chiếc sẽ tiếp tục đầu tư hoàn thiện hệ sinh thái đô thị tại Palm City theo định hướng phát triển bền vững và dài hạn, tập trung vào chất lượng sản phẩm, giá trị sử dụng thực tế và trải nghiệm sống của cư dân. Đồng thời tiếp tục đồng hành cùng khách hàng, cư dân và các đối tác trong quá trình phát triển Palm City trở thành một trong những khu đô thị tiêu biểu của khu Đông TP.HCM.",
      },

      {
        type: "source",
        text: "Nguồn: Báo Đầu tư",
      },
    ],
  },
  {
    id: "ra-mat-phan-khu-cao-tang",
    tag: "Tin tức",
    date: "06/07/2026",
    title: "Palm City ra mắt phân khu cao tầng đầu tiên",
    excerpt:
      "Palm River là phân khu cao tầng đầu tiên được triển khai trong giai đoạn phát triển mới của khu đô thị Palm City, quy mô 30,2 ha tại phường Bình Trưng, TP.HCM.",
    image: n4,
    readingTime: "4 phút đọc",

    content: [
      {
        type: "p",
        text: "Palm River là phân khu cao tầng đầu tiên được triển khai trong giai đoạn phát triển mới của khu đô thị Palm City (quy mô 30,2 ha) tại phường Bình Trưng, TP.HCM.",
      },

      {
        type: "p",
        text: "Ngày 16/6, Công ty TNHH Nam Rạch Chiếc cùng Hướng Việt Properties tổ chức lễ khởi động khu đô thị Palm City, đồng thời công bố triển khai phân khu Palm River. Đây là phân khu cao tầng đầu tiên trong giai đoạn phát triển mới của dự án Palm City.",
      },

      {
        type: "img",
        src: n4,
        caption: "Lễ khởi động dự án Palm City. Ảnh: Hướng Việt Properties.",
      },

      {
        type: "p",
        text: "Theo giới thiệu, Palm River phát triển đa dạng loại hình sản phẩm với diện tích từ 34,86 m² đến hơn 300 m² và dự kiến ra mắt thị trường trong năm 2026.",
      },

      {
        type: "p",
        text: "Tọa lạc ven sông, Palm River được thiết kế theo ngôn ngữ kiến trúc lấy cảm hứng từ thiên nhiên với hình ảnh lá cọ và dòng chảy của nước làm chủ đạo. Các yếu tố ánh sáng tự nhiên, thông gió và mảng xanh được tối ưu nhằm phát triển theo định hướng nghỉ dưỡng hằng ngày. Phân khu tích hợp hệ tiện ích thủy trị liệu với nước là yếu tố dẫn dắt, mang đến hành trình tái tạo năng lượng.",
      },

      {
        type: "p",
        text: "Hướng Việt Properties cho biết dự án có sự tham gia của nhiều đơn vị tư vấn và thiết kế trong và ngoài nước. Trong đó, DPA đảm nhiệm kiến trúc, Dark Horse phụ trách thiết kế nội thất, LJ-Group tư vấn cảnh quan, Ardor Green tư vấn chứng nhận công trình xanh và Core là đơn vị quản lý dự án.",
      },

      {
        type: "p",
        text: "Phát biểu tại sự kiện, ông Nguyễn Sĩ Toàn, Giám đốc Điều hành Khối Kinh doanh Bất động sản Nhà cao tầng Hướng Việt Properties cho biết Palm River là cột mốc mở đầu cho giai đoạn phát triển mới của Palm City. Cột mốc này không chỉ là việc triển khai một phân khu mà còn thể hiện cam kết dài hạn của doanh nghiệp trong việc phát triển một khu đô thị có quy mô, được đầu tư bài bản và hướng đến giá trị bền vững.",
      },

      {
        type: "p",
        text: "Ông Nguyễn Sĩ Toàn nhấn mạnh: “Chúng tôi tin rằng giá trị của một khu đô thị không nằm ở tốc độ phát triển, mà ở khả năng kiến tạo môi trường sống ngày càng tốt hơn theo thời gian.”",
      },

      {
        type: "img",
        src: n4,
        caption:
          "Ông Nguyễn Sĩ Toàn phát biểu tại lễ khởi động Palm City. Ảnh: Hướng Việt Properties.",
      },

      {
        type: "h2",
        id: "vi-tri-va-tiem-nang",
        text: "Vị trí kết nối và tiềm năng phát triển",
      },

      {
        type: "p",
        text: "Palm City nằm tại phường Bình Trưng, khu vực được đánh giá có lợi thế kết nối với nhiều công trình hạ tầng trọng điểm của TP.HCM và vùng phụ cận.",
      },

      {
        type: "p",
        text: "Khu vực này nằm gần Trung tâm Tài chính Quốc tế Thủ Thiêm, đồng thời kết nối thuận lợi với nút giao An Phú, cao tốc TP.HCM – Long Thành – Dầu Giây, tuyến đường sắt tốc độ cao Bắc – Nam, tuyến Metro Thủ Thiêm – Long Thành theo quy hoạch và sân bay quốc tế Long Thành trong tương lai.",
      },

      {
        type: "p",
        text: "Trong bối cảnh hạ tầng khu Đông tiếp tục được đầu tư, các khu đô thị được quy hoạch đồng bộ cùng hệ tiện ích hoàn chỉnh đang thu hút sự quan tâm của nhóm khách hàng mua ở thực cũng như nhà đầu tư dài hạn.",
      },

      {
        type: "p",
        text: "Được quy hoạch trên diện tích 30,2 ha, Palm City phát triển theo mô hình 'đô thị nghỉ dưỡng giữa lòng thành phố', tích hợp các phân khu nhà ở cao tầng và thấp tầng, thương mại – dịch vụ, trường học quốc tế, bệnh viện quốc tế cùng hệ thống tiện ích cộng đồng. Dự án hướng đến hình thành môi trường sống đồng bộ, đáp ứng nhu cầu ở, học tập, làm việc và sử dụng dịch vụ trong cùng một khu đô thị.",
      },

      {
        type: "img",
        src: n4,
        caption: "Toàn cảnh khu đô thị Palm City.",
      },

      {
        type: "p",
        text: "Theo chủ đầu tư, nhiều hạng mục tại Palm City đã đi vào vận hành như Palm Residence, Palm Heights, hệ thống trường quốc tế và công viên ven sông. Những hạng mục này góp phần hình thành cộng đồng cư dân hiện hữu và tạo nền tảng cho các giai đoạn phát triển tiếp theo của dự án.",
      },

      {
        type: "p",
        text: "Việc triển khai Palm River tiếp tục bổ sung nguồn cung căn hộ cho khu Đông TP.HCM, đồng thời hoàn thiện thêm các chức năng của khu đô thị Palm City trong giai đoạn phát triển mới.",
      },

      {
        type: "source",
        text: "Nguồn: VnExpress",
      },
    ],
  },
  {
    id: "khoi-cong-palm-river",
    tag: "Tin tức",
    date: "06/07/2026",
    title:
      "Về tay đơn vị phát triển mới, Palm City khởi công phân khu Palm River",
    excerpt:
      "Hướng Việt Properties vừa tổ chức khởi công phân khu Palm River vào ngày 16.6, đánh dấu giai đoạn phát triển mới của Palm City, khu đô thị quy mô 30,2 ha tại phường Bình Trưng, TP.HCM.",
    image: n5,
    readingTime: "5 phút đọc",

    content: [
      {
        type: "p",
        text: "(ĐTCK) Cùng với những chuyển động mới về hạ tầng tại khu Đông TP.HCM, Palm City cũng bước vào giai đoạn phát triển mới với việc khởi công phân khu Palm River. Cột mốc này không chỉ khẳng định tiến độ triển khai, mà còn góp phần đưa Palm City trở thành một cực tăng trưởng mới của thị trường bất động sản.",
      },

      {
        type: "h2",
        id: "dong-luc-tang-truong",
        text: "Khu Đông TP.HCM đón thêm động lực tăng trưởng mới",
      },

      {
        type: "p",
        text: "Công ty TNHH Nam Rạch Chiếc cùng Hướng Việt Properties vừa tổ chức lễ khởi động Khu đô thị Palm City và chính thức triển khai phân khu Palm River. Sự kiện này đánh dấu giai đoạn phát triển mới của khu đô thị quy mô 30,2 ha tại phường Bình Trưng (Quận 2 cũ), TP.HCM.",
      },

      {
        type: "p",
        text: "Sự kiện khởi công phân khu Palm River diễn ra trong bối cảnh khu Đông TP.HCM liên tiếp đón nhận các diễn biến mới về hạ tầng. Trong đó, nút giao An Phú và việc mở rộng đường dẫn vào cao tốc TP.HCM – Long Thành – Dầu Giây đang dần hoàn thiện, góp phần nâng cao khả năng kết nối giữa khu Đông với sân bay quốc tế Long Thành.",
      },

      {
        type: "p",
        text: "Đặc biệt, vào cuối tháng 4 vừa qua, TP.HCM đã khởi công hàng loạt dự án quan trọng tại Khu đô thị Thủ Thiêm như Trung tâm Chính trị – Hành chính mới và tuyến metro Bến Thành – Thủ Thiêm. Dự kiến ngày 2/7, tuyến metro Thủ Thiêm – Long Thành tiếp tục được khởi công, góp phần hoàn thiện mạng lưới giao thông khu vực phía Đông.",
      },

      {
        type: "img",
        src: n5,
        caption:
          "Lễ khởi động Palm City, chính thức khởi công phân khu Palm River.",
      },

      {
        type: "p",
        text: "Trong bối cảnh hàng loạt dự án hạ tầng trọng điểm đang được triển khai, Palm City nổi bật nhờ vị trí tại phường Bình Trưng – cửa ngõ kết nối trực tiếp với Thủ Thiêm, Nam Rạch Chiếc và cao tốc TP.HCM – Long Thành – Dầu Giây. Dự án được quy hoạch trên quỹ đất hơn 30 ha theo mô hình đô thị tích hợp, bao gồm nhà ở, thương mại – dịch vụ, giáo dục, y tế cùng hệ thống tiện ích cộng đồng, hướng đến hình thành một 'đô thị nghỉ dưỡng giữa lòng thành phố'.",
      },

      {
        type: "p",
        text: "Khi hạ tầng ngày càng hoàn thiện và khả năng kết nối được nâng cao, các khu đô thị được quy hoạch bài bản như Palm City với hệ thống tiện ích đồng bộ và không gian sống chất lượng đang trở thành lựa chọn được nhiều người mua nhà quan tâm.",
      },

      {
        type: "h2",
        id: "chu-ky-moi",
        text: "Palm River mở đầu chu kỳ phát triển mới của Palm City",
      },

      {
        type: "p",
        text: "Sau nhiều năm hình thành cộng đồng cư dân và đưa vào vận hành các hạng mục như Palm Residence, Palm Heights, trường học quốc tế và công viên ven sông, Palm City đang bước sang giai đoạn phát triển mới với việc khởi công phân khu Palm River. Phân khu này sẽ cung cấp đa dạng loại hình sản phẩm với diện tích từ 34,8 m² đến hơn 300 m² và dự kiến ra mắt thị trường trong năm 2026.",
      },

      {
        type: "p",
        text: "Tọa lạc bên dòng sông Giồng Ông Tố, Palm River được thiết kế lấy cảm hứng từ thiên nhiên với hình ảnh lá cọ và dòng chảy của nước làm chủ đạo. Hệ thống tiện ích được phát triển xoay quanh mặt nước, kết hợp các khu vực thư giãn, chăm sóc sức khỏe và tái tạo năng lượng nhằm mang đến trải nghiệm sống cân bằng giữa đô thị và thiên nhiên.",
      },

      {
        type: "p",
        text: "Để hiện thực hóa định hướng phát triển Palm City, Hướng Việt Properties đã hợp tác với nhiều đơn vị tư vấn và thiết kế quốc tế như DPA (Singapore), Dark Horse (Úc), LJ-Group (Brazil), Ardor Green... Sự đồng hành của các đối tác góp phần định hình Palm River theo phong cách nghỉ dưỡng giữa lòng đô thị với kiến trúc, cảnh quan và hệ tiện ích hài hòa cùng không gian xanh và mặt nước.",
      },

      {
        type: "p",
        text: "Việc khởi công Palm River cho thấy sự chuẩn bị bài bản của Hướng Việt Properties từ quy hoạch, chuẩn bị nguồn lực cho đến việc lựa chọn các đối tác tư vấn, thiết kế và quản lý dự án.",
      },

      {
        type: "img",
        src: n5,
        caption:
          "Ông Nguyễn Sĩ Toàn, Giám đốc Điều hành Khối Kinh doanh Bất động sản Nhà cao tầng Hướng Việt Properties chia sẻ định vị Palm River là 'đô thị nghỉ dưỡng giữa lòng thành phố'.",
      },

      {
        type: "p",
        text: "Ông Nguyễn Sĩ Toàn, Giám đốc Điều hành Khối Kinh doanh Bất động sản Nhà cao tầng của Hướng Việt Properties cho biết Palm River là cột mốc mở đầu cho giai đoạn phát triển mới của Palm City. Đây không chỉ là việc triển khai một phân khu mà còn thể hiện cam kết dài hạn của Hướng Việt Properties trong việc phát triển một khu đô thị quy mô lớn, được đầu tư bài bản và hướng đến các giá trị bền vững.",
      },

      {
        type: "p",
        text: "Ông Nguyễn Sĩ Toàn nhấn mạnh: 'Chúng tôi tin rằng giá trị của một khu đô thị không nằm ở tốc độ phát triển, mà ở khả năng kiến tạo môi trường sống ngày càng tốt hơn theo thời gian.'",
      },

      {
        type: "p",
        text: "Trong bối cảnh người mua nhà ngày càng đề cao chất lượng sống và trải nghiệm thực, việc triển khai Palm River không chỉ bổ sung nguồn cung mới cho thị trường mà còn đánh dấu giai đoạn phát triển tiếp theo của Palm City, góp phần hình thành một cực tăng trưởng mới trên thị trường bất động sản TP.HCM.",
      },

      {
        type: "source",
        text: "Nguồn: Minh Trang – Đầu tư Chứng Khoán",
      },
    ],
  },
  {
    id: "khong-gian-song-ven-song",
    tag: "Tin tức",
    date: "06/07/2026",
    title:
      "Palm River: Không gian sống ven sông hiếm hoi đang dần thành hình ở khu Đông TP.HCM",
    excerpt:
      "Palm City chính thức khởi động phân khu Palm River, đánh dấu giai đoạn phát triển mới của khu đô thị ven sông quy mô 30,2 ha tại cửa ngõ phía Đông thành phố.",
    image: n6,
    readingTime: "5 phút đọc",

    content: [
      {
        type: "p",
        text: "Trong bối cảnh khu Đông tiếp tục ghi nhận chuyển động tích cực về nguồn cung nhà ở tại TP.HCM, Palm City chính thức khởi động phân khu Palm River, đánh dấu giai đoạn phát triển mới của khu đô thị ven sông quy mô 30,2 ha đang từng bước hoàn thiện không gian sống và hệ tiện ích tại cửa ngõ phía Đông thành phố.",
      },

      {
        type: "img",
        src: n6,
        caption:
          "Phối cảnh không gian và tiện ích nội khu tại đô thị nghỉ dưỡng giữa lòng thành phố Palm River.",
      },

      {
        type: "h2",
        id: "ha-tang-dong-bo",
        text: "Hạ tầng đồng bộ tạo sức hút cho khu Đông",
      },

      {
        type: "p",
        text: "Thị trường bất động sản TP.HCM đang bước vào giai đoạn chuyển động tích cực, trong đó khu Đông tiếp tục giữ vai trò nổi bật. Theo báo cáo quý I/2026 của Savills, trong tổng số 1.900 căn hộ sơ cấp mới gia nhập thị trường, khu Đông chiếm tới 85%, khẳng định vị thế đầu tàu của thị trường nhà ở.",
      },

      {
        type: "p",
        text: "Giới chuyên gia nhận định sức hút của khu vực đến từ hệ thống hạ tầng ngày càng hoàn thiện. Hàng loạt công trình trọng điểm như nút giao An Phú, cao tốc TP.HCM – Long Thành – Dầu Giây, Vành đai 3, tuyến Metro Thủ Thiêm – Long Thành, đường sắt tốc độ cao Bắc – Nam và sân bay quốc tế Long Thành đang từng bước hình thành một cực tăng trưởng mới phía Đông thành phố.",
      },

      {
        type: "p",
        text: "Bên cạnh lợi thế hạ tầng, xu hướng lựa chọn nhà ở cũng đang thay đổi. Người mua ngày càng quan tâm đến môi trường sống, không gian xanh, tiện ích phục vụ sinh hoạt hằng ngày và chất lượng cộng đồng cư dân. Đây là một trong những lý do các khu đô thị được quy hoạch đồng bộ như Palm City nhận được nhiều sự quan tâm trong giai đoạn hiện nay.",
      },

      {
        type: "h2",
        id: "do-thi-nghi-duong",
        text: "Palm City và câu chuyện của một đô thị nghỉ dưỡng giữa lòng thành phố",
      },

      {
        type: "p",
        text: "Hạ tầng đang tạo nên diện mạo mới cho khu Đông. Tại phường Bình Trưng, một không gian sống ven sông cũng đang dần được hoàn thiện qua từng giai đoạn phát triển của Palm City.",
      },

      {
        type: "p",
        text: "Được quy hoạch trên diện tích 30,2 ha, Palm City phát triển theo định hướng trở thành 'đô thị nghỉ dưỡng giữa lòng thành phố'. Dự án được thiết kế như một hệ sinh thái đô thị tích hợp với nhiều tiện ích phục vụ nhu cầu sống, học tập, làm việc và chăm sóc sức khỏe của cư dân.",
      },

      {
        type: "p",
        text: "Đến nay, Palm City đã hình thành nhiều hạng mục như Palm Residence, Palm Heights, hệ thống trường quốc tế, công viên ven sông và các tiện ích cộng đồng. Những hạng mục này góp phần xây dựng cộng đồng cư dân hiện hữu và tạo nền tảng cho các giai đoạn phát triển tiếp theo.",
      },

      {
        type: "p",
        text: "Ngày 16/6, Công ty TNHH Nam Rạch Chiếc cùng Hướng Việt Properties chính thức khởi công phân khu Palm River, mở đầu giai đoạn phát triển mới của Palm City. Không chỉ bổ sung nguồn cung nhà ở, sự kiện còn đánh dấu bước chuyển trong định hướng phát triển dự án theo mô hình 'đô thị nghỉ dưỡng giữa lòng thành phố', nơi các yếu tố thiên nhiên như mặt nước, công viên ven sông và không gian mở được đưa vào đời sống thường nhật của cư dân.",
      },

      {
        type: "img",
        src: n6,
        caption:
          "Nghi thức xúc cát động thổ, đặt nền móng vững chắc cho phân khu Palm River.",
      },

      {
        type: "p",
        text: "Phát biểu tại sự kiện, ông Nguyễn Sĩ Toàn, Giám đốc Điều hành Khối Kinh doanh Bất động sản Nhà cao tầng Hướng Việt Properties cho biết Palm River là cột mốc mở đầu cho giai đoạn phát triển mới của Palm City. Đây không chỉ là việc triển khai một phân khu mà còn thể hiện cam kết dài hạn trong việc phát triển một khu đô thị quy mô, được đầu tư bài bản và hướng đến giá trị bền vững.",
      },

      {
        type: "p",
        text: "Ông Nguyễn Sĩ Toàn nhấn mạnh: 'Chúng tôi tin rằng giá trị của một khu đô thị không nằm ở tốc độ phát triển, mà ở khả năng kiến tạo môi trường sống ngày càng tốt hơn theo thời gian.'",
      },

      {
        type: "p",
        text: "Là phân khu đầu tiên được triển khai trong giai đoạn mới, Palm River được phát triển trên quỹ đất ven sông với nhiều loại hình sản phẩm có diện tích từ 34,86 m² đến hơn 300 m². Trong bối cảnh quỹ đất ven sông quy mô lớn tại Nam Rạch Chiếc ngày càng khan hiếm, Palm River thừa hưởng lợi thế từ tổng thể Palm City với mặt tiếp giáp sông kéo dài, tạo điều kiện phát triển cảnh quan, công viên ven sông và hệ tiện ích gắn với mặt nước. Dự án dự kiến ra mắt thị trường trong năm 2026.",
      },

      {
        type: "p",
        text: "Theo Hướng Việt Properties, Palm River được thiết kế lấy cảm hứng từ hình ảnh lá cọ và dòng chảy của nước. Các giải pháp kiến trúc tối ưu ánh sáng tự nhiên, thông gió và mảng xanh nhằm mang đến trải nghiệm sống gần gũi thiên nhiên. Dự án còn tích hợp hệ tiện ích thủy trị liệu lấy nước làm yếu tố trung tâm, hướng đến không gian thư giãn, tái tạo năng lượng và phục hồi thể chất sau nhịp sống đô thị.",
      },

      {
        type: "img",
        src: n6,
        caption:
          "Palm River được thiết kế với cảm hứng từ hình ảnh lá cọ và dòng chảy của nước.",
      },

      {
        type: "p",
        text: "Không chỉ hướng đến nhu cầu an cư, Palm River còn được kỳ vọng góp phần định hình phong cách sống cân bằng giữa đô thị hiện đại và thiên nhiên, yếu tố ngày càng được người mua nhà xem là một phần quan trọng của giá trị sống lâu dài.",
      },

      {
        type: "source",
        text: "Nguồn: Thanh Niên",
      },
    ],
  },
  {
    id: "them-chuyen-dong-moi",
    tag: "Sự kiện",
    date: "27/06/2026",
    title:
      "Thêm chuyển động mới tại khu Đông TP.HCM: Palm City triển khai phân khu Palm River",
    excerpt:
      "Palm River khởi công tại phường Bình Trưng, đánh dấu giai đoạn phát triển mới của Palm City, khu đô thị ven sông quy mô 30,2 ha.",
    image: n7,
    readingTime: "5 phút đọc",

    content: [
      {
        type: "p",
        text: "Palm River chính thức khởi công tại phường Bình Trưng, đánh dấu giai đoạn phát triển mới của Palm City – khu đô thị ven sông quy mô 30,2 ha.",
      },

      {
        type: "img",
        src: n7,
        caption:
          "Lễ khởi động Palm City, chính thức khởi công phân khu Palm River.",
      },

      {
        type: "h2",
        id: "palm-city-bo-sung-manh-ghep-moi",
        text: "Palm City bổ sung mảnh ghép mới",
      },

      {
        type: "p",
        text: "Ngày 16/6, Công ty TNHH Nam Rạch Chiếc cùng Hướng Việt Properties tổ chức lễ khởi động Palm City, đồng thời chính thức triển khai phân khu Palm River.",
      },

      {
        type: "p",
        text: "Palm River là phân khu đầu tiên được triển khai trong giai đoạn phát triển mới của Palm City. Việc khởi công phân khu này góp phần hoàn thiện bức tranh tổng thể của khu đô thị, đồng thời bổ sung thêm một mảnh ghép quan trọng trong lộ trình phát triển dự án.",
      },

      {
        type: "p",
        text: "Được quy hoạch trên diện tích 30,2 ha, Palm City phát triển theo mô hình khu đô thị tích hợp với các chức năng nhà ở, thương mại – dịch vụ, giáo dục, chăm sóc sức khỏe và không gian công cộng. Dự án hướng đến mô hình 'đô thị nghỉ dưỡng giữa lòng thành phố', nơi thiên nhiên, mặt nước và không gian mở trở thành một phần của trải nghiệm sống hằng ngày.",
      },

      {
        type: "p",
        text: "Đến nay, nhiều hạng mục đã đi vào vận hành như Palm Residence, Palm Heights, hệ thống trường quốc tế và công viên ven sông, góp phần hình thành cộng đồng cư dân hiện hữu tại Palm City.",
      },

      {
        type: "img",
        src: n7,
        caption:
          "Phối cảnh không gian và tiện ích nội khu tại đô thị nghỉ dưỡng giữa lòng thành phố Palm River.",
      },

      {
        type: "p",
        text: "Theo Hướng Việt Properties, Palm River sở hữu vị trí ven sông, cung cấp đa dạng loại hình sản phẩm với diện tích từ 34,86 m² đến hơn 300 m² và dự kiến được giới thiệu ra thị trường trong năm 2026.",
      },

      {
        type: "p",
        text: "Phân khu được phát triển theo định hướng không gian sống gắn với thiên nhiên, trong đó yếu tố mặt nước, cảnh quan và không gian mở được tích hợp trong tổng thể thiết kế. Các giải pháp tối ưu ánh sáng tự nhiên, thông gió và mảng xanh được chú trọng nhằm nâng cao chất lượng môi trường sống.",
      },

      {
        type: "p",
        text: "Trong quá trình triển khai, Hướng Việt Properties hợp tác cùng nhiều đơn vị tư vấn và thiết kế quốc tế như DPA, Dark Horse, LJ-Group, Ardor Green và Core trong các lĩnh vực kiến trúc, nội thất, cảnh quan, công trình xanh và quản lý dự án.",
      },

      {
        type: "p",
        text: "Ông Nguyễn Sĩ Toàn, Giám đốc Điều hành Khối Kinh doanh Bất động sản Nhà cao tầng Hướng Việt Properties cho biết Palm River là cột mốc mở đầu cho giai đoạn phát triển mới của Palm City, thể hiện cam kết đầu tư bài bản, dài hạn và hướng đến giá trị bền vững.",
      },

      {
        type: "img",
        src: n7,
        caption:
          "Ông Nguyễn Sĩ Toàn nhấn mạnh sự chuẩn bị kỹ lưỡng và định hướng phát triển bền vững của Palm River.",
      },

      {
        type: "h2",
        id: "nam-rach-chiec-trong-nhip-phat-trien",
        text: "Nam Rạch Chiếc trong nhịp phát triển của khu Đông",
      },

      {
        type: "p",
        text: "Palm River được triển khai trong bối cảnh khu Đông TP.HCM ghi nhận nhiều chuyển động mới về hạ tầng và phát triển đô thị.",
      },

      {
        type: "p",
        text: "Nhiều công trình trọng điểm như nút giao An Phú, cao tốc TP.HCM – Long Thành – Dầu Giây và Vành đai 3 đang được đẩy nhanh tiến độ. Đồng thời, các định hướng phát triển dài hạn như tuyến Metro Thủ Thiêm – Long Thành, đường sắt cao tốc Bắc – Nam, Trung tâm Tài chính Quốc tế Thủ Thiêm và sân bay quốc tế Long Thành tiếp tục mở rộng khả năng kết nối của khu vực.",
      },

      {
        type: "p",
        text: "Theo Savills Việt Nam, lợi thế cạnh tranh của các đô thị hiện đại không chỉ nằm ở kết nối giao thông mà còn ở khả năng hình thành các 'điểm đến' thu hút cư dân, thương mại và trải nghiệm đô thị. Xu hướng phát triển đô thị theo định hướng giao thông công cộng (TOD) đang mở ra nhiều cơ hội cho các khu vực có hạ tầng ngày càng hoàn thiện.",
      },

      {
        type: "img",
        src: n7,
        caption:
          "Toàn cảnh dự án Palm City nhìn từ trên cao, thể hiện quy mô và quy hoạch đồng bộ.",
      },

      {
        type: "p",
        text: "Nam Rạch Chiếc là một trong những khu vực đang hưởng lợi từ quá trình phát triển đó. Với vị trí liền kề Thủ Thiêm và khả năng kết nối thuận tiện với trung tâm thành phố, khu vực này đang dần hoàn thiện hạ tầng và thu hút thêm nhiều dự án quy mô lớn.",
      },

      {
        type: "p",
        text: "Tọa lạc tại trung tâm Nam Rạch Chiếc, Palm City đang bước vào giai đoạn phát triển tiếp theo. Sau các phân khu đã đi vào vận hành và hình thành cộng đồng cư dân hiện hữu, Palm River trở thành phân khu đầu tiên được triển khai trong chu kỳ phát triển mới của khu đô thị.",
      },

      {
        type: "p",
        text: "Từ các công trình hạ tầng đang được xây dựng đến những phân khu mới được triển khai, Nam Rạch Chiếc đang ghi nhận nhiều chuyển động tích cực trong quá trình phát triển đô thị. Palm River là một trong những dấu mốc nổi bật của tiến trình này.",
      },

      {
        type: "source",
        text: "Nguồn: Thanh Mẫn – Báo Lao Động",
      },
    ],
  },
  {
    id: "cuc-tang-truong-moi",
    tag: "Sự kiện",
    date: "26/06/2026",
    title:
      "Palm City khởi công Palm River, cực tăng trưởng mới của thị trường dần lộ diện",
    excerpt:
      "Cùng với những chuyển động mới về hạ tầng tại khu Đông TP.HCM, Palm City bước vào giai đoạn phát triển mới với việc khởi công phân khu Palm River.",
    image: n8,
    readingTime: "4 phút đọc",

    content: [
      {
        type: "p",
        text: "Cùng với những chuyển động mới về hạ tầng tại khu Đông TP.HCM, Palm City bước vào giai đoạn phát triển mới với việc khởi công phân khu Palm River. Cột mốc này không chỉ khẳng định tiến độ triển khai mà còn góp phần đưa Palm City trở thành một cực tăng trưởng mới của thị trường bất động sản.",
      },

      {
        type: "h2",
        id: "khu-dong-tang-truong",
        text: "Khu Đông TP.HCM đón thêm động lực tăng trưởng mới",
      },

      {
        type: "p",
        text: "Công ty TNHH Nam Rạch Chiếc cùng Hướng Việt Properties vừa tổ chức lễ khởi động Khu đô thị Palm City và chính thức triển khai phân khu Palm River. Sự kiện đánh dấu giai đoạn phát triển mới của khu đô thị quy mô 30,2 ha tại phường Bình Trưng (Quận 2 cũ), TP.HCM.",
      },

      {
        type: "p",
        text: "Sự kiện khởi công Palm River diễn ra trong bối cảnh khu Đông TP.HCM liên tục đón nhận nhiều chuyển động mới về hạ tầng. Các dự án như nút giao An Phú và mở rộng đường dẫn vào cao tốc TP.HCM – Long Thành – Dầu Giây đang hoàn thiện, góp phần nâng cao khả năng kết nối với sân bay quốc tế Long Thành.",
      },

      {
        type: "p",
        text: "Bên cạnh đó, TP.HCM cũng đang triển khai nhiều dự án trọng điểm tại Khu đô thị Thủ Thiêm như Trung tâm Chính trị – Hành chính mới, tuyến Metro Bến Thành – Thủ Thiêm và chuẩn bị khởi công tuyến Metro Thủ Thiêm – Long Thành, tiếp tục hoàn thiện mạng lưới giao thông khu vực phía Đông.",
      },

      {
        type: "img",
        src: n8,
        caption:
          "Lễ khởi động Palm City, chính thức khởi công phân khu Palm River.",
      },

      {
        type: "p",
        text: "Trong bối cảnh hàng loạt dự án hạ tầng trọng điểm được triển khai, Palm City nổi bật nhờ vị trí tại phường Bình Trưng, cửa ngõ kết nối trực tiếp với Thủ Thiêm, Nam Rạch Chiếc và cao tốc TP.HCM – Long Thành – Dầu Giây. Dự án được quy hoạch trên quỹ đất hơn 30 ha theo mô hình đô thị tích hợp gồm nhà ở, thương mại – dịch vụ, giáo dục, y tế và hệ thống tiện ích cộng đồng, hướng đến hình thành 'đô thị nghỉ dưỡng giữa lòng thành phố'.",
      },

      {
        type: "p",
        text: "Khi hạ tầng ngày càng hoàn thiện và khả năng kết nối được nâng cao, các khu đô thị được quy hoạch bài bản như Palm City, với hệ tiện ích đồng bộ và không gian sống chất lượng, đang trở thành lựa chọn được nhiều khách hàng ưu tiên.",
      },

      {
        type: "h2",
        id: "palm-river-giai-doan-moi",
        text: "Palm River mở đầu chu kỳ phát triển mới của Palm City",
      },

      {
        type: "p",
        text: "Sau nhiều năm hình thành cộng đồng cư dân và đưa vào vận hành các hạng mục như Palm Residence, Palm Heights, trường học quốc tế và công viên ven sông, Palm City chính thức bước sang giai đoạn phát triển mới với việc khởi công phân khu Palm River. Phân khu cung cấp đa dạng loại hình sản phẩm có diện tích từ 34,8 m² đến hơn 300 m² và dự kiến ra mắt thị trường trong năm 2026.",
      },

      {
        type: "p",
        text: "Tọa lạc bên dòng sông Giồng Ông Tố, Palm River được thiết kế lấy cảm hứng từ thiên nhiên với hình ảnh lá cọ và dòng chảy của nước. Hệ thống tiện ích xoay quanh yếu tố nước kết hợp các khu vực thư giãn, chăm sóc sức khỏe và tái tạo năng lượng, hướng đến trải nghiệm sống cân bằng giữa đô thị và thiên nhiên.",
      },

      {
        type: "p",
        text: "Để hiện thực hóa định hướng phát triển Palm City, Hướng Việt Properties hợp tác với nhiều đơn vị tư vấn và thiết kế quốc tế như DPA (Singapore), Dark Horse (Úc), LJ-Group (Brazil) và Ardor Green. Sự đồng hành của các đối tác góp phần định hình bản sắc riêng cho Palm River theo phong cách nghỉ dưỡng giữa lòng đô thị.",
      },

      {
        type: "p",
        text: "Việc khởi công Palm River cho thấy sự chuẩn bị bài bản của Hướng Việt Properties từ quy hoạch, chuẩn bị nguồn lực đến lựa chọn các đơn vị tư vấn, thiết kế và quản lý dự án.",
      },

      {
        type: "img",
        src: n8,
        caption:
          "Ông Nguyễn Sĩ Toàn chia sẻ định hướng phát triển Palm River tại lễ khởi công.",
      },

      {
        type: "p",
        text: "Ông Nguyễn Sĩ Toàn, Giám đốc Điều hành Khối Kinh doanh Bất động sản Nhà cao tầng Hướng Việt Properties cho biết Palm River là cột mốc mở đầu cho giai đoạn phát triển mới của Palm City. Đây không chỉ là việc triển khai một phân khu mà còn thể hiện cam kết dài hạn trong việc phát triển một khu đô thị quy mô, được đầu tư bài bản và hướng đến giá trị bền vững.",
      },

      {
        type: "p",
        text: "Ông Nguyễn Sĩ Toàn nhấn mạnh: 'Chúng tôi tin rằng giá trị của một khu đô thị không nằm ở tốc độ phát triển, mà ở khả năng kiến tạo môi trường sống ngày càng tốt hơn theo thời gian.'",
      },

      {
        type: "p",
        text: "Trong bối cảnh người mua nhà ngày càng đề cao chất lượng sống và trải nghiệm thực, việc triển khai Palm River không chỉ bổ sung nguồn cung mới cho thị trường mà còn đánh dấu giai đoạn phát triển tiếp theo của Palm City, góp phần hình thành một cực tăng trưởng mới của thị trường bất động sản TP.HCM.",
      },

      {
        type: "source",
        text: "Nguồn: Minh Trang – Đầu tư Chứng Khoán",
      },
    ],
  },
  {
    id: "mot-trong-nhung-quy-dat-ven-song",
    tag: "Tin tức",
    date: "19/06/2026",
    title:
      "Một trong những quỹ đất ven sông lớn hiếm hoi gần Thủ Thiêm bắt đầu chuyển động trở lại",
    excerpt: "Nguồn: Ánh Dương - Cafe F",
    image: n9,
    content: [
      {
        type: "p",
        text: "Sau nhiều năm được nhắc đến với các phân khu đã bàn giao, Palm City bất ngờ xuất hiện trở lại trên bản đồ bất động sản TP.HCM khi Hướng Việt Properties chính thức khởi động giai đoạn phát triển mới và triển khai phân khu Palm River.",
      },
      {
        type: "img",
        src: "https://palm-city.com.vn/wp-content/uploads/2026/07/Tong-the-palm-river-nhin-tu-tren-cao.jpg.webp",
        alt: "Tổng thể Palm River nhìn từ trên cao",
      },
      {
        type: "p",
        text: "Động thái này diễn ra khi khu Đông TP.HCM đang tăng tốc nhờ cú hích từ hạ tầng và quy hoạch đô thị, và thị trường bắt đầu chứng kiến sự trở lại của những dự án quy mô lớn sở hữu quỹ đất đã được tích lũy từ nhiều năm trước.",
      },
      {
        type: "h2",
        text: "Khi những “dự án lớn ngủ quên” bắt đầu thức giấc",
      },
      {
        type: "p",
        text: "Thời gian gần đây, thị trường bất động sản TP.HCM có hiện tượng đáng chú ý, thay vì công bố nhiều dự án hoàn toàn mới, nhiều doanh nghiệp lựa chọn tái khởi động những quỹ đất đã được chuẩn bị từ nhiều năm trước.",
      },
      {
        type: "p",
        text: "Trong bối cảnh khu vực phía Đông đang đón thêm các cú hích hạ tầng, từ việc hoàn thiện nút giao An Phú, đẩy nhanh tiến độ các tuyến vành đai, cao tốc kết nối vùng cho đến thông tin về tuyến Metro kết nối khu Đông với sân bay Long Thành trong tương lai, toàn bộ khu vực từ Thủ Thiêm đến Nam Rạch Chiếc đang phát triển mạnh mẽ.",
      },
      {
        type: "p",
        text: "Đây là thời điểm các chủ đầu tư nhìn thấy cơ hội khai thác giá trị từ quỹ đất. Palm City là một dự án đáng chú ý trong bức tranh đó với vị trí nằm tại phường Bình Trưng (Quận 2 cũ), dự án sở hữu quy mô 30,2 ha liền kề Trung tâm tài chính quốc tế Thủ Thiêm và Trung tâm Thể thao Nam Rạch Chiếc.",
      },
      {
        type: "img",
        src: "https://palm-city.com.vn/wp-content/uploads/2026/07/toan-canh-du-an-palm-city-tu-tren-cao.jpg.webp",
        alt: "Phối cảnh dự án Palm City",
        caption: "Palm City là một dự án đáng chú ý nằm tại phường Bình Trưng.",
      },
      {
        type: "p",
        text: "Trong nhiều năm qua, một số phân khu như Palm Residence, Palm Heights cùng hệ thống trường học, công viên và một phần hạ tầng nội khu đã hình thành cộng đồng cư dân hiện hữu và phần lớn quỹ đất phát triển còn lại của dự án vẫn chưa được khai thác đồng bộ.",
      },
      {
        type: "p",
        text: "Việc Hướng Việt Properties chính thức khởi động Palm City và khởi công phân khu cao tầng mới Palm River cho thấy dự án bước sang một giai đoạn phát triển mới thay vì chỉ dừng lại ở các phân khu riêng lẻ như trước đây.",
      },
      {
        type: "h2",
        text: "Palm River – tín hiệu cho thấy Palm City thực sự quay lại",
      },
      {
        type: "p",
        text: "Trong bối cảnh không ít dự án công bố kế hoạch nhưng chưa thể triển khai thực tế, việc Palm River khởi công ngay trong tháng 6 được xem là tín hiệu quan trọng đối với dự án.",
      },
      {
        type: "p",
        text: "Palm River là phân khu đầu tiên được triển khai trong giai đoạn phát triển mới của Palm City. Khi một phân khu được đưa vào thi công, điều đó đồng nghĩa hệ thống quy hoạch, vận hành và chiến lược phát triển tổng thể đang được kích hoạt trở lại.",
      },
      {
        type: "p",
        text: "Dự án nằm ngay trung tâm Nam Rạch Chiếc, khu vực được xem là điểm giao giữa Thủ Thiêm, cao tốc TP.HCM – Long Thành – Dầu Giây và các trục kết nối về sân bay Long Thành trong tương lai.",
      },
      {
        type: "p",
        text: "Bên cạnh đó, khu vực còn hưởng lợi từ hệ sinh thái tiện ích đã hình thành gồm các trường học, bệnh viện và các trung tâm dịch vụ quy mô lớn của TP.HCM.",
      },
      {
        type: "h2",
        text: "Kiến tạo chuẩn sống ven sông giữa trung tâm đô thị",
      },
      {
        type: "p",
        text: "Điểm khác biệt mà Hướng Việt Properties đang theo đuổi là định vị Palm City theo mô hình đô thị nghỉ dưỡng giữa lòng thành phố chú trọng trải nghiệm sống, nơi cư dân có thể tận hưởng không gian gần gũi thiên nhiên.",
      },
      {
        type: "p",
        text: "Trong đó, Palm River sở hữu vị trí ven sông hiếm hoi tại Nam Rạch Chiếc. Trên thiết kế, dự án khai thác hình ảnh lá cọ và dòng chảy của nước như nguồn cảm hứng chủ đạo, đưa thiên nhiên trở thành một phần của không gian sống. Các tòa nhà được nghiên cứu để tối ưu khả năng đón gió và ánh sáng tự nhiên, đồng thời mở rộng tầm nhìn hướng sông và mảng xanh nội khu.",
      },
      {
        type: "img",
        src: "https://palm-city.com.vn/wp-content/uploads/2026/07/Furture-Upscale_this_architectural_vis_GPT_Image_2_43103.jpg.webp",
        alt: "Palm River là phân khu đầu tiên được triển khai trong giai đoạn phát triển mới của Palm City",
        caption:
          "Palm River là phân khu đầu tiên được triển khai trong giai đoạn phát triển mới của Palm City.",
      },
      {
        type: "p",
        text: "Thực tế, không nhiều dự án tại TP.HCM còn sở hữu đồng thời quỹ đất quy mô lớn, vị trí kết nối thuận tiện và điều kiện tự nhiên phù hợp để phát triển theo định hướng này. Đây cũng là lý do các khu đô thị ven sông ngày càng được quan tâm khi người mua nhà không chỉ tìm kiếm nơi an cư mà còn hướng đến chất lượng sống lâu dài.",
      },
      {
        type: "p",
        text: "Việc phát triển Palm River cho thấy Hướng Việt Properties đang lựa chọn cách tiếp cận khác biệt trong giai đoạn mới của Palm City là tập trung vào việc kiến tạo môi trường sống, phát triển hệ sinh thái đô thị hoàn chỉnh và khai thác các giá trị tự nhiên sẵn có của khu đất.",
      },
      {
        type: "p",
        text: "Và trong bối cảnh khu Đông TP.HCM bước vào chu kỳ phát triển mới, câu hỏi thị trường đặt ra không phải là Palm City có được triển khai hay không, mà là dự án sẽ định hình diện mạo mới cho khu vực Nam Rạch Chiếc như thế nào trong những năm tới.",
      },
    ],
  },
];

/* ------------------------------ Ảnh banner -------------------------------
 * Ảnh banner (khổ ngang, dùng cho đầu trang chi tiết) được đặt riêng trong
 * src/assets/images/news/banner/, TÊN FILE PHẢI TRÙNG với id của bài viết,
 * ví dụ: banner/xu-huong-do-thi-duong.webp
 *
 * Dùng import.meta.glob để tự động nạp toàn bộ ảnh trong thư mục này 1 lần
 * -> thêm bài mới chỉ cần thả ảnh vào đúng tên, KHÔNG cần sửa code ở đây.
 * Bài nào chưa có banner riêng sẽ tự fallback về ảnh thumbnail (image).
 * -------------------------------------------------------------------------- */
const bannerModules = import.meta.glob(
  "../assets/images/news/banner/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

const BANNERS = Object.fromEntries(
  Object.entries(bannerModules).map(([path, mod]) => {
    const fileName = path
      .split("/")
      .pop()
      .replace(/\.[^.]+$/, "");
    return [fileName, mod.default];
  }),
);

/** Lấy ảnh banner của 1 bài viết. Tự fallback về ảnh thumbnail nếu chưa có banner riêng. */
export function getBanner(id) {
  return BANNERS[id] || getArticleById(id)?.image || null;
}

/* --------------------------- Helpers dùng chung -------------------------- */

/** Đường dẫn nội bộ tới trang chi tiết 1 bài viết. Luôn dùng hàm này thay vì hard-code. */
export function getHref(id) {
  return `/tin-tuc/${id}`;
}

/** Lấy 1 bài viết theo id, dùng cho NewsDetailPage. */
export function getArticleById(id) {
  return NEWS_ARTICLES.find((a) => a.id === id) || null;
}

/** Bài mới nhất, dùng làm "Tin mới nhất" ở NewsPage. */
export function getFeatured() {
  return NEWS_ARTICLES[0];
}

/** Danh sách "Điểm nổi bật" — loại trừ bài đang xem. */
export function getHighlights(excludeId, count = 2) {
  return NEWS_ARTICLES.filter((a) => a.id !== excludeId).slice(0, count);
}

/** Danh sách "Bài viết liên quan" — loại trừ bài đang xem. */
export function getRelated(excludeId, count = 2) {
  return NEWS_ARTICLES.filter((a) => a.id !== excludeId).slice(0, count);
}

/** Thông tin footer dùng chung cho các trang trong khu vực tin tức. */
export const SITE_INFO = {
  tagline:
    "Không chỉ là nơi để ở, Palm City là nơi mọi giá trị sống được cân bằng trọn vẹn – một Đô thị nghỉ dưỡng giữa lòng thành phố.",
  address: "Đường Song Hành, P. Bình Trưng (Quận 2 cũ), TP.HCM",
  phone: "(+84) 96 69 090 86",
  email: "sales@palm-city.com.vn",
  copyright: "Copyright © 2026 by Palm City. All rights reserved.",
};

export default NEWS_ARTICLES;
