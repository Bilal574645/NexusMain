// app/stats/page.js

"use client"

import { useEffect, useState } from 'react';

const StatsPage = async () => {
  // Fetch stats data on the server side within the Server Component
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/stats`;
  let serverStats = null;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error('Failed to fetch stats');
    }
    serverStats = await res.json();
  } catch (error) {
    console.error('Stats fetch error:', error);
    
  }

  return <StatsPageComponent serverStats={serverStats} />;
};

// This is a client-side component
const StatsPageComponent = ({ serverStats }) => {
  const [stats, setStats] = useState(serverStats);
  const statsDataKey = 'statsData';

  useEffect(() => {
    if (!stats) return;

    // Save the data to sessionStorage
    sessionStorage.setItem(statsDataKey, JSON.stringify(stats));

    if (stats.enabled) {
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('src', stats.src);
      script.setAttribute('data-website-id', stats.id);
      document.head.appendChild(script);
    }
  }, [stats]);

  useEffect(() => {
    // Retrieve stats data from sessionStorage when the component is mounted
    const storedStats = sessionStorage.getItem(statsDataKey);
    if (storedStats) {
      setStats(JSON.parse(storedStats));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4 flex justify-between items-center px-6">
        <h1 className="text-lg font-bold">Stats Page</h1>
      </header>

      <main className="p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold">Website Stats</h2>
          {stats ? (
            <div>
              <p>Status: {stats.enabled ? 'Enabled' : 'Disabled'}</p>
              <p>Source: {stats.src}</p>
              <p>Website ID: {stats.id}</p>
            </div>
          ) : (
            <p className="text-gray-400">Loading stats...</p>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-center p-4 text-gray-400">
        <p>&copy; 2024 My Website</p>
      </footer>
    </div>
  );
};

export default StatsPage;
