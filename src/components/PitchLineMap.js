import React, { useState } from 'react';

const PitchLineMap = ({ data, dataKey, valueKey }) => {
  const [hoveredZone, setHoveredZone] = useState(null);
  
  // Define the order for bowling lines (from left to right on pitch)
  const lineOrder = ['Wide Outside Off', '4th/5th Stump', 'On Stumps', 'On Leg Stump'];
  
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

  // Function to get color based on strike rate - simplified to green/yellow/red
  const getColorByStrikeRate = (strikeRate) => {
    if (!strikeRate || strikeRate === 0) return '#4B5563'; // Gray for no data
    
    // Simplified color scale
    const numValue = parseFloat(strikeRate);
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
      {/* Cricket pitch visualization for lines */}
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
          
          {/* Line zones - no color overlay, just hover areas */}
          <div className="absolute inset-x-12 inset-y-2 flex">
            {sortedData.map((item, index) => {
              const lineName = item[dataKey];
              const strikeRate = item[valueKey];
              const isHovered = hoveredZone === lineName;
              
              return (
                <div 
                  key={lineName}
                  className="flex-1 relative cursor-pointer transition-all duration-200 flex items-center justify-center"
                  style={{
                    borderRight: index < sortedData.length - 1 ? '1px solid rgba(255,255,255,0.3)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredZone(lineName)}
                  onMouseLeave={() => setHoveredZone(null)}
                >
                  {/* Line name - only visible on hover */}
                  {isHovered && (
                    <div 
                      className="text-xs font-bold text-center px-1 bg-black bg-opacity-70 rounded py-1"
                      style={{
                        color: '#ffffff',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                      }}
                    >
                      {lineName}
                    </div>
                  )}
                  
                  {/* Hover tooltip */}
                  {isHovered && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 z-20">
                      <div className="bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                        <div className="font-bold">{lineName}</div>
                        <div>Strike Rate: {formatValue(strikeRate, valueKey)}</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-white">130+ SR (High)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-white">110-129 SR (Medium)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span className="text-white">&lt;110 SR (Low)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchLineMap;
