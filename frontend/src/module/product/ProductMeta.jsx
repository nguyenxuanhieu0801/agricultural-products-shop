import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'utils/classNames';

// text = 'Raised of $1,900',

const ProductMeta = ({ price = '$2,000', text = '', size = 'small' }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <h4 className={classNames('font-semibold text-text2', size === 'small' ? 'text-small' : 'text-xl')}>{price}</h4>
      {/* <span className={classNames('text-text4', size === 'small' ? 'text-xs' : 'text-base')}>{text}</span>{' '} */}
    </div>
  );
};

ProductMeta.propTypes = {};

export default ProductMeta;
