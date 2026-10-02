import { Badge } from '../types/math';

export const BADGES: Badge[] = [
  {
    id: 'explorer_bronze',
    title: 'Tân Binh Thám Hiểm',
    description: 'Bắt đầu bước chân vào hành trình khám phá Toán học lớp 5.',
    icon: '🧭',
    unlocked: true,
  },
  {
    id: 'decimal_master',
    title: 'Bậc Thầy Thập Phân',
    description: 'Chinh phục lưới 10x10 và hoàn thành xuất sắc các thử thách số thập phân.',
    icon: '🔢',
    unlocked: false,
    topicId: 'decimals',
  },
  {
    id: 'percentage_guru',
    title: 'Chuyên Gia Tiêu Dùng Thông Thái',
    description: 'Làm chủ tỉ số phần trăm, bẫy khuyến mãi và quản lý tài chính thông minh.',
    icon: '🏷️',
    unlocked: false,
    topicId: 'percentages',
  },
  {
    id: 'geometry_architect',
    title: 'Kiến Trúc Sư Không Gian',
    description: 'Khám phá bí mật cắt ghép diện tích tam giác, hình thang và thể tích 3D.',
    icon: '📐',
    unlocked: false,
    topicId: 'geometry',
  },
  {
    id: 'speed_champion',
    title: 'Chiến Binh Tốc Độ',
    description: 'Giải mã bài toán hai xe gặp nhau và làm chủ công thức s = v × t.',
    icon: '⚡',
    unlocked: false,
    topicId: 'motion',
  },
  {
    id: 'deep_thinker',
    title: 'Nhà Tư Duy Sâu Sắc',
    description: 'Khám phá tất cả các góc suy ngẫm và phản biện các ngộ nhận toán học.',
    icon: '💡',
    unlocked: false,
  }
];
