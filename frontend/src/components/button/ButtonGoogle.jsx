import ErrorComponent from "components/common/ErrorComponent";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const ButtonGoogle = ({ text = "", onClick = () => {} }) => {
  return (
    <button
      className="flex items-center justify-center w-full py-4 mb-5 text-base font-semibold border dark:border-darkStroke dark:text-white gap-x-3 border-strock rounded-xl text-text2"
      onClick={onClick}
    >
      <img srcSet="/icon-google.png 2x" alt="icon-google" />
      <span>{text}</span>
    </button>
  );
};

ButtonGoogle.protoTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default withErrorBoundary(ButtonGoogle, {
  FallbackComponent: ErrorComponent,
});
