module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', '<rootDir>/jest.setup.js'],
  // Transform some node_modules packages that ship untranspiled ESM/TS source (Expo, react-native libs)
  transformIgnorePatterns: [
    'node_modules/(?!(\@react-native|react-native|@react-navigation|@react-native-firebase|expo|expo-modules-core|@expo)/)'
  ],
  moduleNameMapper: {
    "^@react-native-async-storage/async-storage$": "<rootDir>/__mocks__/async-storage-mock.js"
  }
};