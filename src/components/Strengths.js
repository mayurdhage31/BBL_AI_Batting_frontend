import React from 'react';

const Strengths = ({ strengths }) => {
  return (
    <div className="bg-brand-light-dark p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-3 text-green-400">Strengths</h3>
      <ul className="list-disc list-inside space-y-2 text-slate-300">
        {strengths.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Strengths;