import React from 'react';
import PropTypes from 'prop-types';

const ProductImage = ({ className = 'h-[158px]', src }) => {
  if (!src) src = 'https://placehold.jp/275x158.png';

  return (
    <div className={className}>
      <img className="object-cover w-full h-full rounded-lg" src={src} alt="" />
    </div>
  );
};

ProductImage.propTypes = {};

export default ProductImage;
