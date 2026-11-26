import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';

export type CamPose = {x: number; y: number; s: number};
type CamProps = {from: CamPose; to: CamPose; origin?: [number, number]; shake?: number; shakeFrames?: [number, number]; ease?: boolean; children: React.ReactNode};

// Smooth push/pan over the whole scene, optional handheld shake (global or in a frame window).
export const Cam: React.FC<CamProps> = ({from, to, origin = [540, 960], shake = 0, shakeFrames, ease = true, children}) => {
  const f = useCurrentFrame();
  const {durationInFrames: D} = useVideoConfig();
  const p = interpolate(f, [0, D], [0, 1], {easing: ease ? Easing.inOut(Easing.sin) : undefined, extrapolateRight: 'clamp'});
  const lerp = (a: number, b: number) => a + (b - a) * p;
  const active = shakeFrames ? f >= shakeFrames[0] && f <= shakeFrames[1] : true;
  const decay = shakeFrames && active ? 1 - (f - shakeFrames[0]) / (shakeFrames[1] - shakeFrames[0]) : 1;
  const a = shake * (active ? decay : 0);
  const sx = (random(`sx${f}`) - 0.5) * 2 * a, sy = (random(`sy${f}`) - 0.5) * 2 * a;
  return (
    <AbsoluteFill style={{transformOrigin: `${origin[0]}px ${origin[1]}px`, transform: `translate(${lerp(from.x, to.x) + sx}px, ${lerp(from.y, to.y) + sy}px) scale(${lerp(from.s, to.s)})`}}>
      {children}
    </AbsoluteFill>
  );
};

export const Stage: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg viewBox="0 0 1080 1920" width={1080} height={1920} style={{position: 'absolute', inset: 0}}>{children}</svg>
);

export const Vignette: React.FC<{strength?: number; color?: string}> = ({strength = 0.7, color = '0,0,0'}) => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 48%, rgba(${color},0) 38%, rgba(${color},${strength}) 100%)`, pointerEvents: 'none'}} />
);

export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.09}) => {
  const f = useCurrentFrame();
  const seed = Math.floor(f / 2);
  return (
    <AbsoluteFill style={{opacity, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <svg width="1080" height="1920"><filter id={`g${seed}`}><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed={seed} /></filter><rect width="1080" height="1920" filter={`url(#g${seed})`} /></svg>
    </AbsoluteFill>
  );
};

// Fade from a colour at the start of a scene.
export const FadeIn: React.FC<{frames?: number; color?: string}> = ({frames = 6, color = '#000'}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: color, opacity: interpolate(f, [0, frames], [1, 0], {extrapolateRight: 'clamp'}), pointerEvents: 'none'}} />;
};

export const Flash: React.FC<{at: number; len?: number; color?: string}> = ({at, len = 8, color = '#fff'}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: color, opacity: interpolate(f, [at, at + 1, at + len], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), pointerEvents: 'none'}} />;
};

// Light flicker: multiplies a darkness overlay opacity.
export const Dark: React.FC<{level: number; flicker?: number; color?: string}> = ({level, flicker = 0, color = '2,4,14'}) => {
  const f = useCurrentFrame();
  const fl = flicker ? (random(`fl${Math.floor(f / 3)}`) > 0.82 ? flicker : 0) : 0;
  return <AbsoluteFill style={{background: `rgba(${color},${Math.min(1, level + fl)})`, pointerEvents: 'none'}} />;
};

export const RainStreaks: React.FC<{x: number; y: number; w: number; h: number; count?: number}> = ({x, y, w, h, count = 46}) => {
  const f = useCurrentFrame();
  return (
    <g>
      {Array.from({length: count}).map((_, i) => {
        const sp = 18 + random(`s${i}`) * 22, len = 40 + random(`l${i}`) * 70;
        const px = x + random(`x${i}`) * w;
        const py = y + ((f * sp + random(`y${i}`) * h * 2) % (h + len)) - len;
        return <line key={i} x1={px} y1={py} x2={px - 6} y2={py + len} stroke="rgba(190,215,255,0.55)" strokeWidth={3} strokeLinecap="round" />;
      })}
    </g>
  );
};

export const Phone: React.FC<{x: number; y: number; rot?: number; scale?: number; lit?: boolean; cracked?: boolean; label?: string; labelColor?: string}> = ({x, y, rot = 0, scale = 1, lit = true, cracked, label, labelColor = '#fff'}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    {lit && <ellipse cx={0} cy={0} rx={150} ry={190} fill="rgba(111,211,255,0.16)" />}
    <rect x={-48} y={-90} width={96} height={180} rx={16} fill="#0c0c11" />
    <rect x={-41} y={-82} width={82} height={164} rx={10} fill={lit ? '#2aa7e6' : '#101018'} />
    {label && <text x={0} y={6} textAnchor="middle" fontSize={22} fontWeight={700} fill={labelColor} fontFamily="sans-serif">{label}</text>}
    {cracked && <path d="M-41,-30 L-8,-6 L12,-38 L-2,8 L36,30 M-8,-6 L-20,52 M12,-38 L41,-60 M-2,8 L8,70" stroke="#fff" strokeWidth={2.2} fill="none" opacity={0.9} />}
  </g>
);
