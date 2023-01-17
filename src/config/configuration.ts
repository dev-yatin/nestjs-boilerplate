export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3005,
    apiGlobalPrefix: process.env.API_GLOBAL_PREFIX || `/api`,
  },
  jwt: {
    secret: `${process.env.JWT_SECRET}` || 'y@t!n',
    expiresInMin: parseInt(process.env.JWT_EXPIRES_IN, 10) || 30,
  },
});
