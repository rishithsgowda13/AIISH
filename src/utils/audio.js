/**
 * Auditory Closure Training - Audio Utility System
 * Provides dynamic Web Speech API (TTS), Web Audio API sound synthesizers,
 * and audio file fallback players.
 */

// Singleton WebAudio Context
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a Sound Effect using Web Audio API synthesis with HTML5 Audio fallback
 * @param {'success'|'error'|'click'|'beep'|'noise'} type 
 */
export function playSfx(type) {
  try {
    const ctx = getAudioContext();
    if (ctx) {
      const now = ctx.currentTime;

      if (type === 'success') {
        // Bright major arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.25, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.3);
        });
        return;
      }

      if (type === 'error') {
        // Low double buzz
        [0, 0.2].forEach(offset => {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();
          osc1.type = 'sawtooth';
          osc2.type = 'square';
          osc1.frequency.setValueAtTime(150, now + offset);
          osc2.frequency.setValueAtTime(130, now + offset);
          gain.gain.setValueAtTime(0.2, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.15);
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);
          osc1.start(now + offset);
          osc2.start(now + offset);
          osc1.stop(now + offset + 0.15);
          osc2.stop(now + offset + 0.15);
        });
        return;
      }

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
        return;
      }

      if (type === 'beep') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, now);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
        return;
      }

      if (type === 'noise') {
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        whiteNoise.connect(gain);
        gain.connect(ctx.destination);
        whiteNoise.start(now);
        return;
      }
    }
  } catch (err) {
    console.warn('Web Audio synthesis fallback to audio file:', err);
  }

  // Fallback to static audio file
  const audio = new Audio(`/audio/${type}.wav`);
  audio.play().catch(() => {});
}

/**
 * Text to Speech (TTS) using Web Speech API
 * @param {string} word - The target word
 * @param {Object} options - rate, pitch, occlusionType
 */
export function speakWord(word, options = {}) {
  if (!('speechSynthesis' in window)) {
    console.warn('Web Speech API not supported in this browser.');
    playSfx('beep');
    return;
  }

  window.speechSynthesis.cancel(); // Stop current speech

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = options.rate || 0.9; // Slightly slower for clarity
  utterance.pitch = options.pitch || 1.1; // Friendly tone for children
  utterance.volume = options.volume || 1.0;

  // Add closure effect: plays sound effect prior to or alongside speech if specified
  if (options.occlusionType === 'noise') {
    playSfx('noise');
  } else if (options.occlusionType === 'beep') {
    playSfx('beep');
  }

  window.speechSynthesis.speak(utterance);
}
