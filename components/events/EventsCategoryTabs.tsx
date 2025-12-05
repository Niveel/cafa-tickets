"use client";

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as FaIcons from 'react-icons/fa';
import { eventCategories as categories } from '@/data/dummy.general';

interface EventsCategoryTabsProps {
    selectedCategory: string | null;
    onCategorySelect: (slug: string | null) => void;
}

const EventsCategoryTabs = ({ selectedCategory, onCategorySelect }: EventsCategoryTabsProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Get icon component dynamically
    const getIconComponent = (iconName: string) => {
        const Icon = (FaIcons as any)[iconName];
        return Icon || FaIcons.FaCalendarAlt;
    };

    // Check scroll position
    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
    };

    // Scroll handlers
    const scrollLeft = () => {
        scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        checkScroll();
        container.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        return () => {
            container.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    return (
        <section className="relative bg-primary-100 py-6 border-b border-accent/30">
            <div className="inner-wrapper">
                {/* Horizontal Scrollable Tabs */}
                <div className="relative">
                    {/* Left Navigation Button */}
                    {canScrollLeft && (
                        <button
                            onClick={scrollLeft}
                            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-accent text-white items-center justify-center hover:bg-accent-100 transition-all duration-300 shadow-lg"
                            type="button"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="overflow-x-auto scrollbar-hide"
                    >
                        <div className="flex items-center gap-3 min-w-max pb-2">
                            {/* All Categories Tab */}
                            <button
                                onClick={() => onCategorySelect(null)}
                                className={`group shrink-0 px-6 py-3 rounded-xl font-bold normal-text transition-all duration-300 border-2 ${
                                    selectedCategory === null
                                        ? 'bg-accent text-white border-accent'
                                        : 'bg-primary text-slate-200 border-accent/30 hover:border-accent hover:bg-primary-200'
                                }`}
                                type="button"
                                aria-label="Show all categories"
                            >
                                All Events
                            </button>

                            {/* Category Tabs */}
                            {categories.map((category) => {
                                const Icon = getIconComponent(category.icon);
                                const isSelected = selectedCategory === category.slug;

                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => onCategorySelect(category.slug)}
                                        className={`group shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold normal-text-2 transition-all duration-300 border-2 ${
                                            isSelected
                                                ? 'bg-accent text-white border-accent'
                                                : 'bg-primary text-slate-200 border-accent/30 hover:border-accent hover:bg-primary-200'
                                        }`}
                                        type="button"
                                        aria-label={`Filter by ${category.name}`}
                                    >
                                        <Icon 
                                            className={`w-4 h-4 transition-transform duration-300 ${
                                                isSelected ? 'scale-110' : 'group-hover:scale-110'
                                            }`}
                                            aria-hidden="true"
                                        />
                                        <span>{category.name}</span>
                                        {isSelected && (
                                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Navigation Button */}
                    {canScrollRight && (
                        <button
                            onClick={scrollRight}
                            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-accent text-white items-center justify-center hover:bg-accent-100 transition-all duration-300 shadow-lg"
                            type="button"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}

                    {/* Scroll Hint - Mobile */}
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-primary-100 to-transparent pointer-events-none lg:hidden"></div>
                </div>
            </div>

            {/* Hide scrollbar */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default EventsCategoryTabs;