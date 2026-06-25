export const HomePageStyle = {
  loadingScreen:
    'flex flex-col items-center justify-center min-h-screen bg-white',

  loadingText: 'text-slate-400',

  emptyRoot: 'text-center',

  emptyMessage:
    'text-slate-300 font-light italic text-sm md:text-base',

  emptyRefresh:
    'mt-4 text-xs uppercase tracking-widest text-slate-900 underline underline-offset-8 hover:text-slate-600 transition-colors',

  actionBar:
    'flex w-full shrink-0 justify-center space-x-8 pt-2 pb-6 md:space-x-12 md:pt-3 md:pb-8',

  swipePass:
    'w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-100 flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',

  swipeLike:
    'w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-100 flex items-center justify-center text-green-400 hover:bg-green-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',

  overlayBackdrop:
    'fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl',

  overlayWatermarkWrap:
    'absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none',

  overlayWatermark:
    'text-[20vw] font-black text-gray-50 select-none',

  overlayContent: 'relative z-10 flex flex-col items-center',

  matchKicker:
    'text-sm uppercase tracking-[0.5em] text-slate-400 mb-6',

  matchTitle:
    'text-8xl font-extralight tracking-tighter text-slate-900 mb-12',

  avatarsRow: 'flex -space-x-8 mb-16',

  avatarYou:
    'w-32 h-32 rounded-full border border-slate-900 flex items-center justify-center bg-white text-3xl font-light overflow-hidden',

  avatarYouImg: 'w-full h-full object-cover rounded-full',

  avatarMatch:
    'w-32 h-32 rounded-full border border-slate-900 bg-slate-900 text-white flex items-center justify-center text-3xl font-light overflow-hidden',

  avatarMatchImg: 'w-full h-full object-cover rounded-full',

  matchCopy: 'text-xl font-light text-slate-600 mb-12',

  matchName: 'font-medium text-slate-900',

  matchActions: 'flex flex-col space-y-4 w-64',

  matchDismiss:
    'w-full py-5 text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors',

  feedRoot:
    'flex min-h-0 flex-1 flex-col items-center overflow-hidden bg-white',

  cardColumn:
    'flex min-h-0 w-full flex-1 flex-col items-center justify-center px-3 py-2 sm:px-4',

  cardStage:
    'relative flex h-[min(38rem,100%)] max-h-full w-[min(20rem,calc(100vw-1.25rem))] max-w-full items-center justify-center md:h-[min(31rem,100%)] md:w-[21rem] lg:h-[min(35rem,100%)] lg:w-[24rem] xl:h-[min(36rem,100%)] xl:w-[26rem]',
} as const;
