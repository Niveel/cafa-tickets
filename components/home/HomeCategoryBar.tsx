"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as FaIcons from 'react-icons/fa';
import { eventCategories } from '@/data/dummy.general';

// Dynamic icon resolver - safely gets any Fa icon
const getIconComponent = (iconName: string): React.ComponentType<{ className?: string }> => {
    // Check if icon exists in react-icons/fa
    const Icon = (FaIcons as any)[iconName];
    
    // Fallback to FaCalendarAlt if icon not found
    return Icon || FaIcons.FaCalendarAlt;
};

const HomeCategoryBar = () => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
    const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Check scroll position to enable/disable navigation buttons
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    // Scroll handler
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newPosition = direction === 'left' 
                ? scrollPosition - scrollAmount 
                : scrollPosition + scrollAmount;
            
            scrollContainerRef.current.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            });
            setScrollPosition(newPosition);
        }
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent, direction: 'left' | 'right') => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scroll(direction);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            checkScrollPosition(); // Initial check
            
            return () => container.removeEventListener('scroll', checkScrollPosition);
        }
    }, []);

    return (
        <section 
            className="relative py-8 sm:py-12 bg-primary border-b border-accent"
            aria-label="Event categories"
        >
            <div className="inner-wrapper px-4">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="big-text-2 font-bold text-white mb-1">
                            Explore Categories
                        </h2>
                        <p className="normal-text text-slate-200">
                            Find events that match your interests
                        </p>
                    </div>

                    {/* Navigation Buttons - Desktop */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={() => scroll('left')}
                            onKeyDown={(e) => handleKeyDown(e, 'left')}
                            disabled={!canScrollLeft}
                            className="w-10 h-10 rounded-full bg-accent text-white hover:bg-accent-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center hover:scale-110 disabled:hover:scale-100"
                            aria-label="Scroll categories left"
                            type="button"
                        >
                            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            onKeyDown={(e) => handleKeyDown(e, 'right')}
                            disabled={!canScrollRight}
                            className="w-10 h-10 rounded-full bg-accent text-white hover:bg-accent-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center hover:scale-110 disabled:hover:scale-100"
                            aria-label="Scroll categories right"
                            type="button"
                        >
                            <ChevronRight className="w-5 h-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                {/* Categories Carousel Container */}
                <div className="relative">
                    {/* Gradient Fade - Left */}
                    {canScrollLeft && (
                        <div 
                            className="hidden md:block absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-primary to-transparent z-10 pointer-events-none"
                            aria-hidden="true"
                        ></div>
                    )}

                    {/* Gradient Fade - Right */}
                    {canScrollRight && (
                        <div 
                            className="hidden md:block absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-primary to-transparent z-10 pointer-events-none"
                            aria-hidden="true"
                        ></div>
                    )}

                    {/* Scrollable Categories - Add padding for hover scale */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 py-2"
                        role="list"
                        aria-label="Event category list"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {eventCategories.map((category, index) => {
                            // Dynamically get the icon component
                            const IconComponent = getIconComponent(category.icon);

                            return (
                                <Link
                                    key={category.id}
                                    href={`/events?category=${category.slug}`}
                                    className="group shrink-0 w-40 sm:w-48"
                                    role="listitem"
                                    aria-label={`Browse ${category.name} events - ${category.event_count} events available`}
                                    style={{
                                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                                    }}
                                >
                                    <article className="relative h-32 sm:h-40 rounded-2xl overflow-hidden border-2 border-accent/20 bg-linear-to-br from-primary-100 to-primary-200 transition-all duration-500 hover:border-accent hover:shadow-2xl hover:scale-105">
                                        {/* Icon Background Circle */}
                                        <div 
                                            className="absolute -top-8 -right-8 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-500"
                                            aria-hidden="true"
                                        ></div>

                                        {/* Content */}
                                        <div className="relative h-full flex flex-col items-start justify-between p-4 sm:p-5">
                                            {/* Icon */}
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-500 border border-accent/30">
                                                <IconComponent 
                                                    className="w-6 h-6 sm:w-7 sm:h-7 text-accent-50 group-hover:text-white transition-colors duration-500" 
                                                    aria-hidden="true"
                                                />
                                            </div>

                                            {/* Text Content */}
                                            <div>
                                                <h3 className="big-text-5 font-bold text-white mb-1 group-hover:text-accent-50 transition-colors duration-300">
                                                    {category.name}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span 
                                                        className="small-text font-semibold text-slate-200 group-hover:text-white transition-colors duration-300"
                                                        aria-label={`${category.event_count} events`}
                                                    >
                                                        {category.event_count} Events
                                                    </span>
                                                    <span 
                                                        className="text-accent-50 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                                                        aria-hidden="true"
                                                    >
                                                        →
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div 
                                            className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-all duration-500"
                                            aria-hidden="true"
                                        ></div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Navigation Hint */}
                    <div className="md:hidden flex justify-center mt-4" aria-hidden="true">
                        <div className="flex gap-1.5">
                            {Array.from({ length: Math.ceil(eventCategories.length / 2) }).map((_, i) => (
                                <div 
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-accent/30"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Scroll Hint */}
                <p className="md:hidden text-center small-text text-slate-300 mt-4" role="status">
                    Swipe to explore more categories
                </p>
            </div>

            {/* Animation Keyframes */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default HomeCategoryBar;