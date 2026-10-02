import { ReflectionTopic } from '../types/math';

export const REFLECTION_TOPICS: ReflectionTopic[] = [
  {
    id: 'ref-1',
    topicId: 'decimals',
    question: 'Tại sao phép chia cho 0.5 lại cho kết quả gấp đôi số ban đầu (tương đương nhân với 2)?',
    misconception: 'Nhiều người nghĩ rằng: "Đã là phép chia thì kết quả (thương) luôn luôn phải nhỏ hơn số bị chia!"',
    truth: 'Chia cho 0.5 thực chất là hỏi: "Có bao nhiêu nửa đơn vị (1/2) nằm vừa vặn bên trong số đó?". Cứ mỗi 1 đơn vị nguyên thì có đúng 2 nửa đơn vị, nên kết quả luôn tăng gấp đôi!',
    interactiveExperiment: {
      type: 'comparison',
      title: 'Thực Nghiệm Cắt Bánh Pizza',
      description: 'Nếu bạn có 4 chiếc bánh pizza nguyên vẹn và cắt mỗi chiếc thành các nửa bánh (0.5 cái bánh), bạn sẽ có tất cả 4 ÷ 0.5 = 8 miếng bánh!'
    },
    whyItMatters: 'Hiểu bản chất phép chia là phép đo số lần chứa (how many groups of size X fit into Y) thay vì chỉ nhớ máy móc quy tắc tính.'
  },
  {
    id: 'ref-2',
    topicId: 'percentages',
    question: 'Giảm giá 10% rồi lại giảm tiếp 10% có tương đương với việc giảm ngay một lần 20% không?',
    misconception: 'Thường bị nhầm là: 10% + 10% = 20%, nên giảm 2 lần 10% cũng giống hệt giảm 20%!',
    truth: 'Hoàn toàn khác nhau! Lần giảm thứ hai chỉ được tính trên số tiền ĐÃ GIẢM LẦN 1 (giá trị nhỏ hơn), chứ không phải trên giá trị ban đầu. Vì thế giảm 10% rồi giảm 10% chỉ tương đương với giảm 19% mà thôi!',
    interactiveExperiment: {
      type: 'slider_test',
      title: 'Mô Phỏng 100 Đồng Thử Nghiệm',
      description: 'Bắt đầu với 100đ: Giảm 10% còn 90đ. Tiếp tục giảm 10% của 90đ là bớt 9đ, còn lại 81đ (tức là chỉ giảm tổng cộng 19đ). Còn nếu giảm ngay 20% thì chỉ còn 80đ!'
    },
    whyItMatters: 'Giúp học sinh rèn luyện tư duy tài chính phản biện, không bị đánh lừa bởi những quảng cáo khuyến mại ngoài đời thực.'
  },
  {
    id: 'ref-3',
    topicId: 'geometry',
    question: 'Tại sao công thức diện tích tam giác lại luôn có phép chia cho 2: S = (a × h) ÷ 2?',
    misconception: 'Học vẹt công thức mà không hiểu số 2 từ đâu sinh ra.',
    truth: 'Mọi hình tam giác bất kỳ luôn có thể ghép đôi với một hình tam giác giống hệt nó để tạo thành một hình chữ nhật (hoặc hình bình hành) có cùng chiều cao h và cùng cạnh đáy a! Diện tích hình chữ nhật đó là a × h, do đó diện tích 1 tam giác chính là một nửa (÷ 2).',
    interactiveExperiment: {
      type: 'toggle_proof',
      title: 'Chứng Minh Trực Quan Bằng Cắt Ghép',
      description: 'Lấy hai tam giác bằng nhau, xoay 180 độ một hình rồi ghép cạnh huyền lại, ta thu được ngay một hình bình hành hoặc hình chữ nhật hoàn hảo.'
    },
    whyItMatters: 'Toán học hình học là nghệ thuật sắp đặt và biến đổi không gian. Khi hiểu nguồn gốc, bạn sẽ không bao giờ quên công thức!'
  },
  {
    id: 'ref-4',
    topicId: 'motion',
    question: 'Nếu tăng gấp đôi vận tốc thì thời gian đi cùng quãng đường sẽ thay đổi như thế nào?',
    misconception: 'Có người nhầm tưởng tăng gấp đôi vận tốc thì thời gian tăng gấp đôi, hoặc giảm một nửa một cách mơ hồ.',
    truth: 'Vận tốc (v) và thời gian (t) trên cùng một quãng đường là hai đại lượng TỈ LỆ NGHỊCH. Khi vận tốc tăng 2 lần thì thời gian giảm đi đúng 2 lần (chỉ còn một nửa). Đi càng nhanh thì càng tốn ít thời gian!',
    interactiveExperiment: {
      type: 'slider_test',
      title: 'Thử Nghiệm Đồng Hồ Xe Tốc Độ',
      description: 'Quãng đường 60 km: Nếu đi xe đạp với v = 15 km/h mất 4 giờ; Nếu đi ô tô với v = 60 km/h (gấp 4 lần) thì thời gian giảm 4 lần, chỉ còn đúng 1 giờ!'
    },
    whyItMatters: 'Tỉ lệ nghịch là nền tảng quan trọng giúp tính toán kế hoạch thời gian di chuyển, tối ưu năng lượng và nhịp sống thường nhật.'
  }
];
