export const appConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        isGlobal: true,
        envFilePath: '.develop.env',
        ignoreEnvFile: false
      }
  }
}
