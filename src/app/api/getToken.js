// pages/api/generateToken.js or app/api/generateToken/route.js (Next.js 13+)
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_super_secret_key'; // Use a strong secret key

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Define payload for the token
        const payload = {
            username: 'user123',   // Example payload; adjust as needed
            role: 'presenter',
        };

        // Generate the token
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

        // Send token back to the client
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ error: 'Failed to generate token' });
    }
}
