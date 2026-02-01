# Claude Instructions

## Video Creation

When asked to create a video, motion graphic, or animated content:

1. **Use Remotion** - This is the primary tool for video creation
2. **Project Location**: `fcl-demo/` contains the Remotion setup
3. **Commands**:
   - `npm start` - Launch Remotion Studio for preview
   - `npm run build` - Render final MP4 to `out/video.mp4`

### Remotion Best Practices

- Use `spring()` for organic, bouncy animations
- Use `interpolate()` for linear transitions
- Use `Sequence` components to organize scenes
- Store assets in `public/` folder, reference with `staticFile()`
- Use `@remotion/google-fonts` for typography
- Keep compositions modular - separate scenes into components

### Available Components (fcl-demo)

| Component | Purpose |
|-----------|---------|
| `AnimatedBackground` | Gradient/radial backgrounds with particles |
| `AnimatedText` | Spring-based text reveal |
| `AnimatedLetters` | Letter-by-letter animation |
| `AnimatedCard` | Glassmorphism cards |
| `AnimatedBadge` | Pill-shaped badges |
| `ProgressRing` | Circular progress indicator |
| `AnimatedCounter` | Number counting animation |
| `DecorativeCircle` | Pulsing circle decorations |
| `Particle` | Floating particle effects |

---

## Skills & Services

### Installed Skills

- **remotion-best-practices** - Located in `.claude/skills/remotion-best-practices`
  - Covers: animations, audio, charts, fonts, transitions, subtitles, 3D, and more
  - Always reference these rules when creating Remotion content

### When New Skills Are Added

1. Use `npx skills add <repo>` to install new skills
2. Skills are stored in `.agents/skills/` with symlinks in `.claude/skills/`
3. Always apply the latest skill guidelines when working in that domain

---

## AI Generation (WaveSpeed)

**API Key**: `ak-lkwvswrggxpyvzfpsypayc`

### Voiceover Generation

When asked to create a voiceover, narration, or speech:

- **Service**: WaveSpeed API
- **Model**: `eleven-labs-v3` (ElevenLabs V3)
- **Use cases**: Video narration, product demos, explainers

```bash
# Example API call for voiceover
curl -X POST "https://api.wavespeed.ai/v1/audio/generate" \
  -H "Authorization: Bearer ak-lkwvswrggxpyvzfpsypayc" \
  -H "Content-Type: application/json" \
  -d '{"model": "eleven-labs-v3", "text": "Your script here"}'
```

### Image Generation

When asked to create images, graphics, or visuals:

- **Service**: WaveSpeed API
- **Model**: `flux-kontext-pro` (Flux Kontext Pro)
- **Use cases**: Product images, backgrounds, illustrations

```bash
# Example API call for image generation
curl -X POST "https://api.wavespeed.ai/v1/images/generate" \
  -H "Authorization: Bearer ak-lkwvswrggxpyvzfpsypayc" \
  -H "Content-Type: application/json" \
  -d '{"model": "flux-kontext-pro", "prompt": "Your prompt here"}'
```

### Workflow with Remotion

1. Generate voiceover with ElevenLabs V3 → Save to `public/audio/`
2. Generate images with Flux Kontext Pro → Save to `public/images/`
3. Import into Remotion using `staticFile()`
4. Sync audio with `<Audio>` component

---

## Project Structure

```
Remotion/
├── .claude/skills/          # Claude Code skills (symlinks)
├── .agents/skills/          # Actual skill files
├── fcl-demo/                # Remotion video project
│   ├── public/              # Static assets (logos, images)
│   ├── src/
│   │   ├── Root.tsx         # Composition definitions
│   │   └── ProductDemo.tsx  # Main video component
│   └── package.json
└── claude.md                # This file
```

---

## Workflow

1. **Video Request** → Create/modify Remotion composition
2. **New Skill** → Install with `npx skills add`, then apply
3. **Asset Request** → Save to `public/`, use `staticFile()`
4. **Preview** → User runs `npm start` locally
5. **Render** → User runs `npm run build`

---

## Notes

- User's localhost cannot access my environment - always push changes for them to pull
- Commit and push after every significant change
- Branch: `claude/setup-remotion-skills-Mp2jr`
