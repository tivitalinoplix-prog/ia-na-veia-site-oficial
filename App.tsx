import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { 
  Menu, X, ArrowDown, Bug, Quote, AlertTriangle, MousePointer2, RefreshCw, 
  BarChart, FileText, Shield, Target, Sparkles, Instagram, Linkedin, 
  ArrowUpRight, Dna, Lightbulb, ShieldCheck, Brain, MessageSquare, 
  Cpu, Lock, Star, Activity, Check
} from 'lucide-react';

function MagneticButton({ children, className = "", onClick, href, target, rel, disabled }: { children: React.ReactNode, className?: string, onClick?: () => void, href?: string, target?: string, rel?: string, disabled?: boolean }) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!buttonRef.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const commonProps = {
    className: `relative inline-flex items-center justify-center transition-transform duration-300 ease-out ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { transform: `translate(${position.x}px, ${position.y}px)` }
  };

  if (href) {
    return (
      <a href={href} ref={buttonRef as React.RefObject<HTMLAnchorElement>} target={target} rel={rel} {...commonProps}>
        {children}
      </a>
    );
  }

  return (
    <button ref={buttonRef as React.RefObject<HTMLButtonElement>} onClick={onClick} disabled={disabled} {...commonProps}>
      {children}
    </button>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    setMousePos({ x, y });
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className={`relative w-full h-full group ${className}`}
    >
      <div 
        className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-300 rounded-2xl mix-blend-overlay"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 40%)`
        }}
      />
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none z-[100]">
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full mix-blend-screen"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-accent/50 rounded-full mix-blend-screen flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(232, 39, 42, 0.15)' : 'transparent',
          borderColor: isHovering ? 'rgba(232, 39, 42, 0.8)' : 'rgba(232, 39, 42, 0.5)'
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.5 }}
      />
    </div>
  );
}

const LogoDot = () => (
  <motion.span
    animate={{
      scale: [1, 1.2, 1, 1.2, 1, 1, 1],
      boxShadow: [
        "0 0 0px rgba(232, 39, 42, 0)",
        "0 0 15px rgba(232, 39, 42, 0.8)",
        "0 0 0px rgba(232, 39, 42, 0)",
        "0 0 15px rgba(232, 39, 42, 0.8)",
        "0 0 0px rgba(232, 39, 42, 0)",
        "0 0 15px rgba(232, 39, 42, 0.4)",
        "0 0 0px rgba(232, 39, 42, 0)"
      ]
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.1, 0.2, 0.3, 0.4, 0.8, 1]
    }}
    className="absolute bottom-[0.78em] left-[0.11em] w-[0.18em] h-[0.18em] bg-[#E8272A] -skew-x-[14deg] origin-bottom animate-pulse"
  />
);

function FadeIn({ children, delay = 0, className = "", direction = "up" }: { children: React.ReactNode, delay?: number, className?: string, direction?: "up" | "down" | "left" | "right" }) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeroParticles() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

function EKGBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center opacity-[0.08]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="flex w-[200%] h-full items-center"
      >
        <div className="w-1/2 h-full flex items-center">
          <svg width="100%" height="300" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <path d="M 0 150 L 800 150 L 820 90 L 840 240 L 860 120 L 880 150 L 1000 150" fill="none" stroke="#E8272A" strokeWidth="3" vectorEffect="non-scaling-stroke" filter="drop-shadow(0 0 8px rgba(232,39,42,0.8))" />
          </svg>
        </div>
        <div className="w-1/2 h-full flex items-center">
          <svg width="100%" height="300" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <path d="M 0 150 L 800 150 L 820 90 L 840 240 L 860 120 L 880 150 L 1000 150" fill="none" stroke="#E8272A" strokeWidth="3" vectorEffect="non-scaling-stroke" filter="drop-shadow(0 0 8px rgba(232,39,42,0.8))" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

function Preloader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 800);
    const unmountTimer = setTimeout(() => {
      setIsUnmounted(true);
    }, 2000);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (isUnmounted) return null;

  return (
    <div className="fixed inset-0 z-[100] flex w-full h-full overflow-hidden pointer-events-none">
      <div 
        className={`relative flex-1 border-r border-[#1a1a1a] bg-[#050507] flex items-center justify-end transition-transform duration-[1200ms] ease-[cubic-bezier(0.7,0,0.3,1)] pointer-events-auto ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <span className="text-[clamp(60px,12vw,175px)] font-display font-black italic tracking-[-0.03em] md:tracking-[-0.05em] lg:tracking-[-0.07em] text-white opacity-90 select-none drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] pr-2 lg:pr-4">
          NA
        </span>
      </div>
      <div 
        className={`relative flex-1 border-l border-[#1a1a1a] bg-[#050507] flex items-center justify-start transition-transform duration-[1200ms] ease-[cubic-bezier(0.7,0,0.3,1)] pointer-events-auto ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <span className="text-[clamp(60px,12vw,175px)] font-display font-black italic tracking-[-0.03em] md:tracking-[-0.05em] lg:tracking-[-0.07em] text-accent opacity-90 select-none drop-shadow-[0_0_40px_rgba(220,38,38,0.5)] pl-2 lg:pl-4">
          VE<span className="relative inline-block leading-none">ı<LogoDot /></span>A
        </span>
      </div>
      <div className={`absolute inset-x-0 bottom-[10%] flex flex-col items-center justify-center pointer-events-none z-30 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
        <span className="text-xs tracking-[0.3em] text-accent uppercase animate-pulse font-medium">
          _Initialize_Connection
        </span>
      </div>
    </div>
  );
}

function ScrambleText({ text, trigger }: { text: string, trigger: number }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

  useEffect(() => {
    if (trigger === 0) return;
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((char, index) => {
        if (index < iterations) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text, trigger]);

  return <span>{displayText}</span>;
}

function DiagnosticGrid() {
  const [cells, setCells] = useState(Array(25).fill('idle'));
  const [scrambleTrigger, setScrambleTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCells(prev => {
        const next = [...prev];
        const idleIndices = next.map((c, i) => c === 'idle' ? i : -1).filter(i => i !== -1);
        if (idleIndices.length === 0) return Array(25).fill('idle');
        const numToPick = Math.min(idleIndices.length, Math.floor(Math.random() * 2) + 1);
        const picked = [];
        for(let i=0; i<numToPick; i++) {
            const randomIndex = Math.floor(Math.random() * idleIndices.length);
            picked.push(idleIndices.splice(randomIndex, 1)[0]);
        }
        picked.forEach(pick => {
            next[pick] = 'error';
            setTimeout(() => {
              setCells(current => {
                const updated = [...current];
                if (updated[pick] === 'error') updated[pick] = 'optimized';
                return updated;
              });
            }, 300 + Math.random() * 400);
        });
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleCellClick = (index: number) => {
    setScrambleTrigger(prev => prev + 1);
    setCells(prev => {
      const next = [...prev];
      next[index] = 'error';
      setTimeout(() => {
        setCells(current => {
          const updated = [...current];
          if (updated[index] === 'error') updated[index] = 'optimized';
          return updated;
        });
      }, 500);
      return next;
    });
  };

  return (
    <TiltCard>
      <div className="flex flex-col border border-white/10 bg-[#111111] p-6 rounded-2xl group-hover:border-accent transition-colors duration-300">
        <div className="grid grid-cols-5 gap-2 mb-6 cursor-pointer">
          {cells.map((status, i) => (
            <motion.div 
              key={i} 
              onClick={() => handleCellClick(i)}
              whileHover={{ scale: 1.2, zIndex: 10 }}
              animate={{
                y: status === 'idle' ? [0, Math.random() * -2 - 1, 0] : 0,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`w-full aspect-square rounded-sm transition-all duration-300 ${
                status === 'idle' ? 'bg-white border border-white/10 hover:bg-white/80' : 
                status === 'error' ? 'bg-accent/20 border border-accent shadow-[0_0_10px_rgba(220,38,38,0.5)] scale-95' : 
                'bg-white/20 border border-white/30 scale-100'
              }`}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 text-xs tracking-wider uppercase">
          <div className="flex justify-between gap-6">
            <span className="text-white font-bold tracking-wider">INTERACTIVE_SCAN:</span>
            <span className="text-white font-bold tracking-wider animate-pulse">READY</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-white font-bold tracking-wider">THROUGHPUT:</span>
            <span className="text-accent font-bold tracking-wider"><ScrambleText text="MAXIMIZED" trigger={scrambleTrigger} /></span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 w-full flex justify-between items-center p-6 lg:px-12 lg:py-8 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="flex-shrink-0 font-display font-black italic text-2xl tracking-tighter">
          <motion.a 
            href="#" 
            className="text-white flex items-center gap-1"
            whileHover={{ scale: 1.05, textShadow: "0px 10px 20px rgba(232,39,42,0.4)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            NA<span className="text-accent">VE<span className="relative inline-block leading-none">ı<LogoDot /></span>A</span>
          </motion.a>
        </div>
        <div className="hidden lg:flex gap-8 items-center">
          <a href="#problem" className="text-white hover:text-accent transition-colors text-xs font-medium tracking-widest uppercase">Gargalos</a>
          <a href="#method" className="text-white hover:text-accent transition-colors text-xs font-medium tracking-widest uppercase">Método</a>
          <a href="#mentor" className="text-white hover:text-accent transition-colors text-xs font-medium tracking-widest uppercase">Especialista</a>
        </div>
        <div className="flex gap-6 items-center">
          <div className="hidden lg:flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full bg-white/5">
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(220,38,38,0.8)]"
            />
            <span className="text-[10px] font-medium tracking-widest text-accent uppercase"><ScrambleText text="System Active" trigger={1} /></span>
          </div>
          <MagneticButton href="#ai-consultant" className="hidden lg:flex text-white bg-accent px-6 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase hover:bg-accent/80 transition-colors">Diagnóstico</MagneticButton>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            <a href="#problem" onClick={() => setIsOpen(false)} className="text-2xl font-display font-medium tracking-tighter text-white hover:text-accent transition-colors">GARGALOS</a>
            <a href="#method" onClick={() => setIsOpen(false)} className="text-2xl font-display font-medium tracking-tighter text-white hover:text-accent transition-colors">MÉTODO</a>
            <a href="#mentor" onClick={() => setIsOpen(false)} className="text-2xl font-display font-medium tracking-tighter text-white hover:text-accent transition-colors">ESPECIALISTA</a>
            <a href="#ai-consultant" onClick={() => setIsOpen(false)} className="text-2xl font-display font-medium tracking-tighter text-accent border border-accent/20 px-8 py-3 rounded-full bg-accent/5">DIAGNÓSTICO</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const xLeft = useTransform(scrollY, [0, 1000], [0, -300]);
  const xRight = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const yParallax = useTransform(scrollY, [0, 1000], [0, 450]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.35]);

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-20 bg-[#050505]">
      <HeroParticles />
      <motion.div 
        style={{ 
          y: yParallax,
          scale,
          maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
        }} 
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop" 
          alt="AI Background" 
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity brightness-[1.4] contrast-[1.4]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_60%)] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]"></div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02, filter: "drop-shadow(0px 15px 25px rgba(232,39,42,0.4))" }}
        className="relative z-10 flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-6 items-center justify-center cursor-default"
      >
        <motion.div 
          style={{ x: xLeft, opacity }} 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="flex-1 flex justify-center lg:justify-end lg:pr-4"
        >
          <span className="text-[clamp(100px,20vw,240px)] font-display font-black italic leading-none text-white tracking-[-0.03em] md:tracking-[-0.05em] lg:tracking-[-0.07em]">NA</span>
        </motion.div>
        <motion.div 
          style={{ x: xRight, opacity }} 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="flex-1 flex justify-center lg:justify-start lg:pl-4"
        >
          <span className="text-[clamp(100px,20vw,240px)] font-display font-black italic leading-none text-accent tracking-[-0.03em] md:tracking-[-0.05em] lg:tracking-[-0.07em] drop-shadow-[0_0_40px_rgba(220,38,38,0.5)]">VE<span className="relative inline-block leading-none">ı<LogoDot /></span>A</span>
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity }} className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center z-30">
        <p className="text-xl md:text-2xl font-light text-white/95 mt-12 mb-10 max-w-2xl text-center px-4 drop-shadow-lg">
          Fusão estratégica entre <span className="text-white font-bold border-b-2 border-accent drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">Neurociência</span>, <span className="text-white font-bold border-b-2 border-accent drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">IA Generativa</span> e <span className="text-white font-bold border-b-2 border-accent drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">Ciência da Criatividade</span>.
        </p>
        <MagneticButton href="#problem" className="group relative overflow-hidden flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-full font-tech font-bold tracking-[0.2em] transition-all duration-500 uppercase text-xs lg:text-sm shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(232,39,42,0.4)] hover:border-accent/50">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-red-900/0 opacity-0 group-hover:from-accent/80 group-hover:to-red-900/80 group-hover:opacity-100 transition-all duration-500" />
          <span className="relative z-10">MAPEAR ESTRATÉGIA</span>
          <motion.div
            className="relative z-10"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-accent group-hover:text-white transition-colors duration-500" />
          </motion.div>
        </MagneticButton>
      </motion.div>
    </div>
  );
}

function ProblemSection() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const feedbackMessages = [
    "Reconhecer processos manuais é o primeiro passo. A automação inteligente elimina retrabalho e libera sua equipe.",
    "Documentos sem padrão geram risco. Vamos estruturar sua base de conhecimento com IA para garantir consistência.",
    "Gargalos de back-office são invisíveis até que drenem seu caixa. Hora de reestruturar com fluxos autônomos.",
    "IA sem alinhamento é um risco corporativo. Aplico RLHF e LLM Alignment para garantir precisão absoluta.",
    "Escalar exige automação. Vamos criar sistemas que operam sem dependência de pessoas específicas.",
    "Custos altos são sintoma de processos ineficientes. A IA aplicada reduz custos operacionais drasticamente.",
    "A estagnação é reversível. Uma intervenção estratégica com IA pode transformar sua operação agora."
  ];

  return (
    <section id="problem" className="relative z-20 w-full border-t border-white/10 bg-[#050505]">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col">
          <div className="p-8 lg:p-20 border-b border-white/10 bg-[#050505]">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-white/10 mb-8">
                <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}><Bug className="w-4 h-4 text-accent" /></motion.div>
                <span className="text-xs font-medium tracking-wide text-white uppercase">Diagnóstico Operacional</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl lg:text-6xl font-display font-medium tracking-tighter text-white leading-[1.1] max-w-lg mb-6">
                Sua operação está <span className="text-accent">drenando seu crescimento?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base lg:text-lg text-white font-light max-w-md leading-relaxed">
                Sua empresa investe tempo e dinheiro em operações repetitivas. Documentos são redigidos manualmente, processos geram gargalos e a equipe gasta horas em tarefas que poderiam ser automatizadas com IA.
              </p>
            </FadeIn>
          </div>
          <div className="flex-1 relative min-h-[300px] overflow-hidden p-8 lg:p-20 flex flex-col justify-end bg-[#111111]">
            <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><Quote className="w-16 h-16 text-white absolute top-8 left-8" /></motion.div>
            <FadeIn delay={0.3} direction="right">
              <div className="relative z-10 border-l-2 border-accent pl-6 py-2">
                <p className="text-xl lg:text-2xl text-white font-light leading-snug max-w-md">
                  "O problema não é a sua equipe. O problema é que seus processos não foram desenhados para escalar com inteligência."
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
        <div className="flex flex-col h-full bg-accent">
          <div className="p-8 lg:p-16 border-b border-white/10 bg-black/10 relative overflow-hidden min-h-[250px] flex flex-col justify-center">
            <AlertTriangle className="w-32 h-32 text-white absolute top-8 right-8 opacity-10" />
            <div className="relative z-10 w-full">
              {selectedStage === null ? (
                <span className="inline-flex items-center gap-2 text-white font-medium uppercase text-xs tracking-widest border border-white/20 px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm">
                  <MousePointer2 className="w-4 h-4" />
                  Selecione um gargalo abaixo
                </span>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={selectedStage}>
                  <p className="text-white font-medium text-2xl lg:text-3xl mb-4 leading-relaxed max-w-lg tracking-tight">{feedbackMessages[selectedStage]}</p>
                  <div className="flex items-center gap-2 text-white text-xs font-medium uppercase tracking-widest mt-6">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Analisando solução...
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1">
            {[
              { icon: Lightbulb, title: "1. Processos Manuais" },
              { icon: FileText, title: "2. Documentação Desestruturada" },
              { icon: Activity, title: "3. Gargalos de Back-office" },
              { icon: Brain, title: "4. IA sem Alinhamento" },
              { icon: Target, title: "5. Escala Travada" },
              { icon: BarChart, title: "6. Custos Operacionais Altos" },
              { icon: Lock, title: "7. ESTAGNAÇÃO" }
            ].map((stage, index) => (
              <FadeIn key={index} delay={index * 0.1} direction="left">
                <motion.div 
                  onClick={() => setSelectedStage(index)}
                  whileHover={{ x: 10 }}
                  className={`group relative overflow-hidden flex items-center justify-between p-6 lg:px-12 border-b border-white/10 transition-all cursor-pointer ${selectedStage === index ? 'bg-black/20 border-l-2 border-l-white' : 'hover:bg-black/10 border-l-2 border-l-transparent'}`}
                >
                  <div className="flex items-center gap-6 relative z-10">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full border ${selectedStage === index ? 'bg-white text-accent' : 'bg-transparent border-white/20 text-white'}`}>
                      <stage.icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-medium tracking-tight text-white">{stage.title}</h4>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section id="method" className="relative z-20 w-full border-t border-white/10 bg-[#050505] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn className="mb-16">
          <span className="font-medium uppercase mb-4 block text-accent tracking-widest text-xs flex items-center gap-2">O Framework</span>
          <h2 className="text-4xl lg:text-6xl font-display font-medium tracking-tighter text-white mb-6 leading-[1.1]">O Método <span className="text-white">NA VEiA</span></h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn delay={0.1} className="md:col-span-2">
            <TiltCard><div className="bg-accent p-8 lg:p-12 flex flex-col md:flex-row justify-between hover:border-white/30 transition-colors rounded-2xl h-full gap-8"><div className="flex flex-col justify-between"><div><div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/20"><BarChart className="w-6 h-6 text-white" /></div><h3 className="text-2xl lg:text-4xl font-display font-medium text-white mb-4">Otimização Inteligente</h3><p className="text-lg text-white font-light">Mapeamento estratégico de gargalos e fluxos autônomos.</p></div></div><div className="bg-black/20 p-6 rounded-xl border border-white/10 flex-1"><DiagnosticGrid /></div></div></TiltCard>
          </FadeIn>
          <FadeIn delay={0.2} className="md:col-span-1">
            <TiltCard><div className="bg-[#111111] p-8 lg:p-12 flex flex-col justify-between hover:border-accent transition-all rounded-2xl h-full shadow-2xl"><div className="w-14 h-14 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-8 border border-white/5"><FileText className="w-6 h-6 text-accent" /></div><h3 className="text-xl lg:text-2xl text-white mb-4">Automação de Docs</h3><p className="text-sm text-white font-light mb-8">Engenharia de Prompt para documentos técnicos em escala.</p><div className="bg-[#050505] p-5 rounded-xl font-mono text-xs border border-white/5"><div className="flex gap-2 mb-4 opacity-50"><div className="w-3 h-3 rounded-full bg-accent"></div><div className="w-3 h-3 rounded-full bg-white/20"></div></div><p className="text-accent">function generate_doc() {"{"}</p><p className="pl-4 text-white">return Success;</p><p className="text-white">{"}"}</p></div></div></TiltCard>
          </FadeIn>
          <FadeIn delay={0.3} className="md:col-span-3">
            <TiltCard><div className="bg-[#0a0a0a] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between hover:border-accent transition-colors rounded-2xl h-full"><div className="max-w-2xl"><div className="w-14 h-14 bg-[#111111] rounded-full flex items-center justify-center mb-8 border border-white/5"><Shield className="w-6 h-6 text-accent" /></div><h3 className="text-2xl lg:text-4xl text-white mb-4">Auditoria de IA</h3><p className="text-lg text-white font-light">Segurança absoluta com RLHF e LLM Alignment.</p></div><div className="hidden md:flex items-center gap-8"><div className="w-24 h-1 bg-white opacity-30"></div><div className="w-48 h-1 bg-white opacity-30"></div><div className="w-32 h-1 bg-accent shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div></div></div></TiltCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function MentorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={sectionRef} id="mentor" className="relative z-20 bg-[#050505] text-white w-full border-t border-b border-white/10 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity pointer-events-none">
        <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop" alt="Background" className="w-full h-[150%] object-cover brightness-[1.2] contrast-[1.2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-4 w-full relative z-10">
        <div className="col-span-1 lg:col-span-4 p-8 lg:p-16 border-b border-white/10 flex flex-col items-start gap-6">
          <FadeIn><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111]/80 backdrop-blur-md border border-white/10"><Sparkles className="w-4 h-4 text-accent" /><span className="text-xs font-medium text-white uppercase tracking-widest">O Especialista</span></div></FadeIn>
          <FadeIn delay={0.1}><h2 className="text-6xl lg:text-[8rem] font-display font-medium tracking-tighter text-white leading-[0.85]">VITALINO<span className="text-accent animate-pulse">_</span></h2></FadeIn>
          <FadeIn delay={0.2}><p className="text-white/80 text-xl lg:text-2xl max-w-2xl font-light">Especialista em Engenharia de Prompt e IA.</p></FadeIn>
        </div>
        <div className="col-span-1 lg:col-span-1 bg-[#111111]/80 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-white/10 p-8 flex flex-col justify-between relative">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[60%] bg-accent/20 blur-[100px] pointer-events-none"></div>
          <FadeIn delay={0.3} direction="up" className="flex flex-col gap-8 relative z-10">
            <TiltCard><div className="aspect-[4/5] rounded-2xl overflow-hidden border border-accent/40 shadow-2xl relative"><img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" alt="Mentor" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div></div></TiltCard>
            <div><h3 className="text-2xl font-medium text-white mb-2">Quem sou eu</h3><p className="text-sm text-white/70 font-light">Especialista em Engenharia de Conhecimento.</p></div>
            <div className="flex gap-3"><MagneticButton className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-accent transition-all shadow-xl"><Instagram className="w-5 h-5" /></MagneticButton><MagneticButton className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-accent transition-all shadow-xl"><Linkedin className="w-5 h-5" /></MagneticButton></div>
          </FadeIn>
          <FadeIn delay={0.4}><MagneticButton href="https://wa.me/5522998586180" className="w-full py-4 bg-white text-black rounded-full font-bold flex items-center justify-between px-6 mt-12 hover:scale-[1.02] shadow-2xl"><span>Fale comigo</span><ArrowUpRight className="w-5 h-5" /></MagneticButton></FadeIn>
        </div>
        <div className="col-span-1 lg:col-span-3 p-8 lg:p-20 bg-[#050505]/80 backdrop-blur-sm flex flex-col justify-center gap-12">
          <p className="text-2xl lg:text-4xl font-light text-white leading-tight italic">"Minha missão é transformar a inteligência do seu negócio em fluxos automatizados com precisão cirúrgica."</p>
          <div className="flex flex-wrap gap-3">{['Neurociências', 'IA Generativa', 'LLM Alignment', 'RLHF'].map(tag => <span key={tag} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium uppercase tracking-widest text-white/90 hover:bg-accent/20 hover:border-accent/50 transition-all cursor-default">{tag}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

function DiagnosticSection() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleAnalyze = () => {
    if (!input.trim() || response) return;
    setIsProcessing(true);
    setTimeout(() => {
      setResponse("Entendo sua situação. O cenário clássico exige Otimização de Processos imediatamente.");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <section id="ai-consultant" className="py-24 bg-[#050505]">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-accent p-8 lg:p-12 rounded-3xl flex flex-col justify-between items-start"><FadeIn><h2 className="text-4xl lg:text-5xl font-display font-medium text-white mb-6">AI Diagnostic</h2><p className="text-white/90 font-light leading-relaxed">A inovação chegou à gestão corporativa. Treinada com nosso framework exclusivo.</p></FadeIn><div className="flex items-center gap-2 text-white/70 text-xs font-bold tracking-widest uppercase mt-12"><ShieldCheck className="w-5 h-5" /><span>100% Secure</span></div></div>
        <div className="bg-[#111111] p-8 lg:p-12 rounded-3xl border border-white/10"><textarea value={input} onChange={e => setInput(e.target.value)} disabled={!!response || isProcessing} placeholder="Descreva seu gargalo..." className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-white h-48 focus:border-accent transition-all mb-8 outline-none font-light"></textarea><MagneticButton onClick={handleAnalyze} disabled={!input.trim() || isProcessing || !!response} className="w-full py-5 bg-white text-black rounded-full font-bold flex items-center justify-center gap-3 hover:scale-[1.02] shadow-xl uppercase tracking-widest text-xs">{isProcessing ? <RefreshCw className="animate-spin" /> : "Analisar Gargalo"}</MagneticButton><AnimatePresence>{response && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 bg-accent/10 border border-accent/30 rounded-2xl"><p className="text-white font-light italic">"{response}"</p></motion.div>}</AnimatePresence></div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { text: "Redução de 70% no tempo jurídico.", name: "Ricardo Costa" },
          { text: "Ganhamos previsibilidade em 30 dias.", name: "Fernanda Lima" },
          { text: "Eliminou 100% das alucinações.", name: "Marcelo Andrade" }
        ].map((t, i) => (
          <FadeIn key={i} delay={i * 0.1}><div className="p-10 bg-[#111111] border border-white/10 rounded-3xl hover:border-accent transition-all"><Star className="w-5 h-5 text-accent mb-6 flex text-accent" /><p className="text-white text-lg font-light mb-8 italic">"{t.text}"</p><span className="text-white font-bold block">{t.name}</span></div></FadeIn>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 bg-accent relative overflow-hidden flex flex-col items-center text-center px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 blur-[150px] rounded-full"></div>
      <FadeIn><h2 className="text-5xl md:text-8xl font-display font-medium text-white tracking-tighter mb-12 leading-tight">Mapeie seu<br/>novo pulso.</h2></FadeIn>
      <FadeIn delay={0.2}><MagneticButton href="https://wa.me/5522998586180" className="px-12 py-6 bg-white text-black font-bold rounded-full uppercase tracking-widest text-sm hover:scale-105 shadow-2xl flex items-center gap-4"><span>Falar com o Especialista</span><ArrowUpRight className="w-5 h-5" /></MagneticButton></FadeIn>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-20 bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60">
        <div className="font-display font-black italic text-2xl tracking-tighter text-white">NA<span className="text-accent">VE<span className="relative inline-block leading-none">ı<LogoDot /></span>A</span></div>
        <p className="text-[11px] font-tech uppercase tracking-widest text-white">© 2025 Vitalino | NA VEiA. All_Rights_Reserved.</p>
        <div className="flex gap-4"><Instagram className="w-5 h-5 text-white" /><Linkedin className="w-5 h-5 text-white" /></div>
      </div>
    </footer>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-accent/30 lg:cursor-none relative overflow-x-hidden">
      <CustomCursor />
      <Preloader />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[60]" style={{ scaleX }} />
      <Navbar />
      <Hero />
      <ProblemSection />
      <MethodSection />
      <MentorSection />
      <DiagnosticSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
