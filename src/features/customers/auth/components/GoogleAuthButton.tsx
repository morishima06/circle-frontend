import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/Button";
export const GoogleAuthButton = ({ label }: { label: string }) => {
  const BACKEND_URL = "http://localhost:5001";
  const GOOGLE_AUTH_URL = `${BACKEND_URL}/api/v1/auth/google_oauth2`;

  const handleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <Button
      type="button"
      onClick={handleLogin}
      className="flex w-full items-center justify-center border border-gray-300 bg-white text-sm font-semibold text-black hover:bg-gray-100"
    >
      <FcGoogle size={20} />
      {label}
    </Button>
  );
};
