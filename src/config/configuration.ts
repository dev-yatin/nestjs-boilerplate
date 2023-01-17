export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3005,
    apiGlobalPrefix: process.env.API_GLOBAL_PREFIX || `/api`,
  },
});
