import os
import math
import struct
import wave

output_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')
os.makedirs(output_dir, exist_ok=True)

def write_wav(filename, samples, sample_rate=44100):
    filepath = os.path.join(output_dir, filename)
    with wave.open(filepath, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(sample_rate)
        
        packed_samples = bytearray()
        for sample in samples:
            s = max(-1.0, min(1.0, sample))
            int_sample = int(s * 32767) if s >= 0 else int(s * 32768)
            packed_samples.extend(struct.pack('<h', int_sample))
            
        wav_file.writeframes(packed_samples)
    print(f"✓ Created: public/audio/{filename} ({os.path.getsize(filepath)} bytes)")

def generate_success(sample_rate=44100):
    duration = 0.6
    num_samples = int(sample_rate * duration)
    samples = [0.0] * num_samples
    
    notes = [
        {'freq': 523.25, 'start': 0.0}, # C5
        {'freq': 659.25, 'start': 0.1}, # E5
        {'freq': 783.99, 'start': 0.2}, # G5
        {'freq': 1046.50, 'start': 0.3},# C6
    ]
    
    for i in range(num_samples):
        t = i / sample_rate
        sample_val = 0.0
        for note in notes:
            if t >= note['start']:
                note_t = t - note['start']
                env = math.exp(-6 * note_t)
                sample_val += 0.25 * math.sin(2 * math.pi * note['freq'] * note_t) * env
        samples[i] = sample_val
        
    return samples

def generate_error(sample_rate=44100):
    duration = 0.4
    num_samples = int(sample_rate * duration)
    samples = [0.0] * num_samples
    
    for i in range(num_samples):
        t = i / sample_rate
        in_pulse = (0.0 <= t <= 0.15) or (0.2 <= t <= 0.35)
        if in_pulse:
            env = math.sin(math.pi * (t % 0.2) / 0.15)
            wave_val = 0.5 * math.sin(2 * math.pi * 160 * t) + 0.3 * math.sin(2 * math.pi * 140 * t)
            samples[i] = wave_val * env * 0.6
    return samples

def generate_click(sample_rate=44100):
    duration = 0.05
    num_samples = int(sample_rate * duration)
    samples = [0.0] * num_samples
    
    for i in range(num_samples):
        t = i / sample_rate
        env = math.exp(-150 * t)
        samples[i] = 0.4 * math.sin(2 * math.pi * 1200 * t) * env
    return samples

def generate_beep(sample_rate=44100):
    duration = 0.3
    num_samples = int(sample_rate * duration)
    samples = [0.0] * num_samples
    
    for i in range(num_samples):
        t = i / sample_rate
        env = math.sin(math.pi * t / duration)
        samples[i] = 0.5 * math.sin(2 * math.pi * 1000 * t) * env
    return samples

if __name__ == '__main__':
    print("Generating sound effect WAV files with Python...")
    write_wav('success.wav', generate_success())
    write_wav('error.wav', generate_error())
    write_wav('click.wav', generate_click())
    write_wav('beep.wav', generate_beep())
    print("Python audio generation complete!")
