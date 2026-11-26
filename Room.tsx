import React from 'react';
import {RainStreaks} from './fx';

type Mode = 'night' | 'day';
export const Room: React.FC<{mode?: Mode; rain?: boolean}> = ({mode = 'night', rain = true}) => {
  const night = mode === 'night';
  return (
    <g>
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={night ? '#1b2340' : '#f0d6ae'} /><stop offset="1" stopColor={night ? '#10152b' : '#d9b886'} /></linearGradient>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={night ? '#0a1230' : '#9fd8ff'} /><stop offset="1" stopColor={night ? '#18284f' : '#e4f4ff'} /></linearGradient>
        <clipPath id="win"><rect x={650} y={280} width={320} height={520} /></clipPath>
        <radialGradient id="moon"><stop offset="0" stopColor="#cfe0ff" stopOpacity="0.9" /><stop offset="1" stopColor="#cfe0ff" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width={1080} height={1540} fill="url(#wall)" />
      <rect y={1500} width={1080} height={420} fill={night ? '#0a0d1c' : '#a9794a'} />
      <rect y={1496} width={1080} height={10} fill={night ? '#070a16' : '#7e5632'} />
      {/* window */}
      <rect x={636} y={266} width={348} height={548} rx={8} fill={night ? '#070a16' : '#8a6a44'} />
      <g clipPath="url(#win)">
        <rect x={650} y={280} width={320} height={520} fill="url(#sky)" />
        {night ? <><circle cx={830} cy={400} r={120} fill="url(#moon)" /><circle cx={830} cy={400} r={34} fill="#e6eeff" /></>
               : <><circle cx={860} cy={380} r={50} fill="#fff6c8" /><ellipse cx={740} cy={500} rx={90} ry={26} fill="#fff" opacity={0.85} /></>}
        {night && rain && <RainStreaks x={650} y={280} w={320} h={520} />}
      </g>
      <rect x={806} y={280} width={10} height={520} fill={night ? '#070a16' : '#8a6a44'} />
      <rect x={650} y={528} width={320} height={10} fill={night ? '#070a16' : '#8a6a44'} />
      {/* light spill */}
      {night ? <polygon points="650,800 970,800 900,1500 330,1500" fill="rgba(120,160,255,0.06)" />
             : <polygon points="650,800 970,800 760,1500 120,1500" fill="rgba(255,236,170,0.22)" />}
      {/* bed */}
      <rect x={30} y={1110} width={64} height={420} rx={14} fill={night ? '#2a1d1b' : '#6b4a2e'} />
      <rect x={60} y={1290} width={640} height={230} rx={24} fill={night ? '#2a1d1b' : '#6b4a2e'} />
      <rect x={90} y={1250} width={600} height={160} rx={30} fill={night ? '#3a4a7a' : '#d9d2c4'} />
      <ellipse cx={210} cy={1262} rx={110} ry={44} fill={night ? '#c9d2ea' : '#fffaf0'} />
      <ellipse cx={206} cy={1272} rx={62} ry={18} fill={night ? '#a9b3d0' : '#e8dfcc'} />
      <path d="M330,1290 Q500,1230 690,1300 L690,1420 L330,1420Z" fill={night ? '#2c3c6e' : '#c24b3f'} />
      {/* nightstand + lamp */}
      <rect x={730} y={1360} width={200} height={160} rx={10} fill={night ? '#241a18' : '#7a5636'} />
      <rect x={826} y={1296} width={8} height={64} fill="#222" />
      <path d="M790,1296 L870,1296 L850,1230 L810,1230Z" fill={night ? '#6b5a3a' : '#f3d58a'} />
    </g>
  );
};
