import PropTypes from "prop-types";
import classNames from "utils/classNames";

const Heading = ({ children, className = "", number = null }) => {
  return (
    <div className={classNames("text-lg font-semibold text-text1 mb-5", className)}>
      {children}

      {number && <span className="text-secondary">{`(${number})`}</span>}
    </div>
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Heading;
