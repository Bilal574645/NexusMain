// pages/index.js
"use client"
import { useState } from 'react';

export default function Token() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await fetch('/api/getToken', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            
            if (response.ok) {
                setToken(data.token);
            } else {
                setError(data.error || 'Failed to retrieve token');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Get Token</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                    Request Token
                </button>
                {token && (
                    <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        Token: {token}
                    </div>
                )}
                {error && (
                    <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
                        Error: {error}
                    </div>
                )}
            </form>
        </div>
    );
}
