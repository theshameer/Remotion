import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
  Img,
  staticFile,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Poppins';

const {fontFamily} = loadFont('normal', {
  weights: ['400', '600', '700', '800'],
  subsets: ['latin'],
});

// FCL Brand Colors
const COLORS = {
  red: '#C41E3A',
  darkRed: '#8B0000',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
};

// Animated Text Component
const AnimatedText: React.FC<{
  children: string;
  delay?: number;
  fontSize?: number;
  fontWeight?: number;
  style?: React.CSSProperties;
}> = ({children, delay = 0, fontSize = 72, fontWeight = 700, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const delayFrames = delay * fps;
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const opacity = interpolate(adjustedFrame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const translateY = interpolate(adjustedFrame, [0, fps * 0.5], [40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        fontFamily,
        fontSize,
        fontWeight,
        color: COLORS.white,
        opacity,
        transform: `translateY(${translateY}px)`,
        textAlign: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Fade In Scale Component
const FadeInScale: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({children, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const delayFrames = delay * fps;
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const opacity = interpolate(adjustedFrame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const scale = interpolate(adjustedFrame, [0, fps * 0.4], [0.8, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
};

// Icon Component
const Icon: React.FC<{
  emoji: string;
  size?: number;
  delay?: number;
}> = ({emoji, size = 120, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const delayFrames = delay * fps;
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const opacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(adjustedFrame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(2)),
  });

  return (
    <div
      style={{
        fontSize: size,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {emoji}
    </div>
  );
};

// Progress Bar Component
const ProgressBar: React.FC<{
  progress: number;
  delay?: number;
}> = ({progress, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const delayFrames = delay * fps;
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const width = interpolate(adjustedFrame, [0, fps * 0.8], [0, progress], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: 600,
        height: 12,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 6,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${width}%`,
          height: '100%',
          backgroundColor: COLORS.white,
          borderRadius: 6,
        }}
      />
    </div>
  );
};

// Scene: Intro
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const logoScale = interpolate(frame, [0, fps * 0.6], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.7)),
  });

  const logoOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
        }}
      >
        <Img
          src={staticFile('fcl-logo.svg')}
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            width: 220,
            height: 220,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        />
        <AnimatedText delay={0.3} fontSize={64} fontWeight={800}>
          First Class Learning
        </AnimatedText>
        <AnimatedText delay={0.5} fontSize={36} fontWeight={400}>
          Camberley Tuition Centre
        </AnimatedText>
      </div>
    </AbsoluteFill>
  );
};

// Scene: Tagline
const TaglineScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
        }}
      >
        <FadeInScale>
          <div style={{fontSize: 100}}>
            <span style={{marginRight: 20}}>M</span>
            <span style={{marginRight: 20}}>A</span>
            <span style={{marginRight: 20}}>T</span>
            <span style={{marginRight: 20}}>H</span>
            <span>S</span>
          </div>
        </FadeInScale>
        <AnimatedText delay={0.3} fontSize={48} fontWeight={400}>
          Supporting children and adults
        </AnimatedText>
        <AnimatedText delay={0.5} fontSize={48} fontWeight={400}>
          in the local community
        </AnimatedText>
      </div>
    </AbsoluteFill>
  );
};

// Scene: Maths Programme
const MathsScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
        }}
      >
        <Icon emoji="📐" delay={0} />
        <AnimatedText delay={0.2} fontSize={56} fontWeight={700}>
          Maths Programme
        </AnimatedText>
        <AnimatedText delay={0.4} fontSize={32} fontWeight={400}>
          Fundamental skills for success
        </AnimatedText>
        <AnimatedText delay={0.6} fontSize={32} fontWeight={400}>
          in school mathematics
        </AnimatedText>
        <div style={{marginTop: 20}}>
          <AnimatedText delay={0.8} fontSize={24} fontWeight={400}>
            Core arithmetic to GCSE problem solving
          </AnimatedText>
          <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
            <ProgressBar progress={95} delay={1} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene: English Programme
const EnglishScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
        }}
      >
        <Icon emoji="📚" delay={0} />
        <AnimatedText delay={0.2} fontSize={56} fontWeight={700}>
          English Programme
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
          {[
            {text: 'Reading', delay: 0.4},
            {text: 'Grammar', delay: 0.5},
            {text: 'Spelling', delay: 0.6},
            {text: 'Vocabulary', delay: 0.7},
            {text: 'Punctuation', delay: 0.8},
            {text: 'Creative Writing', delay: 0.9},
          ].map((item) => (
            <FadeInScale key={item.text} delay={item.delay}>
              <div
                style={{
                  fontFamily,
                  fontSize: 28,
                  fontWeight: 600,
                  color: COLORS.red,
                  backgroundColor: COLORS.white,
                  padding: '15px 30px',
                  borderRadius: 50,
                }}
              >
                {item.text}
              </div>
            </FadeInScale>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene: Science Programme
const ScienceScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
        }}
      >
        <Icon emoji="🔬" delay={0} />
        <AnimatedText delay={0.2} fontSize={56} fontWeight={700}>
          Science Programme
        </AnimatedText>
        <AnimatedText delay={0.4} fontSize={32} fontWeight={400}>
          Comprehensive curriculum coverage
        </AnimatedText>
        <AnimatedText delay={0.6} fontSize={32} fontWeight={400}>
          Proven results & enjoyment in learning
        </AnimatedText>
        <div style={{marginTop: 30, display: 'flex', gap: 60}}>
          <FadeInScale delay={0.8}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: 60}}>⚗️</div>
              <div style={{fontFamily, fontSize: 24, color: COLORS.white, marginTop: 10}}>
                Chemistry
              </div>
            </div>
          </FadeInScale>
          <FadeInScale delay={1.0}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: 60}}>⚡</div>
              <div style={{fontFamily, fontSize: 24, color: COLORS.white, marginTop: 10}}>
                Physics
              </div>
            </div>
          </FadeInScale>
          <FadeInScale delay={1.2}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: 60}}>🧬</div>
              <div style={{fontFamily, fontSize: 24, color: COLORS.white, marginTop: 10}}>
                Biology
              </div>
            </div>
          </FadeInScale>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene: Stats
const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const count = Math.min(300, Math.floor(interpolate(frame, [fps * 0.5, fps * 2], [0, 300], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
        }}
      >
        <AnimatedText delay={0} fontSize={42} fontWeight={400}>
          Part of the UK's leading tuition franchise
        </AnimatedText>
        <FadeInScale delay={0.3}>
          <div
            style={{
              fontFamily,
              fontSize: 160,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            {count}+
          </div>
        </FadeInScale>
        <AnimatedText delay={0.5} fontSize={48} fontWeight={600}>
          Centres Nationwide
        </AnimatedText>
        <AnimatedText delay={0.7} fontSize={32} fontWeight={400}>
          Expert tutors & great facilities
        </AnimatedText>
      </div>
    </AbsoluteFill>
  );
};

// Scene: Call to Action
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const pulse = interpolate(
    frame % (fps * 0.8),
    [0, fps * 0.4, fps * 0.8],
    [1, 1.05, 1],
    {extrapolateRight: 'clamp'}
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
        }}
      >
        <AnimatedText delay={0} fontSize={52} fontWeight={700}>
          Start Your Child's Journey Today
        </AnimatedText>
        <AnimatedText delay={0.3} fontSize={32} fontWeight={400}>
          Individualised programmes tailored to your child's needs
        </AnimatedText>
        <FadeInScale delay={0.6}>
          <div
            style={{
              fontFamily,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.red,
              backgroundColor: COLORS.white,
              padding: '25px 60px',
              borderRadius: 60,
              marginTop: 30,
              transform: `scale(${pulse})`,
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            }}
          >
            Book a Free Consultation
          </div>
        </FadeInScale>
        <AnimatedText delay={1} fontSize={28} fontWeight={400}>
          firstclasslearning.co.uk/camberley
        </AnimatedText>
      </div>
    </AbsoluteFill>
  );
};

// Main Product Demo Composition
export const ProductDemo: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.red}}>
      {/* Intro: 0-3s */}
      <Sequence from={0} durationInFrames={fps * 3} premountFor={fps}>
        <IntroScene />
      </Sequence>

      {/* Tagline: 3-5.5s */}
      <Sequence from={fps * 3} durationInFrames={fps * 2.5} premountFor={fps}>
        <TaglineScene />
      </Sequence>

      {/* Maths: 5.5-8.5s */}
      <Sequence from={fps * 5.5} durationInFrames={fps * 3} premountFor={fps}>
        <MathsScene />
      </Sequence>

      {/* English: 8.5-11.5s */}
      <Sequence from={fps * 8.5} durationInFrames={fps * 3} premountFor={fps}>
        <EnglishScene />
      </Sequence>

      {/* Science: 11.5-14.5s */}
      <Sequence from={fps * 11.5} durationInFrames={fps * 3} premountFor={fps}>
        <ScienceScene />
      </Sequence>

      {/* Stats: 14.5-17.5s */}
      <Sequence from={fps * 14.5} durationInFrames={fps * 3} premountFor={fps}>
        <StatsScene />
      </Sequence>

      {/* CTA: 17.5-22s */}
      <Sequence from={fps * 17.5} durationInFrames={fps * 4.5} premountFor={fps}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
