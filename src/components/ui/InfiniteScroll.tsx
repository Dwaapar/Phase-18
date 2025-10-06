import React, { useEffect, useRef, useCallback } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface InfiniteScrollProps<T> {
  items: T[];
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  threshold?: number;
}

export function InfiniteScroll<T>({
  items,
  hasMore,
  isLoading,
  onLoadMore,
  renderItem,
  className,
  threshold = 100
}: InfiniteScrollProps<T>) {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [hasMore, isLoading, onLoadMore]);

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: `${threshold}px`
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [handleObserver, threshold]);

  return (
    <div className={className}>
      {items.map(renderItem)}
      
      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-8">
          {isLoading && <LoadingSpinner />}
        </div>
      )}
      
      {!hasMore && items.length > 0 && (
        <div className="text-center py-8 text-monks-gray">
          No more items to load
        </div>
      )}
    </div>
  );
}