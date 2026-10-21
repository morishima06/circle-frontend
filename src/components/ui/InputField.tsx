import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type Variant = "outline" | "underline";

type Size = "xs" | "sm" | "md" | "lg";

type Height = "xs" | "sm" | "md";

type InputFieldProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  variant?: Variant;
  size?: Size;
  height?: Height;
  inputClassName?: string;

  // 数字入力として正規化するか
  normalizeInteger?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "size">;

const baseInput = "w-full pr-3 bg-transparent focus:outline-none";

const variantStyles: Record<Variant, string> = {
  outline: "border border-gray-300 rounded-sm py-2.5 pl-2 bg-white",
  underline: "border-b border-slate-600 bg-white",
};

const labelStyles: Record<Variant, string> = {
  outline: "text-xs block text-slate-800 mb-2",
  underline: "text-xs block text-slate-800 mb-2",
};

const heightStyles: Record<Height, string> = {
  xs: "h-8",
  sm: "h-10",
  md: "h-12",
};

const sizeStyles: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

// 全角数字を半角数字に変換し、数字以外を削除
const normalizeIntegerValue = (value: string): string => {
  return value
    .replace(/[０-９]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) - 0xfee0),
    )
    .replace(/[^\d]/g, "");
};

export const InputField = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  variant = "outline",
  size = "sm",
  height = "sm",
  inputClassName,
  normalizeInteger = false,
  type = "text",
  ...inputProps
}: InputFieldProps<T>) => {
  const registration = register(name);

  return (
    <div>
      {label && (
        <label htmlFor={name} className={labelStyles[variant]}>
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        {...registration}
        {...inputProps}
        onChange={(event) => {
          const value = normalizeInteger
            ? normalizeIntegerValue(event.target.value)
            : event.target.value;

          event.target.value = value;

          registration.onChange(event);
        }}
        placeholder={inputProps.placeholder ?? label}
        className={` ${baseInput} ${variantStyles[variant]} ${sizeStyles[size]} ${heightStyles[height]} ${
          inputProps.readOnly
            ? "cursor-not-allowed bg-slate-100 text-slate-500"
            : ""
        } ${inputClassName ?? ""} `}
      />

      {error?.message && (
        <p className="mt-1 text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
};
