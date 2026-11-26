import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {loadFont} from '@remotion/google-fonts/NotoSansBengali';
import {CUES, FPS, Who} from './timing';

const {fontFamily} = loadFont('normal', {weights: ['700'], subsets: ['bengali']});
const COLOR: Record<Who, string> = {narr: '#ffffff', niloy: '#ffd36b', shadow: '#ff4d5e'};

export const Subtitles: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const cue = CUES.find((c) => t >= c.s && t < c.e);
  if (!cue) return null;
  const a = interpolate(t, [cue.s, cue.s + 0.14, cue.e - 0.12, cue.e], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pop = interpolate(t, [cue.s, cue.s + 0.14], [0.92, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 250, pointerEvents: 'none'}}>
      <div style={{
        opacity: a, transform: `scale(${pop})`, fontFamily, fontWeight: 700, fontSize: 68, lineHeight: 1.45, textAlign: 'center', whiteSpace: 'pre-line',
        color: COLOR[cue.who], width: 940, WebkitTextStroke: '10px #000', paintOrder: 'stroke fill', textShadow: '0 6px 24px rgba(0,0,0,0.9)',
      }}>{cue.text}</div>
    </AbsoluteFill>
  );
};
