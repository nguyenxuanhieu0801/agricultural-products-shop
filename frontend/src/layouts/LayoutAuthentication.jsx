import ErrorComponent from 'components/common/ErrorComponent';
import { IconHome } from 'components/icons';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router-dom';

const LayoutAuthentication = ({ children, heading = '' }) => {
  return (
    <div className="relative w-full min-h-screen p-10 bg-lite isolate dark:bg-darkBg">
      <Link to="/" className="inline-block mb-2">
        <IconHome />
      </Link>
      <div className="w-full bg-white rounded-xl max-w-[556px] px-5 py-8 lg:px-16 lg:py-12 mx-auto dark:bg-darkSecondary">
        <h1 className="mb-1 text-lg font-semibold text-center lg:text-xl lg:mb-3 text-text1 dark:text-white">
          {heading}
        </h1>
        {children}
      </div>
    </div>
  );
};

LayoutAuthentication.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default withErrorBoundary(LayoutAuthentication, {
  FallbackComponent: ErrorComponent,
});
