export const SwipeCardStyle = {
  card: `absolute inset-0 h-full w-full bg-white rounded-[3rem] border border-gray-100 shadow-2xl cursor-grab active:cursor-grabbing flex flex-col overflow-hidden`,

  skillsAbove:
    'flex-shrink-0 px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-3 flex flex-col gap-2 bg-white border-b border-gray-100',

  mediaWrap: 'relative flex-1 min-h-0 bg-gray-50 overflow-hidden',

  avatar: 'w-full h-full object-cover select-none grayscale-[20%] contrast-[1.1]',

  tagRow: 'flex flex-wrap gap-2',

  tagKnow: `px-4 py-2 rounded-full bg-slate-900 text-white text-[10px] uppercase tracking-widest font-bold shadow-lg`,

  tagWant: `px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-[10px] uppercase tracking-widest font-bold shadow-sm`,

  body: 'p-6 sm:p-8 flex flex-col flex-shrink-0 bg-white justify-between lg:p-7 xl:p-8',

  name: 'text-3xl font-extralight text-slate-900 tracking-tighter mb-2 sm:text-4xl lg:text-4xl',

  bio: 'text-base font-light text-slate-400 leading-tight italic sm:text-lg lg:text-lg',
} as const;
