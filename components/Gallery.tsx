import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES, GALLERY_BG_URL, GALLERY_MUSIC_URL } from '../constants';
import { GalleryImage } from '../types';

interface GalleryProps {
  onBack: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onBack }) => {
  const [activeId, setActiveId] = useState<string | null>(GALLERY_IMAGES[0].id);
  const audioRef = useRef<HTMLVideoElement>(null);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number; duration: number; color: string; width: number; height: number; shadow: string; drift: number }>>([]);

  useEffect(() => {
    // Attempt to autoplay music when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
    }

    // Generate falling ribbons/confetti with cinematic properties
    const particleCount = 150; // Increased quantity
    
    const newConfetti = Array.from({ length: particleCount }).map((_, i) => {
      const rand = Math.random();
      let color;
      let shadowColor;

      // Color distribution: ~70% Yellow/Gold, 15% Red, 15% Purple
      if (rand < 0.7) {
        // Yellows
        const yellows = ['#fef08a', '#fde047', '#facc15', '#fbbf24']; // yellow-200 to amber-400
        color = yellows[Math.floor(Math.random() * yellows.length)];
        shadowColor = 'rgba(253, 224, 71, 0.6)'; // Yellow glow
      } else if (rand < 0.85) {
        // Reds
        const reds = ['#fca5a5', '#f87171', '#ef4444']; // red-300 to red-500
        color = reds[Math.floor(Math.random() * reds.length)];
        shadowColor = 'rgba(239, 68, 68, 0.6)'; // Red glow
      } else {
        // Purples
        const purples = ['#d8b4fe', '#c084fc', '#a855f7']; // purple-300 to purple-500
        color = purples[Math.floor(Math.random() * purples.length)];
        shadowColor = 'rgba(168, 85, 247, 0.6)'; // Purple glow
      }

      return {
        id: i,
        x: Math.random() * 100, // Random horizontal position
        delay: Math.random() * 8, // Spread start times
        duration: Math.random() * 6 + 6, // Slower, floaty duration (6-12s)
        color: color,
        shadow: shadowColor,
        width: Math.random() * 8 + 4, 
        height: Math.random() * 14 + 8,
        drift: (Math.random() - 0.5) * 80, // Random horizontal drift distance
      };
    });
    setConfetti(newConfetti);

  }, []);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[#0f172a]">
      {/* Background Music */}
      <video 
        ref={audioRef} 
        src={GALLERY_MUSIC_URL} 
        className="hidden" 
        loop 
        autoPlay 
        playsInline 
      />

      {/* Layer 1: Tiled Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
            backgroundImage: `url(${GALLERY_BG_URL})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '400px auto', 
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Layer 2: Cinematic Lighting & Atmosphere */}
      {/* Warm top glow to simulate stage lights */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-yellow-500/10 via-transparent to-black/60 mix-blend-screen" />
      
      {/* Soft overlay for "hazy" feeling */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-purple-900/10 mix-blend-overlay backdrop-blur-[1px]" />

      {/* Layer 3: Falling Ribbons/Confetti */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="absolute rounded-sm opacity-90"
            style={{
              backgroundColor: c.color,
              boxShadow: `0 0 6px ${c.shadow}`, // Glow effect
              left: `${c.x}%`,
              width: `${c.width}px`,
              height: `${c.height}px`,
              top: -50,
            }}
            animate={{
              top: '110%',
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360],
              rotateZ: [0, c.drift / 2, 0], // Slight tumble
              x: [0, c.drift, -c.drift / 2, 0], // Wavy wind motion
              opacity: [0, 1, 1, 0] // Fade in and out at extremes
            }}
            transition={{
              duration: c.duration,
              repeat: Infinity,
              ease: "easeInOut", // Smoother ease for floaty effect
              delay: c.delay,
            }}
          />
        ))}
      </div>

      {/* Layer 4: Vignette & Foreground Haze (Cinematic Finish) */}
      {/* Vignette to focus center */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
      {/* Subtle bloom/blur on top of everything for dreamy effect */}
      <div className="absolute inset-0 pointer-events-none z-40 backdrop-blur-[0.5px] bg-yellow-500/5 mix-blend-soft-light" />

      {/* Header */}
      <div className="flex-none p-6 flex justify-between items-center z-50 relative">
        <button 
          onClick={onBack}
          className="text-white/80 hover:text-white flex items-center gap-2 transition-colors uppercase tracking-widest text-sm drop-shadow-md group"
        >
          <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </div>
          <span className="group-hover:translate-x-1 transition-transform">返回</span>
        </button>
        <h2 className="text-xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-purple-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          黄子 · 璀璨时刻
        </h2>
      </div>

      {/* Accordion Container */}
      <div className="flex-1 flex items-center justify-center overflow-hidden px-2 md:px-12 pb-12 w-full h-full z-20 relative">
        <div className="flex w-full max-w-[1800px] h-[60vh] md:h-[75vh] gap-1 md:gap-2">
          {GALLERY_IMAGES.map((img) => (
            <GalleryItem 
              key={img.id} 
              image={img} 
              isActive={activeId === img.id} 
              onHover={() => setActiveId(img.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface GalleryItemProps {
  image: GalleryImage;
  isActive: boolean;
  onHover: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, isActive, onHover }) => {
  return (
    <motion.div
      layout
      onMouseEnter={onHover}
      className={`relative h-full rounded-xl overflow-hidden cursor-default shadow-[0_0_20px_rgba(0,0,0,0.5)] border-r border-white/5`}
      style={{
        flexBasis: isActive ? '50%' : '5%',
        minWidth: isActive ? '300px' : '20px',
      }}
      initial={false}
      animate={{
        flexGrow: isActive ? 1 : 0,
        // Make inactive items slightly more visible but tinted for atmosphere
        filter: isActive ? 'grayscale(0%) brightness(1.05)' : 'grayscale(100%) brightness(0.5) sepia(20%)',
        borderColor: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)'
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        layout: { duration: 0.3 } 
      }}
    >
      {/* Image Layer */}
      <motion.img
        src={image.url}
        alt={image.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: isActive ? 1.05 : 1.15 }}
        transition={{ duration: 0.7 }}
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100' : 'bg-black/40'}`} />

      {/* Content Layer (Only visible when active) */}
      <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end overflow-hidden">
        <AnimatePresence mode="popLayout">
          {isActive && (
            <motion.div
              key="active-content"
              initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <h3 className="text-2xl md:text-5xl font-black text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] uppercase font-sans tracking-tight">
                {image.title}
              </h3>
              <p className="text-yellow-100 text-xs md:text-base font-medium max-w-lg leading-relaxed drop-shadow-md">
                {image.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Vertical Title for inactive items */}
        {!isActive && (
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 md:opacity-100">
             <span className="writing-mode-vertical text-white/50 text-[10px] tracking-[0.5em] font-bold uppercase rotate-180 drop-shadow-md">
               {image.title}
             </span>
           </div>
        )}
      </div>

      {/* Decorative Number */}
      <div className={`absolute top-4 right-4 font-black italic z-10 transition-colors duration-300 ${isActive ? 'text-white/30 text-4xl drop-shadow-lg' : 'text-white/10 text-xl'}`}>
        {image.id.padStart(2, '0')}
      </div>
    </motion.div>
  );
};