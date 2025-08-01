import React from 'react';

const MetricCard = ({ title, value }) => (
  <div className="bg-brand-dark p-4 rounded-lg text-center shadow-md">
    <p className="text-slate-400 text-sm">{title}</p>
    <p className="text-2xl font-bold text-brand-teal">{value}</p>
  </div>
);

const SummaryMetrics = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard title="Batting Average" value={stats['Batting Average']?.toFixed(2) || 'N/A'} />
      <MetricCard title="Strike Rate" value={stats['Strike Rate']?.toFixed(2) || 'N/A'} />
      <MetricCard title="Boundary %" value={`${stats['Boundary %']?.toFixed(2) || 'N/A'}%`} />
      <MetricCard title="Dot Ball %" value={`${stats['Dot Ball %']?.toFixed(2) || 'N/A'}%`} />
    </div>
  );
};

export default SummaryMetrics;