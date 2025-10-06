import React, { useRef, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFileSelect?: (files: File[]) => void;
  label?: string;
  description?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  maxSize = 10,
  onFileSelect,
  label,
  description,
  className
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);
    const validFiles = fileArray.filter(file => {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`);
        return false;
      }
      return true;
    });

    setFiles(multiple ? [...files, ...validFiles] : validFiles);
    onFileSelect?.(validFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileSelect?.(newFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {label && (
        <label className="block text-sm font-medium text-monks-black">
          {label}
        </label>
      )}
      
      <div
        className={cn(
          'border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer',
          isDragOver
            ? 'border-monks-accent bg-monks-accent/5'
            : 'border-monks-gray/30 hover:border-monks-accent hover:bg-monks-accent/5'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={32} className="text-monks-gray mx-auto mb-4" />
        <p className="text-monks-black font-medium mb-2">
          Drop files here or click to browse
        </p>
        {description && (
          <p className="text-sm text-monks-gray">{description}</p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-monks-light-gray rounded-xl">
              <File size={16} className="text-monks-accent" />
              <div className="flex-1">
                <p className="font-medium text-monks-black">{file.name}</p>
                <p className="text-sm text-monks-gray">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => removeFile(i)}
                className="text-monks-gray hover:text-red-500 transition-colors duration-300"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};