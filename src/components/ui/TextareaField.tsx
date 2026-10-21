import type {
  FieldError,
  FieldPath,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
};

export const TextareaField = <T extends FieldValues>({
  label,
  register,
  name,
  error,
}: Props<T>) => {
  return (
    <div>
      <label className="mb-2 block text-xs text-slate-800">{label}</label>

      <textarea
        {...register(name)}
        rows={4}
        className="w-full rounded-md border border-gray-300 bg-white p-2 text-xs"
      />

      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
};
