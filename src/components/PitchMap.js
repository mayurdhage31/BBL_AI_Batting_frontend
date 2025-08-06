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
        <div className="relative h-32 rounded-lg border-2 border-gray-600 mx-8" style={{ backgroundColor: '#8B4513' }}>
          
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
          
          {/* Length boxes container - all same size */}
          <div className="absolute left-12 right-12 top-2 bottom-2 flex">
            {sortedData.map((item, index) => {
              const lengthName = item[dataKey];
              const value = item[valueKey];
              
              return (
                <div 
                  key={lengthName}
                  className="flex-1 relative flex flex-col justify-center items-center text-white font-bold border-2 border-white mx-0.5"
                  style={{
                    backgroundColor: getBoxColor(value),
                    opacity: 0.8
                  }}
                >
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
        </div>
        
        {/* Values displayed above the pitch - aligned with the boxes */}
        <div className="flex mt-2 mx-8">
          {/* Left spacing to align with pitch lines */}
          <div style={{ width: '48px' }}></div>
          
          {/* Values for length boxes */}
          <div className="flex flex-1">
            {sortedData.map((item, index) => {
              const lengthName = item[dataKey];
              const value = item[valueKey];
              const isStrikeRate = valueKey === 'Strike Rate';
              
              return (
                <div 
                  key={`value-${lengthName}`}
                  className="flex-1 text-center mx-0.5"
                >
                  <div 
                    className="text-lg font-bold"
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
          
          {/* Right spacing to align with pitch lines */}
          <div style={{ width: '48px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PitchMap;