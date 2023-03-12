import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'utils/classNames';

const Button = ({ type = 'button', children, className = '', isLoading = false, ...rest }) => {
  const child = !!isLoading ? (
    <div className="w-10 h-10 border-4 border-white rounded-full border-t-transparent animate-spin border-b-transparent"></div>
  ) : (
    children
  );

  let defaultClassName = 'min-h-[56px] p-4 text-base font-semibold rounded-xl flex justify-center items-center';

  switch (rest.kind) {
    case 'primary':
      defaultClassName += ' bg-primary text-white';
      break;
    case 'secondary':
      defaultClassName += ' bg-secondary text-white';
      break;
    case 'ghost':
      defaultClassName += ' bg-secondary bg-opacity-10 text-secondary';
      break;
    default:
      break;
  }
  if (rest.href)
    return (
      <Link to={rest.href} className={classNames(className, defaultClassName)}>
        {child}
      </Link>
    );

  return (
    <button
      className={classNames(defaultClassName, isLoading ? 'opacity-50 pointer-events-none' : '', className)}
      type={type}
      {...rest}
    >
      {child}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  href: PropTypes.string,
  kind: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
};

export default Button;
