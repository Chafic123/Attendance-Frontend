// import React from 'react';
import PropTypes from 'prop-types';

export default function ActionIcons({ onSearch, onAdd }) {
  return (
    <div>
      <img
        src="../public/Images/Search-icon.png"
        alt="Search Icon"
        style={{ marginRight: '10px', cursor: 'pointer' }}
        onClick={onSearch} 
      />
      <img
        src="../public/Images/Add-icon.png"
        alt="Add Icon"
        style={{ cursor: 'pointer' }}
        onClick={onAdd} 
      />
    </div>
  );
}

ActionIcons.propTypes = {
  onSearch: PropTypes.func.isRequired, 
  onAdd: PropTypes.func.isRequired, 
};
