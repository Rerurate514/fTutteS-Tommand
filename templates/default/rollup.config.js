import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/script.ts',
    output: [
        {
            file: 'dist/bundle.js',
            format: 'umd',
            name: 'MyApp',
            sourcemap: true,
        },
        {
            file: 'dist/bundle.esm.js',
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        typescript(),
        nodeResolve({
            browser: true,
        }),
        commonjs(),
        terser({
            compress: {
                dead_code: true,
                conditionals: true,
                collapse_vars: true,
                reduce_vars: false
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
        }),
    ],
};
