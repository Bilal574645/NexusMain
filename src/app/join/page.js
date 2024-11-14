'use client';

import { useState } from 'react';

export default function Join() {
    const [room, setRoom] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [joinLink, setJoinLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const response = await fetch('/api/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ room }),
        });

        const data = await response.json();
        setLoading(false);

        if (data.error) {
            setError(data.error);
        } else {
            setJoinLink(data.join); // URL or link to join the room
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-blue-600 to-blue-300">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform duration-300 ease-out">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Join the Room
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="room" className="block text-gray-600 text-lg font-medium mb-2">Room</label>
                        <input
                            type="text"
                            id="room"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            placeholder="Enter the room name"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 text-center text-lg font-medium mb-6">{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-4 text-lg font-semibold text-white rounded-lg transition-all ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500'}`}
                    >
                        {loading ? 'Joining...' : 'Join Room'}
                    </button>
                </form>

                {joinLink && (
                    <div className="mt-8 text-center">
                        <a href={joinLink} className="text-indigo-600 text-lg font-medium hover:underline" target="_blank" rel="noopener noreferrer">
                            Click here to join the room
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
