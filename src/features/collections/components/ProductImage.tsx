import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  imgUrl: string | null;
  alt: string;
}

export const ProductImage = ({ imgUrl, alt = "" }: ProductImageProps) => {
  const [loaded, setLoaded] = useState(false);

  const src = imgUrl || "/images/no_image.png";

  return (
    <>
      {!loaded && <div className="absolute inset-0 bg-gray-100" />}

      <Image
        src={src}
        alt={alt}
        fill
        unoptimized={!imgUrl}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-200 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
};
