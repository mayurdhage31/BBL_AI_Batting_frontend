import React from 'react';

const PerformanceTable = ({ columns, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-slate-400 text-center py-4">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-slate-300">
        <thead>
          <tr className="border-b border-slate-600">
            {columns.map((column, index) => (
              <th key={index} className="text-left py-2 px-3 font-medium text-slate-200">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-slate-700 hover:bg-slate-800">
              {columns.map((column, colIndex) => {
                const value = row[column] || row[column.replace(' ', '_')] || row[column.replace(' ', '.')];
                return (
                  <td key={colIndex} className="py-2 px-3">
                    {typeof value === 'number' ? 
                      (column === 'Balls' || column === 'Runs' || column === 'Total Runs' || column === 'Balls Faced') ? 
                        Math.round(value).toString() : 
                        value.toFixed(2) 
                      : value || 'N/A'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceTable;