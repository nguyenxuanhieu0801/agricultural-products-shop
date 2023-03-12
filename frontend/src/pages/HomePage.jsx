import { LoadingSpinner } from 'components/loading';
import Layout from 'layouts/Layout';
import HomeBanner from 'module/home/HomeBanner';
import ProductItem from 'module/product/ProductItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchProducts } from 'redux/features/productSlice';
import { CategoryService } from 'services/categoryServices';

const HomePage = () => {
  const dispatch = useDispatch();
  const [categries, setCategries] = useState([]);
  const navigate = useNavigate();

  const { data: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    document.title = 'Home';

    (async () => {
      try {
        dispatch(
          fetchProducts({
            page: 1,
            limit: 12,
          })
        );
        const listCategory = await CategoryService.getAll();
        setCategries(listCategory);
      } catch (error) {
        toast.error('Lỗi Server');
      }
    })();
  }, [dispatch]);

  const onClick = (id) => {
    navigate(`/category/${id}`);
  };

  return (
    <Layout>
      <HomeBanner />
      <div className="max-w-[1170px] mx-auto mb-10">
        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="">
            <div className="grid grid-cols-3 gap-5 mb-6 text-center text-white">
              {categries.length > 0 &&
                categries.map((item) => (
                  <div key={item.id} className="p-10 rounded-xl bg-primary" onClick={() => onClick(item.id)}>
                    {item.name}
                  </div>
                ))}
            </div>

            <div className="grid grid-cols-4 gap-10">
              {products.length > 0 && products.map((item) => <ProductItem key={item.id} item={item} />)}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
