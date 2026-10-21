// components/ui/FullscreenLoader.tsx

import { Loader } from "./Loader";

export const FullscreenLoader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Loader />
    </div>
  );
};
