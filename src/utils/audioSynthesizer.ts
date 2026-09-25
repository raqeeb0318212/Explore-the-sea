/**
 * Web Audio API procedural underwater acoustic synthesizer
 * Generates natural low-frequency whale songs, dolphin echolocation clicks,
 * hydrophone sonar sweeps, and deep abyssal resonant drones.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playMarineAcoustic(type: 'whale-song' | 'dolphin-click' | 'sonar-pulse' | 'deep-drone' = 'whale-song') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
    masterGain.connect(ctx.destination);

    if (type === 'whale-song') {
      // Gentle harmonic glide resembling baleen whale vocalization
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(4, ctx.currentTime);

      osc1.type = 'sine';
      osc2.type = 'triangle';

      const now = ctx.currentTime;
      // Frequency glide: from 140Hz up to 210Hz and down to 90Hz
      osc1.frequency.setValueAtTime(140, now);
      osc1.frequency.exponentialRampToValueAtTime(220, now + 0.8);
      osc1.frequency.exponentialRampToValueAtTime(110, now + 2.2);

      osc2.frequency.setValueAtTime(142, now);
      osc2.frequency.exponentialRampToValueAtTime(224, now + 0.8);
      osc2.frequency.exponentialRampToValueAtTime(108, now + 2.2);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 2.6);
      osc2.stop(now + 2.6);

    } else if (type === 'dolphin-click') {
      // Rapid sequence of ultrasonic burst clicks
      const now = ctx.currentTime;
      for (let i = 0; i < 7; i++) {
        const clickTime = now + (i * 0.08);
        const osc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200 + (i * 120), clickTime);

        clickGain.gain.setValueAtTime(0.25, clickTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.04);

        osc.connect(clickGain);
        clickGain.connect(masterGain);

        osc.start(clickTime);
        osc.stop(clickTime + 0.05);
      }

    } else if (type === 'sonar-pulse') {
      // Subtle research hydrophone ping
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const pingGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);

      pingGain.gain.setValueAtTime(0.2, now);
      pingGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(pingGain);
      pingGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 1.3);

    } else if (type === 'deep-drone') {
      // Abyssal hydrothermal vent ambient rumble
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, now);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.linearRampToValueAtTime(45, now + 2.0);

      droneGain.gain.setValueAtTime(0.01, now);
      droneGain.gain.linearRampToValueAtTime(0.3, now + 0.6);
      droneGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      osc.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 2.6);
    }
  } catch {
    // Audio context may be blocked by autoplay policies until user interaction
  }
}
