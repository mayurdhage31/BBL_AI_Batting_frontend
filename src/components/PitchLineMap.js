import React, { useState } from 'react';

const PitchLineMap = ({ data, dataKey, valueKey }) => {
  const [hoveredZone, setHoveredZone] = useState(null);
  
  // Define the order for bowling lines (from left to right on pitch)
  const lineOrder = ['Wide Outside Off', '4th/5th Stump', 'On Stumps', 'On Leg Stump'];
  
  // Sort data by the predefined order and filter only available lines
  const sortedData = lineOrder
    .map(line => data.find(item => item[dataKey] === line))
    .filter(item => item !== undefined);

  // Function to get color based on strike rate
  const getColorByStrikeRate = (strikeRate) => {
    if (!strikeRate || strikeRate === 0) return '#4B5563'; // Gray for no data
    
    // Color scale based on strike rate ranges
    if (strikeRate >= 150) return '#DC2626'; // Red - Very High
    if (strikeRate >= 130) return '#EA580C'; // Orange-Red - High
    if (strikeRate >= 120) return '#F59E0B'; // Orange - Above Average
    if (strikeRate >= 110) return '#EAB308'; // Yellow - Good
    if (strikeRate >= 100) return '#84CC16'; // Light Green - Average
    if (strikeRate >= 90) return '#22C55E'; // Green - Below Average
    return '#059669'; // Dark Green - Low
  };

  return (
    <div className="mt-6">
      {/* Cricket pitch visualization for lines */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Left stump (bowler's end) */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center h-6 w-8">
          <div className="flex flex-col space-y-0.5">
            <div className="h-1 w-6 bg-yellow-200 rounded-sm"></div>
            <div className="h-1 w-6 bg-yellow-200 rounded-sm"></div>
            <div className="h-1 w-6 bg-yellow-200 rounded-sm"></div>
          </div>
        </div>
        
        {/* Right stump (batsman's end) */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center h-6 w-8">
          <div className="flex flex-col space-y-0.5">
            <div className="h-1 w-6 bg-yellow-200 rounded-sm"></div>
            <div className="h-1 w-6 bg-yellow-200 rounded-sm"></div>
            <div className="h-1 w-6 bg-yellow-200 rounded-sm"></div>
          </div>
        </div>
        
        {/* Pitch container */}
        <div className="mx-8">
          {/* Main pitch area */}
          <div className="relative w-full h-32 bg-green-600 rounded-lg border-4 border-white overflow-hidden">
            {/* Pitch markings */}
            <div className="absolute inset-0">
              {/* Crease lines */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white"></div>
              <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-white"></div>
              
              {/* Center line */}
              <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-0.5 bg-white opacity-50"></div>
              
              {/* Stumps area markings */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
            </div>
            
            {/* Line zones overlay */}
            <div className="absolute inset-0 flex">
              {sortedData.map((item, index) => {
                const lineName = item[dataKey];
                const strikeRate = item[valueKey];
                const isHovered = hoveredZone === lineName;
                
                return (
                  <div 
                    key={lineName}
                    className="flex-1 relative cursor-pointer transition-all duration-200"
                    style={{
                      backgroundColor: getColorByStrikeRate(strikeRate),
                      opacity: isHovered ? 0.9 : 0.7,
                      borderRight: index < sortedData.length - 1 ? '2px solid rgba(255,255,255,0.3)' : 'none'
                    }}
                    onMouseEnter={() => setHoveredZone(lineName)}
                    onMouseLeave={() => setHoveredZone(null)}
                  >
                    {/* Hover tooltip */}
                    {isHovered && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 z-20">
                        <div className="bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                          <div className="font-bold">{lineName}</div>
                          <div>Strike Rate: {typeof strikeRate === 'number' ? strikeRate.toFixed(2) : strikeRate}</div>
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
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="text-white">150+ SR</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-orange-600 rounded"></div>
              <span className="text-white">130-149 SR</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-white">120-129 SR</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <span className="text-white">110-119 SR</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-lime-400 rounded"></div>
              <span className="text-white">100-109 SR</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-white">90-99 SR</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-700 rounded"></div>
              <span className="text-white">&lt;90 SR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchLineMap;
