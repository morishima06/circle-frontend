import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  imgUrl: string | null;
  alt: string;
}

export const ProductImage = ({ imgUrl, alt = "" }: ProductImageProps) => {
  const [loaded, setLoaded] = useState(false);

  if (!imgUrl) {
    return (
      <Image
        src="/images/no_image.png"
        alt={alt}
        fill
        unoptimized
        className="object-cover"
      />
    );
  }

  return (
    <>
      {!loaded && <div className="absolute inset-0 bg-gray-100" />}

      <Image
        src={imgUrl}
        alt={alt}
        fill
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-200 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
};
