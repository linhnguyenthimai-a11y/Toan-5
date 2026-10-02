import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Compass, MapPin } from 'lucide-react';

export const SpeedMotionLab: React.FC = () => {
  const [mode, setMode] = useState<'single' | 'opposite' | 'same_direction'>('opposite');

  // Single vehicle state
  const [speedSingle, setSpeedSingle] = useState<number>(40); // km/h
  const [distSingle, setDistSingle] = useState<number>(100); // km

  // Two vehicles opposite state
  const [v1Opposite, setV1Opposite] = useState<number>(12); // km/h (bạn Khôi đạp xe)
  const [v2Opposite, setV2Opposite] = useState<number>(18); // km/h (bạn Minh đạp xe)
  const [totalDistOpposite, setTotalDistOpposite] = useState<number>(15); // km

  // Animation playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // 0 to 1
  const animationFrameRef = useRef<number | null>(null);

  // Calculated values
  const timeSingle = distSingle / speedSingle; // hours
  const sumSpeedOpposite = v1Opposite + v2Opposite;
  const timeMeetHours = totalDistOpposite / sumSpeedOpposite;
  const timeMeetMinutes = Math.round(timeMeetHours * 60);
  const meetPointKm = (v1Opposite * timeMeetHours).toFixed(1);

  // Animation loop
  useEffect(() => {
    if (isPlaying) {
      const step = () => {
        setProgress((prev) => {
          if (prev >= 1) {
            setIsPlaying(false);
            return 1;
          }
          return prev + 0.006;
        });
        animationFrameRef.current = requestAnimationFrame(step);
      };
      animationFrameRef.current = requestAnimationFrame(step);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header & Modes */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Phòng Thí Nghiệm Toán Chuyển Động Đều</h2>
          <p className="text-sm text-slate-500 mt-0.5">Trực quan hoá vận tốc, quãng đường, thời gian và bài toán hai xe gặp nhau.</p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => { setMode('opposite'); handleReset(); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'opposite' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hai Xe Đi Ngược Chiều Gặp Nhau
          </button>
          <button
            onClick={() => { setMode('single'); handleReset(); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'single' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1 Xe Buýt (s = v × t)
          </button>
        </div>
      </div>

      {/* Mode: Opposite Direction (Ngược chiều gặp nhau) */}
      {mode === 'opposite' && (
        <div className="space-y-6">
          {/* Animated Race Track Canvas */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Đường Đua Thực Nghiệm: Nhà Bạn Khôi (A) ➔ 🌟 ⬅ Nhà Bạn Minh (B)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg text-white transition-all shadow-xs ${
                    isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isPlaying ? <><Pause className="w-3.5 h-3.5" /> Tạm dừng</> : <><Play className="w-3.5 h-3.5" /> Chạy thử nghiệm</>}
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200"
                  title="Đặt lại đường đua"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* SVG Track */}
            <div className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-inner overflow-hidden">
              <svg className="w-full max-w-[650px] mx-auto h-[140px]" viewBox="0 0 650 140">
                {/* Track road */}
                <rect x="40" y="55" width="570" height="30" rx="6" fill="#334155" />
                <line x1="40" y1="70" x2="610" y2="70" stroke="#f8fafc" strokeWidth="2" strokeDasharray="12 10" />

                {/* Milestone A (Khôi's house) */}
                <circle cx="40" cy="70" r="14" fill="#2563eb" />
                <text x="40" y="74" textAnchor="middle" fill="#fff" className="text-[10px] font-bold">A</text>
                <text x="40" y="110" textAnchor="middle" className="text-[11px] font-bold fill-slate-700">Khôi ({v1Opposite} km/h)</text>

                {/* Milestone B (Minh's house) */}
                <circle cx="610" cy="70" r="14" fill="#059669" />
                <text x="610" y="74" textAnchor="middle" fill="#fff" className="text-[10px] font-bold">B</text>
                <text x="610" y="110" textAnchor="middle" className="text-[11px] font-bold fill-slate-700">Minh ({v2Opposite} km/h)</text>

                {/* Theoretical Meeting Flag marker */}
                {(() => {
                  const meetX = 40 + (v1Opposite / sumSpeedOpposite) * 570;
                  return (
                    <g transform={`translate(${meetX}, 30)`}>
                      <line x1="0" y1="0" x2="0" y2="35" stroke="#e11d48" strokeWidth="2" />
                      <polygon points="0,0 20,8 0,16" fill="#e11d48" />
                      <text x="0" y="-6" textAnchor="middle" className="text-[10px] font-bold fill-rose-600">
                        Gặp nhau ({meetPointKm} km từ A)
                      </text>
                    </g>
                  );
                })()}

                {/* Moving Bike 1 (Khôi - blue) */}
                {(() => {
                  const currentDistRatio = (v1Opposite / sumSpeedOpposite) * progress;
                  const currentX = 40 + currentDistRatio * 570;
                  return (
                    <g transform={`translate(${currentX}, 55)`}>
                      <rect x="-14" y="-8" width="28" height="18" rx="4" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
                      <text x="0" y="5" textAnchor="middle" fill="#fff" className="text-[9px] font-bold">🚴 Khôi</text>
                    </g>
                  );
                })()}

                {/* Moving Bike 2 (Minh - green) */}
                {(() => {
                  const currentDistRatio = (v2Opposite / sumSpeedOpposite) * progress;
                  const currentX = 610 - currentDistRatio * 570;
                  return (
                    <g transform={`translate(${currentX}, 75)`}>
                      <rect x="-14" y="-8" width="28" height="18" rx="4" fill="#059669" stroke="#047857" strokeWidth="1.5" />
                      <text x="0" y="5" textAnchor="middle" fill="#fff" className="text-[9px] font-bold">🚴 Minh</text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Current progress timeline */}
            <div className="flex justify-between items-center text-xs text-slate-600 font-mono">
              <span>Bắt đầu (0 phút)</span>
              <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Thời gian trôi qua: {Math.round(progress * timeMeetMinutes)} / {timeMeetMinutes} phút
              </span>
              <span>Gặp nhau ({timeMeetMinutes} phút)</span>
            </div>
          </div>

          {/* Controls & Math Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sliders */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Điều chỉnh thông số
              </span>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-blue-700 font-medium">Vận tốc Khôi (v₁):</span>
                  <span className="font-bold font-mono text-blue-700">{v1Opposite} km/h</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="25"
                  value={v1Opposite}
                  onChange={(e) => { setV1Opposite(Number(e.target.value)); handleReset(); }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-700 font-medium">Vận tốc Minh (v₂):</span>
                  <span className="font-bold font-mono text-emerald-700">{v2Opposite} km/h</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="25"
                  value={v2Opposite}
                  onChange={(e) => { setV2Opposite(Number(e.target.value)); handleReset(); }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-medium">Tổng quãng đường (s):</span>
                  <span className="font-bold font-mono text-slate-800">{totalDistOpposite} km</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={totalDistOpposite}
                  onChange={(e) => { setTotalDistOpposite(Number(e.target.value)); handleReset(); }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
                />
              </div>
            </div>

            {/* Step-by-Step Mathematical Formula */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                Bản Chất: Vì sao lại lấy tổng vận tốc?
              </span>
              <div className="text-xs text-slate-700 space-y-2">
                <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                  <strong>1. Tổng vận tốc (Quãng đường cùng thu hẹp trong 1 giờ):</strong>
                  <div className="font-mono text-blue-800 font-bold mt-0.5">
                    v_tổng = v₁ + v₂ = {v1Opposite} + {v2Opposite} = {sumSpeedOpposite} km/h
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                  <strong>2. Thời gian để hai bạn gặp nhau:</strong>
                  <div className="font-mono text-blue-800 font-bold mt-0.5">
                    t = s ÷ (v₁ + v₂) = {totalDistOpposite} ÷ {sumSpeedOpposite} = {timeMeetHours.toFixed(2)} giờ ({timeMeetMinutes} phút)
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                  <strong>3. Vị trí điểm gặp cách nhà Khôi (điểm A):</strong>
                  <div className="font-mono text-blue-800 font-bold mt-0.5">
                    s_Khôi = v₁ × t = {v1Opposite} × {timeMeetHours.toFixed(2)} = {meetPointKm} km
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode: Single Vehicle (s = v * t) */}
      {mode === 'single' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Xe Buýt Trường Học Dewey Di Chuyển
            </span>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Vận tốc xe buýt (v):</span>
                  <span className="font-mono font-bold text-blue-600">{speedSingle} km/h</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  value={speedSingle}
                  onChange={(e) => setSpeedSingle(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Quãng đường cần đi (s):</span>
                  <span className="font-mono font-bold text-slate-800">{distSingle} km</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={distSingle}
                  onChange={(e) => setDistSingle(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
                />
              </div>
            </div>

            {/* Visual simulation card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
              <div className="text-3xl mb-1">🚌</div>
              <div className="text-xs font-bold text-slate-800">Xe Buýt Tuyến Liên Tỉnh</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Đi với tốc độ đều <span className="font-mono font-bold text-blue-700">{speedSingle} km/h</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-baseline justify-between border-b border-blue-100 pb-3">
              <span className="text-sm font-bold text-blue-900">Thời gian xe chạy (t):</span>
              <span className="text-3xl font-black text-blue-700 font-mono">
                {timeSingle.toFixed(2)} giờ
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between bg-white p-2.5 rounded-xl border border-blue-100">
                <span>Công thức:</span>
                <span className="font-mono font-bold">t = s ÷ v</span>
              </div>
              <div className="flex justify-between bg-white p-2.5 rounded-xl border border-blue-100">
                <span>Đổi ra giờ và phút:</span>
                <span className="font-mono font-bold text-blue-900">
                  {Math.floor(timeSingle)} giờ {Math.round((timeSingle - Math.floor(timeSingle)) * 60)} phút
                </span>
              </div>
            </div>

            <div className="p-3 bg-white/80 rounded-xl text-xs text-blue-950">
              💡 <strong>Tam giác liên hệ thần kỳ:</strong> Muốn tìm quãng đường: <span className="font-mono font-bold">s = v × t</span>. Muốn tìm vận tốc: <span className="font-mono font-bold">v = s ÷ t</span>. Muốn tìm thời gian: <span className="font-mono font-bold">t = s ÷ v</span>.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
