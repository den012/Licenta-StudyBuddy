export const SkillSelectorStyle = {
  root: 'flex flex-col items-center bg-white py-2 px-4 selection:bg-gray-100',

  title: 'text-3xl font-light tracking-tight text-slate-800 mb-6',

  skillGrid:
    'flex flex-row flex-wrap justify-center max-w-2xl gap-3 mb-6',

  skillButtonBase:
    'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border',

  skillButtonSelected:
    'bg-slate-900 text-white border-slate-900 shadow-md scale-105',

  skillButtonUnselected:
    'bg-white text-slate-500 border-gray-100 hover:border-gray-300 hover:bg-gray-50',

  customRow: `group flex items-center bg-white p-1 rounded-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 focus-within:border-gray-300`,

  customInput: `bg-transparent pl-6 pr-2 py-2 w-64 outline-none text-slate-600 placeholder:text-gray-300 font-light`,

  customAdd: `bg-slate-900 text-white text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-slate-700 transition-colors`,
} as const;
