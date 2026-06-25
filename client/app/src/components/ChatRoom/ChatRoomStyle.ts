export const ChatRoomStyle = {
  stateScreen: 'flex items-center justify-center h-screen',
  stateText: 'text-gray-500',

  shell: 'flex flex-col h-screen bg-white font-sans selection:bg-gray-100',

  headerBar:
    'bg-white/80 backdrop-blur-md px-4 py-4 border-b border-gray-50 flex flex-col items-center sm:items-start',

  headerTitle:
    'text-2xl font-extralight tracking-tighter text-slate-900',

  messagesArea:
    'flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide',

  emptyWrap: 'text-center mt-8 animate-in fade-in duration-1000',

  emptyText: 'text-lg font-extralight text-slate-300 italic',

  bubbleRow: 'flex w-full',
  bubbleRowMe: 'justify-end',
  bubbleRowThem: 'justify-start',

  bubbleBase: `max-w-[80%] sm:max-w-md px-4 py-3 rounded-2xl transition-all duration-500 shadow-sm`,
  bubbleMe: 'bg-slate-900 text-white rounded-tr-none',
  bubbleThem:
    'bg-white text-slate-700 border border-gray-100 rounded-tl-none',

  messageText: 'text-sm font-light leading-relaxed',

  composerWrap: 'p-4 bg-white',

  form: `max-w-4xl mx-auto flex items-center bg-white p-1 rounded-full border border-gray-100 shadow-sm focus-within:shadow-md focus-within:border-gray-300 transition-all duration-300`,

  input: `flex-1 bg-transparent pl-4 pr-2 py-2 text-base font-light outline-none text-slate-700 placeholder:text-gray-200`,

  sendButton: `bg-slate-900 text-white text-[9px] uppercase tracking-widest font-bold px-6 py-2 rounded-full hover:bg-slate-800 disabled:bg-gray-50 disabled:text-gray-200 transition-all duration-300`,

  formSpacer: 'h-2',
} as const;
