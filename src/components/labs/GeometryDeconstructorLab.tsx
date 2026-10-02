import React, { useState } from 'react';
import { Triangle, Circle, Box, Sparkles, RefreshCw } from 'lucide-react';

export const GeometryDeconstructorLab: React.FC = () => {
  const [activeShape, setActiveShape] = useState<'triangle' | 'trapezoid' | 'circle' | 'box'>('triangle');

  // Triangle state
  const [triBase, setTriBase] = useState<number>(8);
  const [triHeight, setTriHeight] = useState<number>(5);
  const [triPeakOffset, setTriPeakOffset] = useState<number>(4);
  const [showTriDuplicate, setShowTriDuplicate] = useState<boolean>(false);

  // Trapezoid state
  const [trapBaseA, setTrapBaseA] = useState<number>(10);
  const [trapBaseB, setTrapBaseB] = useState<number>(6);
  const [trapHeight, setTrapHeight] = useState<number>(5);
  const [showTrapDuplicate, setShowTrapDuplicate] = useState<boolean>(false);

  // Circle state
  const [circleRadius, setCircleRadius] = useState<number>(4);
  const [circleAnimation, setCircleAnimation] = useState<'normal' | 'roll' | 'slices'>('normal');

  // 3D Box state
  const [boxL, setBoxL] = useState<number>(4);
  const [boxW, setBoxW] = useState<number>(3);
  const [boxH, setBoxH] = useState<number>(3);

  // Formulas calculations
  const triArea = (triBase * triHeight) / 2;
  const trapArea = ((trapBaseA + trapBaseB) * trapHeight) / 2;
  const circleCircumference = 2 * circleRadius * 3.14;
  const circleArea = circleRadius * circleRadius * 3.14;
  const boxVolume = boxL * boxW * boxH;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header & Shape Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Phòng Thí Nghiệm Hình Học & Không Gian</h2>
          <p className="text-sm text-slate-500 mt-0.5">Cắt ghép biến hình trực quan để hiểu bản chất sâu xa của mọi công thức.</p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveShape('triangle')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeShape === 'triangle' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Triangle className="w-3.5 h-3.5" />
            Hình Tam Giác
          </button>
          <button
            onClick={() => setActiveShape('trapezoid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeShape === 'trapezoid' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="font-mono font-bold text-xs">⏢</span>
            Hình Thang
          </button>
          <button
            onClick={() => setActiveShape('circle')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeShape === 'circle' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Circle className="w-3.5 h-3.5" />
            Hình Tròn & Số Pi
          </button>
          <button
            onClick={() => setActiveShape('box')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeShape === 'box' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            Thể Tích Khối Hộp
          </button>
        </div>
      </div>

      {/* SHAPE 1: TRIANGLE */}
      {activeShape === 'triangle' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual SVG Stage */}
          <div className="lg:col-span-7 bg-slate-50/80 p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center min-h-[360px]">
            <div className="w-full flex justify-between items-center text-xs text-slate-500 mb-2">
              <span>Mô Phỏng Biến Hình Tam Giác</span>
              <button
                onClick={() => setShowTriDuplicate(!showTriDuplicate)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                  showTriDuplicate
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                {showTriDuplicate ? 'Đang Ghép Đôi Hình Bình Hành' : 'Ghép Đôi Thành Hình Bình Hành'}
              </button>
            </div>

            {/* SVG Canvas */}
            <div className="w-full bg-white rounded-xl border border-slate-200 p-4 shadow-inner flex items-center justify-center overflow-hidden">
              <svg className="w-full max-w-[440px] h-[220px]" viewBox="0 0 440 220">
                {/* Grid guidelines */}
                <line x1="40" y1="180" x2="400" y2="180" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="40" y1="40" x2="400" y2="40" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />

                {/* Main Triangle points */}
                {(() => {
                  const scale = 26;
                  const baseX1 = 70;
                  const baseY = 170;
                  const baseX2 = baseX1 + triBase * scale;
                  const peakX = baseX1 + triPeakOffset * scale;
                  const peakY = baseY - triHeight * scale;

                  return (
                    <g>
                      {/* Secondary mirrored triangle if toggled */}
                      {showTriDuplicate && (
                        <polygon
                          points={`${baseX2},${baseY} ${peakX + triBase * scale},${peakY} ${peakX},${peakY}`}
                          fill="#818cf8"
                          fillOpacity="0.45"
                          stroke="#6366f1"
                          strokeWidth="2"
                          strokeDasharray="5 3"
                        />
                      )}

                      {/* Main Triangle */}
                      <polygon
                        points={`${baseX1},${baseY} ${baseX2},${baseY} ${peakX},${peakY}`}
                        fill="#4f46e5"
                        fillOpacity="0.75"
                        stroke="#3730a3"
                        strokeWidth="2.5"
                      />

                      {/* Height line */}
                      <line
                        x1={peakX}
                        y1={peakY}
                        x2={peakX}
                        y2={baseY}
                        stroke="#dc2626"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />
                      {/* Height label */}
                      <text
                        x={peakX + 8}
                        y={peakY + (baseY - peakY) / 2}
                        className="text-[12px] font-mono font-bold fill-red-600"
                      >
                        h = {triHeight} cm
                      </text>

                      {/* Base label */}
                      <line x1={baseX1} y1={baseY + 12} x2={baseX2} y2={baseY + 12} stroke="#3730a3" strokeWidth="1.5" />
                      <text
                        x={(baseX1 + baseX2) / 2}
                        y={baseY + 28}
                        textAnchor="middle"
                        className="text-[12px] font-mono font-bold fill-indigo-900"
                      >
                        Đáy a = {triBase} cm
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="w-full text-center text-xs text-slate-500 mt-3">
              Kéo thanh trượt bên phải để thử nghiệm đỉnh trượt ngang hoặc thay đổi kích thước.
            </div>
          </div>

          {/* Controls & Conceptual Explanation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Thông Số Kích Thước
              </span>

              {/* Slider Base */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600">Độ dài cạnh đáy a:</span>
                  <span className="font-bold text-indigo-700 font-mono">{triBase} cm</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="12"
                  value={triBase}
                  onChange={(e) => {
                    const b = Number(e.target.value);
                    setTriBase(b);
                    if (triPeakOffset > b) setTriPeakOffset(b / 2);
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Slider Height */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600">Chiều cao h:</span>
                  <span className="font-bold text-red-600 font-mono">{triHeight} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="5"
                  value={triHeight}
                  onChange={(e) => setTriHeight(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              {/* Slider Peak Offset (Shear principle) */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600">Vị trí đỉnh trượt ngang (Biến dạng hình):</span>
                  <span className="font-bold text-slate-700 font-mono">{triPeakOffset} cm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={triBase}
                  step="0.5"
                  value={triPeakOffset}
                  onChange={(e) => setTriPeakOffset(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                />
              </div>
            </div>

            {/* Area Result Card */}
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-semibold text-indigo-900 uppercase tracking-wide">
                Kết Quả & Bản Chất
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-slate-700">Diện tích tam giác:</span>
                <span className="text-3xl font-extrabold text-indigo-600 font-mono">
                  {triArea} cm²
                </span>
              </div>
              <div className="text-xs font-mono text-slate-600 bg-white p-2.5 rounded-xl border border-indigo-100">
                S = (a × h) ÷ 2 = ({triBase} × {triHeight}) ÷ 2 = <strong>{triArea} cm²</strong>
              </div>
              <div className="p-3 bg-indigo-100/70 rounded-xl text-xs text-indigo-950 leading-relaxed">
                💡 <strong>Khoảnh khắc "Aha!":</strong> Hãy thử kéo thanh trượt "Vị trí đỉnh trượt ngang", bạn sẽ thấy tam giác bị nghiêng đi rất nhiều nhưng diện tích <strong>hoàn toàn không đổi ({triArea} cm²)</strong>! Bởi vì đáy và khoảng cách chiều cao vẫn giữ nguyên vẹn.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHAPE 2: TRAPEZOID */}
      {activeShape === 'trapezoid' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center">
            <div className="w-full flex justify-between items-center text-xs text-slate-500 mb-2">
              <span>Mô Phỏng Cắt Ghép Hình Thang</span>
              <button
                onClick={() => setShowTrapDuplicate(!showTrapDuplicate)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                  showTrapDuplicate
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white text-amber-700 border-amber-200 hover:bg-amber-50'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                {showTrapDuplicate ? 'Đang Ghép Đôi Hình Bình Hành' : 'Ghép 2 Hình Thang'}
              </button>
            </div>

            <div className="w-full bg-white rounded-xl border border-slate-200 p-4 shadow-inner flex items-center justify-center">
              <svg className="w-full max-w-[440px] h-[220px]" viewBox="0 0 440 220">
                {(() => {
                  const scale = 22;
                  const baseX1 = 60;
                  const baseY = 170;
                  const baseX2 = baseX1 + trapBaseA * scale;
                  const topX1 = baseX1 + 2 * scale;
                  const topX2 = topX1 + trapBaseB * scale;
                  const topY = baseY - trapHeight * scale;

                  return (
                    <g>
                      {/* Secondary rotated trapezoid */}
                      {showTrapDuplicate && (
                        <polygon
                          points={`${baseX2},${baseY} ${baseX2 + trapBaseB * scale},${baseY} ${baseX2 + trapBaseA * scale},${topY} ${topX2},${topY}`}
                          fill="#f59e0b"
                          fillOpacity="0.4"
                          stroke="#d97706"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                      )}

                      {/* Main Trapezoid */}
                      <polygon
                        points={`${baseX1},${baseY} ${baseX2},${baseY} ${topX2},${topY} ${topX1},${topY}`}
                        fill="#d97706"
                        fillOpacity="0.8"
                        stroke="#b45309"
                        strokeWidth="2.5"
                      />

                      {/* Height line */}
                      <line x1={topX1} y1={topY} x2={topX1} y2={baseY} stroke="#dc2626" strokeWidth="2" strokeDasharray="4 2" />
                      <text x={topX1 + 6} y={topY + (baseY - topY) / 2} className="text-[11px] font-mono font-bold fill-red-600">
                        h = {trapHeight} cm
                      </text>

                      {/* Base A label */}
                      <text x={(baseX1 + baseX2) / 2} y={baseY + 22} textAnchor="middle" className="text-[11px] font-mono font-bold fill-amber-900">
                        Đáy lớn a = {trapBaseA} cm
                      </text>

                      {/* Base B label */}
                      <text x={(topX1 + topX2) / 2} y={topY - 8} textAnchor="middle" className="text-[11px] font-mono font-bold fill-amber-900">
                        Đáy bé b = {trapBaseB} cm
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Điều chỉnh kích thước</span>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Đáy lớn (a):</span>
                  <span className="font-mono font-bold text-amber-700">{trapBaseA} cm</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="14"
                  value={trapBaseA}
                  onChange={(e) => setTrapBaseA(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Đáy bé (b):</span>
                  <span className="font-mono font-bold text-amber-700">{trapBaseB} cm</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={trapBaseB}
                  onChange={(e) => setTrapBaseB(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Chiều cao (h):</span>
                  <span className="font-mono font-bold text-red-600">{trapHeight} cm</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="6"
                  value={trapHeight}
                  onChange={(e) => setTrapHeight(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-amber-900">Diện tích hình thang:</span>
                <span className="text-3xl font-extrabold text-amber-700 font-mono">
                  {trapArea} cm²
                </span>
              </div>
              <div className="text-xs font-mono text-slate-700 bg-white p-2.5 rounded-xl border border-amber-200">
                S = (a + b) × h ÷ 2 = ({trapBaseA} + {trapBaseB}) × {trapHeight} ÷ 2 = <strong>{trapArea} cm²</strong>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                💡 Khi ghép 2 hình thang bằng nhau, ta thu được 1 hình bình hành có đáy dài bằng <strong>(đáy lớn + đáy bé)</strong> và chiều cao <strong>h</strong>. Đó là lý do ta phải chia cho 2!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SHAPE 3: CIRCLE & PI */}
      {activeShape === 'circle' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center">
            <div className="w-full flex justify-between items-center text-xs text-slate-500 mb-2">
              <span>Khám Phá Số Pi (π ≈ 3.14) & Hình Tròn</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setCircleAnimation(circleAnimation === 'roll' ? 'normal' : 'roll')}
                  className={`px-2.5 py-1 text-xs rounded-lg border font-medium ${
                    circleAnimation === 'roll' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-teal-700 border-teal-200'
                  }`}
                >
                  Lăn Bánh Xe
                </button>
                <button
                  onClick={() => setCircleAnimation(circleAnimation === 'slices' ? 'normal' : 'slices')}
                  className={`px-2.5 py-1 text-xs rounded-lg border font-medium ${
                    circleAnimation === 'slices' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-teal-700 border-teal-200'
                  }`}
                >
                  Cắt Múi Ghép Chữ Nhật
                </button>
              </div>
            </div>

            <div className="w-full bg-white rounded-xl border border-slate-200 p-4 shadow-inner flex items-center justify-center min-h-[220px]">
              {circleAnimation === 'slices' ? (
                // Slices representation
                <div className="text-center space-y-3 py-4">
                  <div className="flex justify-center items-center gap-1">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-5 h-20 bg-teal-500 rounded-t-full transition-transform ${
                          i % 2 === 1 ? 'rotate-180 bg-teal-600' : ''
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-slate-600">
                    Cắt 16 múi nan hoa ghép sole tạo thành hình gần như hình chữ nhật:
                    <br />
                    Chiều dài = nửa chu vi (<span className="font-mono font-bold">π × r</span>), Chiều rộng = bán kính (<span className="font-mono font-bold">r</span>)
                    <br />
                    &rarr; Diện tích = <span className="font-mono font-bold text-teal-700">r × r × 3.14</span>!
                  </div>
                </div>
              ) : (
                // Normal circle with radius
                <svg className="w-full max-w-[380px] h-[200px]" viewBox="0 0 380 200">
                  <circle cx="190" cy="100" r={circleRadius * 16} fill="#0d9488" fillOpacity="0.15" stroke="#0f766e" strokeWidth="2.5" />
                  <line x1="190" y1="100" x2={190 + circleRadius * 16} y2="100" stroke="#0f766e" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="190" cy="100" r="4" fill="#0f766e" />
                  <text x={190 + (circleRadius * 16) / 2} y="92" textAnchor="middle" className="text-[12px] font-mono font-bold fill-teal-900">
                    r = {circleRadius} cm
                  </text>
                  <text x="190" y="105" textAnchor="middle" dy="45" className="text-[11px] fill-slate-500 font-medium">
                    Đường kính d = {circleRadius * 2} cm
                  </text>
                </svg>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Điều chỉnh bán kính</span>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Bán kính (r):</span>
                  <span className="font-mono font-bold text-teal-700">{circleRadius} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={circleRadius}
                  onChange={(e) => setCircleRadius(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-baseline justify-between border-b border-teal-100 pb-2">
                <span className="text-xs text-slate-600">Chu vi hình tròn (C):</span>
                <span className="text-xl font-bold text-teal-800 font-mono">
                  {circleCircumference.toFixed(2)} cm
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-600">Diện tích hình tròn (S):</span>
                <span className="text-2xl font-black text-teal-700 font-mono">
                  {circleArea.toFixed(2)} cm²
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-teal-100 text-xs text-slate-700 space-y-1">
                <div>• Chu vi: C = d × 3.14 = {circleRadius * 2} × 3.14 = {circleCircumference.toFixed(2)} cm</div>
                <div>• Diện tích: S = r × r × 3.14 = {circleRadius} × {circleRadius} × 3.14 = {circleArea.toFixed(2)} cm²</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHAPE 4: 3D BOX VOLUME */}
      {activeShape === 'box' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Xếp Khối Lập Phương 1 cm³ Đo Thể Tích
            </span>

            {/* Isometric 3D Layer representation */}
            <div className="w-full bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[240px]">
              <div className="space-y-2 text-center">
                <div className="flex flex-col-reverse items-center gap-1.5">
                  {Array.from({ length: boxH }).map((_, hIndex) => (
                    <div
                      key={hIndex}
                      className="flex items-center gap-1 bg-violet-100 border border-violet-300 p-1.5 rounded-lg shadow-xs"
                    >
                      <span className="text-[10px] font-bold text-violet-800 mr-1">Tầng {hIndex + 1}:</span>
                      {Array.from({ length: boxL * boxW }).map((_, cIndex) => (
                        <div
                          key={cIndex}
                          className="w-3.5 h-3.5 bg-violet-600 rounded-[2px] shadow-2xs"
                          title="Khối lập phương 1 cm³"
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 pt-2">
                  Mỗi tầng có: <span className="font-mono font-bold text-violet-900">{boxL} × {boxW} = {boxL * boxW}</span> khối lập phương
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">3 Kích thước không gian</span>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Chiều dài (a):</span>
                  <span className="font-mono font-bold text-violet-700">{boxL} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={boxL}
                  onChange={(e) => setBoxL(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Chiều rộng (b):</span>
                  <span className="font-mono font-bold text-violet-700">{boxW} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="5"
                  value={boxW}
                  onChange={(e) => setBoxW(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Chiều cao (c):</span>
                  <span className="font-mono font-bold text-violet-700">{boxH} tầng</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={boxH}
                  onChange={(e) => setBoxH(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
              </div>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-violet-900">Thể tích hình hộp:</span>
                <span className="text-3xl font-black text-violet-700 font-mono">
                  {boxVolume} cm³
                </span>
              </div>
              <div className="text-xs font-mono text-slate-700 bg-white p-2.5 rounded-xl border border-violet-200">
                V = a × b × c = {boxL} × {boxW} × {boxH} = <strong>{boxVolume} cm³</strong>
              </div>
              <p className="text-xs text-violet-950 leading-relaxed">
                💡 Thể tích chính là <strong>tổng số khối lập phương 1 cm³</strong> vừa khít bên trong chiếc hộp!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
