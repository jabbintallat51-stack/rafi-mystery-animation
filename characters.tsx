import React from 'react';

export type Eyes = 'normal' | 'wide' | 'red' | 'down';
export type Mouth = 'flat' | 'open' | 'grin' | 'small';
export type Arm = 'down' | 'phone' | 'up';
type Look = {skin: string; hair: string; shirt: string; pants: string};

export const RAFI: Look = {skin: '#e9b58c', hair: '#17171f', shirt: '#2a8f93', pants: '#2c3556'};
export const NILOY: Look = {skin: '#d99f78', hair: '#3b2519', shirt: '#e0782a', pants: '#3e3e46'};
const SHADOW = '#04040a';

type Props = {
  who: 'rafi' | 'niloy' | 'shadow'; x: number; y: number; scale?: number; flip?: boolean; tilt?: number;
  eyes?: Eyes; mouth?: Mouth; arm?: Arm; opacity?: number; glow?: number; blink?: boolean;
};

// Feet at (x, y). ~640 units tall. Same skeleton for all three so the shadow figure matches Niloy exactly.
export const Person: React.FC<Props> = ({who, x, y, scale = 1, flip, tilt = 0, eyes = 'normal', mouth = 'flat', arm = 'down', opacity = 1, glow = 0, blink}) => {
  const sh = who === 'shadow';
  const L = who === 'rafi' ? RAFI : NILOY;
  const skin = sh ? SHADOW : L.skin, hair = sh ? SHADOW : L.hair, shirt = sh ? SHADOW : L.shirt, pants = sh ? SHADOW : L.pants;
  const ex = eyes === 'wide' ? 1.35 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale}) rotate(${tilt})`} opacity={opacity}
       style={sh ? {filter: 'drop-shadow(0 0 18px rgba(255,0,40,0.35))'} : undefined}>
      <ellipse cx={0} cy={6} rx={150} ry={22} fill="rgba(0,0,0,0.35)" />
      {/* legs */}
      <rect x={-78} y={-270} width={66} height={268} rx={30} fill={pants} />
      <rect x={12} y={-270} width={66} height={268} rx={30} fill={pants} />
      <ellipse cx={-52} cy={-4} rx={52} ry={22} fill={sh ? SHADOW : '#16161b'} />
      <ellipse cx={52} cy={-4} rx={52} ry={22} fill={sh ? SHADOW : '#16161b'} />
      {/* torso */}
      <rect x={-96} y={-500} width={192} height={250} rx={60} fill={shirt} />
      {/* arms */}
      <path d="M-92,-462 Q-130,-380 -118,-262" stroke={shirt} strokeWidth={42} strokeLinecap="round" fill="none" />
      <circle cx={-118} cy={-244} r={26} fill={skin} />
      {arm === 'down' && (<>
        <path d="M92,-462 Q130,-380 118,-262" stroke={shirt} strokeWidth={42} strokeLinecap="round" fill="none" />
        <circle cx={118} cy={-244} r={26} fill={skin} />
      </>)}
      {arm === 'phone' && (<>
        <path d="M92,-462 Q190,-440 150,-560" stroke={shirt} strokeWidth={42} strokeLinecap="round" fill="none" />
        <rect x={98} y={-640} width={42} height={86} rx={10} fill="#0d0d12" />
        <rect x={103} y={-634} width={32} height={72} rx={6} fill="#6fd3ff" opacity={0.8 + glow * 0.2} />
        <circle cx={150} cy={-556} r={24} fill={skin} />
      </>)}
      {arm === 'up' && (<>
        <path d="M92,-462 Q190,-520 170,-640" stroke={shirt} strokeWidth={42} strokeLinecap="round" fill="none" />
        <circle cx={170} cy={-660} r={26} fill={skin} />
      </>)}
      {/* neck + head */}
      <rect x={-26} y={-540} width={52} height={50} fill={skin} />
      <ellipse cx={0} cy={-610} rx={92} ry={100} fill={skin} />
      <ellipse cx={-92} cy={-605} rx={14} ry={24} fill={skin} />
      <ellipse cx={92} cy={-605} rx={14} ry={24} fill={skin} />
      <path d="M-96,-612 Q-100,-724 0,-720 Q100,-724 96,-612 Q60,-668 6,-656 Q-52,-650 -96,-612Z" fill={hair} />
      {/* eyes */}
      {eyes === 'red' ? (<>
        <ellipse cx={-34} cy={-608} rx={20} ry={13} fill="#ff1030" style={{filter: 'drop-shadow(0 0 14px #ff1030)'}} />
        <ellipse cx={34} cy={-608} rx={20} ry={13} fill="#ff1030" style={{filter: 'drop-shadow(0 0 14px #ff1030)'}} />
      </>) : (<>
        <ellipse cx={-34} cy={-606} rx={17 * ex} ry={(blink ? 2 : 20) * ex} fill={sh ? '#222' : '#fff'} />
        <ellipse cx={34} cy={-606} rx={17 * ex} ry={(blink ? 2 : 20) * ex} fill={sh ? '#222' : '#fff'} />
        {!blink && <circle cx={-34} cy={-606 + (eyes === 'down' ? 8 : 0)} r={eyes === 'wide' ? 5 : 8} fill="#111" />}
        {!blink && <circle cx={34} cy={-606 + (eyes === 'down' ? 8 : 0)} r={eyes === 'wide' ? 5 : 8} fill="#111" />}
      </>)}
      <path d={eyes === 'wide' ? 'M-62,-648 L-8,-640 M62,-648 L8,-640' : 'M-60,-640 L-10,-642 M60,-640 L10,-642'} stroke={hair} strokeWidth={8} strokeLinecap="round" />
      {/* mouth */}
      {mouth === 'flat' && <path d="M-22,-556 L22,-556" stroke={sh ? '#222' : '#7a3b2e'} strokeWidth={7} strokeLinecap="round" />}
      {mouth === 'small' && <ellipse cx={0} cy={-554} rx={11} ry={9} fill="#5a1d1d" />}
      {mouth === 'open' && <ellipse cx={0} cy={-548} rx={24} ry={32} fill="#3a0b0b" />}
      {mouth === 'grin' && (<>
        <path d="M-62,-566 Q0,-490 62,-566 Q0,-548 -62,-566Z" fill="#f5f5f5" style={{filter: 'drop-shadow(0 0 6px #fff)'}} />
        <path d="M-62,-566 Q0,-490 62,-566" stroke="#fff" strokeWidth={4} fill="none" />
      </>)}
    </g>
  );
};
