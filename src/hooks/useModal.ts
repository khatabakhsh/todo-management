import { useState } from 'react';

export type UseModal = () => {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useModal: UseModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
  };
};