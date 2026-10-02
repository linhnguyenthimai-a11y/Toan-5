import React, { useState } from 'react';
import { TopicId } from '../../types/math';
import { DecimalGridLab } from './DecimalGridLab';
import { PercentageStoreLab } from './PercentageStoreLab';
import { GeometryDeconstructorLab } from './GeometryDeconstructorLab';
import { SpeedMotionLab } from './SpeedMotionLab';
import { Grid, Percent, Shapes, Compass } from 'lucide-react';

interface LabContainerProps {
  initialTopic?: TopicId;
}

export const LabContainer: React.FC<LabContainerProps> = ({ initialTopic = 'decimals' }) => {
  const [activeTopic, setActiveTopic] = useState<TopicId>(initialTopic);

  const topicTabs: { id: TopicId; name: string; icon: React.ReactNode; color: string }[] = [
    { id: 'decimals', name: 'Số Thập Phân & Đo Lường', icon: <Grid className="w-4 h-4" />, color: 'emerald' },
    { id: 'percentages', name: 'Tỉ Số Phần Trăm & Mua Sắm', icon: <Percent className="w-4 h-4" />, color: 'indigo' },
    { id: 'geometry', name: 'Hình Học & Cắt Ghép Diện Tích', icon: <Shapes className="w-4 h-4" />, color: 'amber' },
    { id: 'motion', name: 'Toán Chuyển Động & Vận Tốc', icon: <Compass className="w-4 h-4" />, color: 'blue' },
  ];

  return (
    <div className="space-y-6">
      {/* Interactive Tabs Header */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {topicTabs.map((tab) => {
          const isActive = activeTopic === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTopic(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Lab Component */}
      <div>
        {activeTopic === 'decimals' && <DecimalGridLab />}
        {activeTopic === 'percentages' && <PercentageStoreLab />}
        {activeTopic === 'geometry' && <GeometryDeconstructorLab />}
        {activeTopic === 'motion' && <SpeedMotionLab />}
      </div>
    </div>
  );
};
