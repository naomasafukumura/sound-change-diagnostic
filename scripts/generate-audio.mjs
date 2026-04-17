import fs from 'fs';
import path from 'path';

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL';

const sentences = {
  questions: [
    { file: 'q01.mp3', text: 'I met him at the station.' },
    { file: 'q02.mp3', text: 'Can I get a cup of coffee?' },
    { file: 'q03.mp3', text: 'Turn it off before you leave.' },
    { file: 'q04.mp3', text: 'I just got back from work.' },
    { file: 'q05.mp3', text: "I don't want to be late." },
    { file: 'q06.mp3', text: "Last night I couldn't sleep." },
    { file: 'q07.mp3', text: 'I must get back to work.' },
    { file: 'q08.mp3', text: 'I can do it for you.' },
    { file: 'q09.mp3', text: 'What do you want to eat?' },
    { file: 'q10.mp3', text: 'We have to be there by noon.' },
  ],
  demos: [
    { file: 'linking.mp3', text: 'Check it out.' },
    { file: 'elision.mp3', text: 'Good morning.' },
    { file: 'weak-form.mp3', text: 'I want to go.' },
  ],
};

async function generateAudio(text, outputPath) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_turbo_v2_5',
      voice_settings: {
        stability: 0.3,
        similarity_boost: 0.8,
        speed: 1.0,
      },
    }),
  });

  if (!res.ok) {
    console.error(`Failed: ${text} — ${res.status} ${await res.text()}`);
    return;
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated: ${outputPath}`);
}

async function main() {
  if (!API_KEY) {
    console.error('ELEVENLABS_API_KEY is required');
    process.exit(1);
  }

  const baseDir = path.resolve('public/audio');
  fs.mkdirSync(path.join(baseDir, 'questions'), { recursive: true });
  fs.mkdirSync(path.join(baseDir, 'demos'), { recursive: true });

  for (const item of sentences.questions) {
    await generateAudio(item.text, path.join(baseDir, 'questions', item.file));
  }

  for (const item of sentences.demos) {
    await generateAudio(item.text, path.join(baseDir, 'demos', item.file));
  }

  console.log('All audio files generated.');
}

main();
