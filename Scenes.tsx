import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {Cam, Dark, FadeIn, Flash, Grain, Phone, Stage, Vignette} from './fx';
import {Person} from './characters';
import {Room} from './Room';
import {FPS} from './timing';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const sec = (s: number) => Math.round(s * FPS);
const FONT = "'Noto Sans Bengali', sans-serif";

// 1) Rafi on the phone, night, rain.
export const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const blink = f % 70 > 66;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Cam from={{x: 0, y: 0, s: 1}} to={{x: 0, y: -40, s: 1.14}} origin={[540, 1000]}>
        <Stage><Room mode="night" /><Person who="rafi" x={540} y={1720} scale={1.2} arm="phone" eyes="normal" mouth="flat" blink={blink} /></Stage>
      </Cam>
      <Dark level={0.3} flicker={0.12} /><Vignette /><Grain /><FadeIn frames={12} />
    </AbsoluteFill>
  );
};

// 2) Niloy's panicked call: push into Rafi's face, sound-wave rings from the phone.
export const Call: React.FC = () => {
  const f = useCurrentFrame();
  const eyes = f > 60 ? 'wide' : 'normal';
  const mouth = f > 120 ? 'open' : f > 60 ? 'small' : 'flat';
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Cam from={{x: 0, y: 0, s: 1.14}} to={{x: -40, y: 70, s: 2.5}} origin={[560, 960]} shake={f > 90 ? 3 : 1.2}>
        <Stage>
          <Room mode="night" />
          {[0, 1, 2].map((i) => {
            const t = ((f + i * 14) % 42) / 42;
            return <circle key={i} cx={690} cy={990} r={40 + t * 260} fill="none" stroke="#6fd3ff" strokeWidth={5} opacity={(1 - t) * 0.6} />;
          })}
          <Person who="rafi" x={540} y={1720} scale={1.2} arm="phone" eyes={eyes} mouth={mouth} glow={1} blink={f % 80 > 76 && eyes === 'normal'} />
        </Stage>
      </Cam>
      <Dark level={0.32} flicker={0.14} /><Vignette strength={0.85} /><Grain /><FadeIn frames={4} />
    </AbsoluteFill>
  );
};

// 3) Phone falls and cracks; hit lands at ~0.33s.
export const Drop: React.FC = () => {
  const f = useCurrentFrame();
  const IMPACT = 10;
  const fall = interpolate(f, [0, IMPACT], [0, 1], {easing: Easing.in(Easing.quad), ...clamp});
  const bounce = f > IMPACT ? Math.abs(Math.sin((f - IMPACT) * 0.5)) * Math.max(0, 1 - (f - IMPACT) / 14) * 46 : 0;
  const py = 984 + fall * 650 - bounce;
  const rot = fall * 110 + (f > IMPACT ? Math.min(f - IMPACT, 8) * 3 : 0);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Cam from={{x: 0, y: 0, s: 1.05}} to={{x: 0, y: -30, s: 1.22}} origin={[540, 1300]} shake={26} shakeFrames={[IMPACT, IMPACT + 12]}>
        <Stage>
          <Room mode="night" />
          <Person who="rafi" x={540} y={1720} scale={1.2} arm={f < 2 ? 'phone' : 'down'} eyes="wide" mouth="open" />
          <Phone x={683 - fall * 20} y={py} rot={rot} lit={f < IMPACT + 18 || f % 6 < 4} cracked={f > IMPACT} />
        </Stage>
      </Cam>
      <Dark level={interpolate(f, [IMPACT, 60], [0.3, 0.55], clamp)} flicker={0.2} /><Vignette /><Grain /><Flash at={IMPACT} len={6} />
    </AbsoluteFill>
  );
};

// 4) Rafi turns toward the bed; camera pans across.
export const Look: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Cam from={{x: 0, y: 0, s: 1.1}} to={{x: 260, y: -60, s: 1.45}} origin={[540, 1300]}>
        <Stage>
          <Room mode="night" />
          <Person who="rafi" x={800} y={1720} scale={1.2} flip arm="down" eyes="wide" mouth="small" tilt={Math.sin(f / 6) * 0.8} />
          <Phone x={560} y={1690} rot={95} lit={false} cracked scale={0.8} />
        </Stage>
      </Cam>
      <Dark level={0.5} flicker={0.2} /><Vignette strength={0.85} /><Grain /><FadeIn frames={4} />
    </AbsoluteFill>
  );
};

// 5) The empty bed. Heartbeat pulse on the vignette.
export const Empty: React.FC = () => {
  const f = useCurrentFrame();
  const beat = Math.max(0, Math.sin(f * 0.42)) ** 6;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Cam from={{x: 0, y: 0, s: 1.3}} to={{x: 120, y: -80, s: 2.0}} origin={[330, 1330]} shake={0.8}>
        <Stage><Room mode="night" /><ellipse cx={330} cy={1330} rx={150} ry={30} fill="rgba(0,0,0,0.25)" /></Stage>
      </Cam>
      <Dark level={0.5} flicker={0.18} /><Vignette strength={0.8 + beat * 0.2} color="40,0,0" /><Grain /><FadeIn frames={4} />
    </AbsoluteFill>
  );
};

// 6) Shadow figure emerges in the corner. Red eyes, then the grin (when the narrator says "হাসতে").
export const ShadowCorner: React.FC = () => {
  const f = useCurrentFrame();
  const appear = interpolate(f, [8, 40], [0, 1], clamp);
  const eyes = f > 52 ? 'red' : 'normal';
  const mouth = f > sec(19.74 - 16.14) ? 'grin' : 'flat';
  const sway = Math.sin(f / 18) * 2;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Cam from={{x: 0, y: 0, s: 1}} to={{x: -140, y: -120, s: 1.55}} origin={[900, 1100]} shake={f > 108 ? 2.2 : 0.8}>
        <Stage>
          <Room mode="night" />
          <Person who="rafi" x={230} y={1730} scale={0.95} flip arm="up" eyes="wide" mouth="open" tilt={Math.sin(f * 1.3) * 0.7} />
          <Person who="shadow" x={905} y={1700} scale={1.25} eyes={eyes === 'red' ? 'red' : 'normal'} mouth={mouth} opacity={appear} tilt={sway} />
        </Stage>
      </Cam>
      <Dark level={0.55} flicker={0.25} /><Vignette strength={0.9} /><Grain /><FadeIn frames={4} />
    </AbsoluteFill>
  );
};

// 7) Close-up on the shadow face; whisper lines; hits on "ডেকেছি আমি"; flash + laugh at the end.
export const Whisper: React.FC = () => {
  const f = useCurrentFrame();
  const hit = sec(26.26 - 22.17);
  const glitch = (f > hit && f < hit + 40 && random(`gl${f}`) > 0.55) || f > sec(29.3 - 22.17);
  const gx = glitch ? (random(`gx${f}`) - 0.5) * 36 : 0;
  return (
    <AbsoluteFill style={{background: '#0a0204'}}>
      <Cam from={{x: 0, y: 0, s: 1}} to={{x: 0, y: 30, s: 1.35}} origin={[540, 820]} shake={f > hit ? 5 : 1.5}>
        <Stage>
          <g opacity={0.4} style={{filter: 'blur(14px)'}}><Room mode="night" /></g>
          <g transform={`translate(${gx} 0)`}>
            <Person who="shadow" x={540} y={2520} scale={2.8} eyes="red" mouth="grin" tilt={Math.sin(f / 14) * 1.5} />
          </g>
          {glitch && <rect x={0} y={400 + random(`gy${f}`) * 900} width={1080} height={14} fill="rgba(255,20,50,0.5)" />}
        </Stage>
      </Cam>
      <Dark level={0.35} color="20,0,4" flicker={0.3} /><Vignette strength={0.95} color="30,0,0" /><Grain opacity={0.14} />
      <Flash at={sec(29.3 - 22.17)} len={10} />
    </AbsoluteFill>
  );
};

// 8) Next morning: bright room, Rafi's cracked phone, Niloy looking at it; mood drains at "কিন্তু রাফিকে…".
export const Morning: React.FC = () => {
  const f = useCurrentFrame();
  const drain = interpolate(f, [sec(34.63 - 30.36) - 6, sec(34.63 - 30.36) + 24], [1, 0.22], clamp);
  return (
    <AbsoluteFill style={{background: '#000', filter: `saturate(${drain}) brightness(${0.55 + drain * 0.45})`}}>
      <Cam from={{x: 0, y: 0, s: 1}} to={{x: -60, y: -40, s: 1.55}} origin={[780, 1380]}>
        <Stage>
          <Room mode="day" />
          <Person who="niloy" x={400} y={1730} scale={1.15} eyes="down" mouth="flat" tilt={Math.sin(f / 30) * 0.6} />
          <Phone x={830} y={1325} rot={-8} scale={0.6} lit cracked />
        </Stage>
      </Cam>
      <Vignette strength={0.45} /><Grain opacity={0.06} /><FadeIn frames={14} color="#fff" />
    </AbsoluteFill>
  );
};

// 9) Night. Bedside clock reads 12:45; Niloy's phone starts to vibrate on "কল আসে".
export const Mystery: React.FC = () => {
  const f = useCurrentFrame();
  const ring = f >= sec(45.75 - 38.37);
  const shake = ring ? (random(`v${f}`) - 0.5) * 7 : 0;
  const eyesIn = interpolate(f, [90, 130], [0, 0.9], clamp);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Cam from={{x: 0, y: 0, s: 1}} to={{x: -80, y: -60, s: 2.25}} origin={[800, 1400]}>
        <Stage>
          <Room mode="night" />
          <g opacity={eyesIn}>
            <ellipse cx={150} cy={880} rx={16} ry={10} fill="#ff1030" style={{filter: 'drop-shadow(0 0 12px #ff1030)'}} />
            <ellipse cx={204} cy={880} rx={16} ry={10} fill="#ff1030" style={{filter: 'drop-shadow(0 0 12px #ff1030)'}} />
          </g>
          {/* clock */}
          <rect x={756} y={1316} width={110} height={44} rx={6} fill="#050505" />
          <text x={811} y={1350} textAnchor="middle" fontSize={34} fontFamily="monospace" fontWeight={700} fill="#ff2a2a" style={{filter: 'drop-shadow(0 0 8px #ff2a2a)'}}>12:{f % 60 < 52 ? '45' : '45'}</text>
          <Phone x={900 + shake} y={1330 + shake} rot={-6} scale={0.5} lit={ring} label={ring ? 'রাফি' : undefined} labelColor="#fff" />
        </Stage>
      </Cam>
      <Dark level={0.55} flicker={0.15} /><Vignette strength={0.9} /><Grain /><FadeIn frames={8} />
    </AbsoluteFill>
  );
};

// 10) Incoming-call screen; the name glitches red on the last word.
export const Caller: React.FC = () => {
  const f = useCurrentFrame();
  const {durationInFrames: D} = useVideoConfig();
  const nameAt = sec(49.89 - 48.44);
  const g = f >= nameAt && f < nameAt + 10;
  const dx = g ? (random(`n${f}`) - 0.5) * 24 : 0;
  const scale = interpolate(f, [0, D], [1, 1.12], clamp);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(#0b0f1d,#020308)', alignItems: 'center', justifyContent: 'center', fontFamily: FONT}}>
      <div style={{transform: `scale(${scale})`, textAlign: 'center', color: '#fff', width: 900}}>
        <div style={{fontSize: 44, opacity: 0.6, letterSpacing: 4}}>Incoming call · 12:45 AM</div>
        <div style={{margin: '70px auto', width: 300, height: 300, borderRadius: 150, background: '#1a1f33', boxShadow: '0 0 90px rgba(255,20,50,0.35)'}} />
        <div style={{fontSize: 150, fontWeight: 700, color: f >= nameAt ? '#ff2a3d' : '#fff', textShadow: g ? `${dx}px 0 #0ff, ${-dx}px 0 #f00` : '0 0 40px rgba(255,40,60,0.6)', transform: `translateX(${dx}px)`, opacity: f >= nameAt ? 1 : 0.0}}>রাফি</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 260, marginTop: 160}}>
          <div style={{width: 150, height: 150, borderRadius: 75, background: '#e5372f'}} />
          <div style={{width: 150, height: 150, borderRadius: 75, background: '#2ecc71', boxShadow: '0 0 0 ' + (f % 30) * 1.5 + 'px rgba(46,204,113,0.2)'}} />
        </div>
      </div>
      <Vignette strength={0.8} /><Grain /><FadeIn frames={4} />
      <AbsoluteFill style={{background: '#000', opacity: interpolate(f, [D - 10, D - 1], [0, 1], clamp)}} />
    </AbsoluteFill>
  );
};
