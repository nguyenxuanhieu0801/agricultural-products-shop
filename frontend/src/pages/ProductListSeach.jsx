import Layout from 'layouts/Layout';
import ProductItem from 'module/product/ProductItem';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductService } from 'services/productServices';

const ProductListSearch = () => {
  const [params] = useSearchParams();
  const name = params.get('search');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    document.title = 'Category Update';

    (async () => {
      const data = await ProductService.getAll({ name });
      setProducts(data);
    })();
  }, [name]);

  return (
    <Layout>
      <div className="max-w-[1170px] mx-auto mb-10">
        <h1 className="mb-10 text-2xl font-bold text-center text-primary">Danh sách sản phẩm</h1>
        <div className="grid grid-cols-4 gap-10">
          {products.length > 0 && products.map((item) => <ProductItem key={item.id} item={item} />)}
        </div>
      </div>
    </Layout>
  );
};

export default ProductListSearch;
