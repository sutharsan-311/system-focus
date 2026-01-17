import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
  title?: string;
}

/**
 * ImageModal component for displaying project images in a lightbox/modal view.
 * 
 * @param isOpen - Controls the visibility of the modal
 * @param onClose - Callback function to close the modal
 * @param imageUrl - URL of the image to display
 * @param alt - Alt text for the image
 * @param title - Optional title to display above the image
 */
export function ImageModal({ isOpen, onClose, imageUrl, alt, title }: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-0 [&>button]:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative"
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2 z-10"
            aria-label="Close image modal"
          >
            <X className="h-6 w-6" />
          </button>
          {title && (
            <h3 className="absolute -top-12 left-0 text-white text-lg font-semibold">
              {title}
            </h3>
          )}
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-auto rounded-lg shadow-2xl"
            loading="lazy"
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
