import React from 'react';

// Define positions for bowling lengths in left-to-right order
// Fulltoss, Yorker, Full Length, Good Length, Short, Bouncer
const lengthPositions = {
    'Full Toss': { x: 60, y: 120, order: 1 },
    'Yorker': { x: 120, y: 120, order: 2 },
    'Full Length': { x: 180, y: 120, order: 3 },
    'Good Length': { x: 240, y: 120, order: 4 },
    'Short': { x: 300, y: 120, order: 5 },
    'Bouncer': { x: 360, y: 120, order: 6 },
};


const PitchMap = ({ data, dataKey, valueKey }) => {
  // Sort data by the predefined order and filter only available lengths
  const sortedData = data
    .filter(item => lengthPositions[item[dataKey]])
    .sort((a, b) => lengthPositions[a[dataKey]].order - lengthPositions[b[dataKey]].order);

  return (
    <div className="mt-6">
      {/* Cricket pitch background with length indicators */}
      <div 
        className="relative w-full h-64 bg-no-repeat bg-center bg-contain rounded-lg overflow-hidden"
        style={{
          backgroundImage: "url('/pitch_transparent.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center'
        }}
      >
        {/* Length indicators positioned left to right */}
        <div className="absolute inset-0 flex items-center justify-around px-4">
          {sortedData.map((item, index) => {
            const lengthName = item[dataKey];
            const value = item[valueKey];
            
            return (
              <div 
                key={lengthName}
                className="flex flex-col items-center"
                style={{
                  minWidth: '60px'
                }}
              >
                {/* Length label */}
                <div className="bg-gray-800 bg-opacity-80 text-white px-2 py-1 rounded text-xs font-medium mb-1 text-center">
                  {lengthName}
                </div>
                
                {/* Value display */}
                <div className="bg-brand-teal text-black px-3 py-2 rounded-lg font-bold text-sm shadow-lg">
                  {typeof value === 'number' ? value.toFixed(2) : value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          {valueKey}: Lower values indicate better economy rates
        </p>
      </div>
    </div>
  );
};

export default PitchMap;