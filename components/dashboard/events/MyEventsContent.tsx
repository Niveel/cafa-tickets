"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';
import { MyEventsFilters, MyEventsList } from "@/components";
import { MyEvent } from '@/types/dash-events.types';
import { useInfiniteScroll } from '@/hooks';

const MyEventsContent = () => {
    const [events, setEvents] = useState<MyEvent[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Delete modal state
    const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; slug: string; title: string } | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    const [filters, setFilters] = useState({
        status: 'all',
        is_published: 'true',
        category: '',
        search: '',
        sort_by: '-start_date',
    });

    const fetchEvents = useCallback(async (
        currentFilters: typeof filters,
        page: number,
        append: boolean = false
    ) => {
        if (append) {
            setIsLoadingMore(true);
        }
        setError(null);

        try {
            const params = new URLSearchParams();

            if (currentFilters.status !== 'all') params.set('status', currentFilters.status);
            if (currentFilters.is_published !== 'true') params.set('is_published', currentFilters.is_published);
            if (currentFilters.category) params.set('category', currentFilters.category);
            if (currentFilters.search) params.set('search', currentFilters.search);
            if (currentFilters.sort_by !== '-start_date') params.set('sort_by', currentFilters.sort_by);

            params.set('page', page.toString());
            params.set('page_size', '20');

            const response = await fetch(`/api/events/my-events?${params}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch events');
            }

            const data = await response.json();

            if (append) {
                setEvents(prev => [...prev, ...data.results]);
            } else {
                setEvents(data.results);
            }

            setHasMore(!!data.next);
            setCurrentPage(page);

        } catch (err) {
            console.error('Error fetching events:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch events');
        } finally {
            setIsInitialLoad(false);
            setIsLoadingMore(false);
        }
    }, []);

    const handleFilterChange = useCallback((newFilters: typeof filters) => {
        setFilters(newFilters);
        setCurrentPage(1);
        fetchEvents(newFilters, 1, false);
    }, [fetchEvents]);

    const handleLoadMore = useCallback(() => {
        if (!hasMore || isLoadingMore) return;
        fetchEvents(filters, currentPage + 1, true);
    }, [filters, currentPage, hasMore, isLoadingMore, fetchEvents]);

    const scrollRef = useInfiniteScroll(handleLoadMore, {
        threshold: 300,
        hasMore,
        isLoading: isLoadingMore,
    });

    const handleDeleteClick = useCallback((eventId: number, eventSlug: string, eventTitle: string) => {
        console.log('Deleting event in handleDeleteClick:', eventSlug);
        setDeleteConfirm({ id: eventId, slug: eventSlug, title: eventTitle });
        setDeleteError(null);
    }, []);

    const handleDeleteConfirm = useCallback(async () => {
        if (!deleteConfirm) return;

        try {
            setDeleting(true);
            setDeleteError(null);

            console.log('Deleting event:', deleteConfirm.slug);

            const response = await fetch(`/api/dashboard/events/${deleteConfirm.slug}/delete`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.message || data.error || 'Failed to delete event';
                throw new Error(errorMessage);
            }

            console.log('Event deleted successfully');
            
            // Remove from list
            setEvents(prevEvents => prevEvents.filter(event => event.id !== deleteConfirm.id));
            
            // Close modal
            setDeleteConfirm(null);
            setDeleteError(null);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error deleting event:', error.message);
                setDeleteError(error.message);
            } else {
                console.error('Error deleting event:', error);
                setDeleteError('Failed to delete event. Please try again.');
            }
        } finally {
            setDeleting(false);
        }
    }, [deleteConfirm]);

    useEffect(() => {
        fetchEvents(filters, 1, false);
    }, []);

    if (isInitialLoad) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-3 normal-text text-slate-300">Loading your events...</span>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                    <MyEventsFilters onFilterChange={handleFilterChange} />
                </div>

                {/* Events List */}
                <div className="lg:col-span-3">
                    {error && (
                        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <p className="normal-text text-red-400">{error}</p>
                            <button
                                onClick={() => fetchEvents(filters, 1, false)}
                                className="mt-2 text-accent-50 hover:text-accent-100 font-semibold small-text"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    <MyEventsList
                        events={events}
                        onDelete={handleDeleteClick}
                    />

                    {hasMore && <div ref={scrollRef} className="h-10" />}

                    {isLoadingMore && (
                        <div className="flex items-center justify-center py-8">
                            <div className="w-6 h-6 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                            <span className="ml-2 normal-text-2 text-slate-300">Loading more events...</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div 
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-event-title"
                    onClick={(e) => {
                        if (e.target === e.currentTarget && !deleting) {
                            setDeleteConfirm(null);
                            setDeleteError(null);
                        }
                    }}
                >
                    <div className="bg-primary rounded-xl border-2 border-accent/30 p-6 max-w-md w-full animate-fade-in">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
                            </div>
                            <div className="flex-1">
                                <h2 id="delete-event-title" className="big-text-4 font-bold text-red-400 mb-2">
                                    Delete Event?
                                </h2>
                                <p className="normal-text text-slate-300 mb-1">
                                    Are you sure you want to delete <strong className="text-white">&quot;{deleteConfirm.title}&quot;</strong>?
                                </p>
                                <p className="small-text text-slate-400">
                                    This action cannot be undone. All tickets, attendees, and analytics data will be permanently deleted.
                                </p>
                            </div>
                        </div>

                        {deleteError && (
                            <div className="mb-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20" role="alert">
                                <p className="small-text text-red-400">
                                    {deleteError}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleDeleteConfirm}
                                disabled={deleting}
                                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold normal-text-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-400"
                                aria-label="Confirm delete event"
                            >
                                {deleting ? 'Deleting...' : 'Yes, Delete Event'}
                            </button>
                            <button
                                onClick={() => {
                                    setDeleteConfirm(null);
                                    setDeleteError(null);
                                }}
                                disabled={deleting}
                                className="flex-1 px-4 py-3 bg-primary-200 hover:bg-primary-100 text-white rounded-xl font-semibold normal-text-2 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
                                aria-label="Cancel delete"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyEventsContent;