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
        {/* Stumps at the start of the pitch (bowler's end) - rotated 90 degrees */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center h-6 w-8">
          <div className="flex flex-col space-y-0.5">
            <div className="h-1 w-6 bg-yellow-200 rounded-sm"></div>
            <div className="h-1 w-6 bg-yellow-200 rounded-sm"></div>
            <div className="h-1 w-6 bg-yellow-200 rounded-sm"></div>
          </div>
        </div>
        
        {/* Stumps at the end of the pitch (batsman's end) - rotated 90 degrees */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center h-6 w-8">
          <div className="flex flex-col space-y-0.5">
            <div className="h-1 w-6 bg-yellow-200 rounded-sm"></div>
            <div className="h-1 w-6 bg-yellow-200 rounded-sm"></div>
            <div className="h-1 w-6 bg-yellow-200 rounded-sm"></div>
          </div>
        </div>
        
        {/* Full pitch container */}
        <div className="flex h-24 rounded-lg overflow-hidden border-2 border-gray-600 mx-8" style={{ backgroundColor: '#8B4513' }}>
          {/* Reduced empty area on the left (non-striker's end) */}
          <div style={{ width: '15%', backgroundColor: '#8B4513' }}></div>
          
          {/* Compressed length zones container - takes up about 60% of the pitch */}
          <div className="flex" style={{ width: '60%' }}>
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
          
          {/* Larger empty area on the right (striker's end) */}
          <div style={{ width: '25%', backgroundColor: '#8B4513' }}></div>
        </div>
        
        {/* Values displayed above the pitch - aligned with compressed zones */}
        <div className="flex mt-2 mx-8">
          {/* Reduced empty space for left area */}
          <div style={{ width: '15%' }}></div>
          
          {/* Values for compressed zones */}
          <div className="flex" style={{ width: '60%' }}>
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
          
          {/* Larger empty space for right area */}
          <div style={{ width: '25%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PitchMap;