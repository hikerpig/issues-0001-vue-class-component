import { ConfigOptions } from '@bestminr/build'

export default function({ resolve }: ConfigOptions.getOptionsInject): ConfigOptions.options {
  const BUILD_ASSETROOT = resolve('./dist/build')
  const DEV_TEMPLATE_PATH = resolve('./src/index.template.html')

  return {
    sass: {
      data: '',
    },
    babelrc: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              browsers: ['IE >= 11', 'last 2 versions'],
            },
          },
        ],
      ],
    },
    render: {
      options: {
        basedir: BUILD_ASSETROOT,
        templatePath: DEV_TEMPLATE_PATH,
      },
    },
    webpack: {
      base: {
        output: {
          path: BUILD_ASSETROOT,
          publicPath: '/dist/',
        },
        resolve: {
          alias: {
            src: resolve('src'),
          },
        },
      },
      client: {
        entry: {
          app: ['./src/entry-client.js'],
        },
      },
      server: {
        entry: './src/entry-server.js',
      },
    },
  }
}
