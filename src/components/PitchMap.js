import React from 'react';
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, ZAxis, Scatter, LabelList } from 'recharts';

// Define fixed positions for lines and lengths on the pitch map
const positionMapping = {
    // For Line Data
    'On Stumps': { x: 150, y: 100 },
    'Wide Outside Off': { x: 250, y: 100 },
    '4th/5th Stump': { x: 200, y: 100 },
    'On Leg Stump': { x: 100, y: 100 },
    // For Length Data
    'Full Toss': { x: 175, y: 150 },
    'Short': { x: 175, y: 50 },
    'Full Length': { x: 175, y: 130 },
    'Bouncer': { x: 175, y: 30 },
    'Good Length': { x: 175, y: 90 },
    'Yorker': { x: 175, y: 170 },
  };


const PitchMap = ({ data, dataKey, valueKey }) => {

    const chartData = data.map(item => ({
        ...positionMapping[item[dataKey]],
        label: item[dataKey],
        value: item[valueKey]
    }));

  return (
    <div style={{ width: '100%', height: 300, position: 'relative' }} className="mt-6">
       {/* You can overlay a pitch image here using CSS background-image */}
      <div className="absolute inset-0 bg-no-repeat bg-center bg-contain" style={{backgroundImage: "url('/pitch_transparent.png')"}}></div>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis type="number" dataKey="x" hide domain={[0, 350]} />
          <YAxis type="number" dataKey="y" hide domain={[0, 200]} reversed/>
          <ZAxis type="number" dataKey="value" range={[400, 1000]}/>
          <Scatter data={chartData} fill="#00f0a8">
             <LabelList dataKey="value" position="top" fill="white" fontSize={14} fontWeight="bold" formatter={(val) => val.toFixed(2)}/>
             <LabelList dataKey="label" position="bottom" fill="white" fontSize={12}/>
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PitchMap;