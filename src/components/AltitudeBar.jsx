import React from 'react';

function AltitudeBar({ altitude }) {
  const minAltitude = -10;
  const maxAltitude = 200;
  const tickInterval = 5;
  const tickSpacing = 20; // Space between each altitude number in pixels

  const barHeight = 400; // Height of the bar in pixels
  const range = maxAltitude - minAltitude;

  // Calculate the offset for centering the altitude
  const normalizedAltitude = ((altitude - minAltitude) / range) * barHeight;
  const offset = ((barHeight / 2) - normalizedAltitude);

  const ticks = [];
  for (let i = minAltitude; i <= maxAltitude; i += tickInterval) {
    const tickIndex = (i - minAltitude) / tickInterval;
    const tickPosition = (tickIndex * tickSpacing);

    ticks.push(
      <div
        key={i}
        className="absolute left-1/2 transform -translate-x-1/2 text-white text-sm flex justify-center items-center"
        style={{ top: `${barHeight - tickPosition}px`, width: '100%' }}
      >
        {`${i}m`}
      </div>
    );
  }

  return (
    <div className="relative h-full w-16 bg-transparent rounded-lg border border-white flex justify-center items-center overflow-hidden">
      <div
        className="absolute top-0 bottom-0 left-0 right-0"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {ticks}
      </div>
      <div
        className="absolute flex items-center right-full transform translate-x-2 -translate-y-1/2"
        style={{ top: '50%' }}
      >
        <div className="w-0 h-0 border-t-4 border-b-4 border-t-transparent border-b-transparent border-r-8 border-r-white"></div>
      </div>
      <div
        className="absolute left-0 transform -translate-x-1/2 text-white"
        style={{ top: '50%', whiteSpace: 'nowrap' }}
      >
       
      </div>
    </div>
  );
}

export default AltitudeBar;
