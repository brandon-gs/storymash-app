const modules = [
  'react-native',
  '@react-native',
  'react-native-size-matters',
  'react-native-ratings',
  'react-native-elements',
  '@react-native-community/async-storage/lib',
  '@react-native-community',
  '@react-navigation',
  'react-native-vector-icons',
  'react-native-status-bar-height',
  'react-native-timeago',
].join('|');

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [`node_modules/(?!(${modules})/)`],
  setupFiles: ['./__tests__/jestSetupFile'],
  // collectCoverage: true,
  testPathIgnorePatterns: ['__tests__/jestSetupFile.js'],
};
