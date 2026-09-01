"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioSoundscape() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleAmbientAudio = () => {
    if (audioPlaying) {
      audioCtxRef.current?.suspend();
      setAudioPlaying(false);
    } else {
      let ctx = audioCtxRef.current;
      if (!ctx) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const sampleRate = ctx.sampleRate;
        const bufferSize = 4 * sampleRate;

        // --- LAYER 1: Gentle Forest Wind & Breeze (Filtered Pink Noise with Slow Gusts) ---
        const windBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
        const windData = windBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.153852;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.016898;
          windData[i] =
            (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const windSource = ctx.createBufferSource();
        windSource.buffer = windBuffer;
        windSource.loop = true;

        const windFilter = ctx.createBiquadFilter();
        windFilter.type = "lowpass";
        windFilter.frequency.value = 350;

        // LFO for organic wind gusts (0.15 Hz slow sine modulation)
        const windLfo = ctx.createOscillator();
        windLfo.frequency.value = 0.15;
        const windLfoGain = ctx.createGain();
        windLfoGain.gain.value = 150;
        windLfo.connect(windLfoGain);
        windLfoGain.connect(windFilter.frequency);

        const windGain = ctx.createGain();
        windGain.gain.value = 0.08;

        windSource.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(ctx.destination);

        windSource.start();
        windLfo.start();

        // --- LAYER 2: Soft Stream & Water Rustle (Bandpass High-Density Droplets) ---
        const streamBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
        const streamData = streamBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          streamData[i] = (Math.random() * 2 - 1) * 0.03;
        }

        const streamSource = ctx.createBufferSource();
        streamSource.buffer = streamBuffer;
        streamSource.loop = true;

        const streamFilter = ctx.createBiquadFilter();
        streamFilter.type = "bandpass";
        streamFilter.frequency.value = 950;
        streamFilter.Q.value = 0.7;

        const streamGain = ctx.createGain();
        streamGain.gain.value = 0.04;

        streamSource.connect(streamFilter);
        streamFilter.connect(streamGain);
        streamGain.connect(ctx.destination);

        streamSource.start();

        // --- LAYER 3: Distant Soft Bird Chimes (Organic Pentatonic Chirps) ---
        const playBirdChime = () => {
          if (!ctx || ctx.state !== "running") return;
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          const baseFreq = [
            1318.51, 1567.98, 1760.0, 1975.53, 2349.32, 2637.02,
          ][Math.floor(Math.random() * 6)];
          osc.type = "sine";
          osc.frequency.setValueAtTime(baseFreq, now);
          osc.frequency.exponentialRampToValueAtTime(
            baseFreq * 1.12,
            now + 0.08
          );
          osc.frequency.exponentialRampToValueAtTime(
            baseFreq * 0.95,
            now + 0.22
          );

          noteGain.gain.setValueAtTime(0.0001, now);
          noteGain.gain.linearRampToValueAtTime(0.025, now + 0.04);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

          osc.connect(noteGain);
          noteGain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.4);
        };

        intervalRef.current = setInterval(() => {
          if (Math.random() < 0.7) {
            playBirdChime();
            setTimeout(() => {
              if (Math.random() < 0.6) playBirdChime();
            }, 180 + Math.random() * 140);
          }
        }, 3500);
      }

      ctx.resume();
      setAudioPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAmbientAudio}
      aria-label={
        audioPlaying
          ? "Silence natural soundscape"
          : "Listen to natural soundscape"
      }
      title={
        audioPlaying
          ? "Silence natural soundscape"
          : "Listen to natural soundscape"
      }
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-full border transition-all duration-700 cursor-pointer backdrop-blur-md ${
        audioPlaying
          ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(196,145,58,0.4)] animate-pulse"
          : "bg-surface/60 border-[#5E361F]/20 text-on-background/60 hover:text-on-background hover:border-[#5E361F]/40"
      }`}
    >
      {audioPlaying ? (
        <Volume2 className="w-4 h-4" />
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
    </button>
  );
}
