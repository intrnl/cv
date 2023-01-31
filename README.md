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
cv         353.53 ns/iter  (327.8 ns … 632.98 ns) 377.71 ns 532.45 ns 632.98 ns
cva          4.56 µs/iter      (4.5 µs … 5.02 µs)   4.56 µs   5.02 µs   5.02 µs

summary for paper
  cv
   12.9x faster than cva

• button
------------------------------------------------- -----------------------------
cv          14.88 µs/iter     (12.3 µs … 3.65 ms)  13.63 µs  16.73 µs  20.74 µs
cva        107.67 µs/iter    (90.45 µs … 3.53 ms)  95.11 µs 130.94 µs  155.7 µs

summary for button
  cv
   7.23x faster than cva

• iconButton
------------------------------------------------- -----------------------------
cv           6.18 µs/iter       (5.9 µs … 7.8 µs)   6.07 µs    7.8 µs    7.8 µs
cva          11.2 µs/iter     (10.4 µs … 2.18 ms)   10.9 µs  13.79 µs  14.46 µs

summary for iconButton
  cv
   1.81x faster than cva

• tableCell
------------------------------------------------- -----------------------------
cv         186.55 ns/iter (154.18 ns … 257.62 ns) 214.81 ns 228.46 ns 246.94 ns
cva          4.99 µs/iter     (4.92 µs … 5.15 µs)   5.01 µs   5.15 µs   5.15 µs

summary for tableCell
  cv
   26.73x faster than cva
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
cv         332.11 ns/iter (296.11 ns … 944.32 ns) 324.91 ns 592.08 ns 944.32 ns
cva          1.82 µs/iter     (1.32 µs … 2.67 ms)   1.66 µs   5.18 µs   8.31 µs

summary for paper
  cv
   5.49x faster than cva

• button
------------------------------------------------- -----------------------------
cv            5.3 µs/iter   (4.43 µs … 990.56 µs)   5.11 µs   10.9 µs  12.81 µs
cva         36.96 µs/iter    (29.66 µs … 1.37 ms)  35.55 µs  87.18 µs 103.09 µs

summary for button
  cv
   6.98x faster than cva

• iconButton
------------------------------------------------- -----------------------------
cv           1.79 µs/iter     (1.71 µs … 2.08 µs)   1.84 µs   2.08 µs   2.08 µs
cva          4.54 µs/iter     (4.41 µs … 4.81 µs)   4.63 µs   4.81 µs   4.81 µs

summary for iconButton
  cv
   2.54x faster than cva

• tableCell
------------------------------------------------- -----------------------------
cv         235.31 ns/iter (209.63 ns … 447.74 ns)  237.7 ns 396.48 ns 425.62 ns
cva          1.07 µs/iter     (1.01 µs … 1.36 µs)   1.07 µs   1.36 µs   1.36 µs

summary for tableCell
  cv
   4.53x faster than cva
```
