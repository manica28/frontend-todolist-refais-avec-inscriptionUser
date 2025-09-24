// Containers
export const modalContainer = `
  fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50
`;

export const modalContent = `
  bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto
`;

// Form inputs
export const inputClass = `
  w-full px-4 py-3 border border-gray-300 rounded-lg 
  focus:outline-none focus:ring-2 focus:ring-purple-500
`;

export const textareaClass = `
  w-full px-4 py-3 border border-gray-300 rounded-lg 
  focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none
`;

export const selectClass = inputClass;

// Buttons
export const buttonPrimary = `
  flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
  hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all
`;

export const buttonSecondary = `
  flex-1 px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors
`;

// Labels
export const labelClass = `
  block text-gray-700 font-medium mb-2
`;

// Delegate info box
export const delegateInfo = `
  mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 rounded text-blue-700 text-sm
`;

// Image preview
export const imagePreview = `
  mt-2 w-full h-32 object-cover rounded-lg
`;

// Debug box
export const debugBox = `
  bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs
`;
