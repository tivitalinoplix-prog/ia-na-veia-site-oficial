import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { 
  Menu, X, ArrowDown, Bug, Quote, AlertTriangle, MousePointer2, RefreshCw, 
  BarChart, FileText, Shield, Target, Sparkles, Instagram, Linkedin, 
  ArrowUpRight, Dna, Lightbulb, ShieldCheck, Brain, MessageSquare, 
  Cpu, Lock, Star, Activity, Check
} from 'lucide-react';

const Logo = ({ className = "", size = 40 }) => {
  const w = size * (460 / 130);
  return (
    <svg 
      viewBox="0 0 460 130" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={size}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
      role="img"
      aria-label="NA VEıA"
    >
      {/* NA - BRANCO */}
      <text x="8" y="105" fill="#ffffff" fontFamily="Montserrat, sans-serif" fontSize="118" fontWeight="900" fontStyle="italic" letterSpacing="-0.055em">NA</text>
      {/* VE - BRANCO */}
      <text x="138" y="105" fill="#ffffff" fontFamily="Montserrat, sans-serif" fontSize="118" fontWeight="900" fontStyle="italic" letterSpacing="-0.055em">VE</text>
      {/* iA juntos - VERMELHO */}
      <text x="255" y="105" fill="#E8272A" fontFamily="Montserrat, sans-serif" fontSize="118" fontWeight="900" fontStyle="italic" letterSpacing="-0.055em">iA</text>
      {/* Ponto quadrado sobre o i */}
      <rect x="265" y="15" width="20" height="20" rx="2" fill="#E8272A" transform="skewX(-9)" />
    </svg>
  );
};

const CyberpunkFilters = () => (
  <svg className="hidden">
    <defs>
      <filter id="sepia">
        <feColorMatrix type="matrix" values="0.393 0.769 0.189 0 0  0.349 0.686 0.168 0 0  0.272 0.534 0.131 0 0  0 0 0 1 0"/>
      </filter>
      <filter id="bw-professional">
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="gamma" exponent="1.1" />
          <feFuncG type="gamma" exponent="1.1" />
          <feFuncB type="gamma" exponent="1.1" />
        </feComponentTransfer>
      </filter>
      <filter id="duotone-red">
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="1.15" intercept="0.05" />
          <feFuncG type="linear" slope="0.15" intercept="0" />
          <feFuncB type="linear" slope="0.1" intercept="0" />
        </feComponentTransfer>
        <feComponentTransfer>
          <feFuncR type="gamma" exponent="0.9" />
          <feFuncG type="gamma" exponent="1.2" />
          <feFuncB type="gamma" exponent="1.3" />
        </feComponentTransfer>
      </filter>
      <filter id="glitch-distort">
        <feTurbulence baseFrequency="0.01 0.2" numOctaves="2" type="fractalNoise" result="glitch-noise" />
        <feDisplacementMap in="SourceGraphic" in2="glitch-noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

/**
 * COMPONENTE: WebGLVortexAnel
 */
function WebGLVortexAnel() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
    if (!gl) return;

    const vsSrc = `attribute vec3 a_pos; attribute float a_size; attribute vec4 a_color; uniform mat4 u_mvp; varying vec4 v_color; void main() { gl_Position = u_mvp * vec4(a_pos, 1.0); gl_PointSize = a_size * (320.0 / gl_Position.w); v_color = a_color; }`;
    const fsSrc = `precision mediump float; varying vec4 v_color; void main() { vec2 c = gl_PointCoord - 0.5; float d = length(c); if (d > 0.5) discard; float a = (1.0 - d * 2.0) * v_color.a; float glow = exp(-d * 5.0) * 0.5; gl_FragColor = vec4(v_color.rgb + glow * 0.4, a); }`;
    const program = gl.createProgram();
    const vs = gl.createShader(gl.VERTEX_SHADER); gl.shaderSource(vs, vsSrc); gl.compileShader(vs); gl.attachShader(program, vs);
    const fs = gl.createShader(gl.FRAGMENT_SHADER); gl.shaderSource(fs, fsSrc); gl.compileShader(fs); gl.attachShader(program, fs);
    gl.linkProgram(program); gl.useProgram(program);

    const N = 4000;
    const positions = new Float32Array(N * 3); const sizes = new Float32Array(N); const colors = new Float32Array(N * 4);
    const angles = new Float32Array(N); const offsets = new Float32Array(N); const speeds = new Float32Array(N);
    const torusR = 0.65, tubeR = 0.22;
    const palette = [[1.0, 0.165, 0.165, 0.9], [1.0, 0.4, 0.2, 0.8], [1.0, 1.0, 1.0, 0.95], [1.0, 0.0, 0.267, 0.85]];

    for (let i = 0; i < N; i++) {
      const theta = Math.random() * Math.PI * 2, phi = Math.random() * Math.PI * 2, r = torusR + tubeR * Math.cos(phi);
      positions[i*3] = r * Math.cos(theta); positions[i*3+1] = tubeR * Math.sin(phi); positions[i*3+2] = r * Math.sin(theta);
      angles[i] = theta; offsets[i] = phi; speeds[i] = 0.0003 + Math.random() * 0.0003; sizes[i] = 1.5 + Math.random() * 2.5;
      const rand = Math.random(); let color = rand < 0.4 ? palette[0] : rand < 0.7 ? palette[1] : rand < 0.9 ? palette[2] : palette[3];
      colors[i*4] = color[0]; colors[i*4+1] = color[1]; colors[i*4+2] = color[2]; colors[i*4+3] = color[3] * (0.5 + Math.random() * 0.5);
    }

    const posBuffer = gl.createBuffer(); const sizeBuffer = gl.createBuffer(); const colBuffer = gl.createBuffer();
    const posLoc = gl.getAttribLocation(program, 'a_pos'); const sizeLoc = gl.getAttribLocation(program, 'a_size');
    const colLoc = gl.getAttribLocation(program, 'a_color'); const mvpLoc = gl.getUniformLocation(program, 'u_mvp');

    function multiply(a, b) {
      const r = new Float32Array(16);
      for(let i=0; i<4; i++) for(let j=0; j<4; j++) { let s = 0; for(let k=0; k<4; k++) s += a[k*4+i] * b[j*4+k]; r[j*4+i] = s; }
      return r;
    }
    function perspective(fov, aspect, near, far) {
      const f = 1.0 / Math.tan(fov / 2), nf = 1 / (near - far);
      return new Float32Array([f/aspect,0,0,0, 0,f,0,0, 0,0,(far+near)*nf,-1, 0,0,(2*far*near)*nf,0]);
    }
    function rotateX(m, angle) {
      const c = Math.cos(angle), s = Math.sin(angle); const r = new Float32Array(m);
      r[4] = m[4]*c + m[8]*s; r[5] = m[5]*c + m[9]*s; r[6] = m[6]*c + m[10]*s; r[7] = m[7]*c + m[11]*s;
      r[8] = m[4]*-s + m[8]*c; r[9] = m[5]*-s + m[9]*c; r[10] = m[6]*-s + m[10]*c; r[11] = m[7]*-s + m[11]*c;
      return r;
    }

    function resize() {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth; canvas.height = canvas.parentElement.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize); resize();
    let t = 0; let requestRef;

    function render() {
      t += 0.0003; gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT); gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      const aspect = canvas.width / canvas.height; let mvp = perspective(Math.PI/4, aspect, 0.1, 100);
      mvp = multiply(mvp, new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,-2.5,1]));
      mvp = rotateX(mvp, 0.44);
      const cosR = Math.cos(t * 0.1), sinR = Math.sin(t * 0.1);
      mvp = multiply(mvp, new Float32Array([cosR,0,sinR,0, 0,1,0,0, -sinR,0,cosR,0, 0,0,0,1]));
      const dynamicPositions = new Float32Array(positions.length);
      for (let i = 0; i < N; i++) {
        angles[i] += speeds[i]; const theta = angles[i], phi = offsets[i], r = torusR + tubeR * Math.cos(phi);
        let x = r * Math.cos(theta), y = tubeR * Math.sin(phi), z = r * Math.sin(theta);
        if (mouseRef.current.active) {
          const px = (x / 2.5) * (canvas.width / aspect) + canvas.width/2; const py = (y / 2.5) * canvas.height + canvas.height/2;
          const dx = mouseRef.current.x - px, dy = mouseRef.current.y - py, d = Math.sqrt(dx*dx + dy*dy);
          if (d < 120) { const f = (1.0 - d/120) * 0.02; x -= dx * f; y -= dy * f; }
        }
        dynamicPositions[i*3] = x; dynamicPositions[i*3+1] = y; dynamicPositions[i*3+2] = z;
      }
      gl.uniformMatrix4fv(mvpLoc, false, mvp);
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer); gl.bufferData(gl.ARRAY_BUFFER, dynamicPositions, gl.DYNAMIC_DRAW); gl.enableVertexAttribArray(posLoc); gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer); gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW); gl.enableVertexAttribArray(sizeLoc); gl.vertexAttribPointer(sizeLoc, 1, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, colBuffer); gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW); gl.enableVertexAttribArray(colLoc); gl.vertexAttribPointer(colLoc, 4, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, N); requestRef = requestAnimationFrame(render);
    }
    const move = (e) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true }; };
    canvas.addEventListener('mousemove', move); canvas.addEventListener('mouseleave', () => mouseRef.current.active = false);
    render();
    return () => { window.removeEventListener('resize', resize); canvas.removeEventListener('mousemove', move); cancelAnimationFrame(requestRef); };
  }, []);

  return <canvas ref={canvasRef} id="cta-webgl-canvas" className="absolute top-0 left-0 w-full h-full pointer-events-auto" style={{ zIndex: 0 }} />;
}

function MagneticButton({ children, className = "", href, target, rel, onClick, disabled }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const commonProps = {
    ref: buttonRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: onClick,
    className: `relative inline-flex items-center justify-center transition-transform duration-300 ease-out ${className}`,
    style: { transform: `translate(${position.x}px, ${position.y}px)` }
  };

  if (href) return <a href={href} target={target} rel={rel} {...commonProps}>{children}</a>;
  return <button disabled={disabled} {...commonProps}>{children}</button>;
}

function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left, y = e.clientY - top;
    setMousePos({ x, y });
    setRotateX(((y - height / 2) / (height / 2)) * -10);
    setRotateY(((x - width / 2) / (width / 2)) * 10);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotateX(0); setRotateY(0); }}
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
    const update = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const hover = (e) => {
      const t = e.target;
      setIsHovering(t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button'));
    };
    window.addEventListener('mousemove', update);
    window.addEventListener('mouseover', hover);
    return () => { window.removeEventListener('mousemove', update); window.removeEventListener('mouseover', hover); };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none z-[100]">
      <motion.div className="fixed top-0 left-0 w-3 h-3 bg-[#E8272A] rounded-full mix-blend-screen" animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6, scale: isHovering ? 0 : 1, opacity: isHovering ? 0 : 1 }} transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }} />
      <motion.div className="fixed top-0 left-0 w-8 h-8 border border-[#E8272A]/50 rounded-full mix-blend-screen flex items-center justify-center backdrop-blur-[1px]" animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16, scale: isHovering ? 2.5 : 1, backgroundColor: isHovering ? 'rgba(232, 39, 42, 0.15)' : 'transparent', borderColor: isHovering ? 'rgba(232, 39, 42, 0.8)' : 'rgba(232, 39, 42, 0.5)' }} transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.5 }} />
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "", direction = "up" }) {
  const directions = { up: { y: 40, x: 0 }, down: { y: -40, x: 0 }, left: { x: 40, y: 0 }, right: { x: -40, y: 0 } };
  return (
    <motion.div initial={{ opacity: 0, ...directions[direction] }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }} className={className}>
      {children}
    </motion.div>
  );
}

function HeroParticles() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 bg-[#E8272A]/40 rounded-full" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ y: [0, -100], opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }} />
      ))}
    </div>
  );
}

function EKGBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center opacity-[0.08]">
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="flex w-[200%] h-full items-center">
        {[0, 1].map(i => (
          <div key={i} className="w-1/2 h-full flex items-center">
            <svg width="100%" height="300" viewBox="0 0 1000 300" preserveAspectRatio="none">
              <path d="M 0 150 L 800 150 L 820 90 L 840 240 L 860 120 L 880 150 L 1000 150" fill="none" stroke="#E8272A" strokeWidth="3" vectorEffect="non-scaling-stroke" filter="drop-shadow(0 0 8px rgba(232,39,42,0.8))" />
            </svg>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Preloader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setIsOpen(true), 800);
    const t2 = setTimeout(() => setIsUnmounted(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (isUnmounted) return null;

  return (
    <div className="fixed inset-0 z-[100] flex w-full h-full overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 flex items-center justify-center z-50 transition-all duration-700 ${isOpen ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
        <Logo size={120} className="font-logo text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] select-none" />
      </div>
      <div className={`relative flex-1 border-r border-[#1a1a1a] bg-[#050507] transition-transform duration-[1200ms] ease-[cubic-bezier(0.7,0,0.3,1)] pointer-events-auto ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}>
      </div>
      <div className={`relative flex-1 border-l border-[#1a1a1a] bg-[#050507] transition-transform duration-[1200ms] ease-[cubic-bezier(0.7,0,0.3,1)] pointer-events-auto ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}>
      </div>
      <div className={`absolute inset-x-0 bottom-[10%] flex flex-col items-center justify-center z-30 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
        <span className="text-xs tracking-[0.3em] text-[#E8272A] uppercase animate-pulse font-medium">_Initialize_Connection</span>
      </div>
    </div>
  );
}

function ScrambleText({ text, trigger }) {
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

function TypingEffect({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);
  return <span>{displayText}<span className="inline-block w-0.5 h-5 bg-[#E8272A] animate-pulse ml-0.5 align-middle" /></span>;
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
        for(let i=0; i<numToPick; i++) {
            const pick = idleIndices.splice(Math.floor(Math.random() * idleIndices.length), 1)[0];
            next[pick] = 'error';
            setTimeout(() => setCells(curr => { const up = [...curr]; if (up[pick] === 'error') up[pick] = 'optimized'; return up; }), 300 + Math.random() * 400);
        }
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <TiltCard>
      <div className="flex flex-col border border-white/10 bg-[#111111] p-6 rounded-2xl group-hover:border-[#E8272A] transition-colors duration-300">
        <div className="grid grid-cols-5 gap-2 mb-6 cursor-pointer">
          {cells.map((s, i) => (
            <motion.div key={i} onClick={() => { setScrambleTrigger(p => p + 1); setCells(p => { const n = [...p]; n[i] = 'error'; setTimeout(() => setCells(c => { const u = [...c]; if (u[i] === 'error') u[i] = 'optimized'; return u; }), 500); return n; }); }} whileHover={{ scale: 1.2, zIndex: 10 }} animate={{ y: s === 'idle' ? [0, Math.random() * -2 - 1, 0] : 0 }} transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }} className={`w-full aspect-square rounded-sm transition-all duration-300 ${s === 'idle' ? 'bg-white/10 hover:bg-white/20' : s === 'error' ? 'bg-[#E8272A]/20 border border-[#E8272A] shadow-[0_0_10px_rgba(220,38,38,0.5)] scale-95' : 'bg-white/20 scale-100'}`} />
          ))}
        </div>
        <div className="flex flex-col gap-2 text-xs tracking-wider uppercase font-bold text-white">
          <div className="flex justify-between gap-6"><span>INTERACTIVE_SCAN:</span><span className="animate-pulse">READY</span></div>
          <div className="flex justify-between gap-6"><span>THROUGHPUT:</span><span className="text-[#E8272A]"><ScrambleText text="MAXIMIZED" trigger={scrambleTrigger} /></span></div>
        </div>
      </div>
    </TiltCard>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 inset-x-0 z-50 w-full flex justify-between items-center p-6 lg:px-12 lg:py-8 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
      <div className="flex-shrink-0 font-logo font-black italic text-2xl tracking-tighter">
        <motion.a href="#" className="text-white flex items-center gap-1" whileHover={{ scale: 1.05 }}>
          <Logo size={28} />
        </motion.a>
      </div>
      <div className="hidden lg:flex gap-8 items-center">
        {["Gargalos", "Método", "Especialista"].map(t => (
          <a key={t} href={`#${t === 'Gargalos' ? 'problem' : t === 'Método' ? 'method' : 'mentor'}`} className="text-white hover:text-[#FF2D30] transition-colors text-xs font-medium tracking-widest uppercase">{t}</a>
        ))}
      </div>
      <div className="flex gap-6 items-center">
        <div className="hidden lg:flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full bg-white/5">
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 h-1.5 rounded-full bg-[#E8272A] shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
          <span className="text-[10px] font-medium tracking-widest text-[#E8272A] uppercase"><ScrambleText text="System Active" trigger={1} /></span>
        </div>
        <MagneticButton href="#ai-consultant" className="hidden lg:flex text-white bg-[#E8272A] px-6 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase hover:bg-[#FF2D30] transition-colors">Diagnóstico</MagneticButton>
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white">{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden">
            <a href="#problem" onClick={() => setIsOpen(false)} className="text-2xl font-display font-medium tracking-tighter text-white hover:text-[#FF2D30]">GARGALOS</a>
            <a href="#method" onClick={() => setIsOpen(false)} className="text-2xl font-display font-medium tracking-tighter text-white hover:text-[#E8272A]">MÉTODO</a>
            <a href="#mentor" onClick={() => setIsOpen(false)} className="text-2xl font-display font-medium tracking-tighter text-white hover:text-[#E8272A]">ESPECIALISTA</a>
            <a href="#ai-consultant" onClick={() => setIsOpen(false)} className="text-2xl font-display font-medium tracking-tighter text-white border border-[#E8272A]/20 px-8 py-3 rounded-full bg-[#E8272A]">DIAGNÓSTICO</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();

  return (
    <section id="hero" style={{ backgroundColor: '#050505' }} className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-32 pb-20">
      {/* Background Fixo Parallax - Hero */}
      <div 
        className="absolute inset-0 z-0 bg-no-repeat bg-[75%_5%] md:bg-center bg-fixed bg-[length:768px_512px] md:bg-[length:1536px_1024px]" 
        style={{ 
          backgroundImage: `url('https://i.postimg.cc/fTr2CQYp/hero_bg.jpg')`, 
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)' 
        }} 
      />
      
      <div className="absolute top-[-10%] right-[-20%] w-[70vw] h-[70vw] glow-red-orbit pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] left-[-15%] w-[60vw] h-[60vw] glow-red-orbit pointer-events-none opacity-70 z-0" />
      
      <HeroParticles />
      <EKGBackground />
      
      <div className="relative z-10 container mx-auto px-6 max-w-7xl flex flex-col justify-center h-full">
        <motion.div className="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between items-start lg:items-center w-full mt-10 md:mt-0">
          
          <div className="flex flex-col space-y-6 lg:space-y-8 max-w-2xl">
            <div className="w-16 h-px bg-[#E8272A]/50" />
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-medium tracking-tighter leading-[1.05] text-white drop-shadow-xl">
              FUSÃO<br />NEURO + IA
            </h1>
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-light text-gray-300 drop-shadow-md">
                Onde processos repetitivos encontram inteligência estruturada.
              </p>
              <p className="text-base md:text-lg font-light text-gray-300 drop-shadow-md">
                Fusão estratégica entre <span className="text-white font-medium">Neurociência</span>, <span className="text-white font-medium">IA Generativa</span> e <span className="text-white font-medium">Ciência da Criatividade</span>.
              </p>
            </div>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-3xl w-full sm:w-auto sm:min-w-[320px] shadow-2xl transition-transform hover:scale-[1.02] mt-8 lg:mt-0 border-t border-l border-white/10">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <span className="text-lg md:text-xl font-medium text-white tracking-wide">Precisão Garantida</span>
              <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-[#E8272A]" />
            </div>
            <div className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-2">100%</div>
            <p className="text-sm md:text-base text-gray-300">Alinhamento técnico auditado</p>
          </div>

        </motion.div>
      </div>
      
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:bottom-16 lg:right-16 z-30">
        <MagneticButton href="#problem" className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 border border-white/20 hover:border-[#E8272A] rounded-full transition-all group bg-black/20 backdrop-blur-md shadow-[0_0_30px_rgba(232,39,42,0.15)] hover:shadow-[0_0_50px_rgba(232,39,42,0.4)]">
          <ArrowDown className="w-8 h-8 md:w-10 md:h-10 text-[#E8272A] group-hover:text-white transition-colors duration-500 group-hover:rotate-90" />
        </MagneticButton>
      </motion.div>
    </section>
  );
}

function ProblemSection() {
  const [selectedStage, setSelectedStage] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const quotes = [
    "\"Você contratou os melhores profissionais. Mas eles gastam 60% do tempo em tarefas repetitivas que nem deveriam existir. O problema não é talento — é processo.\"",
    "\"Escalar não é sobre contratar mais pessoas. É sobre extrair o máximo de inteligência da sua operação atual através de fluxos validados.\"",
    "\"Decisões baseadas em intuição custam caro. Empresas líderes usam dados estruturados e pipelines de IA para garantir precisão cirúrgica.\""
  ];

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 4000); // changes every 4 seconds
    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      // Map scroll progress 0-1 to 0-6 (7 stages)
      const newStage = Math.min(6, Math.max(0, Math.floor(v * 7)));
      setSelectedStage(newStage);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleManualSelect = (index) => {
    // Optional: smooth scroll to that portion of the section
    setSelectedStage(index);
  };
  const stages = [
    { id: 1, icon: Lightbulb, title: "1. Processos Manuais", desc: "Equipe executa tarefas repetitivas sem automação." },
    { id: 2, icon: FileText, title: "2. Documentação Desestruturada", desc: "Relatórios, propostas e documentos sem padrão." },
    { id: 3, icon: Activity, title: "3. Gargalos de Back-office", desc: "Operações internas consomem tempo e recursos." },
    { id: 4, icon: Brain, title: "4. IA sem Alinhamento (Risco)", desc: "Ferramentas de IA geram alucinações e erros." },
    { id: 5, icon: Target, title: "5. Escala Travada", desc: "Crescimento limitado pela dependência de pessoas." },
    { id: 6, icon: BarChart, title: "6. Custos Operacionais Altos", desc: "Retrabalho e ineficiência drenam o orçamento." },
    { id: 7, icon: Lock, title: "7. ESTAGNAÇÃO", desc: "Sem IA, a empresa perde competitividade.", isTerminal: true }
  ];
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
    <section ref={sectionRef} id="problem" style={{ backgroundColor: '#050505' }} className="relative z-20 w-full border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        
        {/* COLUNA ESQUERDA - PARALLAX CONTÍNUO */}
        <div className="border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col relative overflow-hidden">
          
          {/* Background fixo espelhado da Hero (continuidade) */}
          <div 
            className="absolute inset-0 z-0 bg-no-repeat bg-[75%_5%] md:bg-center bg-fixed bg-[length:768px_512px] md:bg-[length:1536px_1024px]" 
            style={{ 
              backgroundImage: `url('https://i.postimg.cc/fTr2CQYp/hero_bg.jpg')`, 
              maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)', 
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)' 
            }} 
          />

          {/* OVERLAY ESCURO 1 - Reduzido para deixar imagem mais visível */}
          <div className="relative z-10 p-8 lg:p-20 border-b border-white/10 bg-black/30 backdrop-blur-[1px]">
            <FadeIn><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111]/80 border border-white/10 mb-8"><motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}><Bug className="w-4 h-4 text-[#E8272A]" /></motion.div><span className="text-xs font-medium tracking-wide text-white uppercase">Diagnóstico Operacional</span></div></FadeIn>
            <FadeIn delay={0.1}><h2 className="text-4xl lg:text-6xl font-display font-medium tracking-tighter text-white leading-[1.1] max-w-lg mb-6">Sua operação está <span className="text-[#E8272A]">drenando seu crescimento?</span></h2></FadeIn>
            <FadeIn delay={0.2}><p className="text-base lg:text-lg text-white font-light max-w-md leading-relaxed">Sua empresa investe tempo e dinheiro em operações repetitivas. Documentos são redigidos manualmente, processos geram gargalos e a equipe gasta horas em tarefas que poderiam ser automatizadas com IA.</p></FadeIn>
          </div>

          {/* OVERLAY ESCURO 2 - Transição suave para preto */}
          <div className="relative z-10 flex-1 min-h-[300px] overflow-hidden p-8 lg:p-20 flex flex-col justify-end bg-black/50 backdrop-blur-[2px]">
            <motion.div className="absolute top-8 right-8" animate={{ rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><Quote className="w-16 h-16 text-white" /></motion.div>
            <FadeIn delay={0.3} direction="right">
              <div className="relative z-10 border-l-2 border-[#E8272A] pl-6 py-2 overflow-hidden h-[120px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl lg:text-2xl text-white font-light leading-snug max-w-md absolute"
                  >
                    {quotes[quoteIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>

        </div>

        {/* COLUNA DIREITA - Interativa vermelha */}
        <div className="flex flex-col h-full bg-[#E8272A] relative z-10">
          <div className="p-8 lg:p-16 border-b border-white/10 bg-black/10 relative overflow-hidden min-h-[250px] flex flex-col justify-center">
            <AlertTriangle className="w-32 h-32 text-white absolute top-8 right-8 opacity-10" />
            <div className="relative z-10 w-full">
              {selectedStage === null ? <span className="inline-flex items-center gap-2 text-white font-medium uppercase text-xs tracking-widest border border-white/20 px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm"><MousePointer2 className="w-4 h-4" />Selecione um gargalo abaixo</span> : <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={selectedStage}><p className="text-white font-medium text-2xl lg:text-3xl mb-4 leading-relaxed max-w-lg tracking-tight">{feedbackMessages[selectedStage]}</p><div className="flex items-center gap-2 text-white text-xs font-medium uppercase tracking-widest mt-6"><RefreshCw className="w-4 h-4 animate-spin" />Analisando solução...</div></motion.div>}
            </div>
          </div>
          <div className="flex flex-col flex-1">
            {stages.map((s, index) => (
              <FadeIn key={s.id} delay={index * 0.1} direction="left"><motion.div onClick={() => handleManualSelect(index)} whileHover={{ x: 10 }} className={`group relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 lg:px-12 border-b border-white/10 transition-all cursor-pointer gap-4 ${selectedStage === index ? 'bg-black/20 border-l-2 border-[#E8272A]' : 'hover:bg-black/10 border-l-2 border-transparent'}`}><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" /><div className="flex items-center gap-6 w-full sm:w-auto relative z-10"><div className={`w-12 h-12 flex items-center justify-center rounded-full border transition-colors ${selectedStage === index ? 'bg-white border-white' : 'bg-transparent border-white/20'}`}><s.icon className={`w-5 h-5 ${selectedStage === index ? 'text-[#E8272A]' : 'text-white'}`} /></div><div><h4 className="text-xl font-medium tracking-tight text-white">{s.title}</h4><p className="text-sm text-white mt-1 max-w-[280px] font-light">{s.desc}</p></div></div><div className="flex items-center justify-between w-full sm:w-auto sm:flex-1 sm:justify-end gap-6 relative z-10">{s.isTerminal && <span className="text-[10px] font-medium text-white tracking-widest uppercase px-3 py-1.5 border border-white/20 bg-white/10 rounded-full">CRÍTICO</span>}<div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${selectedStage === index ? 'bg-white text-[#E8272A]' : 'border-white/20 text-white hover:bg-white/20'}`}><ArrowUpRight className="w-5 h-5" /></div></div></motion.div></FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodAndMentorSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const [photoFilter, setPhotoFilter] = useState('url(#duotone-red)');

  return (
    <div ref={sectionRef} className="relative w-full border-t border-b border-white/10 overflow-hidden bg-[#050505]">
      {/* Shared Parallax Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <img src="https://i.postimg.cc/fTr2CQYp/hero_bg.jpg" alt="Reveal" className="w-full h-[150%] object-cover grayscale opacity-50" />
      </motion.div>
      <div className="absolute inset-0 z-0 bg-black/50 pointer-events-none" /> {/* 50% Shadow overlay */}
      
      {/* METHOD SECTION */}
      <section id="method" className="relative z-10 w-full py-24 pb-12 overflow-hidden bg-white/[0.02] backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <FadeIn className="mb-16"><span className="font-medium uppercase mb-4 block text-[#E8272A] tracking-widest text-xs flex items-center gap-2"><motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-2 h-2 rounded-full bg-[#E8272A]" />O Framework</span><h2 className="text-4xl lg:text-6xl font-display font-medium tracking-tighter text-white mb-6 leading-[1.1]">O Método <span className="text-white">NA VEıA</span></h2><p className="text-white text-lg max-w-xl leading-relaxed font-light">3 pilares fundamentais. Precisão técnica absoluta para escalar seu negócio com estruturação automatizada e IA.</p></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
            <FadeIn delay={0.1} className="md:col-span-2"><TiltCard><div className="group relative bg-[#E8272A]/90 backdrop-blur-md border border-white/10 p-8 lg:p-12 flex flex-col md:flex-row justify-between hover:border-white/30 transition-colors overflow-hidden min-h-[350px] gap-8 rounded-none h-full"><div className="relative z-10 flex flex-col justify-between h-full"><div><div className="w-14 h-14 flex items-center justify-center bg-white/10 rounded-none text-white mb-8 border border-white/20 backdrop-blur-sm"><Cpu className="w-6 h-6" /></div><h3 className="text-2xl lg:text-4xl font-display font-medium tracking-tight mb-4 text-white">Ecossistemas SaaS & Antigravity</h3><p className="text-base lg:text-lg text-white leading-relaxed font-light max-w-md">Desenvolvimento Full-Stack de aplicativos B2B sob medida. Utilizamos o framework de engenharia Antigravity para criar infraestruturas digitais de alta performance, garantindo implantação rápida, segura e escalável.</p></div></div><div className="relative z-10 flex items-center justify-center w-full md:w-auto flex-1 mt-6 md:mt-0 bg-black/30 backdrop-blur-sm p-6 rounded-none border border-white/10"><DiagnosticGrid /></div></div></TiltCard></FadeIn>
            <FadeIn delay={0.2} className="md:col-span-1"><TiltCard><div className="group relative bg-[#111111]/80 backdrop-blur-md border border-white/10 p-8 lg:p-12 flex flex-col justify-between hover:border-[#FF2D30] transition-colors min-h-[350px] rounded-none h-full"><div className="relative z-10 h-full flex flex-col"><div className="w-14 h-14 flex items-center justify-center bg-[#1A1A1A] rounded-none text-[#E8272A] mb-8 border border-white/5"><Brain className="w-6 h-6" /></div><h3 className="text-xl lg:text-2xl font-display font-medium tracking-tight mb-4 text-white">Agentes Autônomos (Google AI Workspace)</h3><p className="text-sm lg:text-base text-white/80 leading-relaxed font-light mb-8">Automação de back-office com Agentic AI. Dominamos o workspace laboratorial do Google (Vertex AI/AI Studio) para orquestrar agentes autônomos que operam 24/7 na gestão de contratos, SMS e relatórios offshore.</p><div className="mt-auto w-full border border-white/5 bg-[#050505]/80 p-5 rounded-none font-tech text-xs leading-relaxed tracking-wider overflow-hidden relative"><div className="flex gap-2 mb-4 opacity-50 border-b border-white/5 pb-3"><div className="w-3 h-3 rounded-none bg-[#E8272A]"></div><div className="w-3 h-3 rounded-none bg-white/20"></div><div className="w-3 h-3 rounded-none bg-white/20"></div></div><div className="space-y-2"><motion.p initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}><span className="text-white/50">&gt;</span> <span className="text-white">Initializing Google_AI_Workspace...</span></motion.p><motion.p initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}><span className="text-white/50">&gt;</span> <span className="text-white">Connecting Perplexity_API...</span></motion.p><motion.p initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1.0, ease: "easeInOut" }}><span className="text-white/50">&gt;</span> <span className="text-white">Antigravity Framework:</span> <span className="text-[#E8272A] font-bold">ACTIVE</span></motion.p><motion.p initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1.4, ease: "easeInOut" }}><span className="text-white/50">&gt;</span> <span className="text-white">System Status:</span> <span className="text-[#E8272A] font-bold">Zero_Hallucinations</span><span className="inline-block w-2 h-4 ml-1 align-middle bg-[#E8272A] animate-pulse"></span></motion.p></div></div></div></div></TiltCard></FadeIn>
            <FadeIn delay={0.3} className="md:col-span-3"><TiltCard><div className="group relative bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between hover:border-[#FF2D30] transition-colors min-h-[300px] rounded-none h-full"><div className="relative z-10 max-w-2xl mb-8 md:mb-0"><div className="w-14 h-14 flex items-center justify-center bg-[#111111] rounded-none text-[#E8272A] mb-8 border border-white/5"><Shield className="w-6 h-6" /></div><h3 className="text-2xl lg:text-4xl font-display font-medium tracking-tight mb-4 text-white">Auditoria & Deep Research (Perplexity)</h3><p className="text-base lg:text-lg text-white/80 leading-relaxed font-light">Mitigação de riscos e Zero Alucinações. Aliamos a precisão da Neurociência ao motor de raciocínio do Perplexity para realizar fact-checking extremo, Red Teaming e validação de dados críticos da sua operação.</p></div><div className="relative z-10 w-full md:w-auto flex items-center justify-center gap-8 hidden md:flex shrink-0"><motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-32 h-32 rounded-full border border-[#E8272A]/30 flex items-center justify-center bg-[#E8272A]/10 relative"><div className="absolute inset-0 rounded-full border border-[#E8272A]/20 animate-ping opacity-20"></div><Target className="w-12 h-12 text-[#E8272A]" /></motion.div><div className="flex flex-col gap-4"><div className="w-24 h-2 bg-white opacity-30 rounded-full"></div><div className="w-48 h-2 bg-white opacity-30 rounded-full"></div><div className="w-32 h-2 bg-[#E8272A] rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div></div></div></div></TiltCard></FadeIn>
          </div>
        </div>
      </section>

      {/* MENTOR SECTION */}
      <section id="mentor" className="relative z-10 text-white w-full overflow-hidden bg-white/[0.01]">
        <CyberpunkFilters />
        <div className="grid grid-cols-1 lg:grid-cols-4 w-full relative z-10">
          <div className="col-span-1 lg:col-span-4 p-6 lg:p-16 border-t border-b border-white/10 flex flex-col items-start gap-6 pt-16">
            <FadeIn><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111]/80 backdrop-blur-md border border-white/10"><motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}><Sparkles className="w-4 h-4 text-[#E8272A]" /></motion.div><span className="text-xs font-medium tracking-wide text-[#FFFFFF] uppercase">O Especialista</span></div></FadeIn>
            <FadeIn delay={0.1}><h2 className="text-6xl lg:text-[8rem] font-medium font-display tracking-tighter text-[#FFFFFF] leading-[0.85] flex items-center gap-4">VITALINO<span className="inline-block w-[0.18em] h-[0.16em] bg-[#E8272A] rounded-[0.04em] -skew-x-[9deg] animate-pulse shrink-0" style={{ verticalAlign: 'middle' }} /></h2></FadeIn>
            <FadeIn delay={0.2}><p className="text-[#E4E4E7] text-lg lg:text-2xl max-w-2xl font-light leading-relaxed mt-4">Especialista em Avaliação de Inteligência Artificial e Engenharia de Prompt.</p></FadeIn>
          </div>
          <div className="col-span-1 lg:col-span-1 flex flex-col min-h-[600px] bg-[#111111]/50 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-white/10 p-6 lg:p-8 justify-between relative">
            <FadeIn delay={0.3} direction="up" className="flex flex-col gap-8 h-full relative z-10">
              <TiltCard>
                <div onClick={() => setPhotoFilter('url(#sepia)')} className="aspect-[4/5] overflow-hidden group bg-black w-full rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.6)] relative cursor-pointer" style={{ transformStyle: "preserve-3d" }}>
                  <div className="absolute inset-0 w-full h-full overflow-hidden transition-[filter] duration-700" style={{ filter: photoFilter }}>
                    <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_40%,transparent_30%,rgba(0,0,0,0.3)_70%,rgba(5,5,5,0.8)_100%)] mix-blend-overlay opacity-50" />
                    <motion.img src="https://i.postimg.cc/SNvTdbcP/mentor.jpg" alt="Vitalino" className="w-full h-full object-cover brightness-[1.2] contrast-[1.1] transition-all duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 z-30 shadow-[inset_0_0_80px_rgba(5,5,5,0.5)] pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none" style={{ transform: "translateZ(40px)" }}>
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)]"><div className="w-1.5 h-1.5 rounded-full bg-[#E8272A] shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div><span className="text-[10px] font-medium uppercase tracking-wider text-[#FFFFFF]">Auth_Key Verified</span></div>
                  </div>
                </div>
              </TiltCard>
              <div><h3 className="text-2xl font-medium tracking-tight mb-2 text-[#FFFFFF]">Quem sou eu</h3><p className="text-sm text-[#E4E4E7] leading-relaxed font-light">Especialista em Engenharia de Conhecimento.</p></div>
              <div className="flex items-center gap-3">{[Instagram, Linkedin].map((I, k) => <MagneticButton key={k} href="https://wa.me/5522998586180" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#FF2D30] transition-all"><I className="w-4 h-4" /></MagneticButton>)}</div>
            </FadeIn>
            <FadeIn delay={0.4} className="relative z-10"><MagneticButton href="https://wa.me/5522998586180" target="_blank" rel="noreferrer" className="group mt-12 w-full py-4 px-6 bg-white text-black rounded-full font-semibold text-sm tracking-wide flex items-center justify-between hover:bg-white/90 transition-all uppercase shadow-[0_0_20px_rgba(255,255,255,0.1)]">Falar comigo<motion.div animate={{ x: [0, 5, 0], y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}><ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1" /></motion.div></MagneticButton></FadeIn>
          </div>
          <div className="col-span-1 lg:col-span-3 flex flex-col h-full bg-[#050505]/60 backdrop-blur-md border-t lg:border-t-0 border-white/5">
            <div className="p-8 lg:p-20 border-b border-white/10 min-h-[300px] flex flex-col justify-center"><p className="text-xl lg:text-3xl font-light leading-snug text-[#FFFFFF] max-w-3xl">"Minha especialidade é capturar a inteligência do seu negócio e transformá-la em fluxos automatizados. Combinando Neurociência com o desenvolvimento de fluxos recursivos e alinhamento de LLMs, garanto que a IA atue a seu favor com precisão cirúrgica."</p><div className="flex flex-wrap gap-3 mt-12">{['Neurociências', 'IA Generativa', 'Engenharia de Prompt', 'LLM Alignment', 'RLHF', 'MBA IA', 'Psicologia Cognitiva'].map(tag => (<span key={tag} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium uppercase tracking-wider text-[#FFFFFF] hover:text-[#FFFFFF] hover:bg-[#E8272A]/20 hover:border-[#E8272A]/50 transition-colors cursor-default shadow-[0_0_10px_rgba(232,39,42,0)] hover:shadow-[0_0_15px_rgba(232,39,42,0.2)]"># {tag}</span>))}</div></div>
            <div className="flex-1 bg-[#111111]/30 flex flex-col">{[{ icon: Dna, title: "Base Científica Aplicada" }, { icon: Lightbulb, title: "Ciência da Inovação" }, { icon: ShieldCheck, title: "Gestão de IA Aplicada" }, { icon: Brain, title: "Processos Cognitivos" }].map((item, i) => (
              <div key={i} className="group flex-1 flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 lg:px-12 border-b border-white/10 hover:bg-[#E8272A]/5 hover:border-l-2 hover:border-l-[#E8272A] transition-all cursor-default gap-4"><div className="flex items-center gap-8 w-full lg:w-auto"><div className="flex items-center gap-3 w-32"><item.icon className="w-5 h-5 text-[#E4E4E7] group-hover:text-[#E8272A] transition-colors" /><span className="text-sm font-medium text-[#E4E4E7] group-hover:text-[#FFFFFF]">Pilar</span></div><h4 className="text-xl font-medium tracking-tight text-[#FFFFFF]">{item.title}</h4></div></div>
            ))}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DiagnosticSection() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState(null);
  const handleAnalyze = () => {
    if (!input.trim() || response) return;
    setIsProcessing(true);
    setTimeout(() => {
      setResponse("Entendo sua situação.\n\nO cenário que você descreveu é clássico de operações que ainda não passaram por uma reestruturação com IA. Para sair dessa, precisamos atacar a Otimização de Processos imediatamente.\n\nIdentifique os 3 processos que mais consomem tempo da sua equipe e vamos criar fluxos automatizados com precisão técnica.\n\nSe você quer parar de perder tempo com retrabalho e ter operações escaláveis, você precisa agendar um diagnóstico de processos agora.");
      setIsProcessing(false);
    }, 2000);
  };
  return (
    <section id="ai-consultant" className="relative z-20 w-full border-b border-white/10 bg-[#050505]">
      <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-white/10">
        <div className="col-span-1 lg:col-span-5 p-8 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-[#E8272A]">
          <FadeIn><div><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md"><motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}><MessageSquare className="w-4 h-4 text-white" /></motion.div><span className="text-xs font-medium tracking-wide text-white uppercase">AI Diagnostic</span></div><h2 className="text-4xl lg:text-6xl font-medium font-display tracking-tighter text-white leading-[1.1] mb-6">Vitalino <span className="text-white block mt-2">AI Diagnostic</span></h2><p className="text-base lg:text-lg text-white font-light leading-relaxed max-w-md">A inovação chegou à gestão corporativa. Treinada com o nosso <span className="text-white font-medium">framework exclusivo e metodologias avançadas de LLM Alignment</span>, ela oferece uma amostra cirúrgica do raciocínio estratégico que aplicamos nos projetos.</p></div></FadeIn>
          <FadeIn delay={0.2}><div className="hidden lg:flex items-center gap-2 text-sm text-white mt-12 font-medium tracking-widest uppercase"><ShieldCheck className="w-5 h-5" /><span>100% Secure & Private</span></div></FadeIn>
        </div>
        <div className="col-span-1 lg:col-span-7 p-8 lg:p-20 flex flex-col justify-center bg-[#111111]">
          <div className="w-full max-w-2xl mx-auto space-y-12">
            <FadeIn delay={0.1} direction="left"><TiltCard><div className="relative group"><label className="block uppercase text-xs font-medium text-white tracking-widest mb-4">Descreva seu desafio:</label><textarea value={input} onChange={(e) => setInput(e.target.value)} disabled={!!response || isProcessing} className="w-full bg-black/20 border border-white/10 text-white p-6 rounded-2xl focus:outline-none focus:border-[#E8272A] focus:ring-1 focus:ring-[#E8272A] transition-all resize-none h-40 font-light text-lg disabled:opacity-50" placeholder="Ex: Minha equipe gasta 4 horas por dia redigindo relatórios técnicos..." /></div></TiltCard></FadeIn>
            <FadeIn delay={0.2} direction="left"><div className="flex justify-end"><MagneticButton onClick={handleAnalyze} disabled={!input.trim() || isProcessing || !!response} className="group relative px-8 py-4 bg-[#E8272A] text-white font-semibold tracking-wide uppercase text-sm disabled:bg-white/10 disabled:text-white/50 hover:bg-[#FF2D30] transition-all overflow-hidden rounded-full flex items-center gap-3">{isProcessing ? <><RefreshCw className="w-5 h-5 animate-spin" />Analisando...</> : response ? <><Lock className="w-4 h-4" />Limit Reached</> : <>Analisar Gargalo<motion.div animate={{ x: [0, 5, 0], y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}><ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1" /></motion.div></>}</MagneticButton></div></FadeIn>
            <AnimatePresence>{response && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8"><TiltCard><div className="border border-[#E8272A]/30 bg-[#E8272A]/5 p-8 relative overflow-hidden rounded-2xl"><div className="absolute top-0 left-0 w-1 h-full bg-[#E8272A]"></div><div className="flex items-center gap-3 mb-6"><div className="w-8 h-8 rounded-full bg-[#E8272A] flex items-center justify-center text-white"><Sparkles className="w-4 h-4" /></div><span className="text-xs font-medium tracking-widest text-[#E8272A] uppercase">AI Response</span></div><p className="text-white text-lg leading-relaxed font-light whitespace-pre-wrap mb-8"><TypingEffect text={response} /></p><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }} className="border-l-2 border-[#E8272A] pl-4 py-3 bg-[#E8272A]/10 mt-6 rounded-r-lg"><strong className="text-[#E8272A] block mb-2 text-xs tracking-widest uppercase font-medium">⚡ <ScrambleText text="Single Query Limit Reached" trigger={1} /></strong><p className="mb-4 text-xs text-white font-light">O framework NA VEiA é denso e requer acompanhamento. Para estratégias ilimitadas, agende um diagnóstico.</p><a href="https://wa.me/5522998586180" target="_blank" rel="noreferrer" className="inline-block bg-[#E8272A] text-white text-[10px] font-bold px-4 py-2 tracking-widest uppercase hover:brightness-110 transition-colors rounded-full">Agendar Diagnóstico</a></motion.div></div></TiltCard></motion.div>)}</AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { quote: "A automação de documentos reduziu em 70% o tempo da minha equipe jurídica. O Vitalino entregou precisão absoluta.", name: "Ricardo Costa", role: "Dir. Operações", initials: "RC" },
    { quote: "Nossos processos internos eram um caos. Com a IA aplicada pelo Vitalino, ganhamos previsibilidade e escala em 30 dias.", name: "Fernanda Lima", role: "CEO Startup", initials: "FL" },
    { quote: "O alinhamento de IA que o Vitalino implementou eliminou 100% das alucinações nos nossos relatórios automáticos. Impressionante.", name: "Marcelo Andrade", role: "Gerente TI", initials: "MA" }
  ];
  return (
    <section className="py-24 md:py-32 border-t border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn className="mb-16 md:mb-24 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-white/10 mb-8"><motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}><Star className="w-4 h-4 text-[#E8272A]" /></motion.div><span className="text-xs font-medium tracking-wide text-white uppercase">Client Stories</span></div>
          <h2 className="text-4xl lg:text-5xl font-medium font-display tracking-tighter text-white leading-tight">Resultados Reais</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}><TiltCard><article className="p-8 md:p-12 border border-white/10 bg-[#111111] hover:border-[#FF2D30] transition-all duration-300 h-full flex flex-col group relative overflow-hidden rounded-2xl"><div className="absolute inset-0 bg-gradient-to-br from-[#E8272A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /><div className="relative z-10 flex flex-col h-full"><div className="flex gap-1 mb-8 text-[#E8272A]">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}</div><p className="text-white text-lg font-light mb-8 leading-relaxed">"{t.quote}"</p><div className="flex items-center gap-4 mt-auto"><div className="w-12 h-12 bg-black/20 border border-white/10 rounded-full flex items-center justify-center text-sm font-medium text-[#E8272A]">{t.initials}</div><div><span className="block text-white font-medium">{t.name}</span><span className="text-xs text-white tracking-wider uppercase mt-1 block">{t.role}</span></div></div></div></article></TiltCard></FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Normalize coordinates from -1 to 1 instead of pixel values for smoother mapping
    setMousePos({
      x: (e.clientX - rect.left) / rect.width * 2 - 1,
      y: (e.clientY - rect.top) / rect.height * 2 - 1
    });
  };

  return (
    <section id="cta" className="relative w-full overflow-hidden border-t border-b border-white/10 bg-[#E8272A] min-h-[80vh] flex items-center justify-center" onMouseMove={handleMouseMove} style={{ perspective: "1000px" }}>
      {/* 3D Typography Composition Background */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden flex items-center justify-center" aria-hidden="true" style={{ transformStyle: "preserve-3d" }}>
        {/* Layer 1: Deepest back */}
        <motion.div animate={{ x: mousePos.x * -100, y: mousePos.y * -100 }} transition={{ type: "spring", stiffness: 50, damping: 30 }} className="absolute whitespace-nowrap opacity-[0.03] text-[15rem] md:text-[25rem] font-display font-black tracking-tighter text-black mix-blend-overlay" style={{ transform: "translateZ(-500px) rotate(-5deg)" }}>
          AUTOMAÇÃO ESCALA PRECISÃO
        </motion.div>
        {/* Layer 2: Mid-ground text */}
        <motion.div animate={{ x: mousePos.x * 50, y: mousePos.y * 50 }} transition={{ type: "spring", stiffness: 70, damping: 25 }} className="absolute whitespace-nowrap opacity-[0.05] text-[10rem] md:text-[18rem] font-display font-black tracking-tighter text-white mix-blend-overlay" style={{ transform: "translateZ(-200px) rotate(3deg)" }}>
          ZERO ALUCINAÇÕES
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
        <FadeIn>
          <motion.div animate={{ x: mousePos.x * 20, y: mousePos.y * 20, rotateX: mousePos.y * -10, rotateY: mousePos.x * 10 }} transition={{ type: "spring", stiffness: 100, damping: 20 }} style={{ transformStyle: "preserve-3d" }}>
            <h2 className="text-6xl md:text-[8rem] font-medium font-display tracking-tighter leading-[0.9] text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" style={{ transform: "translateZ(100px)" }}>
              Eleve o Pulso
            </h2>
            <h2 className="text-6xl md:text-[8rem] font-medium font-display tracking-tighter leading-[0.9] text-black drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)]" style={{ transform: "translateZ(60px)" }}>
              Tecnológico.
            </h2>
          </motion.div>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p className="text-white/90 text-xl md:text-2xl font-light max-w-2xl mx-auto mt-12 mb-16 leading-relaxed drop-shadow-md">
            Pronto para transformar sua operação com automação estruturada e precisão neuro-simulada?
          </p>
        </FadeIn>

        <FadeIn delay={0.3} className="flex flex-col items-center justify-center">
          <MagneticButton href="https://wa.me/5522998586180" target="_blank" rel="noreferrer" className="relative group overflow-hidden bg-black text-white px-12 py-6 rounded-full font-semibold tracking-widest text-sm uppercase shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 transition-all hover:scale-105 hover:shadow-[0_0_80px_rgba(0,0,0,0.8)]">
            <span className="relative z-10 flex items-center gap-4">
              FALAR COMIGO
              <motion.div animate={{ x: [0, 5, 0], y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}><ArrowUpRight className="w-5 h-5" /></motion.div>
            </span>
            <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] z-0" />
            <span className="absolute inset-0 z-10 flex items-center justify-center gap-4 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 tracking-widest text-sm uppercase font-semibold">
              FALAR COMIGO <ArrowUpRight className="w-5 h-5" />
            </span>
          </MagneticButton>
          <div className="flex items-center gap-2 mt-8 text-black/60 font-medium text-xs tracking-widest uppercase bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-black/5"><Lock className="w-3 h-3" /><span>Canal Seguro · Direto via WhatsApp</span></div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative bg-[#050505] text-white py-12 border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8272A]/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-logo font-black italic tracking-tighter text-xl text-white">NA</span>
            <span className="font-logo font-black italic tracking-tighter text-xl text-white">VE</span>
            <span className="font-logo font-black italic tracking-tighter text-xl text-[#E8272A] relative">iA<div className="absolute top-[0.1em] right-[0.45em] w-[0.2em] h-[0.2em] bg-[#E8272A] rounded-[0.05em] -skew-x-[9deg]"></div></span>
          </div>
          <p className="text-[#E4E4E7] text-sm font-light">© {currentYear} Vitalino. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/5522998586180" className="text-[#E4E4E7] hover:text-[#E8272A] transition-colors text-sm font-light">Termos</a>
            <a href="https://wa.me/5522998586180" className="text-[#E4E4E7] hover:text-[#E8272A] transition-colors text-sm font-light">Privacidade</a>
          </div>
        </div>
      </div>
      {/* EKG Pulsating Line Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 1000 100" className="w-[200%] h-full opacity-30 stroke-[#E8272A]" preserveAspectRatio="none">
          <path d="M0 50 H300 L320 10 L340 90 L360 50 H600 L620 20 L640 80 L660 50 H1000" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[dash_3s_linear_infinite]" strokeDasharray="1000" strokeDashoffset="1000" />
        </svg>
      </div>
    </footer>
  );
}

function BackgroundGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        html, body {
          background-color: #050505;
          color: #ffffff;
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-logo { font-family: 'Montserrat', sans-serif; }
        .font-tech { font-family: 'JetBrains Mono', monospace; }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-\\[shimmer_1\\.5s_infinite\\] { animation: shimmer 1.5s infinite; }
        html { scroll-behavior: smooth; }
        #cta-webgl-canvas { background: transparent; }

        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        .glow-red-orbit {
          background: radial-gradient(circle at 30% 70%, rgba(232, 39, 42, 0.35) 0%, transparent 60%);
        }
      `}} />
      <div className="min-h-screen font-sans selection:bg-[#E8272A]/30 lg:cursor-none relative">
        <BackgroundGrid /><CustomCursor /><Preloader />
        <Navbar /><Hero /><ProblemSection /><MethodAndMentorSection /><DiagnosticSection /><TestimonialsSection /><CTASection /><Footer />
      </div>
    </>
  );
}
