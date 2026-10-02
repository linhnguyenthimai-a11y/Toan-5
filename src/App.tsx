import React, { useState, useEffect } from 'react';
import { Header, ActiveView } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { AdventureMap } from './components/AdventureMap';
import { LabContainer } from './components/labs/LabContainer';
import { QuestChallenge } from './components/quests/QuestChallenge';
import { MathReflectionView } from './components/reflections/MathReflectionView';
import { FormulaCheatsheet } from './components/cheatsheet/FormulaCheatsheet';
import { AchievementsModal } from './components/AchievementsModal';
import { QUESTS } from './data/questsData';
import { TopicId, UserProgress } from './types/math';
import { loadUserProgress, saveUserProgress, resetUserProgress } from './utils/storage';
import { Heart, Compass, ShieldCheck } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [activeView, setActiveView] = useState<ActiveView>('map');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<TopicId | 'all'>('all');
  const [isAchievementsOpen, setIsAchievementsOpen] = useState<boolean>(false);

  // Auto-save progress whenever it changes
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  // Handler for quest completion
  const handleQuestCompleted = (questId: string, stars: number) => {
    setProgress((prev) => {
      if (prev.completedQuestIds.includes(questId)) return prev;
      return {
        ...prev,
        stars: prev.stars + stars,
        completedQuestIds: [...prev.completedQuestIds, questId],
      };
    });
  };

  // Handler for reflection solved
  const handleReflectionSolved = (refId: string) => {
    setProgress((prev) => {
      if (prev.solvedReflectionIds.includes(refId)) return prev;
      return {
        ...prev,
        stars: prev.stars + 15,
        solvedReflectionIds: [...prev.solvedReflectionIds, refId],
      };
    });
  };

  // Reset progress
  const handleResetProgress = () => {
    const fresh = resetUserProgress();
    setProgress(fresh);
    setIsAchievementsOpen(false);
  };

  // Navigate to topic from map
  const handleSelectTopicFromMap = (topicId: TopicId) => {
    setSelectedTopicFilter(topicId);
    setActiveView('labs');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Universal Top Bar */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        stars={progress.stars}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-8">
        {/* Hero banner shown on Map overview or as persistent welcome */}
        {activeView === 'map' && (
          <HeroBanner
            onStartExploring={(target) => setActiveView(target)}
            completedQuestsCount={progress.completedQuestIds.length}
            totalQuestsCount={QUESTS.length}
          />
        )}

        {/* View 1: Adventure Map */}
        {activeView === 'map' && (
          <AdventureMap
            completedQuestIds={progress.completedQuestIds}
            quests={QUESTS}
            onSelectTopic={handleSelectTopicFromMap}
          />
        )}

        {/* View 2: Interactive Labs */}
        {activeView === 'labs' && (
          <div className="space-y-4">
            <LabContainer initialTopic={selectedTopicFilter === 'all' ? 'decimals' : selectedTopicFilter} />
          </div>
        )}

        {/* View 3: Real-World Quests & Challenges */}
        {activeView === 'quests' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  Thử Thách Toán Học Thực Tế Lớp 5
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Mỗi nhiệm vụ là một tình huống gắn liền với đời sống học đường và thế giới xung quanh.
                </p>
              </div>
              <div className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                Đã hoàn thành: {progress.completedQuestIds.length} / {QUESTS.length} nhiệm vụ
              </div>
            </div>
            <QuestChallenge
              quests={QUESTS}
              completedQuestIds={progress.completedQuestIds}
              onQuestCompleted={handleQuestCompleted}
              activeTopicFilter={selectedTopicFilter}
            />
          </div>
        )}

        {/* View 4: Reflections & Debunking Misconceptions */}
        {activeView === 'reflections' && (
          <MathReflectionView
            solvedReflectionIds={progress.solvedReflectionIds}
            onReflectionSolved={handleReflectionSolved}
          />
        )}

        {/* View 5: Visual Formula Cheatsheet */}
        {activeView === 'cheatsheet' && (
          <FormulaCheatsheet />
        )}
      </main>

      {/* Achievements & Certificate Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        progress={progress}
        onResetProgress={handleResetProgress}
      />

      {/* Clean Educational Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-slate-800 font-display">MathVenture 5</span>
            <span>— Hành trình học Toán khám phá & tương tác dành cho học sinh 10–11 tuổi</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span>Tiêu chuẩn giáo dục trường Quốc tế Dewey</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Bản quyền học thuật 2026
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
