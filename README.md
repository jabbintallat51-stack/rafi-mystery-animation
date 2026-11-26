# Rafi ghost story — Remotion (1080×1920, 30fps, 50.76s)

    npm install
    npm run studio      # live preview
    npm run render      # -> out/rafi_story.mp4

- Everything is timed to `public/Rafi_mp4.mp3` (scene cut points = detected pauses in the voiceover). Edit `src/timing.ts` to nudge scenes or subtitle cues.
- SFX are synthesized: `npm run sfx` regenerates `public/sfx/*.wav`. Swap any file for a real recording (same name) to upgrade it — the laugh especially.
- Subtitles are burned in from `CUES` in `src/timing.ts` (Noto Sans Bengali, loaded via @remotion/google-fonts, needs internet on first render).
