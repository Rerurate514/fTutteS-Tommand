import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const nodeExternals = [
    'commander',
    'events',
    'fs',
    'path',
    'util',
];

const cliConfig = {
    input: 'dist/index.js',
    output: {
        file: 'dist/cli.mjs',
        format: 'es',
        sourcemap: true
    },
    external: nodeExternals,
    plugins: [
        typescript({
            tsconfig: './tsconfig.json'
        }),
        nodeResolve({
            preferBuiltins: true,
        }),
        commonjs(),
        terser({
            compress: {
                dead_code: true,
                conditionals: true,
                collapse_vars: true
            },
            mangle: {
                keep_classnames: true,
                keep_fnames: true
            },
            format: {
                comments: false,
                beautify: false
            },
            ecma: 2015
        })
    ]
};

export default [cliConfig];
