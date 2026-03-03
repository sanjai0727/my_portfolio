module.exports = {
    apps: [
        {
            name: 'sanjai-portfolio',
            script: 'serve',
            args: '-s dist -l 3000',
            env: {
                NODE_ENV: 'production',
                PM2_SERVE_PATH: './dist',
                PM2_SERVE_PORT: 3000,
                PM2_SERVE_SPA: 'true',
                PM2_SERVE_HOMEPAGE: '/index.html',
            },
        },
    ],
};
