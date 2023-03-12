import ErrorComponent from 'components/common/ErrorComponent';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { useController } from 'react-hook-form';
import classNames from 'utils/classNames';

const Input = ({ type = 'text', name, control, children, error = '', ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });

  return (
    <>
      <div className="relative">
        <input
          id={name}
          type={type}
          className={classNames(
            'w-full px-6 py-4 text-sm font-medium border placeholder:text-text4 rounded-xl bg-slate-200',
            error.length > 0 ? 'border-error text-error' : 'border-strock text-text1 ',
            children ? 'pr-16' : ''
          )}
          {...rest}
          {...field}
        />
        {children && <span className="absolute right-6 top-2/4 -translate-y-2/4">{children}</span>}
      </div>
      {error.length > 0 && <p className="mt-2 text-sm font-medium text-red-500">{error}</p>}
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  control: PropTypes.any.isRequired,
  error: PropTypes.string,
  children: PropTypes.node,
};

export default withErrorBoundary(Input, {
  FallbackComponent: ErrorComponent,
});
