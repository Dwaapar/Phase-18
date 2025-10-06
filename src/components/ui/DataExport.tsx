import React, { useState } from 'react';
import { Download, FileText, Table, Code } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ExportFormat {
  type: 'csv' | 'json' | 'pdf' | 'excel';
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface DataExportProps {
  data: any[];
  filename?: string;
  formats?: ExportFormat[];
  onExport?: (data: any[], format: string) => void;
  className?: string;
}

const defaultFormats: ExportFormat[] = [
  {
    type: 'csv',
    label: 'CSV',
    icon: <Table size={16} />,
    description: 'Comma-separated values for spreadsheets'
  },
  {
    type: 'json',
    label: 'JSON',
    icon: <Code size={16} />,
    description: 'JavaScript Object Notation for developers'
  },
  {
    type: 'pdf',
    label: 'PDF',
    icon: <FileText size={16} />,
    description: 'Portable Document Format for sharing'
  }
];

export const DataExport: React.FC<DataExportProps> = ({
  data,
  filename = 'export',
  formats = defaultFormats,
  onExport,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string>('csv');

  const handleExport = (format: string) => {
    if (onExport) {
      onExport(data, format);
    } else {
      // Default export implementation
      switch (format) {
        case 'csv':
          exportToCsv(data, filename);
          break;
        case 'json':
          exportToJson(data, filename);
          break;
        default:
          console.warn(`Export format ${format} not implemented`);
      }
    }
    setIsOpen(false);
  };

  const exportToCsv = (data: any[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');
    
    downloadFile(csvContent, `${filename}.csv`, 'text/csv');
  };

  const exportToJson = (data: any[], filename: string) => {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, `${filename}.json`, 'application/json');
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-monks-black text-white rounded-full hover:bg-monks-accent transition-all duration-300"
      >
        <Download size={16} />
        Export ({data.length})
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-elevated border border-monks-gray/10 p-4 z-50">
          <h3 className="font-semibold text-monks-black mb-4">Export Data</h3>
          
          <div className="space-y-3 mb-6">
            {formats.map((format) => (
              <label
                key={format.type}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-300',
                  selectedFormat === format.type
                    ? 'bg-monks-accent/10 border-2 border-monks-accent'
                    : 'bg-monks-light-gray hover:bg-monks-gray/10 border-2 border-transparent'
                )}
              >
                <input
                  type="radio"
                  name="exportFormat"
                  value={format.type}
                  checked={selectedFormat === format.type}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="sr-only"
                />
                
                <div className="flex-shrink-0 text-monks-accent">
                  {format.icon}
                </div>
                
                <div className="flex-1">
                  <div className="font-medium text-monks-black">{format.label}</div>
                  <div className="text-sm text-monks-gray">{format.description}</div>
                </div>
              </label>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExport(selectedFormat)}
              className="flex-1 bg-monks-accent text-white px-4 py-3 rounded-full font-medium hover:bg-monks-hover transition-all duration-300"
            >
              Export {selectedFormat.toUpperCase()}
            </button>
            
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-monks-gray hover:text-monks-black transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};