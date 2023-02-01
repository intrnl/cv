import { bench, group, run } from 'mitata';
import { cva } from 'class-variance-authority';
import { cv } from './lib/index';

const usingCv = createTestSuite(cv);
const usingCva = createTestSuite(cva);

group('paper', () => {
	const paperCv = usingCv.paper;
	const paperCva = usingCva.paper;

	bench('cv', () => {
		paperCv();
		paperCv({ elevation: 1 });
		paperCv({ elevation: 2, contained: true });
	});

	bench('cva', () => {
		paperCva();
		paperCva({ elevation: 1 });
		paperCva({ elevation: 2, contained: true });
	});
});

group('button', () => {
	const buttonCv = usingCv.button;
	const buttonCva = usingCva.button;

	bench('cv', () => {
		buttonCv({ variant: 'outlined', color: 'primary' });
		buttonCv({ variant: 'contained', color: 'primary' });
		buttonCv({ className: 'px-4', rounded: false });

		buttonCv({ variant: 'contained', color: 'error' });

		buttonCv({
			color: 'primary',
			variant: 'contained',
			rounded: false,
			className: [
				'min-h-10 mr-2 shrink-0 !justify-start rounded-r-full pr-4 font-bold',
				'group-[.is-hidden]:hidden',
				'pl-6',
			],
		});

		buttonCv({
			color: 'primary',
			rounded: false,
			className: [
				'min-h-10 mr-2 shrink-0 !justify-start rounded-r-full pr-4 font-bold group-[.is-hidden]:rounded-none',
				'pl-14',
			],
		});

		buttonCv({
			variant: 'contained',
			color: 'primary',
			rounded: false,
			className: [
				'mr-3 h-10 !justify-start rounded-r-full !px-4 font-bold',
				'',
			],
		});

		buttonCv({
			variant: 'text',
			color: undefined,
			rounded: false,
			className: [
				'mr-3 h-10 !justify-start rounded-r-full !px-4 font-bold',
				'text-black/50',
			],
		});

		buttonCv({
			className: [
				'flex-col !items-start text-start',
				'bg-blue-600/10',
			],
		});

		buttonCv({
			className: [
				'flex-col !items-start text-start',
				'',
			],
		});
	});

	bench('cva', () => {
		buttonCva({ variant: 'outlined', color: 'primary' });
		buttonCva({ variant: 'contained', color: 'primary' });
		buttonCva({ className: 'px-4', rounded: false });

		buttonCva({ variant: 'contained', color: 'error' });

		buttonCva({
			color: 'primary',
			variant: 'contained',
			rounded: false,
			className: [
				'min-h-10 mr-2 shrink-0 !justify-start rounded-r-full pr-4 font-bold',
				'group-[.is-hidden]:hidden',
				'pl-6',
			],
		});

		buttonCva({
			color: 'primary',
			rounded: false,
			className: [
				'min-h-10 mr-2 shrink-0 !justify-start rounded-r-full pr-4 font-bold group-[.is-hidden]:rounded-none',
				'pl-14',
			],
		});

		buttonCva({
			variant: 'contained',
			color: 'primary',
			rounded: false,
			className: [
				'mr-3 h-10 !justify-start rounded-r-full !px-4 font-bold',
				'',
			],
		});

		buttonCva({
			variant: 'text',
			color: undefined,
			rounded: false,
			className: [
				'mr-3 h-10 !justify-start rounded-r-full !px-4 font-bold',
				'text-black/50',
			],
		});

		buttonCva({
			className: [
				'flex-col !items-start text-start',
				'bg-blue-600/10',
			],
		});

		buttonCva({
			className: [
				'flex-col !items-start text-start',
				'',
			],
		});
	});
});

group('iconButton', () => {
	const iconButtonCv = usingCv.iconButton;
	const iconButtonCva = usingCva.iconButton;

	bench('cv', () => {
		iconButtonCv();

		iconButtonCv({ edge: 'start' });
		iconButtonCv({ edge: 'end' });

		iconButtonCv({
			color: 'white',
			edge: 'end',
			className: 'absolute right-5 transition group-[.is-hidden]:opacity-0',
		});

		iconButtonCv({ color: 'white', className: 'absolute right-6 -m-3' });

		iconButtonCv({ size: 'small', className: '-my-2' });
	});

	bench('cva', () => {
		iconButtonCva();

		iconButtonCva({ edge: 'start' });
		iconButtonCva({ edge: 'end' });

		iconButtonCva({
			color: 'white',
			edge: 'end',
			className: 'absolute right-5 transition group-[.is-hidden]:opacity-0',
		});

		iconButtonCva({ color: 'white', className: 'absolute right-6 -m-3' });

		iconButtonCva({ size: 'small', className: '-my-2' });
	});
});

group('tableCell', () => {
	const tableCellCv = usingCv.tableCell;
	const tableCellCva = usingCva.tableCell;

	bench('cv', () => {
		tableCellCv();
		tableCellCv({ className: 'text-center' });

		tableCellCv({ className: 'w-48' });
		tableCellCv({ className: 'w-36' });
		tableCellCv({ className: 'w-38' });
		tableCellCv({ className: 'w-24' });
	});
	
	bench('cva', () => {
		tableCellCva();
		tableCellCva({ className: 'text-center' });

		tableCellCva({ className: 'w-48' });
		tableCellCva({ className: 'w-36' });
		tableCellCva({ className: 'w-38' });
		tableCellCva({ className: 'w-24' });
	});
});

await run();

/**
 * @param {typeof cv} cva
 */
function createTestSuite (cva) {
	return {
		paper: cva('rounded bg-white', {
			variants: {
				elevation: {
					0: 'shadow-0',
					1: 'shadow-1',
					2: 'shadow-2',
				},
				contained: {
					true: '[contain:paint]',
				},
			},
		}),
		button: cva(
			'inline-flex min-w-16 items-center justify-center leading-6 transition-colors',
			{
				variants: {
					variant: {
						contained: 'py-1.5 px-4',
						text: [
							'bg-opacity-0 py-1.5 px-2',
							'hover:bg-opacity-5',
							'focus-visible:bg-opacity-25',
							'active:bg-opacity-25',
						],
						outlined: [
							'border border-opacity-50 py-[5.2px] px-[15px]',
							'hover:border-opacity-100 hover:bg-opacity-5',
							'focus-visible:bg-opacity-25 active:bg-opacity-25',
						],
					},
					color: {
						primary: '',
						error: '',
					},
					rounded: {
						true: 'rounded',
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
						className: [
							'bg-primary text-primary-contrast',
							'focus-visible:bg-primary-light',
							'active:bg-primary-dark',
						],
					},
					{
						variant: 'contained',
						color: 'error',
						className: ['bg-red-400 text-white', 'focus-visible:bg-red-300', 'active:bg-red-700'],
					},

					{
						variant: 'text',
						color: undefined,
						className: 'bg-black',
					},
					{
						variant: 'text',
						color: 'primary',
						className: 'bg-primary text-primary',
					},

					{
						variant: 'outlined',
						color: 'primary',
						className: 'border-primary bg-primary bg-opacity-0 text-primary',
					},
				],
			},
		),
		iconButton: cva(
			[
				'inline-flex rounded-full bg-opacity-0 align-middle text-3xl transition-colors',
				'hover:bg-opacity-5',
				'focus-visible:bg-opacity-25',
				'active:bg-opacity-25',
			],
			{
				variants: {
					color: {
						default: 'bg-black text-black/50',
						error: 'bg-red-400 text-red-400',
						white: 'bg-white text-white',
					},
					size: {
						small: 'p-1',
						medium: 'p-3',
					},
					edge: {
						start: '-ml-3',
						end: '-mr-3',
					},
				},
				defaultVariants: {
					color: 'default',
					size: 'medium',
				},
			},
		),
		tableCell: cva('border-b border-black/10 p-4 text-left leading-5'),
	};
}
