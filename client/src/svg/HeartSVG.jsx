import React from 'react';
import PropTypes from 'prop-types';

function HeartSVG({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={color} width="25px" height="25px" viewBox="0 0 32 32" version="1.1">
      <path d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z" />
    </svg>
  );
}

HeartSVG.propTypes = {
  color: PropTypes.string,
};

HeartSVG.defaultProps = {
  color: 'white',
};

export default HeartSVG;
