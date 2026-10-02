import { FormulaItem } from '../types/math';

export const FORMULAS: FormulaItem[] = [
  {
    id: 'f-triangle',
    topicId: 'geometry',
    name: 'Diện Tích Hình Tam Giác',
    formula: 'S = (a × h) ÷ 2',
    meaning: 'Bằng một nửa diện tích hình chữ nhật có cùng chiều dài cạnh đáy a và chiều cao h.',
    interactiveType: 'triangle',
    example: 'Đáy a = 8 cm, chiều cao h = 5 cm => S = (8 × 5) ÷ 2 = 20 cm²'
  },
  {
    id: 'f-trapezoid',
    topicId: 'geometry',
    name: 'Diện Tích Hình Thang',
    formula: 'S = ((a + b) × h) ÷ 2',
    meaning: 'Cộng đáy lớn (a) và đáy bé (b), nhân với chiều cao (h) rồi chia đôi.',
    interactiveType: 'trapezoid',
    example: 'Đáy lớn a = 10 cm, đáy bé b = 6 cm, h = 4 cm => S = ((10 + 6) × 4) ÷ 2 = 32 cm²'
  },
  {
    id: 'f-circle-area',
    topicId: 'geometry',
    name: 'Diện Tích & Chu Vi Hình Tròn',
    formula: 'S = r × r × 3.14  |  C = d × 3.14 = 2 × r × 3.14',
    meaning: 'Số pi (≈ 3.14) biểu thị tỉ số kỳ diệu giữa chu vi và đường kính của mọi hình tròn trên thế giới.',
    interactiveType: 'circle',
    example: 'Bán kính r = 5 cm => Chu vi C = 2 × 5 × 3.14 = 31.4 cm; Diện tích S = 5 × 5 × 3.14 = 78.5 cm²'
  },
  {
    id: 'f-box-volume',
    topicId: 'geometry',
    name: 'Thể Tích Hình Hộp Chữ Nhật & Lập Phương',
    formula: 'V = a × b × c  (Hộp chữ nhật)  |  V = a × a × a  (Lập phương)',
    meaning: 'Đo lường sức chứa 3 chiều không gian bằng số khối lập phương đơn vị (1 cm³ hoặc 1 m³).',
    interactiveType: 'volume',
    example: 'Dài a = 6 cm, rộng b = 4 cm, cao c = 3 cm => Thể tích V = 6 × 4 × 3 = 72 cm³'
  },
  {
    id: 'f-percentage',
    topicId: 'percentages',
    name: 'Tìm Giá Trị Phần Trăm Của Một Số',
    formula: 'Giá trị = A × p ÷ 100  hoặc  A × (p/100)',
    meaning: 'Phần trăm nghĩa là "trên mỗi một trăm". Giảm 15% là cứ 100 đồng thì bớt 15 đồng.',
    interactiveType: 'percentage',
    example: 'Tìm 25% của 200,000 đ => 200,000 × 25 ÷ 100 = 50,000 đ'
  },
  {
    id: 'f-speed',
    topicId: 'motion',
    name: 'Tam Giác Chuyển Động: Vận Tốc - Quãng Đường - Thời Gian',
    formula: 's = v × t  |  v = s ÷ t  |  t = s ÷ v',
    meaning: 'Ba đại lượng gắn kết chặt chẽ: Biết 2 đại lượng bất kỳ là tính được ngay đại lượng còn lại.',
    interactiveType: 'speed',
    example: 'Vận tốc v = 45 km/h, thời gian t = 2.5 giờ => Quãng đường s = 45 × 2.5 = 112.5 km'
  }
];
