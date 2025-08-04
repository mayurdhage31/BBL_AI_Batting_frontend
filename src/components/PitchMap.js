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
        {/* Pitch sections container */}
        <div className="flex h-24 rounded-lg overflow-hidden border-2 border-gray-600">
          {sortedData.map((item, index) => {
            const lengthName = item[dataKey];
            
            return (
              <div 
                key={lengthName}
                className="flex-1 relative flex flex-col justify-center items-center text-white font-bold"
                style={{
                  backgroundColor: '#4ade80', // Consistent green color for cricket pitch
                  borderRight: index < sortedData.length - 1 ? '2px solid #374151' : 'none'
                }}
              >
                {/* Length name - rotated vertically */}
                <div 
                  className="text-sm font-bold text-center leading-tight"
                  style={{
                    transform: 'rotate(-90deg)',
                    whiteSpace: 'nowrap',
                    color: '#1f2937'
                  }}
                >
                  {lengthName.replace(' ', '\n')}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Values displayed above the pitch */}
        <div className="flex mt-2">
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
        
        {/* Small cricket pitch diagram on the right */}
        <div className="absolute right-0 top-0 w-20 h-24 border-2 border-gray-400 bg-green-400 rounded">
          {/* Wickets */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-800 rounded"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-800 rounded"></div>
          {/* Pitch lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white transform -translate-y-1/2"></div>
          <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white"></div>
          <div className="absolute bottom-1/4 left-0 right-0 h-0.5 bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default PitchMap;