import React, { useState } from 'react';

const PitchLineMap = ({ data, dataKey, valueKey }) => {
  const [hoveredLine, setHoveredLine] = useState(null);
  
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
  // Handle the alias mapping: "On Stumps" in data maps to "Middle & Off Stump" in display
  const sortedData = lineOrder
    .map(line => {
      // First try to find exact match
      let item = data.find(dataItem => dataItem && dataItem[dataKey] === line);
      // If Middle & Off Stump not found, try "On Stumps" as alias
      if (!item && line === 'Middle & Off Stump') {
        item = data.find(dataItem => dataItem && dataItem[dataKey] === 'On Stumps');
      }
      return item;
    })
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

  // Function to get line color based on strike rate for that specific line
  const getLineColor = (lineName) => {
    const lineData = sortedData.find(item => item[dataKey] === lineName);
    if (!lineData && lineName === 'Middle & Off Stump') {
      // Handle alias mapping
      const aliasData = sortedData.find(item => item[dataKey] === 'On Stumps');
      if (aliasData) {
        return getStrikeRateColor(aliasData['Strike Rate']);
      }
    }
    if (lineData) {
      return getStrikeRateColor(lineData['Strike Rate']);
    }
    return '#ffffff'; // Default white if no data
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
            {/* Removed horizontal Left-handed Batter label */}
          </div>
          
          {/* Larger stumps at the end of the pitch (batsman's end) - centered */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
            <div className="flex flex-col space-y-1">
              <div className="h-2 w-8 bg-yellow-200 rounded-sm border border-yellow-300"></div>
              <div className="h-2 w-8 bg-yellow-200 rounded-sm border border-yellow-300"></div>
              <div className="h-2 w-8 bg-yellow-200 rounded-sm border border-yellow-300"></div>
            </div>
            {/* Removed horizontal Left-handed Batter label */}
          </div>
          
          {/* Pitch lines at either end */}
          <div className="absolute left-12 top-0 bottom-0 w-1 bg-white opacity-80"></div>
          <div className="absolute right-12 top-0 bottom-0 w-1 bg-white opacity-80"></div>
          
          {/* Cricket line markings - showing actual bowling lines horizontally across the pitch */}
          <div className="absolute inset-x-12 inset-y-0 flex flex-col justify-center">
            
            {/* Wide Outside Off line - topmost line */}
            <div 
              className="absolute left-0 right-0 h-1.5 opacity-90 z-10 cursor-pointer hover:opacity-100 rounded-sm" 
              style={{ 
                top: '15%',
                backgroundColor: getLineColor('Wide Outside Off')
              }}
              onMouseEnter={() => setHoveredLine('Wide Outside Off')}
              onMouseLeave={() => setHoveredLine(null)}
            ></div>
            
            {/* 4th/5th Stump line - second line from top */}
            <div 
              className="absolute left-0 right-0 h-1.5 opacity-90 z-10 cursor-pointer hover:opacity-100 rounded-sm" 
              style={{ 
                top: '30%',
                backgroundColor: getLineColor('4th/5th Stump')
              }}
              onMouseEnter={() => setHoveredLine('4th/5th Stump')}
              onMouseLeave={() => setHoveredLine(null)}
            ></div>
            
            {/* Middle & Off Stump line - third line from top */}
            <div 
              className="absolute left-0 right-0 h-1.5 opacity-90 z-10 cursor-pointer hover:opacity-100 rounded-sm" 
              style={{ 
                top: '45%',
                backgroundColor: getLineColor('Middle & Off Stump')
              }}
              onMouseEnter={() => setHoveredLine('Middle & Off Stump')}
              onMouseLeave={() => setHoveredLine(null)}
            ></div>
            
            {/* On Leg Stump line - positioned lower to be in front of first stump from bottom */}
            <div 
              className="absolute left-0 right-0 h-1.5 opacity-90 z-10 cursor-pointer hover:opacity-100 rounded-sm" 
              style={{ 
                top: '58%',
                backgroundColor: getLineColor('On Leg Stump')
              }}
              onMouseEnter={() => setHoveredLine('On Leg Stump')}
              onMouseLeave={() => setHoveredLine(null)}
            ></div>
            
            {/* Line labels positioned below each line */}
            <div className="absolute text-xs font-bold text-white text-center" style={{ top: '23%', left: '10%', right: '10%' }}>Wide Off</div>
            <div className="absolute text-xs font-bold text-white text-center" style={{ top: '38%', left: '10%', right: '10%' }}>4th/5th</div>
            <div className="absolute text-xs font-bold text-white text-center" style={{ top: '53%', left: '10%', right: '10%' }}>M&O</div>
            <div className="absolute text-xs font-bold text-white text-center" style={{ top: '68%', left: '10%', right: '10%' }}>Leg</div>
      

            
            {/* Hover tooltip */}
            {hoveredLine && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 z-30">
                <div className="bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                  <div className="font-bold">{hoveredLine}</div>
                  {(() => {
                    const lineData = sortedData.find(item => item[dataKey] === hoveredLine);
                    if (lineData) {
                      return (
                        <div>
                          <div>Strike Rate: {formatValue(lineData['Strike Rate'], 'Strike Rate')}</div>
                          <div>Boundary %: {formatValue(lineData['Boundary %'], 'Boundary %')}</div>
                          <div>Dot %: {formatValue(lineData['Dot %'], 'Dot %')}</div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                </div>
              </div>
            )}
            
          </div>
          
          {/* Vertical Left-handed Batter label - positioned outside pitch premises */}
          <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 text-xs font-bold text-white whitespace-nowrap" style={{ transform: 'rotate(-90deg)' }}>
            Left-handed Batter
          </div>
        </div>
        
        {/* Values displayed below the pitch - showing all four lines with only strike rate */}
        <div className="flex mx-8 mt-2 justify-center relative">
          <div className="flex space-x-8">
            {lineOrder.map((lineName, index) => {
              // Handle alias mapping for Middle & Off Stump
              let lineData = sortedData.find(item => item[dataKey] === lineName);
              if (!lineData && lineName === 'Middle & Off Stump') {
                lineData = sortedData.find(item => item[dataKey] === 'On Stumps');
              }
              const strikeRate = lineData ? lineData['Strike Rate'] : 'N/A';
              
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
                      color: lineData ? getStrikeRateColor(strikeRate) : '#ffffff'
                    }}
                  >
                    {lineData ? formatValue(strikeRate, 'Strike Rate') : 'N/A'}
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
