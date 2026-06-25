export const MatchesPageStyle = {
  loading:
    'flex flex-col items-center justify-center min-h-screen bg-white',

  loadingText: 'text-slate-400',

  shell: 'min-h-screen bg-white px-4 pb-24',

  main: 'max-w-6xl mx-auto pt-6',

  empty:
    'flex flex-col items-center justify-center py-16 text-center',

  emptyText: 'text-slate-400 font-light text-sm md:text-base',

  emptyButton:
    'mt-6 px-4 py-2 text-sm font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors',

  list: 'grid gap-4 sm:grid-cols-2',
} as const;
