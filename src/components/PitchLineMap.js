import React from 'react';

const PitchLineMap = ({ data, dataKey, valueKey }) => {
  // Define the order for bowling lines (from left to right on pitch)
  const lineOrder = ['Wide Outside Off', '4th/5th Stump', 'Middle & Off Stump', 'On Leg Stump'];
  
  // Handle case where data is undefined or empty
  if (!data || data.length === 0) {
    return (
      <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
        <p className="text-gray-600">Line statistics data is not available.</p>
      </div>
    );
  }
  
  // Sort data by the predefined order and filter only available lines
  const sortedData = lineOrder
    .map(line => data.find(item => item && item[dataKey] === line))
    .filter(item => item !== undefined);

  // Function to format values - remove decimals for Total Runs and Balls Faced
  const formatValue = (value, key) => {
    if (key === 'Total Runs' || key === 'Balls Faced') {
      return Math.round(parseFloat(value)).toString();
    }
    return typeof value === 'number' ? value.toFixed(2) : value;
  };

  // Function to get color based on strike rate
  const getStrikeRateColor = (value) => {
    const numValue = parseFloat(value);
    if (numValue >= 130) return '#22c55e'; // Green - High performance
    if (numValue >= 110) return '#eab308'; // Yellow - Medium performance  
    return '#dc2626'; // Red - Low performance
  };

  return (
    <div className="mt-6">
      {/* Cricket pitch visualization for lines */}
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
          
          {/* Cricket line markings - showing actual stump lines and wide lines */}
          <div className="absolute inset-x-12 inset-y-0 flex items-center">
            
            {/* On Leg Stump line - rightmost stump line */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-white opacity-90 z-10" style={{ right: '45%' }}></div>
            
            {/* Middle & Off Stump line - center of stumps */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-white opacity-90 z-10" style={{ right: '50%' }}></div>
            
            {/* 4th/5th Stump line - just outside off stump */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-white opacity-90 z-10" style={{ right: '55%' }}></div>
            
            {/* Wide Outside Off line - wide line */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-white opacity-90 z-10" style={{ right: '65%' }}></div>
            
            {/* Line labels */}
            <div className="absolute top-1 text-xs font-bold text-white" style={{ right: '43%' }}>Leg</div>
            <div className="absolute top-1 text-xs font-bold text-white" style={{ right: '47%' }}>M&O</div>
            <div className="absolute top-1 text-xs font-bold text-white" style={{ right: '52%' }}>4th/5th</div>
            <div className="absolute top-1 text-xs font-bold text-white" style={{ right: '62%' }}>Wide Off</div>
            
          </div>
        </div>
        
        {/* Values displayed below the pitch - aligned with the line positions */}
        <div className="flex mx-8 mt-2 justify-center relative">
          <div className="flex space-x-8">
            {sortedData.map((item, index) => {
              const lineName = item[dataKey];
              const value = item[valueKey];
              const isStrikeRate = valueKey === 'Strike Rate';
              
              return (
                <div 
                  key={`value-${lineName}`}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-300 mb-1">
                    {lineName}
                  </div>
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
        </div>
      </div>
    </div>
  );
};

export default PitchLineMap;
