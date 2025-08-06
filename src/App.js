import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import AIInsights from './components/AIInsights';
import Strengths from './components/Strengths';
import Weaknesses from './components/Weaknesses';
import SummaryMetrics from './components/SummaryMetrics';
import PerformanceTable from './components/PerformanceTable';
import PitchMap from './components/PitchMap';
import PitchLineMap from './components/PitchLineMap';
import VenueRankings from './components/VenueRankings';

const API_URL = process.env.NODE_ENV === 'development' ? '' : 'https://bblaibattingbackend-bbl.up.railway.app';

function App() {
  const [activeTab, setActiveTab] = useState('Batter'); // 'Batter' or 'Venue'
  const [batters, setBatters] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedBatter, setSelectedBatter] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [insights, setInsights] = useState(null);
  const [lineStats, setLineStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch initial list of batters and venues
    axios.get(`${API_URL}/batters`).then(res => setBatters(res.data.batters));
    axios.get(`${API_URL}/venues`).then(res => setVenues(res.data.venues));
  }, []);

  const handleGenerateInsights = () => {
    if (activeTab === 'Batter' && selectedBatter) {
      setLoading(true);
      // Get batter insights
      axios.get(`${API_URL}/batter-insight/${selectedBatter}`)
        .then(insightsRes => {
          setInsights(insightsRes.data);
          
          // Try to get line stats, but handle 404 errors gracefully
          axios.get(`${API_URL}/batter-line-stats/${selectedBatter}`)
            .then(lineStatsRes => {
              setLineStats(lineStatsRes.data);
            })
            .catch(error => {
              console.warn('Line stats endpoint not available:', error);
              setLineStats([]); // Set empty array as fallback
            });
        })
        .catch(error => {
          console.error('Error fetching batter insights:', error);
          alert('Error fetching batter insights. Please try again.');
        })
        .finally(() => setLoading(false));
    } else if (activeTab === 'Venue' && selectedVenue) {
        setLoading(true);
        // Get venue insights
        axios.get(`${API_URL}/venue-insight/${selectedVenue}`)
          .then(insightsRes => {
            setInsights(insightsRes.data);
            
            // Try to get line stats, but handle 404 errors gracefully
            axios.get(`${API_URL}/venue-line-stats/${selectedVenue}`)
              .then(lineStatsRes => {
                setLineStats(lineStatsRes.data);
              })
              .catch(error => {
                console.warn('Venue line stats endpoint not available:', error);
                setLineStats([]); // Set empty array as fallback
              });
          })
          .catch(error => {
            console.error('Error fetching venue insights:', error);
            alert('Error fetching venue insights. Please try again.');
          })
          .finally(() => setLoading(false));
    }
  };

  const lineColumns = ["Line", "Balls", "Runs", "Strike Rate", "Boundary %", "Dot %"];
  const lengthColumns = ["Length", "Balls", "Runs", "Strike Rate", "Boundary %", "Dot %"];
  const phaseColumns = ["Phase", "Total Runs", "Balls Faced", "Strike Rate"];


  return (
    <div className="min-h-screen bg-brand-dark text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-brand-light-dark p-6 rounded-lg shadow-lg">
              <div className="flex border-b border-slate-600 mb-4">
                <button onClick={() => setActiveTab('Batter')} className={`py-2 px-4 ${activeTab === 'Batter' ? 'border-b-2 border-brand-teal text-brand-teal' : 'text-slate-400'}`}>Batters</button>
                <button onClick={() => setActiveTab('Venue')} className={`py-2 px-4 ${activeTab === 'Venue' ? 'border-b-2 border-brand-teal text-brand-teal' : 'text-slate-400'}`}>Venues</button>
              </div>

              {activeTab === 'Batter' ? (
                 <div className="mb-4">
                  <label htmlFor="batter-select" className="block text-sm font-medium text-slate-400 mb-2">Batter</label>
                  <select id="batter-select" value={selectedBatter} onChange={e => setSelectedBatter(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-teal">
                    <option value="">Select a Batter</option>
                    {batters.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              ) : (
                <div className="mb-4">
                <label htmlFor="venue-select" className="block text-sm font-medium text-slate-400 mb-2">Venue</label>
                <select id="venue-select" value={selectedVenue} onChange={e => setSelectedVenue(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-teal">
                  <option value="">Select a Venue</option>
                  {venues.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              )}
             
              <button onClick={handleGenerateInsights} disabled={loading || (activeTab === 'Batter' && !selectedBatter) || (activeTab === 'Venue' && !selectedVenue) } className="w-full bg-brand-teal text-brand-dark font-bold py-3 rounded-md hover:bg-teal-400 transition duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed">
                {loading ? 'Generating...' : 'Generate Insights'}
              </button>
            </div>
            
            {insights && (
              <>
                <AIInsights insights={insights.ai_insights} />
                <Strengths strengths={insights.strengths} />
                <Weaknesses weaknesses={insights.weaknesses} />
              </>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {insights && (
               <>
                <h2 className="text-2xl font-bold text-white mb-4">
                  {activeTab === 'Batter' ? `${selectedBatter} Analysis` : `${selectedVenue} Analysis`}
                </h2>
                
                <div className="bg-brand-light-dark p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 border-b-2 border-brand-teal pb-2">General Performance</h3>
                  <SummaryMetrics stats={insights.general_performance} />
                </div>
                
                <div className="bg-brand-light-dark p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 border-b-2 border-brand-teal pb-2">Performance vs Different Lines</h3>
                    <PerformanceTable columns={lineColumns} data={insights.performance_vs_line} />
                    {lineStats && (
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-3 text-brand-teal">Pitch Image for Strike Rate By Line</h4>
                        <PitchLineMap data={lineStats} dataKey="Line" valueKey="Strike Rate" />
                      </div>
                    )}
                </div>
                
                <div className="bg-brand-light-dark p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 border-b-2 border-brand-teal pb-2">Performance vs Different Length</h3>
                    <PerformanceTable columns={lengthColumns} data={insights.performance_vs_length} />
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-3 text-brand-teal">Pitch Image for Strike Rate By Length</h4>
                      <PitchMap data={insights.performance_vs_length} dataKey="Length" valueKey="Strike Rate" />
                    </div>
                    
                    {/* Venue Rankings - only show for venue analysis, positioned below pitch diagram */}
                    {activeTab === 'Venue' && (
                      <div className="mt-6">
                        <VenueRankings selectedVenue={selectedVenue} />
                      </div>
                    )}
                </div>

                <div className="bg-brand-light-dark p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 border-b-2 border-brand-teal pb-2">Performance by Phase</h3>
                    <PerformanceTable columns={phaseColumns} data={insights.performance_by_phase} />
                </div>
               </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;