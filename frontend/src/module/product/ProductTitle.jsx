import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'utils/classNames';

const ProductTitle = ({ children, className = 'mb-1 font-semibold' }) => {
  return <h3 className={classNames('text-text1', className)}>{children}</h3>;
};

ProductTitle.propTypes = {};

export default ProductTitle;
