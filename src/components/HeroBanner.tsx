import React from 'react';
import { ArrowRight, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { ActiveView } from './Header';

interface HeroBannerProps {
  onStartExploring: (view: ActiveView) => void;
  completedQuestsCount: number;
  totalQuestsCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartExploring,
  completedQuestsCount,
  totalQuestsCount,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 md:p-10">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 tracking-wide">
              <span>HÀNH TRÌNH TOÁN HỌC TRƯỜNG QUỐC TẾ</span>
              <span aria-hidden="true">·</span>
              <span>DÀNH CHO HỌC SINH 10–11 TUỔI</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 font-display leading-[1.15] text-balance">
              Khám Phá Bản Chất Toán Lớp 5 Qua Tương Tác Trực Quan
            </h1>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
              Tạm biệt những bài tập khô khan! Cùng chạm tay vào mô hình số thập phân phóng đại, thử nghiệm giảm giá hội sách, cắt ghép chứng minh diện tích tam giác và đua xe tính vận tốc thực tế.
            </p>
          </div>

          {/* Value Highlights */}
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thí nghiệm cát ghép & trượt thông số</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Phản hồi & giải thích từng bước</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Gắn liền tình huống đời sống</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Tích lũy sao & huy hiệu thám hiểm</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onStartExploring('labs')}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-sm font-bold rounded-2xl shadow-sm hover:shadow transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Vào Phòng Thí Nghiệm Ngay
            </button>

            <button
              onClick={() => onStartExploring('quests')}
              className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs md:text-sm font-bold rounded-2xl border border-slate-200 transition-colors"
            >
              <Compass className="w-4 h-4 text-slate-600" />
              Chinh Phục Thử Thách
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Progress hint */}
          <div className="text-xs text-slate-500 flex items-center gap-2 pt-2 border-t border-slate-100">
            <span>Tiến độ hành trình:</span>
            <span className="font-mono font-bold text-slate-800">
              {completedQuestsCount} / {totalQuestsCount} nhiệm vụ đã giải mã
            </span>
          </div>
        </div>

        {/* Right Column: Hero Visual Asset */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-16/10 bg-slate-100">
            <img
              src="/src/assets/images/hero_math_adventure_1790931141151.jpg"
              alt="Hành trình khám phá toán học lớp 5"
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Visual gradient overlay for clean edge */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-medium bg-slate-900/60 backdrop-blur-xs px-3 py-1.5 rounded-xl flex items-center justify-between">
              <span>Khám phá 4 vùng đất kiến thức</span>
              <span className="font-mono font-bold">100% Trực Quan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
