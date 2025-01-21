import PropTypes from 'prop-types';
import HeaderTitle from '../Generals/HeaderTitle';
import ActionIcons from '../Generals/ActionIcons';
import "../../CSS/AdminMainContentTop.css"

export default function MainContentTop({ title, onSearch, onAdd }) {
  return (
    <div className='AdminMainContentTop'
      
    >
      <HeaderTitle title={title} />
      <ActionIcons onSearch={onSearch} onAdd={onAdd} user="Admin"/>
    </div>
  );
}

MainContentTop.propTypes = {
  title: PropTypes.string.isRequired, 
  onSearch: PropTypes.func, 
  onAdd: PropTypes.func, 
};
