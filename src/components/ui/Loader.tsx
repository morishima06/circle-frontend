type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "h-5 w-5 border-1",
  md: "h-6 w-6 border-2",
  lg: "h-12 w-12 border-4",
};

export const Loader = ({ size = "md", className = "" }: Props) => {
  return (
    <div
      className={`animate-spin rounded-full border-black border-t-transparent ${sizeMap[size]} ${className} `}
    />
  );
};
