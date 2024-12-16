import { FC, ReactNode, useRef, useEffect } from 'react';
import { Button } from './button';
import { XIcon } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title = ' ', children }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen && overlayRef.current) {
      overlayRef.current.focus();
      overlayRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (overlayRef.current) {
        overlayRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      tabIndex={-1}
      ref={overlayRef}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-4 bg-white rounded-md shadow-lg dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-center justify-between mb-4 h-9">
          {title}
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-600 dark:text-neutral-400"
            onClick={onClose}
          >
            <XIcon />
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
