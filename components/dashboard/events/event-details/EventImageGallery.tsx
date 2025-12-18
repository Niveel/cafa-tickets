"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn, Image as ImageIcon } from 'lucide-react';

type Props = {
    images: string[];
    eventTitle: string;
};

const EventImageGallery = ({ images, eventTitle }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Filter out empty or invalid images
    const validImages = images.filter(img => img && img.length > 0);

    if (!validImages || validImages.length === 0) {
        return null; // Don't show gallery if no images
    }

    const handlePrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
    }, [validImages.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
    }, [validImages.length]);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

    const handleLightboxPrevious = () => {
        setLightboxIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
    };

    const handleLightboxNext = () => {
        setLightboxIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <div className="space-y-6">
                {/* Section Header */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-purple-400" aria-hidden="true" />
                    </div>
                    <div>
                        <h2 className="big-text-3 font-bold text-white">
                            Event Gallery
                        </h2>
                        <p className="small-text text-slate-400">
                            {validImages.length} {validImages.length === 1 ? 'image' : 'images'}
                        </p>
                    </div>
                </div>

                {/* Main Carousel */}
                <div className="bg-primary rounded-xl border-2 border-accent/30 overflow-hidden">
                    {/* Large Image Display */}
                    <div className="relative aspect-video bg-primary-100">
                        <Image
                            src={validImages[currentIndex]}
                            alt={`${eventTitle} - Image ${currentIndex + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            priority={currentIndex === 0}
                        />

                        {/* Zoom Button */}
                        <button
                            onClick={() => openLightbox(currentIndex)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent z-10"
                            aria-label="View fullscreen"
                        >
                            <ZoomIn className="w-5 h-5 text-white" aria-hidden="true" />
                        </button>

                        {/* Navigation Arrows (only show if more than 1 image) */}
                        {validImages.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevious}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-6 h-6 text-white" aria-hidden="true" />
                                </button>

                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-6 h-6 text-white" aria-hidden="true" />
                                </button>
                            </>
                        )}

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg">
                            <span className="small-text text-white font-semibold">
                                {currentIndex + 1} / {validImages.length}
                            </span>
                        </div>
                    </div>

                    {/* Thumbnail Strip (only show if more than 1 image) */}
                    {validImages.length > 1 && (
                        <div className="p-4 bg-primary-200">
                            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                                {validImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`
                                            relative shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent
                                            ${index === currentIndex 
                                                ? 'ring-2 ring-accent scale-105' 
                                                : 'opacity-60 hover:opacity-100'
                                            }
                                        `}
                                        aria-label={`View image ${index + 1}`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${eventTitle} thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div 
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image lightbox"
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white z-10"
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6 text-white" aria-hidden="true" />
                    </button>

                    {/* Lightbox Image */}
                    <div 
                        className="relative w-full h-full max-w-7xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={validImages[lightboxIndex]}
                            alt={`${eventTitle} - Image ${lightboxIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </div>

                    {/* Lightbox Navigation (only if more than 1 image) */}
                    {validImages.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleLightboxPrevious();
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-7 h-7 text-white" aria-hidden="true" />
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleLightboxNext();
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-7 h-7 text-white" aria-hidden="true" />
                            </button>
                        </>
                    )}

                    {/* Lightbox Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl">
                        <span className="normal-text text-white font-semibold">
                            {lightboxIndex + 1} / {validImages.length}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default EventImageGallery;