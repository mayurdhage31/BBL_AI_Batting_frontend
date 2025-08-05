import React from 'react';

const PitchMap = ({ data, dataKey, valueKey }) => {
  // Define the order for bowling lengths
  const lengthOrder = ['Full Toss', 'Yorker', 'Full Length', 'Good Length', 'Short', 'Bouncer'];
  
  // Sort data by the predefined order and filter only available lengths
  const sortedData = lengthOrder
    .map(length => data.find(item => item[dataKey] === length))
    .filter(item => item !== undefined);

  return (
    <div className="mt-6">
      {/* Cricket pitch visualization */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Stumps at the start of the pitch (before Full Toss) */}
        <div className="absolute left-0 top-0 z-10 flex flex-col items-center justify-center h-24 w-6">
          <div className="flex space-x-0.5">
            <div className="w-1 h-6 bg-yellow-200 rounded-sm"></div>
            <div className="w-1 h-6 bg-yellow-200 rounded-sm"></div>
            <div className="w-1 h-6 bg-yellow-200 rounded-sm"></div>
          </div>
        </div>
        
        {/* Stumps at the end of the pitch (after Bouncer) */}
        <div className="absolute right-0 top-0 z-10 flex flex-col items-center justify-center h-24 w-6">
          <div className="flex space-x-0.5">
            <div className="w-1 h-6 bg-yellow-200 rounded-sm"></div>
            <div className="w-1 h-6 bg-yellow-200 rounded-sm"></div>
            <div className="w-1 h-6 bg-yellow-200 rounded-sm"></div>
          </div>
        </div>
        
        {/* Pitch sections container */}
        <div className="flex h-24 rounded-lg overflow-hidden border-2 border-gray-600 mx-6">
          {sortedData.map((item, index) => {
            const lengthName = item[dataKey];
            
            return (
              <div 
                key={lengthName}
                className="flex-1 relative flex flex-col justify-center items-center text-white font-bold"
                style={{
                  backgroundColor: '#8B4513', // Brown color to resemble cricket pitch
                  borderRight: index < sortedData.length - 1 ? '2px solid #374151' : 'none'
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
        
        {/* Values displayed above the pitch */}
        <div className="flex mt-2 mx-6">
          {sortedData.map((item, index) => {
            const lengthName = item[dataKey];
            const value = item[valueKey];
            
            return (
              <div 
                key={`value-${lengthName}`}
                className="flex-1 text-center"
              >
                <div className="text-lg font-bold text-white">
                  {typeof value === 'number' ? value.toFixed(2) : value}
                </div>
              </div>
            );
          })}
        </div>
        

      </div>
    </div>
  );
};

export default PitchMap;