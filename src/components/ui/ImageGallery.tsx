import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Image {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: Image[];
  className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <>
      <div className={cn('grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4', className)}>
        {images.map((image, i) => (
          <div
            key={i}
            className="aspect-square rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(i)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-white/70 transition-colors duration-300"
          >
            <X size={32} />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-white/70 transition-colors duration-300"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-white/70 transition-colors duration-300"
          >
            <ChevronRight size={32} />
          </button>

          <div className="max-w-4xl max-h-[80vh] mx-auto px-6">
            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="w-full h-full object-contain"
            />
            {images[selectedIndex].caption && (
              <p className="text-white text-center mt-4">
                {images[selectedIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};