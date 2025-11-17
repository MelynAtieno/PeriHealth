// Minimal AsyncStorage mock for Jest environments
// Provides the basic async methods used by libraries (getItem/setItem/removeItem/getAllKeys)
module.exports = {
  __INTERNAL_MOCK_STORAGE__: true,
  getItem: async (key) => null,
  setItem: async (key, value) => null,
  removeItem: async (key) => null,
  clear: async () => null,
  getAllKeys: async () => [],
  multiGet: async (keys) => keys.map(k => [k, null]),
  multiSet: async (entries) => null,
  multiRemove: async (keys) => null,
};
