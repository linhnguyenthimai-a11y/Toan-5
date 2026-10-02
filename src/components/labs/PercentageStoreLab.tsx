import React, { useState } from 'react';
import { ShoppingBag, Tag, Calculator, CheckCircle2, AlertCircle } from 'lucide-react';

interface StoreItem {
  id: string;
  name: string;
  originalPrice: number;
  category: string;
  icon: string;
}

const STORE_ITEMS: StoreItem[] = [
  { id: '1', name: 'Bách Khoa Vũ Trụ Lớp 5', originalPrice: 160000, category: 'Sách & Tri Thức', icon: '📚' },
  { id: '2', name: 'Kính Hiển Vi Mini STEM', originalPrice: 320000, category: 'Dụng Cụ Khoa Học', icon: '🔬' },
  { id: '3', name: 'Ba Lô Dã Ngoại Dewey', originalPrice: 450000, category: 'Đồ Dùng Hoạt Động', icon: '🎒' },
  { id: '4', name: 'Bộ Cờ Vua Gỗ Trí Tuệ', originalPrice: 200000, category: 'Thể Thao Trí Tuệ', icon: '♟️' },
];

export const PercentageStoreLab: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<StoreItem>(STORE_ITEMS[0]);
  const [discountPercent, setDiscountPercent] = useState<number>(25);

  // Consecutive discount test state
  const [showConsecutiveTest, setShowConsecutiveTest] = useState<boolean>(false);
  const [disc1, setDisc1] = useState<number>(20);
  const [disc2, setDisc2] = useState<number>(10);

  // Direct calculation
  const discountAmount = Math.round((selectedItem.originalPrice * discountPercent) / 100);
  const finalPrice = selectedItem.originalPrice - discountAmount;

  // Consecutive calculation
  const priceAfterDisc1 = selectedItem.originalPrice * (1 - disc1 / 100);
  const priceAfterDisc2 = priceAfterDisc1 * (1 - disc2 / 100);
  const totalSavedConsecutive = selectedItem.originalPrice - priceAfterDisc2;
  const directSumDiscountPrice = selectedItem.originalPrice * (1 - (disc1 + disc2) / 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Cửa Hàng Học Đường & Tỉ Số Phần Trăm</h2>
          <p className="text-sm text-slate-500 mt-0.5">Khám phá cách tính phần trăm giảm giá, tiết kiệm thông minh và tránh bẫy giá cả.</p>
        </div>
        <button
          onClick={() => setShowConsecutiveTest(!showConsecutiveTest)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
            showConsecutiveTest
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          {showConsecutiveTest ? 'Đang Bật Thí Nghiệm Giảm 2 Lần' : 'Mở Thí Nghiệm: Giảm Giá Kép'}
        </button>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Item Selection & Discount Slider */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">
              1. Chọn sản phẩm trong hội sách
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {STORE_ITEMS.map((item) => {
                const isSelected = item.id === selectedItem.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</div>
                    <div className="text-xs font-mono font-semibold text-indigo-700 mt-1">
                      {item.originalPrice.toLocaleString('vi-VN')} đ
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Discount Slider */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-indigo-600" />
                Mức Giảm Giá (Discount):
              </span>
              <span className="text-xl font-extrabold text-indigo-600 font-mono">
                {discountPercent}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="70"
              step="5"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <button onClick={() => setDiscountPercent(10)} className="hover:text-slate-800">10%</button>
              <button onClick={() => setDiscountPercent(20)} className="hover:text-slate-800">20%</button>
              <button onClick={() => setDiscountPercent(30)} className="hover:text-slate-800">30%</button>
              <button onClick={() => setDiscountPercent(50)} className="hover:text-slate-800">50% (Một nửa)</button>
              <button onClick={() => setDiscountPercent(70)} className="hover:text-slate-800">70%</button>
            </div>
          </div>

          {/* Visual Percentage Breakdown Bar (100% split) */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-600 font-medium">
              <span>Trực quan thanh 100% giá trị:</span>
              <span className="text-slate-400">100% = {selectedItem.originalPrice.toLocaleString('vi-VN')} đ</span>
            </div>

            {/* Split Bar */}
            <div className="h-9 w-full bg-slate-100 rounded-xl overflow-hidden flex border border-slate-200 p-0.5">
              <div
                style={{ width: `${100 - discountPercent}%` }}
                className="bg-indigo-600 h-full rounded-lg transition-all duration-300 flex items-center justify-center text-white text-[11px] font-bold overflow-hidden px-1"
                title={`Bạn trả: ${100 - discountPercent}%`}
              >
                {100 - discountPercent > 15 ? `Bạn trả (${100 - discountPercent}%)` : `${100 - discountPercent}%`}
              </div>
              <div
                style={{ width: `${discountPercent}%` }}
                className="bg-emerald-500 h-full rounded-lg transition-all duration-300 flex items-center justify-center text-white text-[11px] font-bold overflow-hidden px-1 ml-0.5"
                title={`Tiết kiệm: ${discountPercent}%`}
              >
                {discountPercent > 15 ? `Bớt (${discountPercent}%)` : `${discountPercent}%`}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Receipt & Mathematical Steps */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
                <span className="font-bold text-slate-900 text-sm">Hóa Đơn Mua Sắm Thông Thái</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">#DEWEY-FAIR</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Sản phẩm:</span>
                <span className="font-bold text-slate-800">{selectedItem.name}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Giá gốc niêm yết:</span>
                <span className="font-mono tabular-nums text-slate-700">
                  {selectedItem.originalPrice.toLocaleString('vi-VN')} đ
                </span>
              </div>
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Số tiền được giảm ({discountPercent}%):</span>
                <span className="font-mono tabular-nums font-bold">
                  - {discountAmount.toLocaleString('vi-VN')} đ
                </span>
              </div>
              <div className="border-t border-dashed border-slate-300 pt-2.5 flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-sm">Giá Thực Trả:</span>
                <span className="text-2xl font-black text-indigo-600 font-mono tabular-nums">
                  {finalPrice.toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            {/* Explanation card */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <div className="font-semibold text-indigo-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Các bước tính chuẩn xác:
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-mono">
                1. Số tiền giảm = {selectedItem.originalPrice.toLocaleString('vi-VN')} × {discountPercent} ÷ 100 = <strong>{discountAmount.toLocaleString('vi-VN')} đ</strong>
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed font-mono">
                2. Giá sau giảm = {selectedItem.originalPrice.toLocaleString('vi-VN')} - {discountAmount.toLocaleString('vi-VN')} = <strong>{finalPrice.toLocaleString('vi-VN')} đ</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Consecutive Discount Experiment Modal / Expanded Section */}
      {showConsecutiveTest && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <h3 className="text-sm font-bold text-amber-900">
              Thử Nghiệm Tư Duy: "Giảm 20% rồi giảm tiếp 10%" có giống "Giảm ngay 30%" không?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Case A: Giảm ngay 30% */}
            <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs space-y-2">
              <div className="font-bold text-emerald-800">Phương án A: Giảm ngay một lần {disc1 + disc2}%</div>
              <div className="text-slate-600">
                Tiết kiệm được: <strong className="font-mono text-emerald-700">{((selectedItem.originalPrice * (disc1 + disc2)) / 100).toLocaleString('vi-VN')} đ</strong>
              </div>
              <div className="text-slate-700 font-semibold pt-1 border-t border-slate-100">
                Giá bạn trả: <span className="font-mono text-base font-bold text-emerald-600">{directSumDiscountPrice.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            {/* Case B: Giảm 20% rồi giảm 10% */}
            <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs space-y-2">
              <div className="font-bold text-amber-800">Phương án B: Giảm {disc1}% rồi giảm tiếp {disc2}%</div>
              <div className="text-slate-600">
                • Sau giảm {disc1}%: <span className="font-mono">{priceAfterDisc1.toLocaleString('vi-VN')} đ</span>
                <br />
                • Giảm tiếp {disc2}% của số tiền trên: còn <span className="font-mono text-amber-900 font-bold">{priceAfterDisc2.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="text-slate-700 font-semibold pt-1 border-t border-slate-100">
                Giá bạn trả: <span className="font-mono text-base font-bold text-amber-600">{priceAfterDisc2.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-100/70 rounded-xl text-xs text-amber-900 leading-relaxed font-medium">
            🎯 <strong>Kết luận tư duy:</strong> Phương án A giúp bạn tiết kiệm hơn <strong>{(priceAfterDisc2 - directSumDiscountPrice).toLocaleString('vi-VN')} đồng</strong>! Vì giảm {disc2}% lần hai chỉ tính trên giá đã giảm ({priceAfterDisc1.toLocaleString('vi-VN')} đ), chứ không tính trên giá gốc.
          </div>
        </div>
      )}
    </div>
  );
};
