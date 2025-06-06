module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '6.0.3', // use a versão que preferir, ou a que for compatível
      skipMD5: true,
    },
    instance: {
      dbName: 'jest',
    },
    autoStart: false,
  },
};
