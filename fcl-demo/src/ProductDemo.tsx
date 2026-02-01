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
import React from 'react';

const {fontFamily} = loadFont('normal', {
  weights: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

// FCL Brand Colors - Enhanced palette
const COLORS = {
  red: '#C41E3A',
  darkRed: '#9B1B2F',
  deepRed: '#7A1525',
  white: '#FFFFFF',
  cream: '#FFF8F0',
  gold: '#FFD700',
  lightRed: '#E8475F',
};

// ============ UTILITY COMPONENTS ============

// Floating Particle
const Particle: React.FC<{
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity?: number;
}> = ({x, y, size, delay, duration, opacity = 0.15}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const progress = ((frame - delay * fps) % (duration * fps)) / (duration * fps);
  const yOffset = interpolate(progress, [0, 1], [0, -200]);
  const particleOpacity = interpolate(
    progress,
    [0, 0.2, 0.8, 1],
    [0, opacity, opacity, 0]
  );

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
        opacity: particleOpacity,
        transform: `translateY(${yOffset}px)`,
        filter: 'blur(1px)',
      }}
    />
  );
};

// Animated Background with gradient and particles
const AnimatedBackground: React.FC<{
  variant?: 'default' | 'gradient' | 'radial';
}> = ({variant = 'default'}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const gradientPosition = interpolate(
    frame,
    [0, durationInFrames],
    [0, 100],
    {extrapolateRight: 'clamp'}
  );

  const particles = [
    {x: 10, y: 90, size: 8, delay: 0, duration: 8},
    {x: 25, y: 95, size: 6, delay: 1, duration: 10},
    {x: 40, y: 85, size: 10, delay: 2, duration: 7},
    {x: 55, y: 92, size: 5, delay: 0.5, duration: 9},
    {x: 70, y: 88, size: 7, delay: 1.5, duration: 8},
    {x: 85, y: 95, size: 9, delay: 3, duration: 11},
    {x: 15, y: 100, size: 4, delay: 2.5, duration: 6},
    {x: 60, y: 100, size: 6, delay: 4, duration: 8},
    {x: 90, y: 90, size: 8, delay: 1, duration: 9},
    {x: 5, y: 80, size: 5, delay: 3.5, duration: 7},
  ];

  let background = COLORS.red;
  if (variant === 'gradient') {
    background = `linear-gradient(135deg, ${COLORS.red} 0%, ${COLORS.darkRed} 50%, ${COLORS.deepRed} 100%)`;
  } else if (variant === 'radial') {
    background = `radial-gradient(ellipse at ${50 + Math.sin(gradientPosition * 0.05) * 20}% ${50 + Math.cos(gradientPosition * 0.03) * 20}%, ${COLORS.lightRed} 0%, ${COLORS.red} 40%, ${COLORS.darkRed} 100%)`;
  }

  return (
    <AbsoluteFill style={{background, overflow: 'hidden'}}>
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </AbsoluteFill>
  );
};

// Animated decorative circle
const DecorativeCircle: React.FC<{
  x: number;
  y: number;
  size: number;
  delay?: number;
  color?: string;
}> = ({x, y, size, delay = 0, color = 'rgba(255,255,255,0.1)'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 12, stiffness: 80},
  });

  const pulse = interpolate(
    (frame - delay * fps) % (fps * 3),
    [0, fps * 1.5, fps * 3],
    [1, 1.1, 1]
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2px solid ${color}`,
        transform: `scale(${scale * pulse})`,
        opacity: scale * 0.6,
      }}
    />
  );
};

// Animated line decorator
const AnimatedLine: React.FC<{
  width: number;
  delay?: number;
  direction?: 'left' | 'right' | 'center';
}> = ({width, delay = 0, direction = 'center'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const lineWidth = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 15, stiffness: 100},
  });

  const alignment = direction === 'center' ? 'center' : direction === 'left' ? 'flex-start' : 'flex-end';

  return (
    <div style={{display: 'flex', justifyContent: alignment, width: '100%'}}>
      <div
        style={{
          width: width * lineWidth,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${COLORS.white}, transparent)`,
          borderRadius: 2,
        }}
      />
    </div>
  );
};

// ============ TEXT COMPONENTS ============

// Enhanced Animated Text with spring physics
const AnimatedText: React.FC<{
  children: string;
  delay?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  letterSpacing?: number;
  style?: React.CSSProperties;
}> = ({
  children,
  delay = 0,
  fontSize = 72,
  fontWeight = 700,
  color = COLORS.white,
  letterSpacing = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const springValue = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 12, stiffness: 100},
  });

  const opacity = interpolate(springValue, [0, 1], [0, 1]);
  const translateY = interpolate(springValue, [0, 1], [60, 0]);

  return (
    <div
      style={{
        fontFamily,
        fontSize,
        fontWeight,
        color,
        letterSpacing,
        opacity,
        transform: `translateY(${translateY}px)`,
        textAlign: 'center',
        textShadow: '0 4px 30px rgba(0,0,0,0.3)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Letter by letter animation
const AnimatedLetters: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  fontWeight?: number;
  staggerDelay?: number;
}> = ({text, delay = 0, fontSize = 80, fontWeight = 800, staggerDelay = 0.05}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{display: 'flex', justifyContent: 'center', gap: 8}}>
      {text.split('').map((letter, i) => {
        const letterDelay = delay + i * staggerDelay;
        const springValue = spring({
          frame: frame - letterDelay * fps,
          fps,
          config: {damping: 10, stiffness: 150},
        });

        const scale = interpolate(springValue, [0, 1], [0, 1]);
        const rotate = interpolate(springValue, [0, 0.5, 1], [-20, 5, 0]);

        return (
          <span
            key={i}
            style={{
              fontFamily,
              fontSize,
              fontWeight,
              color: COLORS.white,
              display: 'inline-block',
              transform: `scale(${scale}) rotate(${rotate}deg)`,
              textShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        );
      })}
    </div>
  );
};

// ============ UI COMPONENTS ============

// Animated Card
const AnimatedCard: React.FC<{
  children: React.ReactNode;
  delay?: number;
  width?: number;
  padding?: number;
}> = ({children, delay = 0, width = 300, padding = 30}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const springValue = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 12, stiffness: 80},
  });

  return (
    <div
      style={{
        width,
        padding,
        backgroundColor: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(10px)',
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.2)',
        transform: `scale(${springValue}) translateY(${(1 - springValue) * 30}px)`,
        opacity: springValue,
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}
    >
      {children}
    </div>
  );
};

// Animated Badge/Pill
const AnimatedBadge: React.FC<{
  text: string;
  delay?: number;
  variant?: 'filled' | 'outline';
}> = ({text, delay = 0, variant = 'filled'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const springValue = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 10, stiffness: 120},
  });

  const scale = interpolate(springValue, [0, 1], [0.5, 1]);
  const opacity = springValue;

  const styles = variant === 'filled'
    ? {
        backgroundColor: COLORS.white,
        color: COLORS.red,
      }
    : {
        backgroundColor: 'transparent',
        color: COLORS.white,
        border: '2px solid rgba(255,255,255,0.8)',
      };

  return (
    <div
      style={{
        fontFamily,
        fontSize: 24,
        fontWeight: 600,
        padding: '14px 32px',
        borderRadius: 50,
        transform: `scale(${scale})`,
        opacity,
        boxShadow: variant === 'filled' ? '0 8px 30px rgba(0,0,0,0.2)' : 'none',
        ...styles,
      }}
    >
      {text}
    </div>
  );
};

// Progress Ring
const ProgressRing: React.FC<{
  progress: number;
  size?: number;
  delay?: number;
  label?: string;
}> = ({progress, size = 120, delay = 0, label}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const animatedProgress = interpolate(
    frame - delay * fps,
    [0, fps * 1.5],
    [0, progress],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}
  );

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  const springValue = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 15, stiffness: 100},
  });

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
      <div style={{position: 'relative', width: size, height: size, opacity: springValue}}>
        <svg width={size} height={size} style={{transform: 'rotate(-90deg)'}}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={45}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="8"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={45}
            fill="none"
            stroke={COLORS.white}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily,
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.white,
          }}
        >
          {Math.round(animatedProgress)}%
        </div>
      </div>
      {label && (
        <div style={{fontFamily, fontSize: 18, color: COLORS.white, opacity: 0.9}}>
          {label}
        </div>
      )}
    </div>
  );
};

// Animated Counter
const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  delay?: number;
  fontSize?: number;
}> = ({value, suffix = '', delay = 0, fontSize = 160}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const count = Math.floor(
    interpolate(frame - delay * fps, [0, fps * 2], [0, value], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    })
  );

  const springValue = spring({
    frame: frame - delay * fps,
    fps,
    config: {damping: 12, stiffness: 80},
  });

  return (
    <div
      style={{
        fontFamily,
        fontSize,
        fontWeight: 900,
        color: COLORS.white,
        transform: `scale(${springValue})`,
        textShadow: '0 8px 40px rgba(0,0,0,0.3)',
        letterSpacing: -4,
      }}
    >
      {count}{suffix}
    </div>
  );
};

// ============ SCENES ============

// Scene: Intro with logo
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const logoSpring = spring({
    frame,
    fps,
    config: {damping: 10, stiffness: 80},
  });

  const glowPulse = interpolate(
    frame % (fps * 2),
    [0, fps, fps * 2],
    [0.3, 0.6, 0.3]
  );

  return (
    <AbsoluteFill>
      <AnimatedBackground variant="radial" />

      {/* Decorative circles */}
      <DecorativeCircle x={-100} y={-100} size={400} delay={0.2} />
      <DecorativeCircle x={1700} y={700} size={300} delay={0.4} />
      <DecorativeCircle x={200} y={800} size={200} delay={0.6} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 40,
          }}
        >
          {/* Logo with glow effect */}
          <div style={{position: 'relative'}}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 280,
                height: 280,
                borderRadius: 40,
                background: COLORS.white,
                filter: `blur(60px)`,
                opacity: glowPulse,
              }}
            />
            <Img
              src={staticFile('fcl-logo.svg')}
              style={{
                transform: `scale(${logoSpring})`,
                width: 240,
                height: 240,
                borderRadius: 20,
                boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                position: 'relative',
              }}
            />
          </div>

          <AnimatedLine width={300} delay={0.4} />

          <AnimatedText delay={0.5} fontSize={72} fontWeight={800} letterSpacing={2}>
            First Class Learning
          </AnimatedText>

          <AnimatedText delay={0.7} fontSize={36} fontWeight={400} letterSpacing={4}>
            CAMBERLEY TUITION CENTRE
          </AnimatedText>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene: Services Overview
const ServicesScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <AnimatedBackground variant="gradient" />

      <DecorativeCircle x={1600} y={100} size={250} delay={0} />
      <DecorativeCircle x={-50} y={600} size={180} delay={0.2} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 50,
          }}
        >
          <AnimatedText delay={0} fontSize={28} fontWeight={500} letterSpacing={6}>
            WHAT WE OFFER
          </AnimatedText>

          <AnimatedLetters text="EXPERT TUITION" delay={0.2} fontSize={80} />

          <AnimatedLine width={200} delay={0.6} />

          <div style={{display: 'flex', gap: 40, marginTop: 20}}>
            {[
              {icon: '📐', label: 'Maths', delay: 0.8},
              {icon: '📚', label: 'English', delay: 1.0},
              {icon: '🔬', label: 'Science', delay: 1.2},
            ].map((item) => (
              <AnimatedCard key={item.label} delay={item.delay} width={220} padding={40}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15}}>
                  <span style={{fontSize: 60}}>{item.icon}</span>
                  <span style={{fontFamily, fontSize: 24, fontWeight: 600, color: COLORS.white}}>
                    {item.label}
                  </span>
                </div>
              </AnimatedCard>
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
      <AnimatedBackground variant="radial" />

      <DecorativeCircle x={1500} y={-50} size={300} delay={0} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 100, width: '100%', maxWidth: 1600}}>
          {/* Left side - Content */}
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 30}}>
            <AnimatedText delay={0} fontSize={24} fontWeight={500} letterSpacing={4} style={{textAlign: 'left'}}>
              PROGRAMME
            </AnimatedText>

            <AnimatedText delay={0.1} fontSize={64} fontWeight={800} style={{textAlign: 'left'}}>
              Mathematics
            </AnimatedText>

            <AnimatedLine width={150} delay={0.3} direction="left" />

            <AnimatedText delay={0.4} fontSize={28} fontWeight={400} style={{textAlign: 'left', lineHeight: 1.6, opacity: 0.9}}>
              Fundamental skills for success in school mathematics
            </AnimatedText>

            <div style={{display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap'}}>
              {['Arithmetic', 'Algebra', 'Geometry', 'Problem Solving'].map((skill, i) => (
                <AnimatedBadge key={skill} text={skill} delay={0.6 + i * 0.1} variant="outline" />
              ))}
            </div>
          </div>

          {/* Right side - Visual */}
          <div style={{display: 'flex', gap: 30}}>
            <ProgressRing progress={95} delay={0.5} label="Success Rate" />
            <ProgressRing progress={100} delay={0.7} label="Curriculum" />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene: English Programme
const EnglishScene: React.FC = () => {
  const skills = [
    {text: 'Reading', delay: 0.5},
    {text: 'Grammar', delay: 0.6},
    {text: 'Spelling', delay: 0.7},
    {text: 'Vocabulary', delay: 0.8},
    {text: 'Punctuation', delay: 0.9},
    {text: 'Creative Writing', delay: 1.0},
  ];

  return (
    <AbsoluteFill>
      <AnimatedBackground variant="gradient" />

      <DecorativeCircle x={-100} y={200} size={350} delay={0} />
      <DecorativeCircle x={1700} y={600} size={200} delay={0.3} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40}}>
          <AnimatedText delay={0} fontSize={24} fontWeight={500} letterSpacing={4}>
            PROGRAMME
          </AnimatedText>

          <AnimatedLetters text="ENGLISH" delay={0.1} fontSize={90} />

          <AnimatedLine width={200} delay={0.4} />

          <AnimatedText delay={0.5} fontSize={28} fontWeight={400} style={{maxWidth: 700, lineHeight: 1.5}}>
            Comprehensive coverage from reading to creative writing
          </AnimatedText>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 20,
              maxWidth: 900,
              marginTop: 20,
            }}
          >
            {skills.map((skill) => (
              <AnimatedBadge key={skill.text} text={skill.text} delay={skill.delay} />
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
    {icon: '⚗️', label: 'Chemistry', color: '#FF6B6B', delay: 0.6},
    {icon: '⚡', label: 'Physics', color: '#4ECDC4', delay: 0.8},
    {icon: '🧬', label: 'Biology', color: '#95E1A3', delay: 1.0},
  ];

  return (
    <AbsoluteFill>
      <AnimatedBackground variant="radial" />

      <DecorativeCircle x={100} y={-100} size={280} delay={0} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40}}>
          <AnimatedText delay={0} fontSize={24} fontWeight={500} letterSpacing={4}>
            PROGRAMME
          </AnimatedText>

          <AnimatedLetters text="SCIENCE" delay={0.1} fontSize={90} />

          <AnimatedLine width={200} delay={0.4} />

          <AnimatedText delay={0.5} fontSize={28} fontWeight={400} style={{maxWidth: 600, lineHeight: 1.5}}>
            Proven results & enjoyment in learning
          </AnimatedText>

          <div style={{display: 'flex', gap: 50, marginTop: 30}}>
            {subjects.map((subject) => (
              <AnimatedCard key={subject.label} delay={subject.delay} width={200} padding={35}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: 40,
                    }}
                  >
                    {subject.icon}
                  </div>
                  <span style={{fontFamily, fontSize: 22, fontWeight: 600, color: COLORS.white}}>
                    {subject.label}
                  </span>
                </div>
              </AnimatedCard>
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
      <AnimatedBackground variant="gradient" />

      <DecorativeCircle x={1600} y={100} size={400} delay={0} />
      <DecorativeCircle x={-150} y={500} size={300} delay={0.2} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
          <AnimatedText delay={0} fontSize={28} fontWeight={400} letterSpacing={2}>
            Part of the UK's leading tuition franchise
          </AnimatedText>

          <AnimatedCounter value={300} suffix="+" delay={0.3} />

          <AnimatedText delay={0.5} fontSize={48} fontWeight={700}>
            Centres Nationwide
          </AnimatedText>

          <AnimatedLine width={250} delay={0.7} />

          <div style={{display: 'flex', gap: 60, marginTop: 30}}>
            {[
              {value: '25+', label: 'Years Experience'},
              {value: '50K+', label: 'Students Helped'},
              {value: '98%', label: 'Satisfaction'},
            ].map((stat, i) => (
              <AnimatedCard key={stat.label} delay={0.8 + i * 0.15} width={200} padding={30}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
                  <span style={{fontFamily, fontSize: 36, fontWeight: 800, color: COLORS.white}}>
                    {stat.value}
                  </span>
                  <span style={{fontFamily, fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.8)'}}>
                    {stat.label}
                  </span>
                </div>
              </AnimatedCard>
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

  const pulse = interpolate(
    frame % (fps * 1.5),
    [0, fps * 0.75, fps * 1.5],
    [1, 1.08, 1],
    {easing: Easing.inOut(Easing.ease)}
  );

  const glowIntensity = interpolate(
    frame % (fps * 1.5),
    [0, fps * 0.75, fps * 1.5],
    [0.3, 0.6, 0.3]
  );

  return (
    <AbsoluteFill>
      <AnimatedBackground variant="radial" />

      <DecorativeCircle x={-100} y={-100} size={350} delay={0} />
      <DecorativeCircle x={1650} y={700} size={280} delay={0.2} />

      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40}}>
          <AnimatedText delay={0} fontSize={56} fontWeight={800}>
            Start Your Child's Journey
          </AnimatedText>

          <AnimatedText delay={0.2} fontSize={56} fontWeight={800}>
            Today
          </AnimatedText>

          <AnimatedLine width={200} delay={0.4} />

          <AnimatedText delay={0.5} fontSize={28} fontWeight={400} style={{maxWidth: 700, lineHeight: 1.5}}>
            Individualised programmes tailored to your child's needs
          </AnimatedText>

          {/* CTA Button with glow */}
          <div style={{position: 'relative', marginTop: 20}}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%',
                height: '150%',
                background: COLORS.white,
                filter: 'blur(40px)',
                opacity: glowIntensity,
                borderRadius: 60,
              }}
            />
            <AnimatedBadge text="Book a Free Consultation" delay={0.7} />
          </div>

          <AnimatedText delay={1} fontSize={24} fontWeight={500} letterSpacing={2}>
            firstclasslearning.co.uk/camberley
          </AnimatedText>

          {/* Logo at bottom */}
          <div style={{marginTop: 30}}>
            <Img
              src={staticFile('fcl-logo.svg')}
              style={{
                width: 100,
                height: 100,
                opacity: spring({frame: frame - 1.2 * fps, fps, config: {damping: 15}}),
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
    <AbsoluteFill style={{backgroundColor: COLORS.red}}>
      {/* Voiceover */}
      <Audio src={staticFile('audio/voiceover.mp3')} volume={1} />

      {/* Intro: 0-4s - "Welcome to First Class Learning Camberley. Your trusted partner in education." */}
      <Sequence from={0} durationInFrames={fps * 4}>
        <IntroScene />
      </Sequence>

      {/* Services Overview: 4-7s - "We offer expert tuition in Maths, English, and Science." */}
      <Sequence from={fps * 4} durationInFrames={fps * 3}>
        <ServicesScene />
      </Sequence>

      {/* Maths: 7-13s - "Our Mathematics programme builds fundamental skills..." */}
      <Sequence from={fps * 7} durationInFrames={fps * 6}>
        <MathsScene />
      </Sequence>

      {/* English: 13-18s - "Our English programme provides comprehensive coverage..." */}
      <Sequence from={fps * 13} durationInFrames={fps * 5}>
        <EnglishScene />
      </Sequence>

      {/* Science: 18-23s - "Our Science programme delivers proven results..." */}
      <Sequence from={fps * 18} durationInFrames={fps * 5}>
        <ScienceScene />
      </Sequence>

      {/* Stats: 23-27s - "With over 300 centres nationwide..." */}
      <Sequence from={fps * 23} durationInFrames={fps * 4}>
        <StatsScene />
      </Sequence>

      {/* CTA: 27-32s - "Start your childs journey today..." */}
      <Sequence from={fps * 27} durationInFrames={fps * 5}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
