// import React from 'react';
import PropTypes from 'prop-types';
import HeaderTitle from '../Generals/HeaderTitle';
import ActionIcons from '../Generals/ActionIcons';

export default function MainContentTopSI({ title, onSearch, onAdd }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <HeaderTitle title={title} />
      <ActionIcons onSearch={onSearch} onAdd={onAdd} DashboardSelected={title}/>
    </div>
  );
}

MainContentTopSI.propTypes = {
  title: PropTypes.string.isRequired, 
  onSearch: PropTypes.func, 
  onAdd: PropTypes.func, 
};
