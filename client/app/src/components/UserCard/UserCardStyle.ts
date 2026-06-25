export const UserCardStyle = {
  listItem:
    'bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow',

  row: 'flex sm:flex-row items-center justify-center w-full',

  avatarWrap:
    'w-28 h-28 bg-gray-50 flex items-center justify-center flex-shrink-0 rounded-lg overflow-hidden',

  avatarImg: 'w-full h-full object-cover',

  body: 'p-4 flex flex-col flex-grow min-w-0',

  name: 'text-xl font-medium text-slate-800 truncate',

  bio: `text-sm sm:text-base lg:text-xl text-slate-500 mt-1 line-clamp-3 sm:line-clamp-2 break-words`,

  skillsLine: 'text-xl text-slate-400 mt-2',

  skillsLineTight: 'text-xl text-slate-400 mt-0.5',

  skillsLabel: 'font-medium text-slate-500',

  actionLink: `flex items-center justify-center w-11 h-11 rounded-full border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors shrink-0 ml-auto mr-4`,
} as const;
