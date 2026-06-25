export const SkillsPageStyle = {
  loading: 'flex flex-col items-center justify-center h-screen',

  page:
    'flex flex-col items-center justify-center h-screen bg-white py-20 px-6',

  form:
    'w-full max-w-3xl flex flex-col items-center space-y-24',

  sectionPrimary:
    'w-full animate-in fade-in slide-in-from-bottom-4 duration-700',

  sectionSecondary:
    'w-full animate-in fade-in slide-in-from-bottom-4 duration-1000',

  footer: 'flex flex-col items-center w-full pt-2',

  submitButton: `w-64 py-4 rounded-full bg-slate-900 text-white
    text-xs uppercase tracking-[0.2em] font-semibold
    hover:bg-slate-800 transition-all duration-300
    shadow-sm hover:shadow-xl hover:-translate-y-0.5`,

  logoutWrapper: 'mt-8 opacity-30 hover:opacity-100 transition-opacity',
} as const;
