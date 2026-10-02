import React, { useState } from 'react';
import { UserProgress, Badge } from '../types/math';
import { BADGES } from '../data/badgesData';
import { Award, Star, X, Check, RotateCcw, Download, Sparkles } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onResetProgress: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  progress,
  onResetProgress,
}) => {
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Nhà Thám Hiểm Nhí');

  if (!isOpen) return null;

  // Determine unlocked badges based on user stats
  const unlockedBadges = BADGES.map((b) => {
    let unlocked = b.unlocked;
    if (b.id === 'decimal_master') {
      unlocked = progress.completedQuestIds.some((id) => id.startsWith('dec'));
    } else if (b.id === 'percentage_guru') {
      unlocked = progress.completedQuestIds.some((id) => id.startsWith('pct'));
    } else if (b.id === 'geometry_architect') {
      unlocked = progress.completedQuestIds.some((id) => id.startsWith('geo'));
    } else if (b.id === 'speed_champion') {
      unlocked = progress.completedQuestIds.some((id) => id.startsWith('mot'));
    } else if (b.id === 'deep_thinker') {
      unlocked = progress.solvedReflectionIds.length >= 2;
    }
    return { ...b, unlocked };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Huy Hiệu & Thành Tựu Khám Phá</h2>
              <p className="text-xs text-slate-500">Ghi nhận từng bước tiến vững chắc của bạn trong thế giới Toán 5.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Total Stars & Stats Banner */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 text-center">
          <div className="space-y-0.5">
            <span className="text-[11px] text-amber-800 font-medium">Tổng Sao Đạt Được</span>
            <div className="text-2xl font-black text-amber-600 font-mono flex items-center justify-center gap-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              {progress.stars}
            </div>
          </div>

          <div className="space-y-0.5 border-x border-amber-200">
            <span className="text-[11px] text-amber-800 font-medium">Nhiệm Vụ Đã Giải</span>
            <div className="text-2xl font-black text-slate-800 font-mono">
              {progress.completedQuestIds.length}
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] text-amber-800 font-medium">Góc Suy Ngẫm</span>
            <div className="text-2xl font-black text-emerald-600 font-mono">
              {progress.solvedReflectionIds.length}
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Bộ Sưu Tập Huy Hiệu Toán Học
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {unlockedBadges.map((badge) => (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                  badge.unlocked
                    ? 'bg-white border-slate-200 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200/60 opacity-60'
                }`}
              >
                <div className="text-2xl p-2 bg-slate-50 rounded-xl border border-slate-100 shrink-0">
                  {badge.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{badge.title}</h4>
                    {badge.unlocked && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                        Đã mở
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Generator Preview */}
        {showCertificate ? (
          <div className="p-6 bg-gradient-to-br from-amber-50 via-white to-indigo-50 border-2 border-amber-300 rounded-2xl shadow-inner space-y-4 text-center">
            <div className="flex justify-between items-center text-xs text-amber-800 font-semibold border-b border-amber-200 pb-2">
              <span>DEWEY INTERNATIONAL SCHOOL STANDARD</span>
              <span>MATHVENTURE 5</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                CHỨNG CHỈ VINH DANH
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-display">
                NHÀ THÁM HIỂM TOÁN HỌC XUẤT SẮC
              </h3>
            </div>

            <p className="text-xs text-slate-600">Chứng nhận bạn:</p>
            <div className="inline-block px-4 py-1.5 bg-white border border-amber-300 rounded-xl text-base font-bold text-indigo-700 font-display">
              {studentName}
            </div>

            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Đã tích cực tham gia các thí nghiệm tương tác, làm chủ số thập phân, tỉ số phần trăm, hình học và bài toán chuyển động thực tế với tinh thần say mê khám phá!
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-amber-200 text-xs text-slate-500">
              <span>⭐ Điểm sao: {progress.stars}</span>
              <span className="font-semibold text-slate-800">Ban Cố Vấn Toán Học</span>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Chứng Nhận Thám Hiểm Toán Học
              </h4>
              <p className="text-[11px] text-indigo-700">Xem và lưu lại bảng vinh danh của bạn.</p>
            </div>
            <button
              onClick={() => setShowCertificate(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Mở Chứng Chỉ
            </button>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ thám hiểm không?')) {
                onResetProgress();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Đặt Lại Tiến Độ
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
