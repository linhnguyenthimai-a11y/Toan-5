import React, { useState } from 'react';
import { Quest, TopicId, DifficultyLevel } from '../../types/math';
import { CheckCircle2, XCircle, Lightbulb, HelpCircle, Star, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuestChallengeProps {
  quests: Quest[];
  completedQuestIds: string[];
  onQuestCompleted: (questId: string, stars: number) => void;
  activeTopicFilter?: TopicId | 'all';
}

export const QuestChallenge: React.FC<QuestChallengeProps> = ({
  quests,
  completedQuestIds,
  onQuestCompleted,
  activeTopicFilter = 'all',
}) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>(activeTopicFilter);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all');
  const [activeQuestId, setActiveQuestId] = useState<string>(quests[0]?.id || '');

  // User input states
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // Filtered quests
  const filteredQuests = quests.filter((q) => {
    const matchTopic = selectedTopic === 'all' || q.topicId === selectedTopic;
    const matchLevel = selectedLevel === 'all' || q.level === selectedLevel;
    return matchTopic && matchLevel;
  });

  const currentQuest = quests.find((q) => q.id === activeQuestId) || filteredQuests[0] || quests[0];
  const isAlreadyCompleted = completedQuestIds.includes(currentQuest.id);

  const handleSelectQuest = (qId: string) => {
    setActiveQuestId(qId);
    setSelectedOptionId(null);
    setNumericAnswer('');
    setShowHint(false);
    setFeedbackState('idle');
  };

  const handleCheckAnswer = () => {
    if (!currentQuest) return;

    let isCorrect = false;

    if (currentQuest.questionType === 'multiple_choice') {
      const selectedOption = currentQuest.options?.find((o) => o.id === selectedOptionId);
      if (selectedOption?.isCorrect) {
        isCorrect = true;
      }
    } else if (currentQuest.questionType === 'numeric_input') {
      const val = parseFloat(numericAnswer.replace(/,/g, '.'));
      if (!isNaN(val) && currentQuest.correctNumericValue !== undefined) {
        const tol = currentQuest.tolerance || 0.05;
        if (Math.abs(val - currentQuest.correctNumericValue) <= tol) {
          isCorrect = true;
        }
      }
    }

    if (isCorrect) {
      setFeedbackState('correct');
      // Fire confetti celebration
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
      if (!isAlreadyCompleted) {
        onQuestCompleted(currentQuest.id, currentQuest.rewardStars);
      }
    } else {
      setFeedbackState('incorrect');
    }
  };

  const levelLabels: Record<DifficultyLevel, { name: string; badge: string; color: string }> = {
    seed: { name: 'Cấp 1: Khám Phá Bản Chất', badge: '🌱 Cơ bản', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    rocket: { name: 'Cấp 2: Vận Dụng Thực Tế', badge: '🚀 Thực tế', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    diamond: { name: 'Cấp 3: Nhà Thám Hiểm Toán Học', badge: '💎 Thử thách', color: 'text-purple-700 bg-purple-50 border-purple-200' },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Sidebar: Quest List & Filters */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
        {/* Topic filter bar */}
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">
            Lọc Vùng Khám Phá
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <button
              onClick={() => setSelectedTopic('all')}
              className={`px-2.5 py-1.5 rounded-lg font-medium text-left transition-colors ${
                selectedTopic === 'all' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Tất cả nhiệm vụ
            </button>
            <button
              onClick={() => setSelectedTopic('decimals')}
              className={`px-2.5 py-1.5 rounded-lg font-medium text-left transition-colors ${
                selectedTopic === 'decimals' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Số thập phân
            </button>
            <button
              onClick={() => setSelectedTopic('percentages')}
              className={`px-2.5 py-1.5 rounded-lg font-medium text-left transition-colors ${
                selectedTopic === 'percentages' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Tỉ số phần trăm
            </button>
            <button
              onClick={() => setSelectedTopic('geometry')}
              className={`px-2.5 py-1.5 rounded-lg font-medium text-left transition-colors ${
                selectedTopic === 'geometry' ? 'bg-amber-600 text-white font-bold' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Hình học & Thể tích
            </button>
            <button
              onClick={() => setSelectedTopic('motion')}
              className={`px-2.5 py-1.5 rounded-lg font-medium text-left transition-colors ${
                selectedTopic === 'motion' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Chuyển động đều
            </button>
          </div>
        </div>

        {/* Level filter */}
        <div className="flex items-center gap-1 text-[11px] pt-1 border-t border-slate-100">
          <span className="text-slate-400 mr-1">Cấp độ:</span>
          {(['all', 'seed', 'rocket', 'diamond'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-2 py-0.5 rounded-md font-semibold ${
                selectedLevel === lvl ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {lvl === 'all' ? 'Tất cả' : lvl === 'seed' ? 'Cơ bản' : lvl === 'rocket' ? 'Vận dụng' : 'Thử thách'}
            </button>
          ))}
        </div>

        {/* Quest List */}
        <div className="space-y-2 max-h-[480px] overflow-y-auto no-scrollbar pt-2 border-t border-slate-100">
          {filteredQuests.map((q) => {
            const isSelected = q.id === currentQuest.id;
            const isDone = completedQuestIds.includes(q.id);
            return (
              <button
                key={q.id}
                onClick={() => handleSelectQuest(q.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] mb-0.5">
                    <span className="text-slate-500 font-medium truncate">{q.topicName}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-amber-600 font-mono font-bold flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> +{q.rewardStars}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{q.title}</h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Quest Execution Arena */}
      <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Quest Header */}
        <div className="border-b border-slate-100 pb-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${levelLabels[currentQuest.level].color}`}>
                {levelLabels[currentQuest.level].badge}
              </span>
              <span className="text-xs text-slate-400 font-medium">| {currentQuest.topicName}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Thưởng: +{currentQuest.rewardStars} Sao Khám Phá
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display">{currentQuest.title}</h2>
        </div>

        {/* Scenario Story & Real-World Connection */}
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            📖 Tình Huống Thực Tế:
          </span>
          <p className="text-sm text-slate-700 leading-relaxed">{currentQuest.scenario}</p>
        </div>

        {/* Question Prompt */}
        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-3">
          <span className="text-xs font-bold text-indigo-900 uppercase tracking-wide flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            Nhiệm Vụ Dành Cho Bạn:
          </span>
          <p className="text-base font-bold text-slate-900">{currentQuest.question}</p>
        </div>

        {/* Input Interface */}
        <div className="space-y-4">
          {currentQuest.questionType === 'multiple_choice' && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-slate-500">Chọn 1 phương án chính xác nhất:</span>
              <div className="grid grid-cols-1 gap-2.5">
                {currentQuest.options?.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedOptionId(option.id);
                        if (feedbackState === 'incorrect') setFeedbackState('idle');
                      }}
                      className={`p-3.5 rounded-xl border text-left text-xs md:text-sm font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span>{option.text}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentQuest.questionType === 'numeric_input' && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 block">
                Nhập kết quả tính toán của bạn:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Ví dụ: 0.85 hoặc 115500"
                  value={numericAnswer}
                  onChange={(e) => {
                    setNumericAnswer(e.target.value);
                    if (feedbackState === 'incorrect') setFeedbackState('idle');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheckAnswer();
                  }}
                  className="w-56 px-4 py-2.5 border border-slate-300 rounded-xl text-base font-bold font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {currentQuest.unit && (
                  <span className="text-sm font-bold text-slate-600">{currentQuest.unit}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons: Check Answer & Hint */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? 'Ẩn Gợi Ý Tư Duy' : 'Bật Gợi Ý Tư Duy'}
          </button>

          <button
            onClick={handleCheckAnswer}
            disabled={
              currentQuest.questionType === 'multiple_choice'
                ? !selectedOptionId
                : numericAnswer.trim() === ''
            }
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs md:text-sm font-bold rounded-xl shadow-xs transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Kiểm Tra Kết Quả Ngay
          </button>
        </div>

        {/* Hint Box */}
        {showHint && (
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1 animate-fade-in">
            <span className="font-bold flex items-center gap-1">
              💡 Gợi ý tư duy từ Thầy Cô:
            </span>
            <p className="leading-relaxed">{currentQuest.hint}</p>
          </div>
        )}

        {/* FEEDBACK & STEP-BY-STEP EXPLANATION */}
        {feedbackState === 'correct' && (
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-900">
                  Tuyệt Vời! Bạn Đã Giải Mã Chính Xác!
                </h3>
                <p className="text-xs text-emerald-700">
                  +{currentQuest.rewardStars} Sao đã được cộng vào sổ tay thám hiểm của bạn!
                </p>
              </div>
            </div>

            {/* Step-by-Step Breakdown */}
            <div className="bg-white p-4 rounded-xl border border-emerald-100 space-y-2 text-xs text-slate-700">
              <div className="font-bold text-emerald-950 uppercase tracking-wide text-[11px]">
                Phân tích bản chất từng bước:
              </div>
              <ul className="space-y-1.5 pl-1">
                {currentQuest.explanation.stepByStep.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600 shrink-0">✔</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
              {currentQuest.explanation.formulaUsed && (
                <div className="pt-2 border-t border-slate-100 text-[11px] font-mono font-semibold text-indigo-700">
                  📐 Công thức: {currentQuest.explanation.formulaUsed}
                </div>
              )}
            </div>

            {/* Real world connection callout */}
            <div className="p-3 bg-emerald-100/60 rounded-xl text-xs text-emerald-950 leading-relaxed">
              🌍 <strong>Ứng dụng đời sống:</strong> {currentQuest.explanation.realWorldConnection}
            </div>
          </div>
        )}

        {feedbackState === 'incorrect' && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 animate-fade-in">
            <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-rose-900">Chưa hoàn toàn chính xác rồi, đừng lo nhé!</h4>
              <p className="text-rose-700 leading-relaxed">
                Toán học là hành trình thử nghiệm và quan sát. Hãy bấm nút <strong>"Bật Gợi Ý Tư Duy"</strong> ở trên, kiểm tra lại phép tính và thử lại nào!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
