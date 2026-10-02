import React, { useState } from 'react';
import { ZoomIn, RotateCcw, Scale, Grid, ArrowRight } from 'lucide-react';

export const DecimalGridLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'grid' | 'numberline' | 'converter'>('grid');
  
  // Grid state (0 - 100)
  const [filledCount, setFilledCount] = useState<number>(37);

  // Number line zoom state
  const [numLineVal, setNumLineVal] = useState<number>(1.45);
  const [zoomLevel, setZoomLevel] = useState<1 | 2>(1);

  // Converter state
  const [weightKg, setWeightKg] = useState<number>(2.45);

  const decimalVal = (filledCount / 100).toFixed(2);
  const percentVal = filledCount;

  // Fraction simplification
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(filledCount, 100);
  const simplifiedNumerator = filledCount / divisor;
  const simplifiedDenominator = 100 / divisor;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Phòng Thí Nghiệm Số Thập Phân & Đo Lường</h2>
          <p className="text-sm text-slate-500 mt-0.5">Khám phá bản chất phần mười, phần trăm và trục số phóng đại trực quan.</p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('grid')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'grid' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Lưới Thập Phân 10x10
          </button>
          <button
            onClick={() => setActiveTab('numberline')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'numberline' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ZoomIn className="w-3.5 h-3.5" />
            Kính Lúp Trục Số
          </button>
          <button
            onClick={() => setActiveTab('converter')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'converter' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Trạm Cân Đo Lường
          </button>
        </div>
      </div>

      {/* Mode 1: 10x10 Grid */}
      {activeTab === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 10x10 Grid visual */}
          <div className="lg:col-span-7 flex flex-col items-center bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
            <div className="w-full max-w-[340px]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Tấm Lưới 100 Ô Vuông
                </span>
                <button
                  onClick={() => setFilledCount(0)}
                  className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Xóa tất cả
                </button>
              </div>

              {/* Grid 10x10 */}
              <div className="grid grid-cols-10 gap-1 bg-white p-2.5 rounded-xl border border-slate-200 shadow-inner">
                {Array.from({ length: 100 }).map((_, index) => {
                  const isFilled = index < filledCount;
                  return (
                    <button
                      key={index}
                      onClick={() => setFilledCount(index + 1 === filledCount ? index : index + 1)}
                      className={`aspect-square rounded-[3px] transition-all duration-150 ${
                        isFilled
                          ? 'bg-emerald-500 hover:bg-emerald-600 shadow-sm scale-95'
                          : 'bg-slate-100 hover:bg-slate-200'
                      }`}
                      title={`Ô số ${index + 1} = 0.01`}
                    />
                  );
                })}
              </div>

              {/* Quick slider */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>Điều chỉnh số ô đã tô màu:</span>
                  <span className="font-bold text-emerald-600 tabular-nums">{filledCount} / 100 ô</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filledCount}
                  onChange={(e) => setFilledCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                  <button onClick={() => setFilledCount(10)} className="hover:text-slate-700">10 ô (0.1)</button>
                  <button onClick={() => setFilledCount(25)} className="hover:text-slate-700">25 ô (0.25)</button>
                  <button onClick={() => setFilledCount(50)} className="hover:text-slate-700">50 ô (0.5)</button>
                  <button onClick={() => setFilledCount(75)} className="hover:text-slate-700">75 ô (0.75)</button>
                  <button onClick={() => setFilledCount(100)} className="hover:text-slate-700">100 ô (1.0)</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Real-time mathematical equivalencies */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                Bản Chất Tương Đương
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-xs">
                  <div className="text-xs text-slate-500 mb-1">Số Thập Phân</div>
                  <div className="text-2xl font-extrabold text-emerald-600 tabular-nums">
                    {decimalVal}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {Math.floor(filledCount / 10)} phần mười + {filledCount % 10} phần trăm
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-xs">
                  <div className="text-xs text-slate-500 mb-1">Tỉ Số Phần Trăm</div>
                  <div className="text-2xl font-extrabold text-teal-600 tabular-nums">
                    {percentVal}%
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {filledCount} trên mỗi 100
                  </div>
                </div>
              </div>

              {/* Fraction card */}
              <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Phân số thập phân:</div>
                  <div className="text-lg font-bold text-slate-800 mt-1 font-mono">
                    {filledCount} / 100
                  </div>
                </div>
                {divisor > 1 && filledCount > 0 && (
                  <>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-xs text-slate-500">Phân số tối giản:</div>
                      <div className="text-lg font-bold text-emerald-700 mt-1 font-mono">
                        {simplifiedNumerator} / {simplifiedDenominator}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Insight callout */}
              <div className="p-3 bg-emerald-100/60 rounded-xl text-xs text-emerald-900 leading-relaxed">
                💡 <strong>Quan sát tư duy:</strong> Khi bạn tô kín 1 hàng ngang (10 ô), bạn vừa có <span className="font-semibold text-emerald-950 font-mono">1/10 = 0.1</span>. Khi tô kín cả 10 hàng (100 ô), bạn có trọn vẹn <span className="font-semibold text-emerald-950 font-mono">1.0 đơn vị nguyên</span>!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Zoomable Number Line */}
      {activeTab === 'numberline' && (
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Trục Số Thập Phân Phóng Đại
                </span>
                <p className="text-xs text-slate-600 mt-0.5">
                  Điểm đang chọn: <strong className="text-emerald-700 font-mono text-base">{numLineVal.toFixed(2)}</strong>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel(1)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    zoomLevel === 1 ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  Mức Phóng 1: Đoạn [1.0 - 2.0]
                </button>
                <button
                  onClick={() => setZoomLevel(2)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    zoomLevel === 2 ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  Mức Phóng 2: Đoạn [1.40 - 1.50]
                </button>
              </div>
            </div>

            {/* Slider */}
            <div>
              <input
                type="range"
                min={zoomLevel === 1 ? 1.0 : 1.40}
                max={zoomLevel === 1 ? 2.0 : 1.50}
                step={zoomLevel === 1 ? 0.05 : 0.01}
                value={numLineVal}
                onChange={(e) => setNumLineVal(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Visual SVG number line */}
            <div className="w-full bg-white p-6 rounded-xl border border-slate-200 overflow-x-auto">
              <svg className="w-full min-w-[500px] h-28" viewBox="0 0 600 100">
                {/* Main line */}
                <line x1="40" y1="50" x2="560" y2="50" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />

                {zoomLevel === 1 ? (
                  // Zoom 1: 1.0 to 2.0 in tenths
                  Array.from({ length: 11 }).map((_, i) => {
                    const x = 40 + i * 52;
                    const val = (1.0 + i * 0.1).toFixed(1);
                    const isMajor = i === 0 || i === 5 || i === 10;
                    return (
                      <g key={i}>
                        <line
                          x1={x}
                          y1={isMajor ? 32 : 40}
                          x2={x}
                          y2={isMajor ? 68 : 60}
                          stroke={isMajor ? '#0f172a' : '#64748b'}
                          strokeWidth={isMajor ? 2.5 : 1.5}
                        />
                        <text
                          x={x}
                          y={86}
                          textAnchor="middle"
                          className="text-[12px] font-mono font-medium fill-slate-700"
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })
                ) : (
                  // Zoom 2: 1.40 to 1.50 in hundredths
                  Array.from({ length: 11 }).map((_, i) => {
                    const x = 40 + i * 52;
                    const val = (1.40 + i * 0.01).toFixed(2);
                    const isMajor = i === 0 || i === 5 || i === 10;
                    return (
                      <g key={i}>
                        <line
                          x1={x}
                          y1={isMajor ? 32 : 40}
                          x2={x}
                          y2={isMajor ? 68 : 60}
                          stroke={isMajor ? '#059669' : '#94a3b8'}
                          strokeWidth={isMajor ? 2.5 : 1.5}
                        />
                        <text
                          x={x}
                          y={86}
                          textAnchor="middle"
                          className="text-[11px] font-mono font-medium fill-slate-700"
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })
                )}

                {/* Marker pointer */}
                {(() => {
                  let markerX = 40;
                  if (zoomLevel === 1) {
                    markerX = 40 + ((numLineVal - 1.0) / 1.0) * 520;
                  } else {
                    const clamped = Math.max(1.4, Math.min(1.5, numLineVal));
                    markerX = 40 + ((clamped - 1.4) / 0.1) * 520;
                  }
                  return (
                    <g transform={`translate(${markerX}, 50)`}>
                      <circle r="7" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                      <line x1="0" y1="-18" x2="0" y2="-7" stroke="#059669" strokeWidth="2" />
                      <rect x="-24" y="-38" width="48" height="20" rx="4" fill="#065f46" />
                      <text x="0" y="-24" textAnchor="middle" fill="#ffffff" className="text-[11px] font-mono font-bold">
                        {numLineVal.toFixed(2)}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
              🔍 <strong>Khám phá kỳ diệu:</strong> Giữa hai số tự nhiên 1 và 2 có vô số số thập phân. Khi phóng to đoạn [1.40 đến 1.50], chúng ta thấy 1.45 nằm chính xác ở vị trí chính giữa!
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Unit Converter Lab */}
      {activeTab === 'converter' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Đo Lường & Cân Nặng Thực Tế
            </span>
            <div className="space-y-3">
              <label className="text-xs text-slate-600 block">
                Khối lượng trái cây (kg):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="10"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.max(0.1, Number(e.target.value)))}
                  className="w-32 px-3 py-2 border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-sm font-semibold text-slate-600">ki-lô-gam (kg)</span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0.25"
                max="5.0"
                step="0.05"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Visual Balance Scale Graphic */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
              <div className="text-center space-y-1 mb-4">
                <span className="text-xs text-slate-400">Cân điện tử siêu thị Dewey:</span>
                <div className="text-3xl font-extrabold text-emerald-600 font-mono">
                  {weightKg.toFixed(2)} kg
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>🍎 2 kg cam</span>
                <span>+</span>
                <span>{(weightKg - Math.floor(weightKg)).toFixed(2)} kg cam lẻ</span>
              </div>
            </div>
          </div>

          {/* Equivalents Card */}
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-6 space-y-4">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
              Bảng Đổi Đơn Vị Thần Tốc
            </span>
            <div className="space-y-3">
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 flex items-center justify-between">
                <span className="text-xs text-slate-600">Đơn vị Gam (g):</span>
                <span className="text-base font-bold text-emerald-700 font-mono">
                  {(weightKg * 1000).toLocaleString('vi-VN')} g
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 flex items-center justify-between">
                <span className="text-xs text-slate-600">Đơn vị Yến:</span>
                <span className="text-base font-bold text-slate-800 font-mono">
                  {(weightKg / 10).toFixed(3)} yến
                </span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 flex items-center justify-between">
                <span className="text-xs text-slate-600">Đơn vị Tạ:</span>
                <span className="text-base font-bold text-slate-800 font-mono">
                  {(weightKg / 100).toFixed(4)} tạ
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-100/70 rounded-xl text-xs text-emerald-900">
              💡 <strong>Quy tắc dời dấu phẩy:</strong> Khi chuyển từ kg sang g (nhỏ hơn 1,000 lần), ta dời dấu phẩy sang phải 3 chữ số: <span className="font-mono font-bold">{weightKg} × 1000 = {(weightKg * 1000).toLocaleString('vi-VN')}</span>!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
