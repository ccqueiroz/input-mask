import resolve from '@rollup/plugin-commonjs';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

import packageJson from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: packageJson.module,
        format: 'es',
        sourcemap: false,
      },
    ],
    external: [
      ...Object.keys(packageJson.dependencies || {}),
      ...Object.keys(packageJson.peerDependencies || {}),
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        jsnext: true,
        extensions,
        moduleDirectories: ['node_modules'],
      }),
      json(),
      commonjs(),
      babel({
        include: ['src/**/*'],
        babelHelpers: 'bundled',
        exclude: ['node_modules/**'],
        extensions,
      }),
      typescript({ tsconfig: './tsconfig.json', exclude: ['**/*.stories.*'] }),
      terser(),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
  },
];
