import Image from "next/image";
import Link from "next/link";

type Category = {
  name: string;
  imageUrl: string | null;
  alwaysShowText?: boolean;
  path: string;
};

const categories: Category[] = [
  { name: "SALE", imageUrl: null, alwaysShowText: true, path: "/men/sale" },
  { name: "Footwear", imageUrl: "/images/nike.jpg", path: "/men/footwear" },
  {
    name: "Clothing",
    imageUrl: "/images/5bd95980-06ad-4180-a9b2-b10373a1cbee.png",
    path: "/men/clothing",
  },
  {
    name: "Clothing",
    imageUrl: "/images/9f6c79b0-5a1c-4586-bdba-1843c00ed920.png",
    path: "/men/clothing",
  },
  {
    name: "Clothing",
    imageUrl: "/images/acne_c90210_969_1.png",
    path: "/men/clothing",
  },
  {
    name: "Clothing",
    imageUrl: "/images/porter_622_01630_1.png",
    path: "/men/clothing",
  },
];

export const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-3 pt-6">
      {categories.map((category, index) => (
        <Link
          href={category.path}
          key={index}
          className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden"
        >
          {category.imageUrl ? (
            <Image
              src={category.imageUrl || "/images/no_image.png"}
              alt={category.name}
              fill
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-black" />
          )}

          <div
            className={`absolute inset-0 ${category.imageUrl ? "bg-black/40" : "bg-white/10"} opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className={`z-10 text-lg tracking-widest text-white transition-opacity duration-200 ${category.alwaysShowText ? "opacity-100" : "opacity-0 group-hover:opacity-100"} `}
            >
              {category.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
