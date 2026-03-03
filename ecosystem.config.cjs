module.exports = {
  apps: [
    {
      name: 'sanjai-portfolio',
      script: 'node_modules/.bin/serve',
      args: '-s dist -l 3000',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
