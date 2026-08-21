// Simple Web Audio API Synthesizer for Arctic Ambient Wind Sound
class AmbientSynth {
  constructor() {
    this.audioCtx = null;
    this.noiseNode = null;
    this.filterNode = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.lfo = null;
  }

  init() {
    if (this.audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    this.audioCtx = new AudioContext();

    // Create 5 seconds of pink/white noise buffer
    const bufferSize = this.audioCtx.sampleRate * 5;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.04; // scale down
      b6 = white * 0.115926;
    }

    this.noiseBuffer = noiseBuffer;
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  start() {
    try {
      this.init();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.noiseNode = this.audioCtx.createBufferSource();
      this.noiseNode.buffer = this.noiseBuffer;
      this.noiseNode.loop = true;

      // Lowpass filter for deep arctic wind sound
      this.filterNode = this.audioCtx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      this.filterNode.Q.setValueAtTime(3, this.audioCtx.currentTime);

      // Low frequency oscillator for gentle wind swelling effect
      this.lfo = this.audioCtx.createOscillator();
      this.lfo.type = 'sine';
      this.lfo.frequency.setValueAtTime(0.15, this.audioCtx.currentTime); // slow swell
      
      const lfoGain = this.audioCtx.createGain();
      lfoGain.gain.setValueAtTime(150, this.audioCtx.currentTime);
      
      this.lfo.connect(lfoGain);
      lfoGain.connect(this.filterNode.frequency);

      // Master volume gain
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.08, this.audioCtx.currentTime + 2); // soft fade in

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      this.noiseNode.start();
      this.lfo.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
  }

  stop() {
    if (!this.isPlaying || !this.gainNode) return;
    try {
      this.gainNode.gain.linearRampToValueAtTime(0.001, this.audioCtx.currentTime + 1);
      setTimeout(() => {
        if (this.noiseNode) {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
        }
        if (this.lfo) {
          this.lfo.stop();
          this.lfo.disconnect();
        }
        this.isPlaying = false;
      }, 1000);
    } catch (e) {
      this.isPlaying = false;
    }
  }
}

export const ambientAudio = new AmbientSynth();
