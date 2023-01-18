export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3005,
    apiGlobalPrefix: process.env.API_GLOBAL_PREFIX || `/api`,
  },
  jwt: {
    secret: `${process.env.JWT_SECRET}` || 'y@t!n',
    expiresInMin: parseInt(process.env.JWT_EXPIRES_IN, 10) || 30,
  },
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL, 10) || 60,
    limit: parseInt(process.env.THROTTLE_LIMIT, 10) || 20,
  },
  parking: {
    totalSlots: parseInt(process.env.totalSlots, 10) || 5,
  },
});
