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

### Node.js 19.5.0

```
$ pnpm exec vite-node bench.js

cpu: AMD Ryzen 7 5700U with Radeon Graphics
runtime: node v19.5.0 (x64-linux)

benchmark      time (avg)             (min … max)       p75       p99      p995
------------------------------------------------- -----------------------------
• paper
------------------------------------------------- -----------------------------
cv         387.86 ns/iter (358.82 ns … 544.75 ns) 391.31 ns 456.23 ns 544.75 ns
cva          4.07 µs/iter     (4.03 µs … 4.18 µs)   4.08 µs   4.18 µs   4.18 µs

summary for paper
  cv
   10.49x faster than cva

• button
------------------------------------------------- -----------------------------
cv          14.28 µs/iter    (11.62 µs … 2.75 ms)  12.92 µs  16.87 µs  19.95 µs
cva         97.19 µs/iter    (81.61 µs … 3.23 ms)  86.01 µs 125.17 µs 141.19 µs

summary for button
  cv
   6.81x faster than cva

• iconButton
------------------------------------------------- -----------------------------
cv           5.83 µs/iter     (5.62 µs … 7.22 µs)    5.8 µs   7.22 µs   7.22 µs
cva         10.38 µs/iter     (9.61 µs … 1.96 ms)   9.94 µs  15.32 µs  16.02 µs

summary for iconButton
  cv
   1.78x faster than cva

• tableCell
------------------------------------------------- -----------------------------
cv          187.6 ns/iter (150.04 ns … 260.75 ns) 215.35 ns 245.54 ns 252.17 ns
cva          4.53 µs/iter     (4.48 µs … 4.62 µs)   4.56 µs   4.62 µs   4.62 µs

summary for tableCell
  cv
   24.14x faster than cva
```

### Bun 0.5.3

```
$ bun bench.js

cpu: AMD Ryzen 7 5700U with Radeon Graphics
runtime: bun 0.5.3 (x64-linux)

benchmark      time (avg)             (min … max)       p75       p99      p995
------------------------------------------------- -----------------------------
• paper
------------------------------------------------- -----------------------------
cv         418.86 ns/iter (374.46 ns … 871.25 ns) 427.81 ns 634.77 ns 871.25 ns
cva          1.58 µs/iter     (1.45 µs … 2.37 µs)   1.61 µs   2.37 µs   2.37 µs

summary for paper
  cv
   3.78x faster than cva

• button
------------------------------------------------- -----------------------------
cv           6.46 µs/iter   (5.21 µs … 760.47 µs)   6.34 µs  13.84 µs  17.16 µs
cva         36.02 µs/iter     (30.4 µs … 1.13 ms)   34.7 µs  79.27 µs  98.86 µs

summary for button
  cv
   5.57x faster than cva

• iconButton
------------------------------------------------- -----------------------------
cv            2.6 µs/iter     (2.34 µs … 3.12 µs)   2.65 µs   3.12 µs   3.12 µs
cva          4.85 µs/iter     (4.74 µs … 5.33 µs)   4.87 µs   5.33 µs   5.33 µs

summary for iconButton
  cv
   1.86x faster than cva

• tableCell
------------------------------------------------- -----------------------------
cv         325.52 ns/iter (258.78 ns … 489.63 ns)  338.5 ns 463.07 ns 489.63 ns
cva          1.22 µs/iter     (1.15 µs … 1.61 µs)   1.25 µs   1.61 µs   1.61 µs

summary for tableCell
  cv
   3.76x faster than cva
```
