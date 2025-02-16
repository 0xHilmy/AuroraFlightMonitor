import React from 'react';

function convertFlightMode(mode) {
  switch (mode) {
    case 0:
      return 'MANUAL';
    case 1:
      return 'CIRCLE';
    case 2:
      return 'STABILIZE';
    case 3:
      return 'TRAINING';
    case 4:
      return 'ACRO';
    case 5:
      return 'FBWA';
    case 6:
      return 'FBWB';
    case 7:
      return 'CRUISE';
    default:
      return 'MANUAL';
  }
}

const FlightMode = ({ mode }) => {
  const flightMode = convertFlightMode(mode);
  return (
    <h2 className='text-white text-3xl font-bold'>
      {flightMode}
    </h2>
  );
};

export default FlightMode;
