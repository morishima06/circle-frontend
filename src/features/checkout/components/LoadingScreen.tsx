import { Loader } from "@/components/ui/Loader";

type Props = {
  message?: string;
};

export const LoadingScreen = ({ message }: Props) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <Loader size="md" />
      {message && (
        <p className="mt-4 text-center text-sm font-bold">{message}</p>
      )}
    </div>
  );
};
