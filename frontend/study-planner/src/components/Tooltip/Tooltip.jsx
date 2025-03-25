import PropTypes from "prop-types";

const Tooltip = ({ text }) => (
  <span className="absolute left-full ml-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600 text-white text-sm rounded py-1 px-2 z-50">
    {text}
  </span>
);

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Tooltip;
