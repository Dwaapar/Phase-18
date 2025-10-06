import React, { useState, useMemo } from 'react';
import { Pagination } from './Pagination';
import { ChevronDown, ChevronUp, Search, Filter, Download, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

interface AdvancedTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  searchable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  onRowSelect?: (rows: T[]) => void;
  onExport?: (data: T[]) => void;
  className?: string;
}

export function AdvancedTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = true,
  filterable = true,
  exportable = true,
  selectable = false,
  pagination = true,
  pageSize = 10,
  onRowSelect,
  onExport,
  className
}: AdvancedTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchQuery) {
      result = result.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([column, filterValue]) => {
      if (filterValue) {
        result = result.filter(row =>
          String(row[column]).toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    });

    return result;
  }, [data, searchQuery, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(paginatedData.map((_, i) => i)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowSelect = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
    
    const selectedData = Array.from(newSelected).map(i => paginatedData[i]);
    onRowSelect?.(selectedData);
  };

  const handleExport = () => {
    onExport?.(sortedData);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {searchable && (
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-3 text-monks-gray" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
              />
            </div>
          )}
          
          {filterable && (
            <button className="flex items-center gap-2 px-4 py-3 bg-monks-light-gray rounded-2xl hover:bg-monks-gray/10 transition-colors duration-300">
              <Filter size={16} className="text-monks-gray" />
              <span className="text-monks-black">Filters</span>
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {exportable && (
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-3 bg-monks-black text-white rounded-2xl hover:bg-monks-accent transition-all duration-300"
            >
              <Download size={16} />
              Export
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-monks-light-gray">
              <tr>
                {selectable && (
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-monks-gray/30 text-monks-accent focus:ring-monks-accent"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      'px-6 py-4 text-left font-semibold text-monks-black',
                      column.sortable && 'cursor-pointer hover:bg-monks-gray/10',
                      column.width && `w-${column.width}`
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && sortColumn === column.key && (
                        sortDirection === 'asc' ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-monks-gray/10">
              {paginatedData.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    'hover:bg-monks-light-gray/50 transition-colors duration-300',
                    selectedRows.has(i) && 'bg-monks-accent/5'
                  )}
                >
                  {selectable && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(i)}
                        onChange={(e) => handleRowSelect(i, e.target.checked)}
                        className="rounded border-monks-gray/30 text-monks-accent focus:ring-monks-accent"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-6 py-4">
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key])
                      }
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <button className="p-1 text-monks-gray hover:text-monks-black transition-colors duration-300">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {paginatedData.length === 0 && (
          <div className="text-center py-12 text-monks-gray">
            No data found
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-monks-gray">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}