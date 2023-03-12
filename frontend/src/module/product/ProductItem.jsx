import { useNavigate } from 'react-router-dom';
import ProductTitle from './ProductTitle';

const ProductItem = ({ item }) => {
  const navigate = useNavigate();

  const handleOnClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="flex flex-row" onClick={() => handleOnClick(item.id)}>
      <div className="border shadow-1 rounded-xl border-slate-200">
        <img
          src={item.image || 'https://placehold.jp/275x158.png'}
          className="h-[200px] object-cover rounded-xl w-full flex-shrink-0"
          alt="Ảnh"
        />
        <div className="flex flex-col justify-between flex-1 p-4">
          <ProductTitle className="mb-1 text-sm font-semibold">{item.name}</ProductTitle>
          <div className="flex items-center justify-end gap-x-3">
            <span className="text-xl font-bold text-text1">{item.price}đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {};

export default ProductItem;
