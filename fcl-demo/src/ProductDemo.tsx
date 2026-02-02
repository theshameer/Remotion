import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
  Img,
  staticFile,
  spring,
  Audio,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Poppins';
import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import React from 'react';

const {fontFamily} = loadFont('normal', {
  weights: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const {fontFamily: playfairFont} = loadPlayfair('normal', {
  weights: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

// ============ PREMIUM COLOR PALETTE ============
const COLORS = {
  // Core brand colors
  red: '#C41E3A',
  darkRed: '#9B1B2F',
  deepRed: '#7A1525',
  burgundy: '#5C1020',

  // Accent colors
  gold: '#D4AF37',
  lightGold: '#F4D03F',
  rose: '#E8475F',
  coral: '#FF6B6B',

  // Neutrals
  white: '#FFFFFF',
  cream: '#FFF8F0',
  ivory: '#FFFEF5',

  // Gradients
  gradientStart: '#E63946',
  gradientMid: '#C41E3A',
  gradientEnd: '#7A1525',
};

// ============ PREMIUM VISUAL COMPONENTS ============

// Bokeh Light - Creates soft, out-of-focus light effect
const BokehLight: React.FC<{
  x: number;
  y: number;
  size: number;
  color?: string;
  delay?: number;
  duration?: number;
  opacity?: number;
}> = ({x, y, size, color = 'rgba(255,255,255,0.15)', delay = 0, duration = 6, opacity = 0.15}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const floatY = interpolate(
    ((frame - delay * fps) % (duration * fps)) / (duration * fps),
    [0, 0.5, 1],
    [0, -30, 0]
  );

  const floatX = interpolate(
    ((frame - delay * fps) % (duration * fps * 1.5)) / (duration * fps * 1.5),
    [0, 0.5, 1],
    [0, 15, 0]
  );

  const breathe = interpolate(
    ((frame - delay * fps) % (fps * 4)) / (fps * 4),
    [0, 0.5, 1],
    [1, 1.2, 1],
    {easing: Easing.inOut(Easing.ease)}
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size * breathe,
        height: size * breathe,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: opacity,
        transform: `translate(${floatX}px, ${floatY}px)`,
        filter: `blur(${size * 0.3}px)`,
      }}
    />
  );
};

// Shimmer Effect - Creates elegant shine across surfaces
const ShimmerEffect: React.FC<{
  width: number;
  height: number;
  delay?: number;
  speed?: number;
}> = ({width, height, delay = 0, speed = 2}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const shimmerPosition = interpolate(
    ((frame - delay * fps) % (fps * speed)) / (fps * speed),
    [0, 1],
    [-100, 200]
  );

  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        overflow: 'hidden',
        borderRadius: 'inherit',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${shimmerPosition}%`,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          transform: 'skewX(-20deg)',
        }}
      />
    </div>
  );
};

// Sparkle - Small twinkling star effect
const Sparkle: React.FC<{
  x: number;
  y: number;
  size?: number;
  delay?: number;
}> = ({x, y, size = 10, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const twinkle = interpolate(
    ((frame - delay * fps) % (fps * 1.5)) / (fps * 1.5),
    [0, 0.5, 1],
    [0, 1, 0],
    {easing: Easing.inOut(Easing.ease)}
  );

  const rotate = interpolate(frame, [0, fps * 4], [0, 360]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        opacity: twinkle,
        transform: `rotate(${rotate}deg) scale(${0.5 + twinkle * 0.5})`,
      }}
    >
      {/* 4-point star */}
      <svg viewBox="0 0 24 24" fill={COLORS.gold}>
        <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
      </svg>
    </div>
  );
};

// Elegant Glow Orb
const GlowOrb: React.FC<{
  x: number;
  y: number;
  size: number;
  color?: string;
  delay?: number;
}> = ({x, y, size, color = COLORS.gold, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 12, stiffness: 60},
  });

  const pulse = interpolate(
    (frame % (fps * 3)) / (fps * 3),
    [0, 0.5, 1],
    [1, 1.15, 1],
    {easing: Easing.inOut(Easing.ease)}
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale * pulse})`,
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: 'absolute',
          width: size * 2,
          height: size * 2,
          left: -size / 2,
          top: -size / 2,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
      {/* Inner glow */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${COLORS.white} 0%, ${color} 50%, ${color}80 100%)`,
          boxShadow: `0 0 60px ${color}80, 0 0 100px ${color}40`,
        }}
      />
    </div>
  );
};

// Premium Gradient Mesh Background
const PremiumBackground: React.FC<{
  variant?: 'intro' | 'warm' | 'elegant' | 'dramatic';
}> = ({variant = 'intro'}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const gradientShift = interpolate(
    frame,
    [0, durationInFrames],
    [0, 360]
  );

  const bokehLights = [
    {x: 10, y: 20, size: 200, delay: 0, opacity: 0.08},
    {x: 85, y: 15, size: 180, delay: 1, opacity: 0.06},
    {x: 70, y: 70, size: 250, delay: 2, opacity: 0.07},
    {x: 20, y: 80, size: 160, delay: 0.5, opacity: 0.05},
    {x: 50, y: 30, size: 220, delay: 1.5, opacity: 0.06},
    {x: 90, y: 60, size: 140, delay: 2.5, opacity: 0.04},
    {x: 30, y: 50, size: 180, delay: 3, opacity: 0.05},
    {x: 60, y: 85, size: 200, delay: 0.8, opacity: 0.06},
  ];

  const backgrounds: Record<string, string> = {
    intro: `
      radial-gradient(ellipse 80% 50% at ${50 + Math.sin(gradientShift * 0.01) * 10}% ${30 + Math.cos(gradientShift * 0.008) * 10}%, ${COLORS.rose}40 0%, transparent 50%),
      radial-gradient(ellipse 60% 40% at ${70 + Math.sin(gradientShift * 0.012) * 15}% ${70 + Math.cos(gradientShift * 0.01) * 15}%, ${COLORS.gold}20 0%, transparent 50%),
      linear-gradient(135deg, ${COLORS.red} 0%, ${COLORS.darkRed} 40%, ${COLORS.burgundy} 100%)
    `,
    warm: `
      radial-gradient(ellipse 70% 60% at 30% 20%, ${COLORS.coral}30 0%, transparent 50%),
      radial-gradient(ellipse 50% 50% at 80% 80%, ${COLORS.gold}15 0%, transparent 50%),
      linear-gradient(160deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientMid} 50%, ${COLORS.gradientEnd} 100%)
    `,
    elegant: `
      radial-gradient(ellipse 90% 70% at 50% 50%, ${COLORS.rose}20 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 20% 80%, ${COLORS.gold}10 0%, transparent 50%),
      radial-gradient(ellipse 40% 40% at 80% 20%, ${COLORS.gold}10 0%, transparent 50%),
      linear-gradient(180deg, ${COLORS.darkRed} 0%, ${COLORS.burgundy} 100%)
    `,
    dramatic: `
      radial-gradient(ellipse 100% 100% at 50% 0%, ${COLORS.red}60 0%, transparent 50%),
      radial-gradient(ellipse 80% 80% at 50% 100%, ${COLORS.burgundy} 0%, transparent 50%),
      linear-gradient(180deg, ${COLORS.deepRed} 0%, ${COLORS.burgundy} 100%)
    `,
  };

  return (
    <AbsoluteFill style={{background: backgrounds[variant], overflow: 'hidden'}}>
      {/* Bokeh lights layer */}
      {bokehLights.map((light, i) => (
        <BokehLight key={i} {...light} />
      ))}

      {/* Gold accent glow at top */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 400,
          background: `radial-gradient(ellipse, ${COLORS.gold}15 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

// Premium Floating Particles
const FloatingParticles: React.FC = () => {
  const particles = [
    {x: 5, y: 95, size: 4, delay: 0},
    {x: 15, y: 90, size: 3, delay: 0.5},
    {x: 25, y: 98, size: 5, delay: 1},
    {x: 35, y: 92, size: 3, delay: 1.5},
    {x: 45, y: 96, size: 4, delay: 2},
    {x: 55, y: 88, size: 3, delay: 0.3},
    {x: 65, y: 94, size: 5, delay: 0.8},
    {x: 75, y: 90, size: 4, delay: 1.3},
    {x: 85, y: 97, size: 3, delay: 1.8},
    {x: 95, y: 91, size: 4, delay: 2.3},
  ];

  return (
    <>
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}
    </>
  );
};

const FloatingParticle: React.FC<{
  x: number;
  y: number;
  size: number;
  delay: number;
}> = ({x, y, size, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const duration = 8;
  const progress = ((frame - delay * fps) % (duration * fps)) / (duration * fps);

  const yOffset = interpolate(progress, [0, 1], [0, -400]);
  const opacity = interpolate(
    progress,
    [0, 0.1, 0.7, 1],
    [0, 0.6, 0.6, 0]
  );
  const sway = Math.sin(progress * Math.PI * 4) * 20;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: COLORS.white,
        opacity,
        transform: `translate(${sway}px, ${yOffset}px)`,
        boxShadow: `0 0 ${size * 2}px ${COLORS.white}`,
      }}
    />
  );
};

// ============ PREMIUM TEXT COMPONENTS ============

// Elegant Title with Gold Accent
const ElegantTitle: React.FC<{
  children: string;
  delay?: number;
  fontSize?: number;
  accent?: boolean;
}> = ({children, delay = 0, fontSize = 80, accent = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const springValue = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 12, stiffness: 80},
  });

  const shimmer = interpolate(
    (frame % (fps * 3)) / (fps * 3),
    [0, 0.5, 1],
    [0, 0.3, 0]
  );

  return (
    <div
      style={{
        fontFamily: playfairFont,
        fontSize,
        fontWeight: 700,
        color: accent ? COLORS.gold : COLORS.white,
        letterSpacing: 4,
        opacity: springValue,
        transform: `translateY(${(1 - springValue) * 60}px)`,
        textShadow: accent
          ? `0 0 40px ${COLORS.gold}60, 0 4px 20px rgba(0,0,0,0.3)`
          : '0 4px 30px rgba(0,0,0,0.4)',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {children}
      {/* Shimmer overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg, transparent 40%, rgba(255,255,255,${shimmer}) 50%, transparent 60%)`,
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      />
    </div>
  );
};

// Subtitle with elegant styling
const ElegantSubtitle: React.FC<{
  children: string;
  delay?: number;
  fontSize?: number;
}> = ({children, delay = 0, fontSize = 32}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const springValue = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 15, stiffness: 100},
  });

  return (
    <div
      style={{
        fontFamily,
        fontSize,
        fontWeight: 400,
        color: COLORS.cream,
        letterSpacing: 8,
        textTransform: 'uppercase',
        opacity: springValue * 0.9,
        transform: `translateY(${(1 - springValue) * 40}px)`,
        textShadow: '0 2px 20px rgba(0,0,0,0.3)',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  );
};

// Animated Letters with stagger
const PremiumAnimatedLetters: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  staggerDelay?: number;
  color?: string;
}> = ({text, delay = 0, fontSize = 90, staggerDelay = 0.04, color = COLORS.white}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{display: 'flex', justifyContent: 'center', gap: 4}}>
      {text.split('').map((letter, i) => {
        const letterDelay = delay + i * staggerDelay;
        const springValue = spring({
          frame: frame - letterDelay * fps,
          fps,
          config: {damping: 8, stiffness: 120},
        });

        const scale = interpolate(springValue, [0, 1], [0, 1]);
        const rotate = interpolate(springValue, [0, 0.5, 1], [-30, 8, 0]);
        const opacity = interpolate(springValue, [0, 0.5, 1], [0, 0.8, 1]);

        return (
          <span
            key={i}
            style={{
              fontFamily: playfairFont,
              fontSize,
              fontWeight: 800,
              color,
              display: 'inline-block',
              transform: `scale(${scale}) rotate(${rotate}deg)`,
              opacity,
              textShadow: `0 0 30px ${color}40, 0 4px 20px rgba(0,0,0,0.4)`,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        );
      })}
    </div>
  );
};

// ============ PREMIUM UI COMPONENTS ============

// Elegant Divider Line
const ElegantDivider: React.FC<{
  width?: number;
  delay?: number;
  variant?: 'simple' | 'ornate';
}> = ({width = 200, delay = 0, variant = 'simple'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const lineProgress = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 15, stiffness: 80},
  });

  if (variant === 'ornate') {
    return (
      <div style={{display: 'flex', alignItems: 'center', gap: 20, opacity: lineProgress}}>
        {/* Left line */}
        <div
          style={{
            width: width * 0.4 * lineProgress,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.gold})`,
          }}
        />
        {/* Center diamond */}
        <div
          style={{
            width: 12,
            height: 12,
            backgroundColor: COLORS.gold,
            transform: `rotate(45deg) scale(${lineProgress})`,
            boxShadow: `0 0 20px ${COLORS.gold}60`,
          }}
        />
        {/* Right line */}
        <div
          style={{
            width: width * 0.4 * lineProgress,
            height: 2,
            background: `linear-gradient(90deg, ${COLORS.gold}, transparent)`,
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: width * lineProgress,
        height: 3,
        background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
        borderRadius: 2,
        boxShadow: `0 0 20px ${COLORS.gold}40`,
      }}
    />
  );
};

// Premium Glassmorphism Card
const PremiumCard: React.FC<{
  children: React.ReactNode;
  delay?: number;
  width?: number;
  padding?: number;
  glowColor?: string;
}> = ({children, delay = 0, width = 280, padding = 35, glowColor = COLORS.gold}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const springValue = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 12, stiffness: 70},
  });

  const glowPulse = interpolate(
    (frame % (fps * 3)) / (fps * 3),
    [0, 0.5, 1],
    [0.3, 0.5, 0.3]
  );

  return (
    <div
      style={{
        position: 'relative',
        width,
        padding,
        transform: `scale(${springValue}) translateY(${(1 - springValue) * 40}px)`,
        opacity: springValue,
      }}
    >
      {/* Glow effect behind card */}
      <div
        style={{
          position: 'absolute',
          inset: -10,
          background: `radial-gradient(ellipse at center, ${glowColor}${Math.round(glowPulse * 60).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          filter: 'blur(20px)',
          borderRadius: 34,
        }}
      />

      {/* Card content */}
      <div
        style={{
          position: 'relative',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.2)',
          padding,
          boxShadow: '0 25px 70px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.1)',
        }}
      >
        {/* Shimmer effect */}
        <ShimmerEffect width={width} height={padding * 2 + 100} delay={delay} speed={3} />
        {children}
      </div>
    </div>
  );
};

// Premium Badge with glow
const PremiumBadge: React.FC<{
  text: string;
  delay?: number;
  variant?: 'filled' | 'outline' | 'gold';
}> = ({text, delay = 0, variant = 'filled'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const springValue = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 10, stiffness: 100},
  });

  const styles: Record<string, React.CSSProperties> = {
    filled: {
      backgroundColor: COLORS.white,
      color: COLORS.red,
      boxShadow: '0 10px 40px rgba(0,0,0,0.2), 0 0 30px rgba(255,255,255,0.3)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: COLORS.cream,
      border: `2px solid rgba(255,255,255,0.6)`,
      boxShadow: '0 0 20px rgba(255,255,255,0.1)',
    },
    gold: {
      backgroundColor: COLORS.gold,
      color: COLORS.burgundy,
      boxShadow: `0 10px 40px rgba(0,0,0,0.2), 0 0 40px ${COLORS.gold}40`,
    },
  };

  return (
    <div
      style={{
        fontFamily,
        fontSize: 22,
        fontWeight: 600,
        padding: '16px 36px',
        borderRadius: 50,
        transform: `scale(${springValue})`,
        opacity: springValue,
        letterSpacing: 1,
        ...styles[variant],
      }}
    >
      {text}
    </div>
  );
};

// Elegant Progress Ring
const PremiumProgressRing: React.FC<{
  progress: number;
  size?: number;
  delay?: number;
  label?: string;
  color?: string;
}> = ({progress, size = 140, delay = 0, label, color = COLORS.gold}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const animatedProgress = interpolate(
    frame - delay * fps,
    [0, fps * 2],
    [0, progress],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}
  );

  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  const springValue = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 15, stiffness: 80},
  });

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15}}>
      <div style={{position: 'relative', width: size, height: size, opacity: springValue}}>
        {/* Glow behind ring */}
        <div
          style={{
            position: 'absolute',
            inset: -10,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
            filter: 'blur(15px)',
          }}
        />

        <svg width={size} height={size} style={{transform: 'rotate(-90deg)', position: 'relative'}}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={52}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="6"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={52}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{filter: `drop-shadow(0 0 10px ${color})`}}
          />
        </svg>

        {/* Center text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: playfairFont,
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.white,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          {Math.round(animatedProgress)}%
        </div>
      </div>

      {label && (
        <div style={{fontFamily, fontSize: 16, color: COLORS.cream, opacity: 0.9, letterSpacing: 1}}>
          {label}
        </div>
      )}
    </div>
  );
};

// Animated Counter with premium styling
const PremiumCounter: React.FC<{
  value: number;
  suffix?: string;
  delay?: number;
  fontSize?: number;
}> = ({value, suffix = '', delay = 0, fontSize = 160}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const count = Math.floor(
    interpolate(frame - delay * fps, [0, fps * 2.5], [0, value], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    })
  );

  const springValue = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 10, stiffness: 70},
  });

  return (
    <div
      style={{
        fontFamily: playfairFont,
        fontSize,
        fontWeight: 900,
        color: COLORS.gold,
        transform: `scale(${springValue})`,
        textShadow: `0 0 60px ${COLORS.gold}50, 0 8px 40px rgba(0,0,0,0.3)`,
        letterSpacing: -4,
      }}
    >
      {count}{suffix}
    </div>
  );
};

// ============ SCENES ============

// Scene: Premium Intro
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const logoSpring = spring({
    frame,
    fps,
    config: {damping: 10, stiffness: 60},
  });

  const glowIntensity = interpolate(
    (frame % (fps * 2)) / (fps * 2),
    [0, 0.5, 1],
    [0.4, 0.7, 0.4],
    {easing: Easing.inOut(Easing.ease)}
  );

  return (
    <AbsoluteFill>
      <PremiumBackground variant="intro" />
      <FloatingParticles />

      {/* Sparkles */}
      <Sparkle x={300} y={200} size={20} delay={0.5} />
      <Sparkle x={1600} y={300} size={16} delay={1} />
      <Sparkle x={400} y={700} size={14} delay={1.5} />
      <Sparkle x={1500} y={800} size={18} delay={0.8} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 50,
          }}
        >
          {/* Logo with premium glow */}
          <div style={{position: 'relative'}}>
            {/* Outer glow layers */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 350,
                height: 350,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${COLORS.gold}${Math.round(glowIntensity * 40).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
                filter: 'blur(40px)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 280,
                height: 280,
                borderRadius: 50,
                background: COLORS.white,
                filter: 'blur(60px)',
                opacity: glowIntensity * 0.6,
              }}
            />

            {/* Logo */}
            <div
              style={{
                position: 'relative',
                transform: `scale(${logoSpring})`,
                borderRadius: 30,
                overflow: 'hidden',
                boxShadow: `0 30px 100px rgba(0,0,0,0.4), 0 0 60px ${COLORS.gold}30`,
              }}
            >
              <Img
                src={staticFile('fcl-logo.svg')}
                style={{
                  width: 260,
                  height: 260,
                }}
              />
              <ShimmerEffect width={260} height={260} delay={0.5} speed={2.5} />
            </div>
          </div>

          <ElegantDivider width={300} delay={0.5} variant="ornate" />

          <ElegantTitle delay={0.6} fontSize={76}>
            First Class Learning
          </ElegantTitle>

          <ElegantSubtitle delay={0.9} fontSize={28}>
            Camberley Tuition Centre
          </ElegantSubtitle>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene: Services Overview
const ServicesScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <PremiumBackground variant="warm" />
      <FloatingParticles />

      {/* Decorative orbs */}
      <GlowOrb x={200} y={200} size={30} delay={0} />
      <GlowOrb x={1700} y={800} size={25} delay={0.3} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 45,
          }}
        >
          <ElegantSubtitle delay={0} fontSize={24}>
            What We Offer
          </ElegantSubtitle>

          <PremiumAnimatedLetters text="EXPERT TUITION" delay={0.2} fontSize={85} color={COLORS.white} />

          <ElegantDivider width={180} delay={0.6} variant="ornate" />

          <div style={{display: 'flex', gap: 50, marginTop: 30}}>
            {[
              {icon: '📐', label: 'Maths', delay: 0.8, glow: COLORS.coral},
              {icon: '📚', label: 'English', delay: 1.0, glow: COLORS.gold},
              {icon: '🔬', label: 'Science', delay: 1.2, glow: '#4ECDC4'},
            ].map((item) => (
              <PremiumCard key={item.label} delay={item.delay} width={240} padding={45} glowColor={item.glow}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
                  <span style={{fontSize: 70}}>{item.icon}</span>
                  <span style={{fontFamily: playfairFont, fontSize: 28, fontWeight: 600, color: COLORS.white, letterSpacing: 2}}>
                    {item.label}
                  </span>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene: Maths Programme
const MathsScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <PremiumBackground variant="elegant" />
      <FloatingParticles />

      <Sparkle x={1500} y={150} size={18} delay={0} />
      <Sparkle x={200} y={600} size={14} delay={0.8} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 100}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 120, width: '100%', maxWidth: 1600}}>
          {/* Left side - Content */}
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 35}}>
            <ElegantSubtitle delay={0} fontSize={20}>
              Programme
            </ElegantSubtitle>

            <ElegantTitle delay={0.1} fontSize={72} accent>
              Mathematics
            </ElegantTitle>

            <ElegantDivider width={160} delay={0.3} />

            <div
              style={{
                fontFamily,
                fontSize: 26,
                fontWeight: 400,
                color: COLORS.cream,
                lineHeight: 1.7,
                opacity: 0.9,
                maxWidth: 550,
                textShadow: '0 2px 15px rgba(0,0,0,0.3)',
              }}
            >
              Building fundamental skills for success in school mathematics and beyond
            </div>

            <div style={{display: 'flex', gap: 18, marginTop: 20, flexWrap: 'wrap'}}>
              {['Arithmetic', 'Algebra', 'Geometry', 'Problem Solving'].map((skill, i) => (
                <PremiumBadge key={skill} text={skill} delay={0.6 + i * 0.12} variant="outline" />
              ))}
            </div>
          </div>

          {/* Right side - Visual */}
          <div style={{display: 'flex', gap: 40}}>
            <PremiumProgressRing progress={95} delay={0.5} label="Success Rate" color={COLORS.gold} />
            <PremiumProgressRing progress={100} delay={0.7} label="Curriculum" color={COLORS.coral} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene: English Programme
const EnglishScene: React.FC = () => {
  const skills = [
    {text: 'Reading', delay: 0.6},
    {text: 'Grammar', delay: 0.7},
    {text: 'Spelling', delay: 0.8},
    {text: 'Vocabulary', delay: 0.9},
    {text: 'Punctuation', delay: 1.0},
    {text: 'Creative Writing', delay: 1.1},
  ];

  return (
    <AbsoluteFill>
      <PremiumBackground variant="warm" />
      <FloatingParticles />

      <GlowOrb x={150} y={250} size={35} delay={0} color={COLORS.gold} />
      <GlowOrb x={1750} y={700} size={28} delay={0.4} color={COLORS.coral} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40}}>
          <ElegantSubtitle delay={0} fontSize={20}>
            Programme
          </ElegantSubtitle>

          <PremiumAnimatedLetters text="ENGLISH" delay={0.1} fontSize={95} color={COLORS.white} />

          <ElegantDivider width={180} delay={0.4} variant="ornate" />

          <div
            style={{
              fontFamily,
              fontSize: 26,
              fontWeight: 400,
              color: COLORS.cream,
              textAlign: 'center',
              maxWidth: 700,
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            Comprehensive coverage from reading to creative writing
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 20,
              maxWidth: 900,
              marginTop: 25,
            }}
          >
            {skills.map((skill) => (
              <PremiumBadge key={skill.text} text={skill.text} delay={skill.delay} variant="gold" />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene: Science Programme
const ScienceScene: React.FC = () => {
  const subjects = [
    {icon: '⚗️', label: 'Chemistry', glow: '#FF6B6B', delay: 0.7},
    {icon: '⚡', label: 'Physics', glow: '#4ECDC4', delay: 0.9},
    {icon: '🧬', label: 'Biology', glow: '#95E1A3', delay: 1.1},
  ];

  return (
    <AbsoluteFill>
      <PremiumBackground variant="dramatic" />
      <FloatingParticles />

      <Sparkle x={250} y={180} size={16} delay={0} />
      <Sparkle x={1650} y={250} size={20} delay={0.5} />
      <Sparkle x={960} y={850} size={14} delay={1} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40}}>
          <ElegantSubtitle delay={0} fontSize={20}>
            Programme
          </ElegantSubtitle>

          <PremiumAnimatedLetters text="SCIENCE" delay={0.1} fontSize={95} color={COLORS.white} />

          <ElegantDivider width={180} delay={0.4} variant="ornate" />

          <div
            style={{
              fontFamily,
              fontSize: 26,
              fontWeight: 400,
              color: COLORS.cream,
              textAlign: 'center',
              maxWidth: 600,
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            Proven results & enjoyment in learning
          </div>

          <div style={{display: 'flex', gap: 60, marginTop: 35}}>
            {subjects.map((subject) => (
              <PremiumCard key={subject.label} delay={subject.delay} width={220} padding={40} glowColor={subject.glow}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 25}}>
                  <div
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: 48,
                      boxShadow: `0 0 30px ${subject.glow}30`,
                    }}
                  >
                    {subject.icon}
                  </div>
                  <span style={{fontFamily: playfairFont, fontSize: 24, fontWeight: 600, color: COLORS.white, letterSpacing: 1}}>
                    {subject.label}
                  </span>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene: Stats
const StatsScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <PremiumBackground variant="elegant" />
      <FloatingParticles />

      <GlowOrb x={150} y={150} size={40} delay={0} />
      <GlowOrb x={1750} y={850} size={35} delay={0.3} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
          <div
            style={{
              fontFamily,
              fontSize: 28,
              fontWeight: 400,
              color: COLORS.cream,
              letterSpacing: 3,
              opacity: 0.9,
            }}
          >
            Part of the UK's leading tuition franchise
          </div>

          <PremiumCounter value={300} suffix="+" delay={0.3} />

          <ElegantTitle delay={0.5} fontSize={52}>
            Centres Nationwide
          </ElegantTitle>

          <ElegantDivider width={250} delay={0.7} variant="ornate" />

          <div style={{display: 'flex', gap: 70, marginTop: 35}}>
            {[
              {value: '25+', label: 'Years Experience', glow: COLORS.gold},
              {value: '50K+', label: 'Students Helped', glow: COLORS.coral},
              {value: '98%', label: 'Satisfaction', glow: '#4ECDC4'},
            ].map((stat, i) => (
              <PremiumCard key={stat.label} delay={0.8 + i * 0.15} width={210} padding={35} glowColor={stat.glow}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15}}>
                  <span style={{fontFamily: playfairFont, fontSize: 42, fontWeight: 800, color: COLORS.white}}>
                    {stat.value}
                  </span>
                  <span style={{fontFamily, fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.85)', letterSpacing: 1}}>
                    {stat.label}
                  </span>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene: CTA
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const glowPulse = interpolate(
    (frame % (fps * 2)) / (fps * 2),
    [0, 0.5, 1],
    [0.4, 0.8, 0.4],
    {easing: Easing.inOut(Easing.ease)}
  );

  return (
    <AbsoluteFill>
      <PremiumBackground variant="dramatic" />
      <FloatingParticles />

      {/* Sparkle burst around CTA */}
      <Sparkle x={700} y={450} size={16} delay={0} />
      <Sparkle x={1200} y={400} size={18} delay={0.3} />
      <Sparkle x={650} y={550} size={12} delay={0.6} />
      <Sparkle x={1250} y={520} size={14} delay={0.9} />
      <Sparkle x={960} y={350} size={20} delay={0.4} />

      <GlowOrb x={200} y={200} size={30} delay={0} />
      <GlowOrb x={1700} y={850} size={35} delay={0.2} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 35}}>
          <ElegantTitle delay={0} fontSize={60}>
            Start Your Child's Journey
          </ElegantTitle>

          <ElegantTitle delay={0.2} fontSize={60} accent>
            Today
          </ElegantTitle>

          <ElegantDivider width={200} delay={0.4} variant="ornate" />

          <div
            style={{
              fontFamily,
              fontSize: 26,
              fontWeight: 400,
              color: COLORS.cream,
              textAlign: 'center',
              maxWidth: 700,
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            Individualised programmes tailored to your child's needs
          </div>

          {/* Premium CTA Button */}
          <div style={{position: 'relative', marginTop: 25}}>
            {/* Multi-layer glow */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '130%',
                height: '200%',
                background: `radial-gradient(ellipse, ${COLORS.gold}${Math.round(glowPulse * 80).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
                filter: 'blur(30px)',
                borderRadius: 60,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '110%',
                height: '150%',
                background: COLORS.white,
                filter: 'blur(40px)',
                opacity: glowPulse * 0.5,
                borderRadius: 60,
              }}
            />
            <PremiumBadge text="Book a Free Consultation" delay={0.7} variant="gold" />
          </div>

          <div
            style={{
              fontFamily,
              fontSize: 22,
              fontWeight: 500,
              color: COLORS.cream,
              letterSpacing: 3,
              marginTop: 10,
              opacity: spring({frame: frame - fps * 1, fps, config: {damping: 15}}),
            }}
          >
            firstclasslearning.co.uk/camberley
          </div>

          {/* Logo at bottom */}
          <div style={{marginTop: 40, position: 'relative'}}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 150,
                height: 150,
                background: `radial-gradient(circle, ${COLORS.gold}30 0%, transparent 70%)`,
                filter: 'blur(25px)',
              }}
            />
            <Img
              src={staticFile('fcl-logo.svg')}
              style={{
                width: 110,
                height: 110,
                opacity: spring({frame: frame - 1.2 * fps, fps, config: {damping: 15}}),
                position: 'relative',
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPOSITION ============

export const ProductDemo: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.burgundy}}>
      {/* Voiceover */}
      <Audio src={staticFile('audio/voiceover.mp3')} volume={1} />

      {/* Intro: 0-4s */}
      <Sequence from={0} durationInFrames={fps * 4}>
        <IntroScene />
      </Sequence>

      {/* Services Overview: 4-7s */}
      <Sequence from={fps * 4} durationInFrames={fps * 3}>
        <ServicesScene />
      </Sequence>

      {/* Maths: 7-13s */}
      <Sequence from={fps * 7} durationInFrames={fps * 6}>
        <MathsScene />
      </Sequence>

      {/* English: 13-18s */}
      <Sequence from={fps * 13} durationInFrames={fps * 5}>
        <EnglishScene />
      </Sequence>

      {/* Science: 18-23s */}
      <Sequence from={fps * 18} durationInFrames={fps * 5}>
        <ScienceScene />
      </Sequence>

      {/* Stats: 23-27s */}
      <Sequence from={fps * 23} durationInFrames={fps * 4}>
        <StatsScene />
      </Sequence>

      {/* CTA: 27-32s */}
      <Sequence from={fps * 27} durationInFrames={fps * 5}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
