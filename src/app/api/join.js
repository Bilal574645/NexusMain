import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const API_KEY_SECRET = 'mirotalksfu_default_secret';
        const MIROTALK_URL = 'https://sfu.mirotalk.com/api/v1/join';

        const data = {
            room: 'test',
            roomPassword: false,
            name: 'mirotalksfu',
            audio: true,
            video: true,
            screen: true,
            hide: false,
            notify: true,
            token: {
                username: 'username',
                password: 'password',
                presenter: true,
                expire: '1h',
            },
        };

        try {
            const response = await fetch(MIROTALK_URL, {
                method: 'POST',
                headers: {
                    authorization: API_KEY_SECRET,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const jsonResponse = await response.json();
            if (jsonResponse.error) {
                return res.status(400).json({ error: jsonResponse.error });
            }
            res.status(200).json({ join: jsonResponse.join });
        } catch (error) {
            res.status(500).json({ error: 'Error connecting to the service' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
