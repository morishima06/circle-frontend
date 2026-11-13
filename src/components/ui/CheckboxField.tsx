import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
};

const CheckboxField = <T extends FieldValues>({
  label,
  name,
  register,
}: Props<T>) => {
  return (
    <div className="flex items-center">
      <input
        id={name}
        type="checkbox"
        {...register(name)}
        className="mr-2 h-4 w-4"
      />
      <label className="py-1 text-sm" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
