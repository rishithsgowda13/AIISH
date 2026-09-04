import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '..', 'public', 'audio');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Creates a 16-bit MONO WAV Buffer from an array of float PCM samples (-1.0 to 1.0)
 */
function createWavBuffer(samples, sampleRate = 44100) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write 16-bit signed PCM samples
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const int16 = s < 0 ? s * 0x8000 : s * 0x7fff;
    buffer.writeInt16LE(Math.floor(int16), 44 + i * 2);
  }

  return buffer;
}

// 1. Success Chime (Arpeggiated C-Major Triad: C5, E5, G5, C6)
function generateSuccessSound(sampleRate = 44100) {
  const duration = 0.6;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);

  const notes = [
    { freq: 523.25, start: 0.0, end: 0.6 },  // C5
    { freq: 659.25, start: 0.1, end: 0.6 },  // E5
    { freq: 783.99, start: 0.2, end: 0.6 },  // G5
    { freq: 1046.50, start: 0.3, end: 0.6 }, // C6
  ];

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = 0;

    notes.forEach(note => {
      if (t >= note.start && t <= note.end) {
        const noteT = t - note.start;
        const envelope = Math.exp(-6 * noteT);
        sample += 0.25 * Math.sin(2 * Math.PI * note.freq * noteT) * envelope;
      }
    });

    samples[i] = sample;
  }
  return createWavBuffer(samples, sampleRate);
}

// 2. Error Buzz (Dual low frequency square/sine mix with 2 pulses)
function generateErrorSound(sampleRate = 44100) {
  const duration = 0.4;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Pulse 1: 0 to 0.15s, Pulse 2: 0.2 to 0.35s
    const inPulse = (t >= 0 && t <= 0.15) || (t >= 0.2 && t <= 0.35);
    if (inPulse) {
      const freq1 = 160;
      const freq2 = 140;
      const env = Math.sin(Math.PI * (t % 0.2) / 0.15);
      const wave = 0.5 * Math.sin(2 * Math.PI * freq1 * t) + 0.3 * Math.sin(2 * Math.PI * freq2 * t);
      samples[i] = wave * env * 0.6;
    } else {
      samples[i] = 0;
    }
  }
  return createWavBuffer(samples, sampleRate);
}

// 3. UI Click Sound
function generateClickSound(sampleRate = 44100) {
  const duration = 0.05;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-150 * t);
    samples[i] = 0.4 * Math.sin(2 * Math.PI * 1200 * t) * env;
  }
  return createWavBuffer(samples, sampleRate);
}

// 4. Occlusion Tone Beep (1000 Hz tone)
function generateBeepSound(sampleRate = 44100) {
  const duration = 0.3;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.sin(Math.PI * t / duration); // Smooth fade in/out
    samples[i] = 0.5 * Math.sin(2 * Math.PI * 1000 * t) * env;
  }
  return createWavBuffer(samples, sampleRate);
}

// 5. White Noise Burst (Auditory Masking)
function generateNoiseSound(sampleRate = 44100) {
  const duration = 0.5;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.sin(Math.PI * t / duration);
    const noise = (Math.random() * 2 - 1);
    samples[i] = 0.3 * noise * env;
  }
  return createWavBuffer(samples, sampleRate);
}

// Save generated files
const audioFiles = [
  { name: 'success.wav', generator: generateSuccessSound },
  { name: 'error.wav', generator: generateErrorSound },
  { name: 'click.wav', generator: generateClickSound },
  { name: 'beep.wav', generator: generateBeepSound },
  { name: 'noise.wav', generator: generateNoiseSound },
];

console.log('Generating sound effect WAV files...');
audioFiles.forEach(({ name, generator }) => {
  const filePath = path.join(outputDir, name);
  const buffer = generator();
  fs.writeFileSync(filePath, buffer);
  console.log(`✓ Created: public/audio/${name} (${buffer.length} bytes)`);
});

console.log('Audio generation complete!');
