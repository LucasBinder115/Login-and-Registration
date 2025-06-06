export default {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.mjs'],

  testMatch: ['**/?(*.)+(test|spec).[jt]s?(x)'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'mjs'],
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@shelf/jest-mongodb)',
  ],
  
};