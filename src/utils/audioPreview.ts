// Web Audio API Synthesizer for Mock Spotify Audio Preview
let activeAudioCtx: AudioContext | null = null;
let activeGainNode: GainNode | null = null;
let isAudioActive = false;
let activeOscillators: OscillatorNode[] = [];

export function playMockAudioPreview(frequencies: number[] = [261.63, 329.63, 392.00, 523.25], volume = 0.5) {
  try {
    stopMockAudioPreview();

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!activeAudioCtx || activeAudioCtx.state === 'closed') {
      activeAudioCtx = new AudioContextClass();
    }

    if (activeAudioCtx.state === 'suspended') {
      activeAudioCtx.resume();
    }

    const now = activeAudioCtx.currentTime;
    const masterGain = activeAudioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume * 0.25), now + 0.15);
    masterGain.connect(activeAudioCtx.destination);
    activeGainNode = masterGain;

    // Filter for warm analog warmth
    const filter = activeAudioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.connect(masterGain);

    activeOscillators = [];

    // Create polyphonic warm pad with slight detune
    frequencies.forEach((freq, idx) => {
      if (!activeAudioCtx) return;
      const osc = activeAudioCtx.createOscillator();
      const oscGain = activeAudioCtx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime((idx - 1.5) * 6, now);

      oscGain.gain.setValueAtTime(0.2, now);
      osc.connect(oscGain);
      oscGain.connect(filter);

      osc.start(now);
      activeOscillators.push(osc);
    });

    isAudioActive = true;
  } catch (err) {
    console.debug('Web Audio Preview not supported or autoplay blocked:', err);
  }
}

export function setMockAudioVolume(volume: number) {
  if (activeGainNode && activeAudioCtx) {
    try {
      const now = activeAudioCtx.currentTime;
      activeGainNode.gain.setValueAtTime(activeGainNode.gain.value, now);
      activeGainNode.gain.linearRampToValueAtTime(Math.max(0.0001, volume * 0.25), now + 0.05);
    } catch {
      // ignore
    }
  }
}

export function stopMockAudioPreview() {
  if (activeOscillators.length > 0) {
    activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    activeOscillators = [];
  }

  if (activeGainNode && activeAudioCtx) {
    try {
      activeGainNode.disconnect();
    } catch {
      // ignore
    }
    activeGainNode = null;
  }

  isAudioActive = false;
}

export function isAudioPreviewPlaying() {
  return isAudioActive;
}
