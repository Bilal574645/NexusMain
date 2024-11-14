// utils/api.js

export async function textToAudio(text, srcLang, tgtLang) {
    const response = await fetch('https://79ef-34-86-248-41.ngrok-free.app/audio-to-audio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, src_lang: srcLang, tgt_lang: tgtLang })
    });
    const data = await response.json();
    return data.audio_array;
}

export async function audioToAudio(audioUrl, srcLang, tgtLang) {
    const response = await fetch('https://79ef-34-86-248-41.ngrok-free.app/audio-to-audio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ audio_url: audioUrl, src_lang: srcLang, tgt_lang: tgtLang })
    });
    const data = await response.json();
    return data.audio_array;
}
