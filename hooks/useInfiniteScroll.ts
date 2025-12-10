import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook that detects when user scrolls near bottom of element
 * @param callback - Function to call when user scrolls to bottom
 * @param options - Configuration options
 * @returns Ref to attach to scrollable element
 * 
 * @example
 * const loadMore = () => fetchNextPage();
 * const scrollRef = useInfiniteScroll(loadMore, { 
 *   threshold: 200,
 *   hasMore: true,
 *   isLoading: false 
 * });
 * 
 * <div ref={scrollRef}>
 *   {items.map(item => <Item key={item.id} />)}
 * </div>
 */
export function useInfiniteScroll(
    callback: () => void,
    options: {
        threshold?: number;
        hasMore?: boolean;
        isLoading?: boolean;
    } = {}
) {
    const { threshold = 200, hasMore = true, isLoading = false } = options;
    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && hasMore && !isLoading) {
                callback();
            }
        },
        [callback, hasMore, isLoading]
    );

    useEffect(() => {
        if (!sentinelRef.current) return;

        const options = {
            root: null,
            rootMargin: `${threshold}px`,
            threshold: 0.1
        };

        observerRef.current = new IntersectionObserver(handleObserver, options);
        observerRef.current.observe(sentinelRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleObserver, threshold]);

    return sentinelRef;
}