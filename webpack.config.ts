import * as path from 'path';
import { Configuration } from 'webpack';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import ZipPlugin from 'zip-webpack-plugin';

import project from './package.json';
import tsconfig from './tsconfig.json';

export default function (): Configuration {
  const projectRoot = __dirname || process.cwd();
  const sourcesRoot = path.join(projectRoot, 'src');
  const destination = path.join(projectRoot, 'dist');

  return {
    bail: true,
    target: 'node',
    mode: 'production',
    entry: [path.join(sourcesRoot, 'app.ts')],
    output: {
      clean: true,
      pathinfo: true,
      path: destination,
      filename: 'index.js',
      chunkFormat: 'module',
      libraryTarget: 'commonjs-module',
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'esbuild-loader',
          options: { loader: 'ts' },
        },
      ],
    },
    resolve: {
      symlinks: true,
      extensions: ['.ts', '.js', '.mjs', '.json'],
      mainFields: ['module', 'main'],
      plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
      new ESBuildMinifyPlugin({ target: tsconfig.compilerOptions.target }),
      new ZipPlugin({ filename: `${project.name}.zip` }) as any,
    ],
  };
}
