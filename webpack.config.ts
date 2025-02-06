import { EsbuildPlugin } from 'esbuild-loader';
import path from 'node:path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';
import ZipPlugin from 'zip-webpack-plugin';

import project from './package.json';
import tsconfig from './tsconfig.json';

export default function bundle() {
  const projectRoot = __dirname || process.cwd();
  const sourcesRoot = path.join(projectRoot, 'src');
  const destination = path.join(projectRoot, 'dist');

  const { name } = project;

  const {
    compilerOptions: { target },
  } = tsconfig;

  const mainFields = ['module', 'main'];

  const javascriptExtensions = ['.js', '.cjs', '.mjs'];
  const typescriptExtensions = ['.ts', '.cts', '.mts'];
  const extensions = [...javascriptExtensions, ...typescriptExtensions, '.json'];

  return {
    bail: true,
    target: 'async-node',
    mode: 'production',
    entry: [path.join(sourcesRoot, 'main.ts')],
    output: {
      clean: true,
      pathinfo: true,
      path: destination,
      filename: 'index.js',
      chunkFormat: 'module',
      libraryTarget: 'module',
    },
    node: {
      __dirname: true,
      __filename: true,
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.ts$/,
          loader: 'esbuild-loader',
          options: { loader: 'ts', target },
        },
      ],
    },
    resolve: {
      symlinks: true,
      extensions,
      mainFields,
      plugins: [new TsconfigPathsPlugin({ mainFields, extensions })],
    },
    plugins: [
      new EsbuildPlugin({ keepNames: true, treeShaking: true, target }),
      new ZipPlugin({ filename: `${name}.zip` }) as any,
    ],
    experiments: {
      outputModule: true,
      topLevelAwait: true,
    },
  } as const satisfies Configuration;
}
