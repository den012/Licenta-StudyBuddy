export const BioPageStyle = {
  page:
    'flex flex-col items-center justify-center min-h-screen bg-white relative p-6 font-sans',

  heading:
    'text-4xl font-light tracking-tight text-slate-900 mb-16 text-center max-w-lg',

  form: 'w-full max-w-xl',

  fieldWrapper: 'relative group',

  textarea: `w-full h-32 py-4 bg-transparent border-b border-gray-100
    text-2xl font-light text-slate-700 placeholder:text-gray-200
    focus:outline-none focus:border-slate-900 transition-colors
    duration-500 resize-none leading-relaxed`,

  footerRow: 'flex justify-between items-center mt-4',

  error: 'text-red-500 text-sm font-medium',

  charCount:
    'text-[10px] uppercase tracking-[0.2em] text-gray-300 font-medium ml-auto',

  submitButton: `mt-12 w-full py-4 rounded-full bg-slate-900 text-white
    text-xs uppercase tracking-[0.2em] font-semibold
    hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-lg
    disabled:opacity-50 disabled:cursor-not-allowed`,

  logoutWrapper:
    'mt-10 opacity-40 hover:opacity-100 transition-opacity duration-300',
} as const;
