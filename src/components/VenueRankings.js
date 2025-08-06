import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development' ? '' : 'https://bblaibattingbackend-bbl.up.railway.app';

const VenueRankings = ({ selectedVenue }) => {
  const [venueRankings, setVenueRankings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to get color based on rank (1-4: green, 5-8: yellow, 9-11: red)
  const getRankColor = (rank) => {
    const numRank = parseInt(rank);
    if (numRank >= 1 && numRank <= 4) return 'bg-green-500';
    if (numRank >= 5 && numRank <= 8) return 'bg-yellow-500';
    if (numRank >= 9 && numRank <= 11) return 'bg-red-500';
    return 'bg-brand-teal'; // fallback
  };

  const fetchVenueRankings = useCallback(async () => {
    if (!selectedVenue) {
      setVenueRankings([]);
      return;
    }
    
    setLoading(true);
    console.log('Fetching venue rankings for:', selectedVenue);
    console.log('API URL:', API_URL);
    console.log('Full URL:', `${API_URL}/venue-length-stats/${selectedVenue}`);
    try {
      // Fetch venue length stats data
      const response = await axios.get(`${API_URL}/venue-length-stats/${selectedVenue}`);
      console.log('Venue rankings response:', response.data);
      console.log('Response status:', response.status);
      setVenueRankings(response.data);
    } catch (error) {
      console.error('Error fetching venue rankings for', selectedVenue, ':', error);
      console.error('Error details:', error.response?.data);
      console.error('Error status:', error.response?.status);
      setVenueRankings([]);
    } finally {
      setLoading(false);
    }
  }, [selectedVenue]);

  useEffect(() => {
    if (selectedVenue) {
      fetchVenueRankings();
    }
  }, [selectedVenue, fetchVenueRankings]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-brand-teal">Loading venue rankings...</div>
      </div>
    );
  }

  if (!venueRankings.length) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4 border-b-2 border-brand-teal pb-2">
          Ranks of Performance vs Different Lengths
        </h3>
        <div className="text-center py-4 text-slate-400">
          {loading ? 'Loading venue rankings...' : 'No ranking data available for this venue.'}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 border-b-2 border-brand-teal pb-2">
        Ranks of Performance vs Different Lengths
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="text-left py-3 px-4 font-semibold text-slate-300">Length</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-300">Strike Rate Rank</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-300">Boundary % Rank</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-300">Dot Ball % Rank</th>
            </tr>
          </thead>
          <tbody>
            {venueRankings.map((item, index) => (
              <tr key={item.Length} className={index % 2 === 0 ? 'bg-slate-800/30' : 'bg-transparent'}>
                <td className="py-3 px-4 font-medium text-white">{item.Length}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-flex items-center justify-center w-16 h-8 text-white font-bold rounded ${getRankColor(item.Rank_Batting_Strike_Rate)}`}>
                    {item.Rank_Batting_Strike_Rate}/11
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-flex items-center justify-center w-16 h-8 text-white font-bold rounded ${getRankColor(item.Rank_Boundary_Percentage)}`}>
                    {item.Rank_Boundary_Percentage}/11
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-flex items-center justify-center w-16 h-8 text-white font-bold rounded ${getRankColor(item.Rank_Dot_Ball_Percentage)}`}>
                    {item.Rank_Dot_Ball_Percentage}/11
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-xs text-slate-400">
        <p>Rankings are out of 11 total venues. Lower rank numbers indicate better performance.</p>
      </div>
    </div>
  );
};

export default VenueRankings;
