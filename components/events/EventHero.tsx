"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Calendar,
    MapPin,
    Users,
    Share2,
    ChevronLeft,
    ChevronRight,
    X
} from 'lucide-react';
import { EventDetails } from '@/types/events.types';
import { formatDate, formatTime } from '@/utils/format';
import { getFullImageUrl } from '@/utils/imageUrl';
import { placeholderImage } from '@/data/constants';

interface EventHeroProps {
    event: EventDetails;
}

const EventHero = ({ event }: EventHeroProps) => {
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [showLightbox, setShowLightbox] = useState<boolean>(false);

    // ✅ Safely handle additional_images - it might be empty, undefined, or not an array
    const additionalImages = Array.isArray(event.additional_images)
        ? event.additional_images.map(getFullImageUrl).filter(Boolean)
        : [];
    const allImages = [event.featured_image, ...additionalImages];
    const hasMultipleImages = allImages.length > 1;

    // ✅ Check if event is recurring by checking recurrence_info
    const isRecurring = event.is_recurring && event.recurrence_info !== null;

    // Navigate images
    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: event.short_description,
                url: window.location.href
            });
        }
    };

    return (
        <>
            <section className="relative bg-primary pt-24 sm:pt-28 pb-8">
                <div className="inner-wrapper">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-slate-300 mb-6 flex-wrap" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-accent-50 transition-colors small-text">
                            Home
                        </Link>
                        <span className="small-text">/</span>
                        <Link href="/events" className="hover:text-accent-50 transition-colors small-text">
                            Events
                        </Link>
                        <span className="small-text">/</span>
                        <Link href={`/events?category=${event.category.slug}`} className="hover:text-accent-50 transition-colors small-text">
                            {event.category.name}
                        </Link>
                        <span className="small-text">/</span>
                        <span className="text-white font-medium truncate small-text">{event.title}</span>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left - Image Gallery */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div
                                className="relative aspect-4/3 rounded-2xl overflow-hidden border-2 border-accent cursor-pointer group"
                                onClick={() => setShowLightbox(true)}
                            >
                                <Image
                                    src={allImages[selectedImage] || placeholderImage}
                                    alt={`${event.title} - Image ${selectedImage + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    priority
                                />

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 text-white font-bold normal-text transition-opacity duration-300">
                                        Click to view full size
                                    </span>
                                </div>

                                {/* Navigation Arrows - Only show if multiple images */}
                                {hasMultipleImages && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                prevImage();
                                            }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/90 backdrop-blur-sm border border-accent text-white hover:bg-accent transition-all duration-300 flex items-center justify-center"
                                            aria-label="Previous image"
                                            type="button"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                nextImage();
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/90 backdrop-blur-sm border border-accent text-white hover:bg-accent transition-all duration-300 flex items-center justify-center"
                                            aria-label="Next image"
                                            type="button"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}

                                {/* Image Counter - Only show if multiple images */}
                                {hasMultipleImages && (
                                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-lg border border-accent">
                                        <span className="small-text text-white font-bold">
                                            {selectedImage + 1} / {allImages.length}
                                        </span>
                                    </div>
                                )}

                                {/* Status Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-4 py-2 rounded-lg font-bold small-text border-2 ${event.status === 'ongoing'
                                            ? 'bg-accent border-accent text-white animate-pulse'
                                            : event.status === 'upcoming'
                                                ? 'bg-primary/90 backdrop-blur-sm border-accent text-accent-50'
                                                : 'bg-slate-600/90 backdrop-blur-sm border-slate-600 text-slate-200'
                                        }`}>
                                        {event.status === 'ongoing' && (
                                            <span className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                                LIVE NOW
                                            </span>
                                        )}
                                        {event.status === 'upcoming' && 'UPCOMING'}
                                        {event.status === 'past' && 'PAST EVENT'}
                                    </span>
                                </div>
                            </div>

                            {/* Thumbnail Gallery - Only show if multiple images */}
                            {hasMultipleImages && (
                                <div className="grid grid-cols-4 gap-3">
                                    {allImages.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                                                    ? 'border-accent scale-105'
                                                    : 'border-accent/30 hover:border-accent'
                                                }`}
                                            type="button"
                                            aria-label={`View image ${index + 1}`}
                                        >
                                            <Image
                                                src={image || placeholderImage}
                                                alt={`${event.title} thumbnail ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right - Event Info */}
                        <div className="space-y-6">
                            {/* Category Badge */}
                            <Link
                                href={`/events?category=${event.category.slug}`}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-xl border border-accent hover:bg-accent/30 transition-all duration-300 group"
                            >
                                <span className="text-accent-50 font-bold normal-text">
                                    {event.category.name}
                                </span>
                            </Link>

                            {/* Event Title */}
                            <h1 className="massive-text font-bold text-white leading-tight">
                                {event.title}
                            </h1>

                            {/* Short Description */}
                            <p className="big-text-5 text-slate-200 leading-relaxed">
                                {event.short_description}
                            </p>

                            {/* Key Info Cards */}
                            <div className="space-y-3">
                                {/* Date & Time */}
                                <div className="flex items-start gap-4 p-4 bg-primary-100 rounded-xl border border-accent">
                                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                                        <Calendar className="w-6 h-6 text-accent-50" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="small-text text-slate-300 mb-1">
                                            {isRecurring ? 'Recurring Event' : 'Date & Time'}
                                        </p>
                                        <p className="normal-text font-bold text-white">
                                            {formatDate(event.start_date)}
                                        </p>
                                        <p className="normal-text-2 text-slate-200">
                                            {formatTime(event.start_time)} - {formatTime(event.end_time)}
                                        </p>
                                        {isRecurring && event.recurrence_info && (
                                            <p className="small-text text-accent-50 mt-1 font-semibold">
                                                Repeats {event.recurrence_info.frequency} • {event.recurrence_info.total_occurrences} occurrences
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4 p-4 bg-primary-100 rounded-xl border border-accent">
                                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-accent-50" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="small-text text-slate-300 mb-1">Location</p>
                                        <p className="normal-text font-bold text-white">
                                            {event.venue.name}
                                        </p>
                                        <p className="normal-text-2 text-slate-200">
                                            {event.venue.address}, {event.venue.city}
                                        </p>
                                    </div>
                                </div>

                                {/* Tickets Available */}
                                <div className="flex items-start gap-4 p-4 bg-primary-100 rounded-xl border border-accent">
                                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                                        <Users className="w-6 h-6 text-accent-50" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="small-text text-slate-300 mb-1">Availability</p>
                                        <p className="normal-text font-bold text-white">
                                            {event.tickets_available.toLocaleString()} tickets remaining
                                        </p>
                                        <div className="mt-2 h-2 bg-primary-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-accent-50 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${(event.tickets_sold / event.max_attendees) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                        <p className="small-text text-slate-300 mt-1">
                                            {event.tickets_sold.toLocaleString()} sold • {Math.round((event.tickets_sold / event.max_attendees) * 100)}% capacity
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleShare}
                                    className="w-12 h-12 rounded-xl bg-primary-100 border-2 border-accent text-accent-50 hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center"
                                    aria-label="Share event"
                                    type="button"
                                >
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {showLightbox && (
                <div
                    className="fixed inset-0 bg-primary/95 backdrop-blur-sm z-10000 flex items-center justify-center p-4"
                    onClick={() => setShowLightbox(false)}
                >
                    <button
                        onClick={() => setShowLightbox(false)}
                        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent text-white hover:bg-accent-100 transition-all duration-300 flex items-center justify-center z-10001"
                        aria-label="Close lightbox"
                        type="button"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="relative max-w-6xl w-full aspect-video" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={allImages[selectedImage] || placeholderImage}
                            alt={`${event.title} - Full size`}
                            fill
                            className="object-contain"
                        />

                        {/* Lightbox Navigation - Only show if multiple images */}
                        {hasMultipleImages && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevImage();
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent text-white hover:bg-accent-100 transition-all duration-300 flex items-center justify-center"
                                    aria-label="Previous image"
                                    type="button"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextImage();
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent text-white hover:bg-accent-100 transition-all duration-300 flex items-center justify-center"
                                    aria-label="Next image"
                                    type="button"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default EventHero;