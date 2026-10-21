import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

type Image = {
  id?: number;
  signedId?: string;
  url: string;
};

type Props = {
  image: Image;
  onRemove: () => void;
};

export const SortableImage = ({ image, onRemove }: Props) => {
  const imageId = image.id ?? image.signedId;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: imageId ?? "",
    });

  if (!imageId) {
    return null;
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative">
      <div {...listeners} className="cursor-grab">
        <Image
          src={image.url}
          alt=""
          width={224}
          height={112}
          draggable={false}
          className="h-28 w-full rounded border object-cover"
        />
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 rounded bg-black/60 px-2 py-1 text-xs text-white"
      >
        ×
      </button>
    </div>
  );
};
