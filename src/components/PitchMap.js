import React from 'react';

const PitchMap = ({ data, dataKey, valueKey }) => {
  // Define the order for bowling lengths
  const lengthOrder = ['Full Toss', 'Yorker', 'Full Length', 'Good Length', 'Short', 'Bouncer'];
  
  // Sort data by the predefined order and filter only available lengths
  const sortedData = lengthOrder
    .map(length => data.find(item => item[dataKey] === length))
    .filter(item => item !== undefined);

  // Function to get color based on strike rate - simplified to green/yellow/red
  const getStrikeRateColor = (value) => {
    const numValue = parseFloat(value);
    if (numValue >= 130) return '#22c55e'; // Green - High performance
    if (numValue >= 110) return '#eab308'; // Yellow - Medium performance  
    return '#dc2626'; // Red - Low performance
  };

  // Function to get background color for length boxes
  const getBoxColor = (value) => {
    const numValue = parseFloat(value);
    if (numValue >= 130) return '#22c55e'; // Green - High performance
    if (numValue >= 110) return '#eab308'; // Yellow - Medium performance
    return '#dc2626'; // Red - Low performance
  };

  // Function to format values - remove decimals for Total Runs and Balls Faced
  const formatValue = (value, key) => {
    if (key === 'Total Runs' || key === 'Balls Faced') {
      return Math.round(parseFloat(value)).toString();
    }
    return typeof value === 'number' ? value.toFixed(2) : value;
  };

  return (
    <div className="mt-6">
      {/* Cricket pitch visualization */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Main pitch container with brown background */}
        <div className="relative h-32 rounded-lg border-2 border-gray-600 mx-8" style={{ backgroundColor: '#D2B48C' }}>
          
          {/* Larger stumps at the start of the pitch (bowler's end) - centered */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
            <div className="flex flex-col space-y-1">
              <div className="h-2 w-8 bg-yellow-200 rounded-sm border border-yellow-300"></div>
              <div className="h-2 w-8 bg-yellow-200 rounded-sm border border-yellow-300"></div>
              <div className="h-2 w-8 bg-yellow-200 rounded-sm border border-yellow-300"></div>
            </div>
          </div>
          
          {/* Larger stumps at the end of the pitch (batsman's end) - centered */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
            <div className="flex flex-col space-y-1">
              <div className="h-2 w-8 bg-yellow-200 rounded-sm border border-yellow-300"></div>
              <div className="h-2 w-8 bg-yellow-200 rounded-sm border border-yellow-300"></div>
              <div className="h-2 w-8 bg-yellow-200 rounded-sm border border-yellow-300"></div>
            </div>
          </div>
          
          {/* Pitch lines at either end */}
          <div className="absolute left-12 top-0 bottom-0 w-1 bg-white opacity-80"></div>
          <div className="absolute right-12 top-0 bottom-0 w-1 bg-white opacity-80"></div>
          
          {/* Length boxes container - compressed to 60% from left */}
          <div className="absolute left-12 top-2 bottom-2 flex" style={{ width: '60%' }}>
            {sortedData.map((item, index) => {
              const lengthName = item[dataKey];
              const value = item[valueKey];
              const isFullToss = lengthName === 'Full Toss';
              
              return (
                <div 
                  key={lengthName}
                  className="flex-1 relative flex flex-col justify-center items-center text-white font-bold"
                  style={{
                    backgroundColor: getBoxColor(value),
                    opacity: 0.8,
                    // Full Toss gets white crease lines, others get no border
                    border: isFullToss ? '2px solid white' : 'none',
                    // Add white lines above and below Full Toss to simulate batting crease
                    borderTop: isFullToss ? '3px solid white' : 'none',
                    borderBottom: isFullToss ? '3px solid white' : 'none'
                  }}
                >
                  {/* Additional crease lines for Full Toss */}
                  {isFullToss && (
                    <>
                      <div className="absolute -top-1 left-0 right-0 h-1 bg-white"></div>
                      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-white"></div>
                    </>
                  )}
                  
                  {/* Length name - rotated vertically */}
                  <div 
                    className="text-xs font-bold text-center leading-tight px-1"
                    style={{
                      transform: 'rotate(-90deg)',
                      whiteSpace: 'nowrap',
                      color: '#ffffff',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                    }}
                  >
                    {lengthName}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Right 40% area with normal pitch color (no zones) */}
          <div className="absolute right-12 top-2 bottom-2" style={{ width: '40%', left: '60%' }}>
            {/* This area remains empty with just the pitch background color */}
          </div>
        </div>
        
        {/* Values displayed below the pitch - aligned with the compressed boxes */}
        <div className="flex mx-8 mt-2">
          {/* Left spacing to align with pitch lines */}
          <div style={{ width: '48px' }}></div>
          
          {/* Values for length boxes - only for the 60% compressed area */}
          <div className="flex" style={{ width: '60%' }}>
            {sortedData.map((item, index) => {
              const lengthName = item[dataKey];
              const value = item[valueKey];
              const isStrikeRate = valueKey === 'Strike Rate';
              
              return (
                <div 
                  key={`value-${lengthName}`}
                  className="flex-1 text-center"
                >
                  <div 
                    className="text-lg font-bold mt-1"
                    style={{
                      color: isStrikeRate ? getStrikeRateColor(value) : '#ffffff'
                    }}
                  >
                    {formatValue(value, valueKey)}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Right 40% area - no values displayed */}
          <div style={{ width: '40%' }}></div>
          
          {/* Right spacing to align with pitch lines */}
          <div style={{ width: '48px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PitchMap;