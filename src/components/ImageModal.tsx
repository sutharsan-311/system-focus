import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
  title?: string;
}

/**
 * ImageModal component for displaying project images in a lightbox/modal view.
 * Includes focus management and accessibility features.
 * 
 * @param isOpen - Controls the visibility of the modal
 * @param onClose - Callback function to close the modal
 * @param imageUrl - URL of the image to display
 * @param alt - Alt text for the image
 * @param title - Optional title to display above the image
 */
export function ImageModal({ isOpen, onClose, imageUrl, alt, title }: ImageModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) setImageLoaded(false);
  }, [isOpen, imageUrl]);

  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      // Return focus to the trigger element when modal closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  // Focus trap: prevent tabbing outside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl w-full p-0 bg-transparent border-0 [&>button]:hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "image-modal-title" : undefined}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative"
        >
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2 z-10"
            aria-label="Close image modal"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          {title && (
            <h3 id="image-modal-title" className="absolute -top-12 left-0 text-white text-lg font-semibold">
              {title}
            </h3>
          )}
          <div className="relative min-h-[200px]">
            {!imageLoaded && (
              <Skeleton className="absolute inset-0 w-full h-full min-h-[200px] rounded-lg" />
            )}
            <img
              src={imageUrl}
              alt={alt}
              className="w-full h-auto rounded-lg shadow-2xl"
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
