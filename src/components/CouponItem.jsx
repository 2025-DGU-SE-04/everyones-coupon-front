export default function CouponItem({ coupon, onFeedback }) {
    return (
      <div className="w-full bg-white rounded-xl shadow p-4 mb-3 flex justify-between items-center">
        <div>
          <div className="text-lg font-semibold">{coupon.code}</div>
          <div className="text-gray-600">{coupon.reward}</div>
          <div className="text-sm text-gray-500">
            {coupon.expire ? `만료: ${coupon.expire}` : "만료일 없음"}
          </div>
        </div>
  
        <button
          className="bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200"
          onClick={onFeedback}
        >
          피드백
        </button>
      </div>
    );
  }
  