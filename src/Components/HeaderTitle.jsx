// import React from 'react';
import PropTypes from 'prop-types';

export default function HeaderTitle({ title }) {
  return (
    <p
      style={{
        fontSize: '36px',
        fontWeight: 'bold',
        color: 'rgba(84, 51, 129, 1)',
      }}
    >
      {title}
    </p>
  );
}

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
