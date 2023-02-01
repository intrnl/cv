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
cv         271.26 ns/iter (256.93 ns … 539.72 ns) 280.49 ns 507.75 ns 539.72 ns
cva          4.51 µs/iter     (4.43 µs … 4.73 µs)   4.54 µs   4.73 µs   4.73 µs

summary for paper
  cv
   16.64x faster than cva

• button
------------------------------------------------- -----------------------------
cv          14.43 µs/iter    (11.64 µs … 3.95 ms)  13.24 µs  19.02 µs  30.02 µs
cva        112.13 µs/iter    (93.11 µs … 4.14 ms)  98.16 µs 239.55 µs 322.11 µs

summary for button
  cv
   7.77x faster than cva

• iconButton
------------------------------------------------- -----------------------------
cv           5.88 µs/iter     (5.48 µs … 5.98 µs)   5.93 µs   5.98 µs   5.98 µs
cva         14.28 µs/iter     (12.8 µs … 3.92 ms)  13.75 µs  16.46 µs  17.07 µs

summary for iconButton
  cv
   2.43x faster than cva

• tableCell
------------------------------------------------- -----------------------------
cv         114.64 ns/iter  (88.12 ns … 259.32 ns) 163.09 ns 207.77 ns 221.94 ns
cva          5.07 µs/iter     (4.97 µs … 5.17 µs)   5.11 µs   5.17 µs   5.17 µs

summary for tableCell
  cv
   44.22x faster than cva
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
cv         229.81 ns/iter (213.94 ns … 501.96 ns) 226.23 ns 309.87 ns 334.39 ns
cva           1.5 µs/iter     (1.44 µs … 2.28 µs)   1.48 µs   2.28 µs   2.28 µs

summary for paper
  cv
   6.53x faster than cva

• button
------------------------------------------------- -----------------------------
cv           4.47 µs/iter   (4.05 µs … 458.12 µs)   4.51 µs   6.76 µs   7.08 µs
cva         34.69 µs/iter     (30.68 µs … 1.5 ms)  34.58 µs  73.02 µs   77.1 µs

summary for button
  cv
   7.76x faster than cva

• iconButton
------------------------------------------------- -----------------------------
cv           1.81 µs/iter     (1.79 µs … 1.86 µs)   1.83 µs   1.86 µs   1.86 µs
cva          5.75 µs/iter     (5.69 µs … 6.16 µs)   5.74 µs   6.16 µs   6.16 µs

summary for iconButton
  cv
   3.17x faster than cva

• tableCell
------------------------------------------------- -----------------------------
cv         134.43 ns/iter (125.64 ns … 285.45 ns)  131.5 ns 221.18 ns 279.19 ns
cva           1.1 µs/iter     (1.08 µs … 1.27 µs)   1.11 µs   1.27 µs   1.27 µs

summary for tableCell
  cv
   8.22x faster than cva
```
