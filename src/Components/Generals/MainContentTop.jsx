// import React from 'react';
import PropTypes from 'prop-types';
import HeaderTitle from './HeaderTitle';
import ActionIcons from './ActionIcons';

export default function MainContentTop({ title, onSearch, onAdd }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <HeaderTitle title={title} />
      <ActionIcons onSearch={onSearch} onAdd={onAdd} />
    </div>
  );
}

MainContentTop.propTypes = {
  title: PropTypes.string.isRequired, 
  onSearch: PropTypes.func, 
  onAdd: PropTypes.func, 
};
