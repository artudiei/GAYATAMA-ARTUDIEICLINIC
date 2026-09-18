import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import splashVideo from '../../assets/splashscreen.mp4';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video playback error:', err);
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      onClick={onComplete}
      className="fixed inset-0 z-50 bg-[#120E0C] flex items-center justify-center overflow-hidden cursor-pointer select-none"
    >
      <video
        ref={videoRef}
        src={splashVideo}
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};
