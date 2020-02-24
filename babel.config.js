module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@Components': './src/components',
            '@Screens': './src/screens',
            '@Navigation': './src/navigation',
            '@Utils': './src/utils',
            '@Assets': './assets',
            '@Env': './src/utils/enviroment',
            '@Hooks': './src/hooks'
          }
        }
      ]
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel']
      }
    }
  }
}
