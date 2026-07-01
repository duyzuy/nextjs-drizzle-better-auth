"use client";

import type React from "react";
import { memo, useId } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../base/field";
import { Input } from "../base/input";

export interface RHFTextFieldProps<T extends FieldValues> {
	className?: string;
	label?: React.ReactNode;
	subLabel?: React.ReactNode;
	note?: React.ReactNode;
	placeholder?: string;
	control: Control<T>;
	name: Path<T>;
	required?: boolean;
	disabled?: boolean;
	helpText?: React.ReactNode;
	type?: "text" | "password";
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	size?: "small" | "medium";
}
const RHFTextField = <T extends FieldValues>({
	className,
	control,
	name,
	label,
	subLabel,
	note,
	placeholder,
	required,
}: RHFTextFieldProps<T>) => {
	const fieldId = useId();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<Field>
					<FieldLabel htmlFor={fieldId}>Email</FieldLabel>
					{label ? (
						<FieldLabel htmlFor={fieldId}>
							{label}
							{required ? <span className="ml-1 text-red-600">*</span> : null}
						</FieldLabel>
					) : null}
					<Input
						{...field}
						id={fieldId}
						placeholder="Email"
						autoComplete="email"
						name="email"
						type="text"
					/>
					<FieldError></FieldError>
				</Field>
			)}
		/>
	);
};
export default memo(RHFTextField) as typeof RHFTextField;
