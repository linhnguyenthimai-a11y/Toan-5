import React from 'react';
import { Star, Award } from 'lucide-react';

export type ActiveView = 'map' | 'labs' | 'quests' | 'reflections' | 'cheatsheet';

interface HeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  stars: number;
  onOpenAchievements: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  stars,
  onOpenAchievements,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveView('map')}
          className="text-lg font-extrabold tracking-tight text-slate-900 font-display hover:text-indigo-600 transition-colors whitespace-nowrap"
        >
          MathVenture 5
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-semibold text-slate-600">
          <button
            onClick={() => setActiveView('map')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 ${
              activeView === 'map' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-0.5' : ''
            }`}
          >
            Bản Đồ
          </button>
          <button
            onClick={() => setActiveView('labs')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 ${
              activeView === 'labs' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-0.5' : ''
            }`}
          >
            Phòng Thí Nghiệm
          </button>
          <button
            onClick={() => setActiveView('quests')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 ${
              activeView === 'quests' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-0.5' : ''
            }`}
          >
            Thử Thách Thực Tế
          </button>
          <button
            onClick={() => setActiveView('reflections')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 ${
              activeView === 'reflections' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-0.5' : ''
            }`}
          >
            Góc Suy Ngẫm
          </button>
          <button
            onClick={() => setActiveView('cheatsheet')}
            className={`transition-colors whitespace-nowrap hover:text-slate-900 ${
              activeView === 'cheatsheet' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-0.5' : ''
            }`}
          >
            Sổ Tay Công Thức
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Star Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-900 font-mono">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span className="tabular-nums">{stars} Sao</span>
          </div>

          {/* Badges / Achievements Button */}
          <button
            onClick={onOpenAchievements}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors whitespace-nowrap"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Huy Hiệu</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 bg-slate-50/90 py-2 px-2 text-xs font-semibold overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveView('map')}
          className={`px-2 py-1 rounded-lg ${activeView === 'map' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
        >
          Bản Đồ
        </button>
        <button
          onClick={() => setActiveView('labs')}
          className={`px-2 py-1 rounded-lg ${activeView === 'labs' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
        >
          Thí Nghiệm
        </button>
        <button
          onClick={() => setActiveView('quests')}
          className={`px-2 py-1 rounded-lg ${activeView === 'quests' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
        >
          Thử Thách
        </button>
        <button
          onClick={() => setActiveView('reflections')}
          className={`px-2 py-1 rounded-lg ${activeView === 'reflections' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
        >
          Suy Ngẫm
        </button>
        <button
          onClick={() => setActiveView('cheatsheet')}
          className={`px-2 py-1 rounded-lg ${activeView === 'cheatsheet' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
        >
          Sổ Tay
        </button>
      </div>
    </header>
  );
};
