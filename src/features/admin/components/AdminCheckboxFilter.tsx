import { Checkbox } from "@/components/ui/Checkbox";

type CheckboxFilterOption = {
  value: string;
  label: string;
};

type AdminCheckboxFilterProps = {
  label: string;
  options: readonly CheckboxFilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
};

export const AdminCheckboxFilter = ({
  label,
  options,
  selectedValues,
  onChange,
}: AdminCheckboxFilterProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="flex flex-wrap gap-4">
        {options.map((option) => {
          const isChecked = selectedValues.includes(option.value);

          return (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <Checkbox
                className="border-gray-400 bg-white"
                checked={isChecked}
                onCheckedChange={(checked) => {
                  const nextValues = checked
                    ? [...selectedValues, option.value]
                    : selectedValues.filter((value) => value !== option.value);

                  onChange(nextValues);
                }}
              />

              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
};
