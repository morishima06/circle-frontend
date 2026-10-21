import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";

type Variant = "outline" | "underline";
type Size = "xs" | "sm" | "md" | "lg";

interface Option {
  value: string;
  label: string;
}

const baseSelect = `
  w-full
  bg-transparent
  focus:outline-none
  appearance-none
  bg-white
`;

const variantStyles: Record<Variant, string> = {
  outline: "h-10 border border-gray-300 rounded-sm py-2.5 pl-2",
  underline: "h-10 border-b border-slate-600",
};

const labelStyles: Record<Variant, string> = {
  outline: "text-xs block text-slate-800 mb-2",
  underline: "text-xs block text-slate-800 mb-2",
};

const sizeStyles: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

interface SelectFieldProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  options: readonly Option[];
  error?: { message?: string };
  hideLabel?: boolean;
  variant?: Variant;
  labelStyle?: string;
  size?: Size;
  selectClassName?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const SelectField = <T extends FieldValues>({
  label,
  name,
  register,
  options,
  error,
  hideLabel = false,
  variant = "outline",
  labelStyle,
  size = "sm",
  selectClassName,
  disabled = false,
  placeholder = "選択してください",
}: SelectFieldProps<T>) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={`${hideLabel ? "sr-only" : labelStyles[variant]} ${labelStyle ?? ""}`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={name}
          {...register(name)}
          disabled={disabled}
          className={`${baseSelect} ${variantStyles[variant]} ${sizeStyles[size]} ${
            disabled ? "cursor-not-allowed bg-slate-100 text-slate-500" : ""
          } ${selectClassName ?? ""}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <IoIosArrowDown
          className={`pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 ${
            disabled ? "text-slate-400" : ""
          }`}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
};
