import { useEffect, useState } from "react";

export function useVolume() {
  const [volume, setVolume] = useState<number>(0.0);
  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      const buffer = new Float32Array(analyser.fftSize);

      const tick = () => {
        analyser.getFloatTimeDomainData(buffer);
        const sumsqr = buffer.reduce((acum, item) => {
          return acum + item * item;
        });
        const volume = sumsqr / buffer.length;

        setVolume(volume);
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    })();
  }, []);
  return { volume };
}
