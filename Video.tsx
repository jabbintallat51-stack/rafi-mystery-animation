import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {FPS, SCENES, fr} from './timing';
import {Caller, Call, Drop, Empty, Intro, Look, Morning, Mystery, ShadowCorner, Whisper} from './Scenes';
import {Subtitles} from './Subtitles';

const SCENE_COMPONENTS = {intro: Intro, call: Call, drop: Drop, look: Look, empty: Empty, shadow: ShadowCorner, whisper: Whisper, morning: Morning, mystery: Mystery, caller: Caller} as const;
const sfx = (n: string) => staticFile(`sfx/${n}.wav`);
// volume envelope from [seconds, volume] keyframes (absolute video time)
const env = (pts: [number, number][]) => (frame: number) =>
  interpolate(frame / FPS, pts.map((p) => p[0]), pts.map((p) => p[1]), {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

// One-shot SFX placed at an absolute time (seconds), optional length and volume.
const Shot: React.FC<{name: string; at: number; vol?: number; len?: number; fadeOut?: number}> = ({name, at, vol = 1, len, fadeOut = 0.15}) => (
  <Sequence from={fr(at)} durationInFrames={len ? fr(len) : undefined} layout="none">
    <Audio src={sfx(name)} volume={len ? (f) => vol * interpolate(f, [fr(len) - fr(fadeOut), fr(len)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : vol} />
  </Sequence>
);

export const Video: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {(Object.keys(SCENES) as (keyof typeof SCENES)[]).map((k) => {
      const [s, e] = SCENES[k];
      const C = SCENE_COMPONENTS[k];
      return <Sequence key={k} from={fr(s)} durationInFrames={fr(e) - fr(s) + (k === 'caller' ? 2 : 0)}><C /></Sequence>;
    })}
    <Subtitles />

    {/* master voiceover */}
    <Audio src={staticFile('Rafi_mp4.mp3')} volume={1} />

    {/* beds: rain & wind stop for the sunny morning, return at night; drone swells toward the reveal */}
    <Audio src={sfx('rain')} volume={env([[0, 0.3], [30.2, 0.3], [30.7, 0], [38, 0], [38.6, 0.3], [50, 0.2]])} />
    <Audio src={sfx('wind')} volume={env([[0, 0.12], [14, 0.25], [29, 0.4], [30.4, 0], [38.2, 0], [39, 0.2], [50, 0.3]])} />
    <Audio src={sfx('drone')} volume={env([[0, 0.12], [16, 0.22], [29.3, 0.35], [30.4, 0.05], [34.6, 0.12], [38.4, 0.25], [48, 0.4], [50.7, 0.15]])} />

    {/* scene hits */}
    <Shot name="vibrate" at={0.2} vol={0.3} len={2.3} />
    <Shot name="phone_drop" at={9.1} vol={1} />
    <Shot name="heartbeat" at={14.05} vol={0.7} len={5.3} fadeOut={0.6} />
    <Shot name="creak" at={16.6} vol={0.5} />
    <Shot name="laugh" at={21.55} vol={0.6} len={0.62} fadeOut={0.25} />
    <Shot name="whisper" at={23.5} vol={0.18} len={2} />
    <Shot name="sting" at={27.0} vol={0.55} />
    <Shot name="glitch" at={29.3} vol={0.6} />
    <Shot name="laugh" at={29.45} vol={0.8} len={0.9} fadeOut={0.2} />
    <Shot name="birds" at={30.4} vol={0.5} len={4.25} fadeOut={0.3} />
    <Shot name="vibrate" at={45.75} vol={0.55} len={1.9} />
    <Shot name="ring" at={47.7} vol={0.4} len={2.9} fadeOut={0.3} />
    <Shot name="glitch" at={49.89} vol={0.7} />
  </AbsoluteFill>
);
