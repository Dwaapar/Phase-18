import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AdvancedPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  showItemsPerPage?: boolean;
  showTotalItems?: boolean;
  showFirstLast?: boolean;
  className?: string;
}

export const AdvancedPagination: React.FC<AdvancedPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
  showTotalItems = true,
  showFirstLast = true,
  className
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1 && !showTotalItems) return null;

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {/* Items Info */}
      {showTotalItems && (
        <div className="text-sm text-monks-gray">
          Showing {startItem} to {endItem} of {totalItems} results
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          {/* First Page */}
          {showFirstLast && (
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-monks-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              title="First page"
            >
              <ChevronsLeft size={16} />
            </button>
          )}

          {/* Previous Page */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-monks-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            title="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page Numbers */}
          {getVisiblePages().map((page, i) => (
            <button
              key={i}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={cn(
                'w-10 h-10 rounded-full font-medium transition-all duration-300',
                page === currentPage
                  ? 'bg-monks-accent text-white'
                  : page === '...'
                  ? 'cursor-default text-monks-gray'
                  : 'hover:bg-monks-light-gray text-monks-black'
              )}
            >
              {page}
            </button>
          ))}

          {/* Next Page */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-monks-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            title="Next page"
          >
            <ChevronRight size={16} />
          </button>

          {/* Last Page */}
          {showFirstLast && (
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-monks-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              title="Last page"
            >
              <ChevronsRight size={16} />
            </button>
          )}
        </div>
      )}

      {/* Items Per Page */}
      {showItemsPerPage && onItemsPerPageChange && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-monks-gray">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-1 rounded-lg bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
          >
            {[10, 20, 50, 100].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span className="text-monks-gray">per page</span>
        </div>
      )}
    </div>
  );
};