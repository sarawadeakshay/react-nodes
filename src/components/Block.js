import './Block.css';
import PropTypes from "prop-types";

const Block = ({ block }) => {
  return (
    <div className="block">
      <div className="id">{block.id}</div>
      <div className="name">{block.attributes.data}</div>
    </div>
  );
}

Block.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string,
    attributes: PropTypes.shape({
      data: PropTypes.string
    })
  }).isRequired
}

export default Block;