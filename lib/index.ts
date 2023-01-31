export type ClassValue = string | false | 0 | null | undefined | ClassValue[];

export type ClassKey = 'className';
export type ClassObj = { className?: ClassValue };

export const cx = (classes: ClassValue[]) => {
	let result = '';

	for (let idx = 0, len = classes.length; idx < len; idx++) {
		let value = classes[idx];

		if (Array.isArray(value)) {
			value = cx(value);
		}

		if (typeof value === 'string' && value) {
			result && (result += ' ');
			result += value;
		}
	}

	return result;
};

const coerceKey = <T extends unknown>(value: T) => {
	return typeof value === 'boolean' ? `${value}` : value === 0 ? '0' : value;
};

type OmitUndefined<T> = T extends undefined ? never : T;
type StringToBoolean<T> = T extends 'true' | 'false' ? boolean : T;

type ConfigSchema = Record<string, Record<string, ClassValue>>;

type ConfigVariants<T extends ConfigSchema> = {
	[Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null;
};
type ConfigVariantsMulti<T extends ConfigSchema> = {
	[Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | StringToBoolean<keyof T[Variant]>[] | null;
};

type Config<T> = T extends ConfigSchema ? {
		variants?: T;
		defaultVariants?: ConfigVariants<T>;
		compoundVariants?: (T extends ConfigSchema ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & ClassObj : ClassObj)[];
	}
	: never;

type Props<T> = T extends ConfigSchema ? ConfigVariants<T> & ClassObj
	: ClassObj;

export type VariantProps<Component extends (...args: any) => any> = Omit<
	OmitUndefined<Parameters<Component>[0]>,
	'className'
>;

export const cv = <T>(base?: ClassValue, config?: Config<T>) => {
	return (props?: Props<T>) => {
		if (!config || !config.variants) {
			return cx([base, props && props.className]);
		}

		const variants = config.variants;
		const defaultVariants = config.defaultVariants;
		const compoundVariants = config.compoundVariants;

		const variantClasses: ClassValue[] = [];
		const compoundVariantClasses: ClassValue[] = [];

		let combinedProps: Record<string, unknown>;

		if (defaultVariants) {
			combinedProps = { ...defaultVariants };

			for (const key in props) {
				const value = props[key];

				if (value === undefined) {
					continue;
				}

				combinedProps[key] = value;
			}
		}
		else {
			combinedProps = props as any || {};
		}

		for (const variant in variants) {
			const variantProp = combinedProps[variant as keyof typeof props];

			if (variantProp === null) {
				continue;
			}

			const variantKey = coerceKey(variantProp) as keyof typeof variants[typeof variant];
			const variantClass = variants[variant][variantKey];

			// NOTE: adding a conditional before pushing to array only improves
			// cases where there is no default variants or compound variants.
			variantClasses.push(variantClass);
		}

		if (compoundVariants) {
			loop:
			for (let idx = 0, len = compoundVariants.length; idx < len; idx++) {
				const compoundOptions = compoundVariants[idx];

				for (const key in compoundOptions) {
					if (key === 'className') {
						continue;
					}

					const match = compoundOptions[key];
					const value = combinedProps[key];

					if (Array.isArray(match)) {
						if (!match.includes(value)) {
							continue loop;
						}
					}
					else if (match !== value) {
						continue loop;
					}
				}

				compoundVariantClasses.push(compoundOptions.className);
			}
		}

		return cx([
			base,
			variantClasses,
			compoundVariantClasses,
			props && props.className,
		]);
	};
};
