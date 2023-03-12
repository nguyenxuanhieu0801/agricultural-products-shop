import React from 'react';

const LoadingSpinner = ({ className }) => {
  let defaultClassName = 'rounded-full border-primary border-t-transparent animate-spin border-b-transparent ';

  if (!className) defaultClassName += 'w-[40px] h-[40px] border-[5px]';

  return <div className={`${className} ${defaultClassName}`}></div>;
};

export default LoadingSpinner;
