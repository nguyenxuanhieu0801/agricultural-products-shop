const CartSummury = ({ title = '', total, children }) => {
  return (
    <div className="w-full max-w-[400px] shadow-1 bg-white rounded-3xl p-5">
      <h3 className="mb-6 text-lg font-semibold leading-normal text-text2">{title}</h3>
      <div className="px-5">
        <div className="flex items-center justify-between text-base font-bold mb-7">
          <span>TỔNG</span>
          <span>{total}đ</span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CartSummury;
