// next.config.js
const withPlugins = require("next-compose-plugins");
const withAntdLess = require('next-plugin-antd-less');
const withImages = require('next-images');

const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    // {
                    //     key: 'content-security-policy',
                    //     value: csp
                    // },
                    {
                        key: 'cache-control',
                        value: process.env.NODE_ENV === 'production' ? 'public' : ''
                    }
                ]
            },
            {
                source: '/',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    // {
                        // key: 'content-security-policy',
                        // value: csp
                    // },
                    {
                        key: 'cache-control',
                        value: process.env.NODE_ENV === 'production' ? 'public' : ''
                    }
                ]
            },
            {
                source: '/(.*.ico|.*.png|.*.svg|.*.txt|.*.xml)',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    // {
                    //     key: 'content-security-policy',
                    //     value: csp
                    // },
                    {
                        key: 'cache-control',
                        value: process.env.NODE_ENV === 'production' ? 'public' : ''
                    }
                ]
            }

        ]
    },
    async rewrites() {
        return [
            // examples
            {
                source: '/hello',
                destination: '/api/hello',
            },
            {
                source: '/health',
                destination: '/api/health',
            }
        ]
    },
    images: {
        domains: [],
        disableStaticImages: true
    },
    target: 'server',
    api: {
        bodyParser: true
    },
    webpack: function (config, {isServer, dev}) {
        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]'
                }
            }
        })
        return config;
    },
    // css/less specific configs
    cssModules: false,
    cssLoaderOptions: {},
    lessLoaderOptions: {},
    serverRuntimeConfig: {
        // will only be available on the serverside
    },
    publicRuntimeConfig: {
        // will only be available on the clientside
    },
    poweredByHeader: false,
}

module.exports = withPlugins([withAntdLess, withImages], nextConfig);
