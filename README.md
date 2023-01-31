# cv

Utility for constructing CSS class names based on variants.

Fast, almost drop-in replacement for [`cva`](https://github.com/joe-bell/cva)

```js
import { cv } from '@intrnl/cv';

const button = cv('button', {
	variants: {
		variant: {
			contained: 'button--variant-contained',
			text: 'button--variant-text',
			outlined: 'button--variant-outlined',
		},
		color: {
			primary: '',
			error: '',
		},
		rounded: {
			true: 'button--rounded',
			false: null,
		},
	},
	defaultVariants: {
		variant: 'text',
		rounded: true,
	},
	compoundVariants: [
		{
			variant: 'contained',
			color: 'primary',
			className: 'button--contained-primary',
		},
	],
});
```

## Benchmarks

These benchmark cases are taken from an actual project, your mileage may vary, however.

### Node.js 19.5.0 / V8

```
$ pnpm exec vite-node bench.js

cpu: AMD Ryzen 7 5700U with Radeon Graphics
runtime: node v19.5.0 (x64-linux)

benchmark      time (avg)             (min … max)       p75       p99      p995
------------------------------------------------- -----------------------------
• paper
------------------------------------------------- -----------------------------
cv         276.99 ns/iter (263.84 ns … 497.04 ns) 283.44 ns 411.18 ns 497.04 ns
cva          4.63 µs/iter     (4.58 µs … 4.83 µs)   4.64 µs   4.83 µs   4.83 µs

summary for paper
  cv
   16.72x faster than cva

• button
------------------------------------------------- -----------------------------
cv          16.18 µs/iter    (12.43 µs … 3.46 ms)  14.95 µs  21.58 µs  23.89 µs
cva        114.82 µs/iter    (95.12 µs … 4.17 ms) 104.55 µs 240.32 µs 345.43 µs

summary for button
  cv
   7.1x faster than cva

• iconButton
------------------------------------------------- -----------------------------
cv           6.03 µs/iter     (5.94 µs … 6.34 µs)   6.03 µs   6.34 µs   6.34 µs
cva         15.66 µs/iter      (13.2 µs … 2.8 ms)  15.22 µs  21.44 µs     22 µs

summary for iconButton
  cv
   2.6x faster than cva

• tableCell
------------------------------------------------- -----------------------------
cv         193.23 ns/iter (152.39 ns … 296.48 ns) 231.24 ns 249.35 ns 264.89 ns
cva          5.13 µs/iter     (5.07 µs … 5.23 µs)   5.16 µs   5.23 µs   5.23 µs

summary for tableCell
  cv
   26.55x faster than cva
```

### Bun 0.5.3 / JavaScriptCore

```
$ bun bench.js

cpu: AMD Ryzen 7 5700U with Radeon Graphics
runtime: bun 0.5.3 (x64-linux)

benchmark      time (avg)             (min … max)       p75       p99      p995
------------------------------------------------- -----------------------------
• paper
------------------------------------------------- -----------------------------
cv         224.73 ns/iter  (206.3 ns … 510.17 ns) 219.75 ns  354.1 ns 377.12 ns
cva          1.54 µs/iter     (1.45 µs … 2.32 µs)   1.53 µs   2.32 µs   2.32 µs

summary for paper
  cv
   6.85x faster than cva

• button
------------------------------------------------- -----------------------------
cv           4.79 µs/iter     (4.72 µs … 5.08 µs)   4.78 µs   5.08 µs   5.08 µs
cva         35.95 µs/iter      (31.5 µs … 1.1 ms)  35.69 µs  73.47 µs  78.57 µs

summary for button
  cv
   7.51x faster than cva

• iconButton
------------------------------------------------- -----------------------------
cv           1.84 µs/iter      (1.78 µs … 2.1 µs)   1.85 µs    2.1 µs    2.1 µs
cva          5.84 µs/iter     (5.73 µs … 6.19 µs)   5.94 µs   6.19 µs   6.19 µs

summary for iconButton
  cv
   3.18x faster than cva

• tableCell
------------------------------------------------- -----------------------------
cv         241.61 ns/iter  (222.3 ns … 406.55 ns) 232.96 ns 371.83 ns 383.27 ns
cva          1.04 µs/iter   (988.56 ns … 1.28 µs)   1.05 µs   1.28 µs   1.28 µs

summary for tableCell
  cv
   4.32x faster than cva
```
