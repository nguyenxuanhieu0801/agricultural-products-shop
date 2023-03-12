import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Layout from 'layouts/Layout';
import { useParams } from 'react-router-dom';
import { CategoryService } from 'services/categoryServices';
import ProductItem from 'module/product/ProductItem';
import { Heading } from 'components/common';

const ProductList = () => {
  let { id } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    document.title = 'Category Update';

    (async () => {
      const { products } = await CategoryService.findById(id);
      setProducts(products);
    })();
  }, [id]);

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

ProductList.propTypes = {};

export default ProductList;
