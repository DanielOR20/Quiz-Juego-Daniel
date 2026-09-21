// Web Audio API sintética nativa
class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }

  playTone(freq, duration, type = 'sine') {
    try {
      this.init();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio no soportado o bloqueado:', e);
    }
  }

  // Sonido al voltear carta
  flip() {
    this.playTone(420, 0.1, 'sine');
  }

  // Sonido al encontrar una pareja
  match() {
    this.playTone(587.33, 0.12, 'triangle');
    setTimeout(() => this.playTone(880, 0.25, 'triangle'), 100);
  }

  // Sonido de error al fallar
  mismatch() {
    this.playTone(220, 0.18, 'sawtooth');
  }

  // Melodía de victoria
  victory() {
    const notas = [523.25, 659.25, 783.99, 1046.50];
    notas.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.25, 'triangle'), i * 140);
    });
  }
}

export const sounds = new SoundEffects();