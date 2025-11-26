import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LANDING_BG_URL } from '../constants';

interface LandingProps {
  onEnter: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onEnter }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating bubbles/particles
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 + 20,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    // Generate twinkling stars
    const newStars = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
            backgroundImage: `url(${LANDING_BG_URL})`,
        }}
      >
        {/* Darken overlay */}
        <div className="absolute inset-0 bg-[#0f172a]/40" />
      </div>

      {/* Gradient Overlay for Dreamy Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b]/90 via-[#1e1b4b]/20 to-transparent z-0 pointer-events-none" />

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
            key={`star-${star.id}`}
            className="absolute bg-white rounded-full z-10"
            style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: Math.random() > 0.5 ? '2px' : '3px',
                height: Math.random() > 0.5 ? '2px' : '3px',
            }}
            animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
            }}
            transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut"
            }}
        />
      ))}

      {/* Floating Particles/Bubbles */}
      {particles.map((p) => (
        <motion.div
          key={`p-${p.id}`}
          className="absolute rounded-full bg-cyan-200/20 backdrop-blur-[1px] border border-white/10 z-10"
          initial={{ bottom: '-10%', left: `${p.x}%`, opacity: 0 }}
          animate={{
            bottom: '120%',
            opacity: [0, 0.8, 0],
            x: [0, Math.sin(p.id) * 30, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
          style={{
            width: `${p.size * 10}px`,
            height: `${p.size * 10}px`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16 relative"
        >
          {/* Glowing effect behind title */}
          <div className="absolute inset-0 bg-blue-500/20 blur-[50px] rounded-full" />

          <h1 className="relative text-7xl md:text-9xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] tracking-wider"
              style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.6)' }}>
            我和黄子
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2 mx-auto"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 text-xl md:text-2xl text-cyan-100 font-light tracking-[0.8em] uppercase"
          >
            黄子的音乐宇宙
          </motion.div>
        </motion.div>

        {/* Call to Action Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(103, 232, 249, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="group relative px-16 py-5 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-bold text-xl overflow-hidden transition-colors hover:bg-white/20 hover:border-white/50"
        >
          <span className="relative z-10 flex items-center gap-3 tracking-widest">
            开启黄子之旅
            <motion.svg
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </motion.svg>
          </span>
          {/* Shine effect */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        </motion.button>
      </div>

      {/* Decorative Rotating Elements */}
      <motion.div
         animate={{ rotate: 360 }}
         transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
         className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl z-10 pointer-events-none"
      />
       <motion.div
         animate={{ rotate: -360 }}
         transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
         className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl z-10 pointer-events-none"
      />
    </div>
  );
};