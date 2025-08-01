import React from 'react';

const Header = () => {
  return (
    <header className="bg-brand-light-dark shadow-md p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-brand-teal tracking-wider">
          BBL Batting AI Insights
        </h1>
        <p className="text-slate-400">Compare players and venues based on historical data</p>
      </div>
    </header>
  );
};

export default Header;