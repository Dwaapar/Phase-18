import React, { useState } from 'react';
import { ZoomIn, ZoomOut, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt,
  className
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleClose = () => {
    setIsZoomed(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * (zoomLevel - 1) * -100;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * (zoomLevel - 1) * -100;
    
    setPosition({ x, y });
  };

  return (
    <>
      <div className={cn('relative group cursor-zoom-in', className)}>
        <img
          src={src}
          alt={alt}
          onClick={handleImageClick}
          className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl flex items-center justify-center">
          <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="relative max-w-[90vw] max-h-[90vh] overflow-hidden">
            <img
              src={src}
              alt={alt}
              onMouseMove={handleMouseMove}
              className="max-w-full max-h-full object-contain transition-transform duration-300 cursor-move"
              style={{
                transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`
              }}
            />
          </div>
          
          {/* Controls */}
          <div className="absolute top-6 right-6 flex items-center gap-4">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 disabled:opacity-50 transition-all duration-300"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 disabled:opacity-50 transition-all duration-300"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={handleClose}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm">
            Zoom: {Math.round(zoomLevel * 100)}%
          </div>
        </div>
      )}
    </>
  );
};