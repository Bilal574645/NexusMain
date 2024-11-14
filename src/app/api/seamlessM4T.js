// pages/api/seamlessM4T.js
import axios from 'axios';

const API_URL = 'https://api-inference.huggingface.co/models/facebook/mt5-large'; // SeamlessM4T model URL
const API_KEY = process.env.HUGGING_FACE_API_KEY; // Store your API key in environment variables

async function translateOrTranscribe(req, res) {
  if (req.method === 'POST') {
    try {
      const { inputText, sourceLang, targetLang } = req.body;

      // Construct the payload for translation/transcription
      const data = {
        inputs: inputText,
        parameters: {
          source_lang: sourceLang,
          target_lang: targetLang,
        },
      };

      // Make the API call to Hugging Face's SeamlessM4T model
      const response = await axios.post(API_URL, data, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      // Send the response from Hugging Face back to the client
      res.status(200).json({ result: response.data });
    } catch (error) {
      console.error('Error fetching Hugging Face API:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

export default translateOrTranscribe;
