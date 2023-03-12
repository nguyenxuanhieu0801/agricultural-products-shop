import { Button } from 'components/button';
import { IconMinus, IconPlus } from 'components/icons';
import Layout from 'layouts/Layout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from 'redux/features/cartSlice';
import { ProductService } from 'services/productServices';
import { getToken } from 'utils/getToken';

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const data = await ProductService.findById(id);
      setProduct(data.product);
      document.title = data.product.name;
    })();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập');
      return;
    }

    try {
      const body = {
        productId: +id,
        quantity,
      };

      const token = getToken();
      dispatch(addToCart({ body, token })).unwrap();
      toast.success('Thêm vào giỏ thành công');
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDecreaseItem = () => {
    const value = quantity - 1;
    if (value > 0) setQuantity(value);
  };

  const handleIncreaseItem = () => {
    const value = quantity + 1;
    if (value <= product.quantity) setQuantity(value);
  };

  return (
    <Layout>
      <div className="max-w-[1170px] mx-auto">
        <div className="flex items-start gap-x-12 mb-4 w-full max-w-[1066px]">
          <div className="flex-1">
            <div className="h-[398px] mb-8">
              <img
                src={product.image || 'https://placehold.jp/450x450.png'}
                alt=""
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
          </div>
          <div className="flex-1 max-w-[450px]">
            <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
            <div className="mb-4 text-2xl font-medium text-red-500 ">
              <strong className="">{product.price}₫</strong>
            </div>
            <div className="mb-4">
              <div className="flex items-center px-6 py-4 gap-x-3">
                <div className="w-6 h-6 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-full h-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-base">HÀNG TƯƠI CHẤT LƯỢNG</p>
              </div>
              <div className="flex items-center justify-start px-6 py-4 gap-x-3">
                <div className="w-6 h-6 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-full h-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-base">THÂN THIỆN, VUI VẺ</p>
              </div>
            </div>

            {product.quantity === 0 ? (
              <div className="mb-4 text-2xl font-medium text-red-500 ">
                <strong className="">Hết hàng</strong>
              </div>
            ) : (
              <>
                <h3 className="mb-3">Số lượng</h3>

                <div className="flex justify-start mb-4 items">
                  <button
                    type="button"
                    className="flex items-center justify-center h-[40px] w-[40px] border border-solid border-[#ccc] rounded-tl-md rounded-bl-md bg-[#ddd] rounded-r-0"
                    onClick={() => handleDecreaseItem()}
                  >
                    <IconMinus />
                  </button>

                  <div className="w-[40px] h-[40px] border border-solid border-[#ccc] flex items-center justify-center">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    className="flex items-center justify-center h-[40px] w-[40px] border border-solid border-[#ccc] rounded-tr-md rounded-br-md bg-[#ddd] rounded-r-0"
                    onClick={() => handleIncreaseItem()}
                  >
                    <IconPlus />
                  </button>
                </div>
              </>
            )}
            {product.quantity > 0 && (
              <div className="flex items-center justify-start">
                <Button className="w-[218px] text-white bg-primary" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="p-2 mt-5 border shadow-1 rounded-xl border-slate-200">
          <h2 className="text-2xl text-center">Mô tả</h2>
          <div
            className=""
            dangerouslySetInnerHTML={{
              __html: product.description || '',
            }}
          ></div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;

{
  /* <div className="container">
        <div className="flex gap-x-9">
          <div className="w-[450px] h-[450px]">
            <img
              src={product.image || 'https://placehold.jp/450x450.png'}
              alt="Girl in a jacket"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 bg-slate-100">
            <h1>{product.name}</h1>
            <div className="bg-red-100">{product.price} VND</div>
            <Button className="w-[200px]" kind="primary" onClick={() => handleAddToCart()}>
              Add to cart
            </Button>
          </div>
        </div>
      </div> */
}
