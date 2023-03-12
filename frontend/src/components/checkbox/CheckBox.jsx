import PropTypes from "prop-types";
import classNames from "utils/classNames";

const CheckBox = ({ checked = true, name, onClick = () => {}, children, ...rest }) => {
  return (
    <div className="flex items-center gap-x-5">
      <div
        className={classNames(
          "inline-flex items-center p-1 text-white w-5 h-5 border rounded cursor-pointer justify-center",
          checked ? "bg-primary border-primary" : "border-strock dark:border-text3"
        )}
        onClick={onClick}
      >
        <input type="checkbox" name={name} className="hidden" onChange={() => {}} />
        <span className={classNames(checked ? "" : "opacity-0 invisible")}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      {children && (
        <div onClick={onClick} className="cursor-pointer">
          {children}
        </div>
      )}
    </div>
  );
};

CheckBox.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default CheckBox;
