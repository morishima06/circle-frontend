import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export const PerPageSelect = ({
  perPage,
  onChangePerPage,
}: {
  perPage: number;
  onChangePerPage: (value: number) => void;
}) => {
  return (
    <Select
      value={String(perPage)}
      onValueChange={(value) => onChangePerPage(Number(value))}
    >
      <SelectTrigger className="!h-8 w-24 rounded-sm bg-white focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
        <SelectValue placeholder={`${perPage}件`} />
      </SelectTrigger>
      <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
        <SelectItem value="5">5件</SelectItem>
        <SelectItem value="10">10件</SelectItem>
        <SelectItem value="15">15件</SelectItem>
      </SelectContent>
    </Select>
  );
};
