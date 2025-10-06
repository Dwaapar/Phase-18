import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DragDropFile {
  id: string;
  file: File;
  preview?: string;
}

interface DragDropZoneProps {
  onFilesAdded?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in MB
  className?: string;
}

export const DragDropZone: React.FC<DragDropZoneProps> = ({
  onFilesAdded,
  accept,
  multiple = true,
  maxFiles = 10,
  maxSize = 10,
  className
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<DragDropFile[]>([]);

  const processFiles = (fileList: FileList) => {
    const newFiles: DragDropFile[] = [];
    
    Array.from(fileList).forEach((file) => {
      if (files.length + newFiles.length >= maxFiles) return;
      if (file.size > maxSize * 1024 * 1024) return;
      
      const dragDropFile: DragDropFile = {
        id: Math.random().toString(36).substr(2, 9),
        file
      };
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          dragDropFile.preview = e.target?.result as string;
          setFiles(prev => [...prev]);
        };
        reader.readAsDataURL(file);
      }
      
      newFiles.push(dragDropFile);
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    onFilesAdded?.(newFiles.map(f => f.file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drop Zone */}
      <div
        className={cn(
          'border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300',
          isDragOver
            ? 'border-monks-accent bg-monks-accent/5 scale-105'
            : 'border-monks-gray/30 hover:border-monks-accent hover:bg-monks-accent/5'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload size={48} className="text-monks-gray mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-monks-black mb-2">
          Drop files here
        </h3>
        <p className="text-monks-gray mb-4">
          or click to browse from your computer
        </p>
        
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        
        <label
          htmlFor="file-upload"
          className="inline-flex items-center gap-2 bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 cursor-pointer"
        >
          Choose Files
        </label>
        
        <div className="mt-4 text-sm text-monks-gray">
          <p>Maximum {maxFiles} files, {maxSize}MB each</p>
          {accept && <p>Accepted: {accept}</p>}
        </div>
      </div>
      
      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-monks-black">
            Uploaded Files ({files.length})
          </h4>
          
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {files.map((dragDropFile) => (
              <div
                key={dragDropFile.id}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-monks-gray/10"
              >
                {dragDropFile.preview ? (
                  <img
                    src={dragDropFile.preview}
                    alt={dragDropFile.file.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-12 h-12 bg-monks-accent/10 rounded-lg flex items-center justify-center">
                    <File size={20} className="text-monks-accent" />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-monks-black truncate">
                    {dragDropFile.file.name}
                  </p>
                  <p className="text-sm text-monks-gray">
                    {(dragDropFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                
                <button
                  onClick={() => removeFile(dragDropFile.id)}
                  className="text-monks-gray hover:text-red-500 transition-colors duration-300"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};