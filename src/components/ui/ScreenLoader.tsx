import { Loader } from "./Loader";

export const ScreenLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader size="lg" />
    </div>
  );
};
