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
        terser()
    ]
};

export default [cliConfig];
