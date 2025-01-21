import PropTypes from 'prop-types';
import "../../CSS/HeaderTitle.css"

export default function HeaderTitle({ title }) {
  return (
    <p className='Header-title'
      
    >
      {title}
    </p>
  );
}

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
