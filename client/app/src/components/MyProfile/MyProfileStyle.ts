export const MyProfileStyle = {
  loadingRoot: 'flex items-center justify-center min-h-screen',
  loadingText: 'text-slate-600',

  page:
    'mx-auto flex w-full max-w-4xl min-h-full flex-1 flex-col bg-white p-4 pb-20 sm:p-6 sm:pb-24 md:p-10 md:pb-28',

  fieldsBlock: 'mb-12 sm:mb-20 md:mb-24',
  fieldsStack: 'space-y-12 sm:space-y-16 md:space-y-20',

  skillsStack: 'space-y-12 sm:space-y-16 pb-4 md:pb-6',

  headerRow: `flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 sm:mb-16 md:mb-24 space-y-6 sm:space-y-0 gap-4`,

  headerTitle: 'text-4xl font-extralight text-slate-900',

  headerLogout: `px-6 py-3 rounded-full border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all text-sm sm:text-base ml-auto`,

  headerEdit: `px-6 py-3 rounded-full border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all text-sm sm:text-base`,

  headerEditActions: `flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4`,

  headerSave: `px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all text-sm sm:text-base`,

  headerCancel: `px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 transition-all text-sm sm:text-base`,

  fieldLabel: 'block text-xs uppercase text-slate-400 mb-3 md:mb-4',

  fieldTextarea: `w-full bg-transparent border-b-2 border-gray-100 py-3 md:py-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-extralight focus:outline-none focus:border-slate-900 resize-none`,

  fieldInput: `w-full bg-transparent border-b-2 border-gray-100 py-3 md:py-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight focus:outline-none focus:border-slate-900`,

  displayBase: 'font-extralight text-slate-800 break-words',
  displayBio: 'text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-600',
  displayName: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',

  sectionTitle: 'text-lg sm:text-xl font-light text-slate-800 mb-6 sm:mb-8',

  chipWrap: 'flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4',

  skillChipBase: `inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-sm sm:text-base md:text-lg border`,

  skillChipFilled: 'border-slate-900 bg-slate-900 text-white',

  skillChipOutlined: 'border-gray-100 text-slate-500 bg-white',

  chipText: 'break-words',

  chipRemoveFilled: 'ml-2 sm:ml-3 md:ml-4 text-lg hover:text-red-300',

  chipRemoveOutlined: 'ml-2 sm:ml-3 md:ml-4 text-lg text-red-400 hover:text-red-600',

  skillInputRow: 'flex flex-col sm:flex-row gap-2 sm:gap-3',

  skillInput: `flex-1 px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-slate-900`,

  skillAddBtn: `px-4 py-2 bg-slate-900 text-white rounded-full text-sm hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed`,
} as const;
