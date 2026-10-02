import { Quest } from '../types/math';

export const QUESTS: Quest[] = [
  // --- 1. SỐ THẬP PHÂN & ĐO LƯỜNG ---
  {
    id: 'dec-1',
    topicId: 'decimals',
    topicName: 'Số Thập Phân & Đo Lường',
    title: 'Phòng Thí Nghiệm Pha Chế Nước Táo Tự Nhiên',
    level: 'seed',
    scenario: 'Tại lớp học Khoa học STEM, bạn Nam cần pha 1 bình nước ép táo dung tích 1.5 lít. Bình hiện tại đã có 0.65 lít nước táo nguyên chất.',
    question: 'Bạn Nam cần đổ thêm bao nhiêu lít nước lọc tinh khiết để vừa đầy bình 1.5 lít?',
    questionType: 'numeric_input',
    correctNumericValue: 0.85,
    unit: 'lít',
    tolerance: 0.01,
    hint: 'Hãy nhớ quy tắc đặt tính trừ số thập phân: thẳng hàng dấu phẩy. Bạn có thể coi 1.5 chính là 1.50!',
    explanation: {
      coreConcept: 'Trừ số thập phân có chữ số phần thập phân khác nhau.',
      stepByStep: [
        'Bước 1: Thêm số 0 vào bên phải phần thập phân để hai số có cùng số chữ số thập phân: 1.5 = 1.50',
        'Bước 2: Đặt tính thẳng cột dấu phẩy: 1.50 - 0.65',
        'Bước 3: Thực hiện phép trừ: 1.50 - 0.65 = 0.85 (lít)'
      ],
      formulaUsed: 'Lượng cần thêm = Tổng dung tích - Lượng đã có',
      realWorldConnection: 'Đo lường thể tích chính xác là chìa khóa trong nấu ăn, pha chế đồ uống và các thí nghiệm khoa học thực tế!'
    },
    rewardStars: 10
  },
  {
    id: 'dec-2',
    topicId: 'decimals',
    topicName: 'Số Thập Phân & Đo Lường',
    title: 'Cân Trái Cây Hội Chợ Nông Sản Sạch',
    level: 'rocket',
    scenario: 'Hội chợ nông sản sạch của trường Dewey bán cam sành với giá 42,000 đồng/kg. Giỏ cam của bạn Mai cân nặng 2.75 kg.',
    question: 'Hỏi bạn Mai cần trả bác nông dân bao nhiêu tiền cho giỏ cam này?',
    questionType: 'numeric_input',
    correctNumericValue: 115500,
    unit: 'đồng',
    hint: 'Nhân số tự nhiên với số thập phân: lấy 42,000 nhân với 2.75. Bạn có thể nhẩm: 42,000 x 2 = 84,000, 42,000 x 0.75 = 31,500.',
    explanation: {
      coreConcept: 'Nhân số tiền với khối lượng là số thập phân.',
      stepByStep: [
        'Bước 1: Tính số tiền = Giá tiền 1 kg × Số kg = 42,000 × 2.75',
        'Bước 2: 42,000 × 2 = 84,000 đồng',
        'Bước 3: 42,000 × 0.75 = 42,000 × 3/4 = 31,500 đồng',
        'Bước 4: Tổng cộng = 84,000 + 31,500 = 115,500 đồng'
      ],
      formulaUsed: 'Số tiền = Đơn giá × Khối lượng',
      realWorldConnection: 'Khi đi siêu thị hay chợ, các loại cân điện tử luôn hiển thị số thập phân (như 2.75 kg). Khả năng tính nhanh giúp bạn luôn là người mua sắm thông thái!'
    },
    rewardStars: 15
  },
  {
    id: 'dec-3',
    topicId: 'decimals',
    topicName: 'Số Thập Phân & Đo Lường',
    title: 'Thử Thách: Cuộn Dây Ruy Băng Trang Trí Lễ Hội',
    level: 'diamond',
    scenario: 'Một cuộn dây ruy băng dài 18.4 m. Bạn An muốn cắt thành các đoạn dây ngắn, mỗi đoạn dài 0.8 m để gói quà cho các bạn có hoàn cảnh khó khăn.',
    question: 'Hỏi bạn An cắt được nhiều nhất bao nhiêu đoạn dây quà và còn thừa lại bao nhiêu mét dây ruy băng?',
    questionType: 'multiple_choice',
    options: [
      { id: 'a', text: '23 đoạn, không thừa mét nào', isCorrect: true },
      { id: 'b', text: '22 đoạn, thừa 0.8 m', isCorrect: false },
      { id: 'c', text: '24 đoạn, thừa 0.2 m', isCorrect: false },
      { id: 'd', text: '23 đoạn, thừa 0.4 m', isCorrect: false }
    ],
    hint: 'Lấy tổng chiều dài chia cho độ dài mỗi đoạn: 18.4 ÷ 0.8. Đưa về phép chia hai số tự nhiên bằng cách nhân cả hai với 10!',
    explanation: {
      coreConcept: 'Chia một số thập phân cho một số thập phân (dời dấu phẩy).',
      stepByStep: [
        'Bước 1: Vì số chia 0.8 có 1 chữ số ở phần thập phân, ta chuyển dấu phẩy ở cả hai số sang phải 1 chữ số.',
        'Bước 2: Ta có phép chia: 184 ÷ 8',
        'Bước 3: 184 ÷ 8 = 23 (không dư)',
        'Kết luận: Bạn An cắt được chính xác 23 đoạn và ruy băng vừa khít, không thừa mét nào!'
      ],
      formulaUsed: 'Số đoạn = Chiều dài cuộn ÷ Chiều dài mỗi đoạn',
      realWorldConnection: 'Tính toán phân chia vật liệu trong may mặc, thủ công và sản xuất giúp tránh lãng phí tài nguyên và tiết kiệm chi phí tối đa.'
    },
    rewardStars: 20
  },

  // --- 2. TỈ SỐ PHẦN TRĂM & TÀI CHÍNH THỰC TẾ ---
  {
    id: 'pct-1',
    topicId: 'percentages',
    topicName: 'Tỉ Số Phần Trăm',
    title: 'Hội Sách Khuyến Mãi Mùa Hè',
    level: 'seed',
    scenario: 'Một cuốn bách khoa toàn thư khám phá vũ trụ có giá bìa là 150,000 đồng. Nhân ngày Đọc sách, nhà sách giảm giá 20% cho cuốn sách này.',
    question: 'Hỏi bạn được giảm giá bao nhiêu tiền?',
    questionType: 'numeric_input',
    correctNumericValue: 30000,
    unit: 'đồng',
    hint: 'Giảm 20% nghĩa là cứ 100 đồng thì được bớt 20 đồng. Ta lấy 150,000 nhân với 20 rồi chia cho 100 (hoặc nhân với 0.2).',
    explanation: {
      coreConcept: 'Tìm giá trị phần trăm của một số.',
      stepByStep: [
        'Bước 1: Bản chất 20% chính là phân số 20/100 hay số thập phân 0.2',
        'Bước 2: Số tiền được giảm = 150,000 × 20 ÷ 100 = 30,000 đồng',
        'Mở rộng: Nếu muốn tính số tiền phải trả, lấy 150,000 - 30,000 = 120,000 đồng'
      ],
      formulaUsed: 'Số tiền giảm = Giá niêm yết × % giảm ÷ 100',
      realWorldConnection: 'Hiểu tỉ số phần trăm giúp bạn phân biệt rõ số tiền thực tế được giảm giá khi cùng gia đình đi mua sắm.'
    },
    rewardStars: 10
  },
  {
    id: 'pct-2',
    topicId: 'percentages',
    topicName: 'Tỉ Số Phần Trăm',
    title: 'Tỉ Lệ Nảy Mầm Của Vườn Rau Trường Học',
    level: 'rocket',
    scenario: 'Câu lạc bộ Môi trường gieo 250 hạt giống xà lách sạch vào các khay ươm. Sau một tuần quan sát, các bạn đếm được có 235 hạt nảy mầm khỏe mạnh.',
    question: 'Hỏi tỉ số phần trăm hạt giống đã nảy mầm là bao nhiêu phần trăm?',
    questionType: 'numeric_input',
    correctNumericValue: 94,
    unit: '%',
    hint: 'Lấy số hạt nảy mầm chia cho tổng số hạt đã gieo, rồi nhân thương đó với 100 và thêm ký hiệu %.',
    explanation: {
      coreConcept: 'Tìm tỉ số phần trăm của hai số.',
      stepByStep: [
        'Bước 1: Tìm thương của số hạt nảy mầm và tổng số hạt: 235 ÷ 250 = 0.94',
        'Bước 2: Nhân thương đó với 100: 0.94 × 100 = 94',
        'Bước 3: Viết thêm ký hiệu % vào kết quả: 94%'
      ],
      formulaUsed: 'Tỉ số phần trăm = (Số lượng thành công ÷ Tổng số lượng) × 100%',
      realWorldConnection: 'Trong nông nghiệp công nghệ cao và khoa học sinh học, tỉ lệ nảy mầm trên 90% là chỉ số tuyệt vời chứng minh hạt giống chất lượng cao.'
    },
    rewardStars: 15
  },
  {
    id: 'pct-3',
    topicId: 'percentages',
    topicName: 'Tỉ Số Phần Trăm',
    title: 'Thử Thách: Bẫy Khuyến Mãi Hay Cơ Hội Vàng?',
    level: 'diamond',
    scenario: 'Một chiếc ba lô đi dã ngoại có giá gốc 400,000 đồng. Cửa hàng A giảm ngay 30% trên giá gốc. Cửa hàng B giảm 20% lần 1, sau đó giảm thêm 10% trên giá đã giảm.',
    question: 'Mua ở cửa hàng nào sẽ tiết kiệm tiền hơn cho bạn?',
    questionType: 'multiple_choice',
    options: [
      { id: 'a', text: 'Cửa hàng A tiết kiệm hơn (rẻ hơn 8,000 đồng)', isCorrect: true },
      { id: 'b', text: 'Cửa hàng B tiết kiệm hơn', isCorrect: false },
      { id: 'c', text: 'Hai cửa hàng có giá bằng nhau vì đều giảm tổng cộng 30%', isCorrect: false },
      { id: 'd', text: 'Cửa hàng B đắt hơn 15,000 đồng', isCorrect: false }
    ],
    hint: 'Cửa hàng B giảm 10% lần hai là tính trên GIÁ ĐÃ GIẢM LẦN 1, chứ không phải trên giá gốc ban đầu!',
    explanation: {
      coreConcept: 'Phần trăm liên tiếp không thể cộng gộp số học đơn giản.',
      stepByStep: [
        'Cửa hàng A: Giảm 30% = 400,000 × 30% = 120,000 đ. Giá phải trả = 400,000 - 120,000 = 280,000 đồng.',
        'Cửa hàng B: Lần 1 giảm 20% còn: 400,000 × 80% = 320,000 đ. Lần 2 giảm 10% của 320,000 đ = 32,000 đ. Giá phải trả = 320,000 - 32,000 = 288,000 đồng.',
        'So sánh: 280,000 đ < 288,000 đ. Cửa hàng A rẻ hơn 8,000 đồng!'
      ],
      formulaUsed: 'Giá sau 2 lần giảm = Giá gốc × (1 - % giảm 1) × (1 - % giảm 2)',
      realWorldConnection: 'Đây là bài toán tài chính kinh điển! Các nhà bán lẻ thường dùng khuyến mãi liên tiếp tạo cảm giác giảm nhiều, nhưng người học toán lớp 5 luôn biết cách tính chuẩn xác.'
    },
    rewardStars: 20
  },

  // --- 3. HÌNH HỌC & DIỆN TÍCH - THỂ TÍCH ---
  {
    id: 'geo-1',
    topicId: 'geometry',
    topicName: 'Hình Học & Không Gian',
    title: 'Thiết Kế Thảm Cỏ Tam Giác Góc Thư Viện',
    level: 'seed',
    scenario: 'Góc đọc sách ngoài trời của trường học được thiết kế một bồn cỏ xanh hình tam giác có độ dài đáy là 6 m và chiều cao tương ứng là 3.5 m.',
    question: 'Hỏi diện tích thảm cỏ xanh này là bao nhiêu mét vuông?',
    questionType: 'numeric_input',
    correctNumericValue: 10.5,
    unit: 'm²',
    tolerance: 0.1,
    hint: 'Diện tích hình tam giác bằng độ dài đáy nhân với chiều cao (cùng đơn vị đo) rồi chia cho 2: S = (a x h) / 2.',
    explanation: {
      coreConcept: 'Bản chất công thức diện tích tam giác: 1 nửa diện tích hình chữ nhật có cùng đáy và chiều cao.',
      stepByStep: [
        'Bước 1: Xác định độ dài đáy a = 6 m, chiều cao h = 3.5 m (đã cùng đơn vị đo mét).',
        'Bước 2: Tính tích của đáy và chiều cao: 6 × 3.5 = 21',
        'Bước 3: Chia cho 2: 21 ÷ 2 = 10.5 (m²)'
      ],
      formulaUsed: 'S = (a × h) ÷ 2',
      realWorldConnection: 'Các kiến trúc sư cảnh quan thường dùng các mảnh cỏ hình tam giác và đa giác để tạo không gian mở sinh động và tiết kiệm diện tích đất.'
    },
    rewardStars: 10
  },
  {
    id: 'geo-2',
    topicId: 'geometry',
    topicName: 'Hình Học & Không Gian',
    title: 'Sân Khấu Hình Thang Lễ Khai Giảng',
    level: 'rocket',
    scenario: 'Sân khấu chào năm học mới có mặt sàn là hình thang với đáy lớn 12 m, đáy bé 8 m và chiều cao nối hai đáy là 5 m. Mỗi mét vuông sàn cần 4 viên gạch hoa cao cấp.',
    question: 'Cần tất cả bao nhiêu viên gạch hoa để lát kín mặt sân khấu này?',
    questionType: 'numeric_input',
    correctNumericValue: 200,
    unit: 'viên',
    hint: 'Trước hết tính diện tích hình thang: S = (đáy lớn + đáy bé) x chiều cao / 2. Sau đó lấy diện tích nhân với số viên gạch trên 1 m².',
    explanation: {
      coreConcept: 'Diện tích hình thang và bài toán thực tế lát sàn.',
      stepByStep: [
        'Bước 1: Tính diện tích mặt sàn hình thang: S = (12 + 8) × 5 ÷ 2 = 20 × 5 ÷ 2 = 50 (m²)',
        'Bước 2: Mỗi m² cần 4 viên gạch, vậy 50 m² cần: 50 × 4 = 200 (viên gạch)'
      ],
      formulaUsed: 'S = ((a + b) × h) ÷ 2; Số gạch = S × 4',
      realWorldConnection: 'Ước lượng vật liệu xây dựng (gạch, sơn, xi măng) dựa trên diện tích giúp các kỹ sư xây dựng không bị thiếu hoặc thừa vật tư gây lãng phí.'
    },
    rewardStars: 15
  },
  {
    id: 'geo-3',
    topicId: 'geometry',
    topicName: 'Hình Học & Không Gian',
    title: 'Bể Bơi Thông Minh & Thể Tích Nước',
    level: 'diamond',
    scenario: 'Bể bơi trường học hình hộp chữ nhật có chiều dài 25 m, chiều rộng 10 m và chiều sâu trung bình là 1.6 m. Hiện tại mực nước trong bể đang cao 1.2 m.',
    question: 'Hỏi cần bơm thêm bao nhiêu mét khối nước (m³) để mực nước cách mép bờ bể 0.1 m (tức là nước cao 1.5 m)?',
    questionType: 'numeric_input',
    correctNumericValue: 75,
    unit: 'm³',
    hint: 'Chiều cao nước cần dâng thêm là: 1.5 m - 1.2 m = 0.3 m. Thể tích nước thêm vào = Dài x Rộng x Chiều cao nước dâng thêm!',
    explanation: {
      coreConcept: 'Thể tích hình hộp chữ nhật V = a × b × c.',
      stepByStep: [
        'Bước 1: Mực nước mong muốn là 1.5 m (cách mép bể 1.6 - 0.1 = 1.5 m).',
        'Bước 2: Chiều cao lớp nước cần bơm thêm: 1.5 - 1.2 = 0.3 (m)',
        'Bước 3: Thể tích nước cần bơm thêm: V = 25 × 10 × 0.3 = 75 (m³)',
        'Lưu ý: 1 m³ nước = 1,000 lít nước, vậy 75 m³ tương đương với 75,000 lít nước sạch!'
      ],
      formulaUsed: 'V = a × b × h_tăng',
      realWorldConnection: 'Quản lý dung tích bể bơi và hệ thống lọc nước tuần hoàn đòi hỏi tính toán thể tích chuẩn từng mét khối để căn chỉnh nồng độ an toàn cho học sinh.'
    },
    rewardStars: 20
  },

  // --- 4. TOÁN CHUYỂN ĐỘNG ĐỀU ---
  {
    id: 'mot-1',
    topicId: 'motion',
    topicName: 'Toán Chuyển Động Đều',
    title: 'Xe Buýt Học Đường Dewey Tuyến Sáng',
    level: 'seed',
    scenario: 'Xe buýt đưa đón học sinh khởi hành từ bến lúc 6 giờ 45 phút và đến cổng trường lúc 7 giờ 15 phút. Quãng đường xe buýt đi là 18 km.',
    question: 'Hỏi vận tốc trung bình của xe buýt là bao nhiêu km/giờ?',
    questionType: 'numeric_input',
    correctNumericValue: 36,
    unit: 'km/h',
    hint: 'Thời gian đi từ 6h45 đến 7h15 là 30 phút. Nhớ đổi 30 phút ra giờ: 30 phút = 0.5 giờ (hoặc 1/2 giờ). Vận tốc v = s ÷ t.',
    explanation: {
      coreConcept: 'Công thức tính vận tốc v = s ÷ t và kỹ năng đổi đơn vị thời gian sang giờ.',
      stepByStep: [
        'Bước 1: Tính thời gian xe chạy: 7 giờ 15 phút - 6 giờ 45 phút = 30 phút',
        'Bước 2: Đổi 30 phút sang giờ: 30 ÷ 60 = 0.5 giờ',
        'Bước 3: Vận tốc trung bình của xe: v = s ÷ t = 18 ÷ 0.5 = 36 (km/h)'
      ],
      formulaUsed: 'v = s ÷ t (với t tính theo đơn vị giờ)',
      realWorldConnection: 'Vận tốc 36 km/h trong nội đô đảm bảo an toàn giao thông tối đa cho xe học sinh theo đúng quy chuẩn trường học quốc tế.'
    },
    rewardStars: 10
  },
  {
    id: 'mot-2',
    topicId: 'motion',
    topicName: 'Toán Chuyển Động Đều',
    title: 'Hai Bạn Học Sinh Đạp Xe Ngược Chiều Gặp Nhau',
    level: 'rocket',
    scenario: 'Khoảng cách giữa nhà bạn Khôi và nhà bạn Minh là 12 km. Hai bạn cùng xuất phát lúc 8 giờ sáng và đạp xe hướng về phía nhau. Bạn Khôi đi với vận tốc 11 km/h, bạn Minh đi với vận tốc 13 km/h.',
    question: 'Hỏi sau bao nhiêu phút hai bạn sẽ gặp nhau?',
    questionType: 'numeric_input',
    correctNumericValue: 30,
    unit: 'phút',
    hint: 'Hai xe đi ngược chiều hướng vào nhau: sau mỗi giờ hai bạn cùng rút ngắn quãng đường được bao nhiêu km? (tổng vận tốc). Thời gian gặp = Quãng đường ÷ Tổng vận tốc. Nhớ đổi giờ sang phút!',
    explanation: {
      coreConcept: 'Bài toán hai vật chuyển động ngược chiều cùng thời điểm xuất phát.',
      stepByStep: [
        'Bước 1: Tính tổng vận tốc hai bạn (quãng đường cùng thu hẹp trong 1 giờ): 11 + 13 = 24 (km/h)',
        'Bước 2: Thời gian để hai bạn gặp nhau: t = 12 ÷ 24 = 0.5 giờ',
        'Bước 3: Đổi 0.5 giờ ra phút: 0.5 × 60 = 30 phút',
        'Hai bạn gặp nhau lúc 8 giờ 30 phút sáng!'
      ],
      formulaUsed: 't_gặp = s ÷ (v1 + v2)',
      realWorldConnection: 'Các ứng dụng định vị bản đồ như Google Maps dùng chính nguyên lý này để tính toán thời gian hai người đón nhau trên đường!'
    },
    rewardStars: 15
  },
  {
    id: 'mot-3',
    topicId: 'motion',
    topicName: 'Toán Chuyển Động Đều',
    title: 'Thử Thách: Cuộc Đuổi Kịp Của Đội Cứu Hộ Ca-nô',
    level: 'diamond',
    scenario: 'Một chiếc thuyền buồm chạy xuôi dòng với vận tốc 15 km/h. Sau khi thuyền đi được 2 giờ (cách bến 30 km), một ca-nô cứu hộ xuất phát từ cùng bến đuổi theo với vận tốc 25 km/h.',
    question: 'Hỏi sau bao lâu kể từ lúc xuất phát thì ca-nô sẽ đuổi kịp thuyền buồm?',
    questionType: 'multiple_choice',
    options: [
      { id: 'a', text: 'Sau 3 giờ', isCorrect: true },
      { id: 'b', text: 'Sau 2 giờ', isCorrect: false },
      { id: 'c', text: 'Sau 4 giờ 30 phút', isCorrect: false },
      { id: 'd', text: 'Sau 1 giờ 12 phút', isCorrect: false }
    ],
    hint: 'Hai chuyển động cùng chiều đuổi nhau: sau mỗi giờ ca-nô rút ngắn khoảng cách với thuyền buồm được: 25 - 15 = 10 km (hiệu hai vận tốc). Thời gian đuổi kịp = Khoảng cách cách nhau lúc bắt đầu đuổi ÷ Hiệu hai vận tốc!',
    explanation: {
      coreConcept: 'Chuyển động cùng chiều đuổi nhau: t = s_cách ÷ (v_nhanh - v_chậm).',
      stepByStep: [
        'Bước 1: Khoảng cách giữa ca-nô và thuyền lúc ca-nô xuất phát là: 30 km',
        'Bước 2: Trong 1 giờ, ca-nô đi nhanh hơn thuyền buồm: 25 - 15 = 10 (km)',
        'Bước 3: Thời gian ca-nô cần để rút ngắn hết 30 km khoảng cách: 30 ÷ 10 = 3 (giờ)'
      ],
      formulaUsed: 't_đuổi = s_khoảng_cách ÷ (v1 - v2)',
      realWorldConnection: 'Thuật toán điều phối tàu bè và hàng không liên tục sử dụng công thức chuyển động cùng chiều để xác định vị trí tiếp cận và khoảng cách an toàn.'
    },
    rewardStars: 20
  }
];
