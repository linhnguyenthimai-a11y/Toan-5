import React from 'react';
import { TopicId, Quest } from '../types/math';
import { Compass, Star, CheckCircle, ArrowUpRight } from 'lucide-react';

interface AdventureMapProps {
  completedQuestIds: string[];
  quests: Quest[];
  onSelectTopic: (topicId: TopicId) => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  completedQuestIds,
  quests,
  onSelectTopic,
}) => {
  const lands: {
    id: TopicId;
    title: string;
    description: string;
    icon: string;
    color: string;
    accentColor: string;
    bgGradient: string;
  }[] = [
    {
      id: 'decimals',
      title: 'Đảo Số Thập Phân & Đo Lường',
      description: 'Lưới 10x10 kỳ diệu, kính lúp trục số và trạm cân đổi đơn vị thực phẩm.',
      icon: '🌿',
      color: 'text-emerald-700',
      accentColor: 'border-emerald-300 hover:border-emerald-500',
      bgGradient: 'from-emerald-500/10 to-teal-500/5',
    },
    {
      id: 'percentages',
      title: 'Khu Chợ Tỉ Số Phần Trăm',
      description: 'Hội sách trường học, tính tiền giảm giá, bẫy khuyến mãi và quản lý tài chính.',
      icon: '🛍️',
      color: 'text-indigo-700',
      accentColor: 'border-indigo-300 hover:border-indigo-500',
      bgGradient: 'from-indigo-500/10 to-blue-500/5',
    },
    {
      id: 'geometry',
      title: 'Thung Lũng Hình Học Kiến Trúc',
      description: 'Biến hình tam giác, cắt ghép hình thang, số Pi hình tròn và xếp khối lập phương 3D.',
      icon: '🏛️',
      color: 'text-amber-700',
      accentColor: 'border-amber-300 hover:border-amber-500',
      bgGradient: 'from-amber-500/10 to-orange-500/5',
    },
    {
      id: 'motion',
      title: 'Đường Đua Chuyển Động Đều',
      description: 'Xe buýt trường học, hai xe ngược chiều gặp nhau và cuộc đuổi kịp ngoạn mục.',
      icon: '🏎️',
      color: 'text-blue-700',
      accentColor: 'border-blue-300 hover:border-blue-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/5',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Visual Adventure Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 md:p-8">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wide">
            <Compass className="w-4 h-4" />
            Bản Đồ Thám Hiểm Toán Học Lớp 5
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display leading-tight">
            4 Vùng Đất Khám Phá: Chạm & Trải Nghiệm Bản Chất
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Chọn một vùng đất bên dưới để bắt đầu thí nghiệm tương tác hoặc thực hiện các nhiệm vụ đời sống thực tế cùng học sinh trường quốc tế Dewey.
          </p>
        </div>

        {/* Stylized background overlay artwork */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
          <img
            src="/src/assets/images/adventure_world_map_1790931160747.jpg"
            alt="Bản đồ thế giới toán học"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* 4 Land Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {lands.map((land) => {
          const landQuests = quests.filter((q) => q.topicId === land.id);
          const completedInLand = landQuests.filter((q) => completedQuestIds.includes(q.id));
          const isAllCompleted = landQuests.length > 0 && completedInLand.length === landQuests.length;

          return (
            <div
              key={land.id}
              className={`group bg-white rounded-2xl border ${land.accentColor} p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden`}
            >
              {/* Background gradient wash */}
              <div className={`absolute inset-0 bg-gradient-to-br ${land.bgGradient} opacity-60 pointer-events-none`} />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-white rounded-xl shadow-xs border border-slate-100">
                      {land.icon}
                    </span>
                    <div>
                      <h3 className={`text-base md:text-lg font-bold ${land.color} font-display`}>
                        {land.title}
                      </h3>
                      <div className="text-xs text-slate-500">
                        {completedInLand.length}/{landQuests.length} nhiệm vụ hoàn thành
                      </div>
                    </div>
                  </div>

                  {isAllCompleted && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Đã Chinh Phục
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {land.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(completedInLand.length / Math.max(1, landQuests.length)) * 100}%` }}
                      className="h-full bg-slate-900 rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectTopic(land.id)}
                  className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1 transition-colors"
                >
                  Mở Thí Nghiệm & Nhiệm Vụ
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <div className="flex items-center gap-1 text-xs font-mono font-semibold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {landQuests.reduce((sum, q) => sum + q.rewardStars, 0)} Sao
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
