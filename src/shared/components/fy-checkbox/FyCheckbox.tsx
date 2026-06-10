import { ComponentProps } from "react";

type FyCheckboxProps = Omit<ComponentProps<"input">, "type"> & {
    label?: string;
};

export default function FyCheckbox({
    id,
    label,
    className = "",
    ...inputProps
}: Readonly<FyCheckboxProps>) {
    const checkbox = (
        <input
            {...inputProps}
            id={id}
            type="checkbox"
            className={`h-4 w-4 rounded border-gray-600 bg-mauve-900 text-primary ${className}`}
        />
    );

    if (!label) {
        return checkbox;
    }

    return (
        <label htmlFor={id} className="flex items-center gap-2 text-white">
            {checkbox}
            <span>{label}</span>
        </label>
    );
}
