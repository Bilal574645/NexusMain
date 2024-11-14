import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/seamlessM4T', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputText,
          sourceLang,
          targetLang,
        }),
      });

      const data = await response.json();
      if (data.result) {
        setResult(data.result);
        setError('');
      } else {
        setError('Failed to get result from the model');
      }
    } catch (error) {
      setError('An error occurred while making the request');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">SeamlessM4T Model Translation</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        rows="4"
        placeholder="Enter text to translate or transcribe"
      ></textarea>
      <div className="mb-4">
        <label className="block mb-2">Source Language</label>
        <input
          type="text"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          className="p-2 border rounded w-1/4"
          placeholder="e.g., 'en'"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Target Language</label>
        <input
          type="text"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="p-2 border rounded w-1/4"
          placeholder="e.g., 'es'"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Translate/Transcribe
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-4">
          <h3 className="font-semibold">Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
