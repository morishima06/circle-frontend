import { useEffect, useRef, useState } from "react";

export const useSearchModal = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = () => setIsFormVisible(true);
  const closeModal = () => setIsFormVisible(false);

  useEffect(() => {
    if (isFormVisible) {
      inputRef.current?.focus();
    }
  }, [isFormVisible]);

  return {
    isFormVisible,
    inputRef,
    openModal,
    closeModal,
  };
};
