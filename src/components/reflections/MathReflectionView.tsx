import React, { useState } from 'react';
import { REFLECTION_TOPICS } from '../../data/reflectionData';
import { HelpCircle, Check, Sparkles, AlertTriangle, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MathReflectionViewProps {
  solvedReflectionIds: string[];
  onReflectionSolved: (id: string) => void;
}

export const MathReflectionView: React.FC<MathReflectionViewProps> = ({
  solvedReflectionIds,
  onReflectionSolved,
}) => {
  const [activeTopicId, setActiveTopicId] = useState<string>(REFLECTION_TOPICS[0].id);

  // Interactive pizza test for ref-1
  const [pizzaCount, setPizzaCount] = useState<number>(3);
  // Interactive discount test for ref-2
  const [baseMoney, setBaseMoney] = useState<number>(100000);
  // Interactive speed test for ref-4
  const [testSpeed, setTestSpeed] = useState<number>(30);

  const activeTopic = REFLECTION_TOPICS.find((t) => t.id === activeTopicId) || REFLECTION_TOPICS[0];
  const isSolved = solvedReflectionIds.includes(activeTopic.id);

  const handleMarkUnderstood = () => {
    if (!isSolved) {
      confetti({ particleCount: 40, spread: 50 });
      onReflectionSolved(activeTopic.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
            💡
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">Góc Suy Ngẫm & Phá Bỏ Ngộ Nhận</h2>
            <p className="text-sm text-slate-500">Khám phá bản chất "Vì sao lại thế?" thay vì chỉ học thuộc lòng công thức.</p>
          </div>
        </div>

        {/* Tab pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 border-t border-slate-100">
          {REFLECTION_TOPICS.map((topic, idx) => {
            const isActive = topic.id === activeTopic.id;
            const isCompleted = solvedReflectionIds.includes(topic.id);
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopicId(topic.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>Chủ đề {idx + 1}</span>
                {isCompleted && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">Đã hiểu</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Focus Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            Câu Hỏi Tư Duy Sâu Sắc:
          </span>
          <h3 className="text-2xl font-bold text-slate-900 font-display">
            {activeTopic.question}
          </h3>
        </div>

        {/* Comparison: Misconception vs Truth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Common Misconception */}
          <div className="p-5 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Ngộ nhận nhiều người hay mắc phải:
            </div>
            <p className="text-xs text-rose-950 leading-relaxed font-medium">
              "{activeTopic.misconception}"
            </p>
          </div>

          {/* Mathematical Truth */}
          <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wide">
              <Lightbulb className="w-4 h-4 text-emerald-600" />
              Sự thật toán học chuẩn xác:
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed font-medium">
              {activeTopic.truth}
            </p>
          </div>
        </div>

        {/* Interactive Experiment Sandbox */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              🧪 {activeTopic.interactiveExperiment.title}
            </span>
            <span className="text-xs text-slate-400">Tự tay kiểm chứng</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {activeTopic.interactiveExperiment.description}
          </p>

          {/* Specific interactive mini-tools */}
          {activeTopic.id === 'ref-1' && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span>Số bánh pizza ban đầu:</span>
                <span className="font-bold text-amber-700 font-mono text-sm">{pizzaCount} cái bánh</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={pizzaCount}
                onChange={(e) => setPizzaCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="p-3 bg-amber-50 rounded-xl text-xs font-mono text-amber-950 flex justify-between items-center">
                <span>Cắt mỗi cái thành các nửa bánh (0.5):</span>
                <span className="font-bold text-base text-amber-700">
                  {pizzaCount} ÷ 0.5 = {pizzaCount * 2} nửa bánh!
                </span>
              </div>
            </div>
          )}

          {activeTopic.id === 'ref-2' && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span>Số tiền gốc thử nghiệm:</span>
                <span className="font-bold text-indigo-700 font-mono text-sm">
                  {baseMoney.toLocaleString('vi-VN')} đ
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-slate-500">Giảm 10% rồi giảm tiếp 10%:</div>
                  <div className="font-mono font-bold text-amber-800 mt-1">
                    = {(baseMoney * 0.9 * 0.9).toLocaleString('vi-VN')} đ
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">(Thực chất chỉ giảm 19%)</div>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                  <div className="text-indigo-900 font-medium">Giảm ngay 20%:</div>
                  <div className="font-mono font-bold text-indigo-700 mt-1">
                    = {(baseMoney * 0.8).toLocaleString('vi-VN')} đ
                  </div>
                  <div className="text-[10px] text-indigo-500 mt-0.5">(Rẻ hơn {(baseMoney * 0.01).toLocaleString('vi-VN')} đ!)</div>
                </div>
              </div>
            </div>
          )}

          {activeTopic.id === 'ref-4' && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span>Vận tốc ô tô (v):</span>
                <span className="font-bold text-blue-700 font-mono text-sm">{testSpeed} km/h</span>
              </div>
              <input
                type="range"
                min="15"
                max="90"
                step="15"
                value={testSpeed}
                onChange={(e) => setTestSpeed(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="p-3 bg-blue-50 rounded-xl text-xs font-mono text-blue-950 flex justify-between items-center">
                <span>Thời gian đi hết quãng đường cố định 90 km:</span>
                <span className="font-bold text-base text-blue-700">
                  t = 90 ÷ {testSpeed} = {(90 / testSpeed).toFixed(1)} giờ
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Why it matters callout & Mark Understood button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500 max-w-lg leading-relaxed">
            💎 <strong>Giá trị cốt lõi:</strong> {activeTopic.whyItMatters}
          </div>

          <button
            onClick={handleMarkUnderstood}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isSolved
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
            }`}
          >
            {isSolved ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                Đã Khắc Ghi Bản Chất!
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Tôi Đã Hiểu Rõ Bản Chất
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
