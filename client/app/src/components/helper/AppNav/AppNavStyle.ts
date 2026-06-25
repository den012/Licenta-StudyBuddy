export const AppNavStyle = {
  layout:
    'bg-neutral-100 flex flex-col gap-2 items-center h-screen min-h-0 p-2',

  nav: `bg-white border border-gray-400 flex gap-2 items-center justify-between max-w-4xl p-2 rounded-xl shadow-md w-full`,

  title: `absolute  left-1/2 -translate-x-1/2 max-w-[55%] font-extralight text-slate-900 tracking-tighter text-2xl`,

  badgeWrap: 'relative inline-flex',

  unreadBadge: `absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white`,

  main:
    'flex min-h-0 flex-1 flex-col max-w-4xl overflow-auto rounded-xl w-full bg-white',

  navButtonBase: `border flex h-10 items-center justify-center rounded-full transition-colors w-10`,

  navButtonActive: `border-slate-900 bg-slate-900 text-white hover:bg-slate-700 hover:border-slate-700`,

  navButtonInactive: 'border-gray-400 text-gray-700 hover:bg-gray-200',

  navButtonMlAuto: 'ml-auto',
} as const;
