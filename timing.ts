// Everything is locked to Rafi_mp4.mp3 (50.756s). Boundaries come from detected pauses in the voiceover.
export const FPS = 30;
export const AUDIO_SECONDS = 50.755875;
export const TOTAL_FRAMES = Math.ceil(AUDIO_SECONDS * FPS);
export const fr = (s: number) => Math.round(s * FPS);

export type SceneKey = 'intro' | 'call' | 'drop' | 'look' | 'empty' | 'shadow' | 'whisper' | 'morning' | 'mystery' | 'caller';
export const SCENES: Record<SceneKey, [number, number]> = {
  intro: [0, 2.96], call: [2.96, 8.81], drop: [8.81, 11.29], look: [11.29, 14.05], empty: [14.05, 16.14],
  shadow: [16.14, 22.17], whisper: [22.17, 30.36], morning: [30.36, 38.37], mystery: [38.37, 48.44], caller: [48.44, AUDIO_SECONDS],
};

export type Who = 'narr' | 'niloy' | 'shadow';
export type Cue = {s: number; e: number; who: Who; text: string};
// Cue times follow the spoken segments in the audio (not the scaled SRT), so words and picture line up.
export const CUES: Cue[] = [
  {s: 0.0, e: 2.6, who: 'narr', text: 'ওপাশ থেকে নিলয়ের আতঙ্কিত কণ্ঠ—'},
  {s: 2.96, e: 4.45, who: 'niloy', text: '“দোস্ত! তুই কোথায়?'},
  {s: 4.78, e: 6.65, who: 'niloy', text: 'আমি তোকে ৩০ মিনিট ধরে কল করছি!'},
  {s: 7.05, e: 8.2, who: 'niloy', text: 'তাড়াতাড়ি আমার বাসায় আয়!”'},
  {s: 8.81, e: 10.6, who: 'narr', text: 'রাফির হাত থেকে ফোন পড়ে গেল।'},
  {s: 11.29, e: 13.25, who: 'narr', text: 'সে ধীরে ধীরে বিছানার দিকে তাকাল।'},
  {s: 14.05, e: 15.3, who: 'narr', text: 'নিলয় সেখানে নেই।'},
  {s: 16.14, e: 19.4, who: 'narr', text: 'শুধু ঘরের কোণে দাঁড়িয়ে থাকা\nতার মতো দেখতে মানুষটি'},
  {s: 19.74, e: 21.6, who: 'narr', text: 'এবার হাসতে শুরু করল'},
  {s: 22.17, e: 23.5, who: 'narr', text: 'আর ফিসফিস করে বলল—'},
  {s: 24.0, e: 25.55, who: 'shadow', text: '“বন্ধু তোকে ডাকেনি, রাফি...'},
  {s: 26.26, e: 29.4, who: 'shadow', text: 'তোকে ডেকেছি আমি!”'},
  {s: 30.36, e: 34.0, who: 'narr', text: 'পরদিন সকালে নিলয়ের বাড়িতে\nরাফির ফোনটি পাওয়া গেল।'},
  {s: 34.63, e: 37.55, who: 'narr', text: 'কিন্তু রাফিকে আর কখনো\nখুঁজে পাওয়া যায়নি।'},
  {s: 38.37, e: 39.7, who: 'narr', text: 'আর সবচেয়ে অদ্ভুত ব্যাপার?'},
  {s: 40.48, e: 45.4, who: 'narr', text: 'সেই রাতের পর থেকে প্রতিদিন\nঠিক ১২টা ৪৫ মিনিটে'},
  {s: 45.75, e: 47.75, who: 'narr', text: 'নিলয়ের ফোনে একটি কল আসে।'},
  {s: 48.44, e: 50.5, who: 'shadow', text: 'কলারের নাম— রাফি।'},
];
