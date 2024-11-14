// pages/api/getMeeting.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const API_KEY_SECRET = 'mirotalksfu_default_secret';
    const MIROTALK_URL = 'https://sfu.mirotalk.com/api/v1/meeting';

    try {
        const response = await fetch(MIROTALK_URL, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${API_KEY_SECRET}`, 
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        if (data.error) {
            res.status(500).json({ error: data.error });
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
}
