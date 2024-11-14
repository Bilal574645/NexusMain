// components/MeetingComponent.js
"use client"
import { useState, useEffect } from 'react';

export default function MeetingComponent() {
    const [meeting, setMeeting] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                const res = await fetch('../api/meeting/route.js');
                const data = await res.json();
                if (data.error) {
                    setError(data.error);
                } else {
                    setMeeting(data.meeting);
                }
            } catch (err) {
                setError('Failed to fetch meeting');
            }
        };

        fetchMeeting();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
            <div className="max-w-lg w-full p-8 bg-white bg-opacity-10 shadow-lg rounded-xl backdrop-blur-lg border border-gray-700">
                <h1 className="text-3xl font-bold text-center text-white">Meeting Information</h1>
                {error ? (
                    <p className="text-red-400 text-center mt-6">{error}</p>
                ) : meeting ? (
                    <div className="mt-8 text-center">
                        <p className="text-lg text-gray-300">Meeting ID:</p>
                        <p className="text-2xl font-semibold text-white mt-1">{meeting.id}</p>
                        <p className="text-lg text-gray-300 mt-4">Meeting Name:</p>
                        <p className="text-xl font-semibold text-white mt-1">{meeting.name}</p>
                    </div>
                ) : (
                    <p className="text-gray-400 text-center mt-8">Loading...</p>
                )}
            </div>
        </div>
    );
}
