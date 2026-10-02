import React, { useState } from 'react';
import { FORMULAS } from '../../data/cheatsheetData';
import { Calculator, ArrowRight, BookOpen } from 'lucide-react';

export const FormulaCheatsheet: React.FC = () => {
  // Calculator states for active formula
  const [calcInputs, setCalcInputs] = useState<Record<string, { val1: number; val2: number; val3?: number }>>({
    'f-triangle': { val1: 8, val2: 5 },
    'f-trapezoid': { val1: 10, val2: 6, val3: 4 },
    'f-circle-area': { val1: 5, val2: 0 },
    'f-box-volume': { val1: 6, val2: 4, val3: 3 },
    'f-percentage': { val1: 200000, val2: 25 },
    'f-speed': { val1: 45, val2: 2.5 },
  });

  const handleUpdateInput = (formulaId: string, key: 'val1' | 'val2' | 'val3', val: number) => {
    setCalcInputs((prev) => ({
      ...prev,
      [formulaId]: {
        ...prev[formulaId],
        [key]: val,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wide">
            <BookOpen className="w-4 h-4" />
            Cẩm Nang Trực Quan Lớp 5
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Sổ Tay Công Thức & Máy Tính Trực Quan</h2>
          <p className="text-xs text-slate-500">
            Tra cứu nhanh các công thức trọng tâm và nhập số liệu bất kỳ để kiểm chứng trực tiếp.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FORMULAS.map((item) => {
          const inputs = calcInputs[item.id] || { val1: 1, val2: 1 };

          // Dynamic calculation depending on type
          let calculatedResult = '';
          if (item.interactiveType === 'triangle') {
            const res = (inputs.val1 * inputs.val2) / 2;
            calculatedResult = `S = (${inputs.val1} × ${inputs.val2}) ÷ 2 = ${res} cm²`;
          } else if (item.interactiveType === 'trapezoid') {
            const val3 = inputs.val3 ?? 1;
            const res = ((inputs.val1 + inputs.val2) * val3) / 2;
            calculatedResult = `S = ((${inputs.val1} + ${inputs.val2}) × ${val3}) ÷ 2 = ${res} cm²`;
          } else if (item.interactiveType === 'circle') {
            const area = inputs.val1 * inputs.val1 * 3.14;
            const circ = 2 * inputs.val1 * 3.14;
            calculatedResult = `S = ${area.toFixed(2)} cm² | C = ${circ.toFixed(2)} cm`;
          } else if (item.interactiveType === 'volume') {
            const val3 = inputs.val3 ?? 1;
            const res = inputs.val1 * inputs.val2 * val3;
            calculatedResult = `V = ${inputs.val1} × ${inputs.val2} × ${val3} = ${res} cm³`;
          } else if (item.interactiveType === 'percentage') {
            const res = (inputs.val1 * inputs.val2) / 100;
            calculatedResult = `${inputs.val2}% của ${inputs.val1.toLocaleString('vi-VN')} đ = ${res.toLocaleString('vi-VN')} đ`;
          } else if (item.interactiveType === 'speed') {
            const res = inputs.val1 * inputs.val2;
            calculatedResult = `s = ${inputs.val1} km/h × ${inputs.val2} giờ = ${res} km`;
          }

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 font-display">{item.name}</h3>
                  <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                    {item.formula}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.meaning}</p>
              </div>

              {/* Interactive quick calculator input */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                  <Calculator className="w-3.5 h-3.5 text-indigo-600" />
                  Thử Nghiệm Với Số Liệu Của Bạn:
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {item.interactiveType === 'triangle' && (
                    <>
                      <label className="flex items-center gap-1">
                        <span>Đáy a:</span>
                        <input
                          type="number"
                          value={inputs.val1}
                          onChange={(e) => handleUpdateInput(item.id, 'val1', Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-center"
                        />
                      </label>
                      <label className="flex items-center gap-1">
                        <span>Cao h:</span>
                        <input
                          type="number"
                          value={inputs.val2}
                          onChange={(e) => handleUpdateInput(item.id, 'val2', Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-center"
                        />
                      </label>
                    </>
                  )}

                  {item.interactiveType === 'trapezoid' && (
                    <>
                      <label className="flex items-center gap-1">
                        <span>Đáy a:</span>
                        <input
                          type="number"
                          value={inputs.val1}
                          onChange={(e) => handleUpdateInput(item.id, 'val1', Number(e.target.value))}
                          className="w-14 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-center"
                        />
                      </label>
                      <label className="flex items-center gap-1">
                        <span>Đáy b:</span>
                        <input
                          type="number"
                          value={inputs.val2}
                          onChange={(e) => handleUpdateInput(item.id, 'val2', Number(e.target.value))}
                          className="w-14 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-center"
                        />
                      </label>
                      <label className="flex items-center gap-1">
                        <span>Cao h:</span>
                        <input
                          type="number"
                          value={inputs.val3 ?? 4}
                          onChange={(e) => handleUpdateInput(item.id, 'val3', Number(e.target.value))}
                          className="w-14 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-center"
                        />
                      </label>
                    </>
                  )}

                  {item.interactiveType === 'circle' && (
                    <label className="flex items-center gap-1">
                      <span>Bán kính r:</span>
                      <input
                        type="number"
                        value={inputs.val1}
                        onChange={(e) => handleUpdateInput(item.id, 'val1', Number(e.target.value))}
                        className="w-20 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-center"
                      />
                    </label>
                  )}

                  {item.interactiveType === 'volume' && (
                    <>
                      <label className="flex items-center gap-1">
                        <span>Dài a:</span>
                        <input
                          type="number"
                          value={inputs.val1}
                          onChange={(e) => handleUpdateInput(item.id, 'val1', Number(e.target.value))}
                          className="w-14 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-center"
                        />
                      </label>
                      <label className="flex items-center gap-1">
                        <span>Rộng b:</span>
                        <input
                          type="number"
                          value={inputs.val2}
                          onChange={(e) => handleUpdateInput(item.id, 'val2', Number(e.target.value))}
                          className="w-14 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-center"
                        />
                      </label>
                      <label className="flex items-center gap-1">
                        <span>Cao c:</span>
                        <input
                          type="number"
                          value={inputs.val3 ?? 3}
                          onChange={(e) => handleUpdateInput(item.id, 'val3', Number(e.target.value))}
                          className="w-14 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-center"
                        />
                      </label>
                    </>
                  )}

                  {item.interactiveType === 'percentage' && (
                    <>
                      <label className="flex items-center gap-1">
                        <span>Số tiền gốc:</span>
                        <input
                          type="number"
                          step="10000"
                          value={inputs.val1}
                          onChange={(e) => handleUpdateInput(item.id, 'val1', Number(e.target.value))}
                          className="w-28 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-center"
                        />
                      </label>
                      <label className="flex items-center gap-1">
                        <span>% Tỉ lệ:</span>
                        <input
                          type="number"
                          value={inputs.val2}
                          onChange={(e) => handleUpdateInput(item.id, 'val2', Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-center"
                        />
                      </label>
                    </>
                  )}

                  {item.interactiveType === 'speed' && (
                    <>
                      <label className="flex items-center gap-1">
                        <span>Vận tốc v (km/h):</span>
                        <input
                          type="number"
                          value={inputs.val1}
                          onChange={(e) => handleUpdateInput(item.id, 'val1', Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-center"
                        />
                      </label>
                      <label className="flex items-center gap-1">
                        <span>Thời gian t (h):</span>
                        <input
                          type="number"
                          step="0.5"
                          value={inputs.val2}
                          onChange={(e) => handleUpdateInput(item.id, 'val2', Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-center"
                        />
                      </label>
                    </>
                  )}
                </div>

                {/* Live result banner */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Kết quả tính:</span>
                  <span className="font-mono font-extrabold text-indigo-700 bg-white px-3 py-1 rounded-lg border border-slate-200">
                    {calculatedResult}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
