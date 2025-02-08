import PropTypes from 'prop-types';
import HeaderTitle from '../Generals/HeaderTitle';
import ActionIcons from '../Generals/ActionIcons';
import "../../CSS/AdminMainContentTop.css"

export default function MainContentTop({ title, onSearch, showAdminPanel }) {
  return (
    <div className='AdminMainContentTop'
      
    >
      <HeaderTitle title={title} />
      <ActionIcons onSearch={onSearch} user="Admin" showAdminPanel={showAdminPanel}/>
    </div>
  );
}

MainContentTop.propTypes = {
  title: PropTypes.string.isRequired, 
  onSearch: PropTypes.func, 
  onAdd: PropTypes.func, 
};
