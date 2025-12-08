"use client";

import React, { useRef, useState, ChangeEvent } from 'react';
import { AlertCircle, Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    label: string;
    name: string;
    onImageChange: (base64Image: string | null) => void;
    currentImage?: string | null;
    helperText?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    maxSizeMB?: number;
    acceptedFormats?: string[];
}

const ImageUpload = ({
    label,
    name,
    onImageChange,
    currentImage = null,
    helperText,
    error: externalError,
    required = false,
    disabled = false,
    maxSizeMB = 5,
    acceptedFormats = ['image/jpeg', 'image/png', 'image/webp']
}: ImageUploadProps) => {
    const [internalError, setInternalError] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const uploadId = `image-upload-${name}`;
    const errorId = `${uploadId}-error`;
    const helperId = `${uploadId}-helper`;

    const error = externalError || internalError;

    const handleFileSelect = async (file: File) => {
        setInternalError('');
        setIsLoading(true);

        // Validate file type
        if (!acceptedFormats.includes(file.type)) {
            const formats = acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ');
            setInternalError(`Please upload a valid image file (${formats})`);
            setIsLoading(false);
            return;
        }

        // Validate file size
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            setInternalError(`File size must be less than ${maxSizeMB}MB. Your file is ${fileSizeMB.toFixed(2)}MB`);
            setIsLoading(false);
            return;
        }

        // Convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64String = e.target?.result as string;
            onImageChange(base64String);
            setIsLoading(false);
        };
        reader.onerror = () => {
            setInternalError('Failed to read file. Please try again.');
            setIsLoading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (disabled) return;

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleRemoveImage = () => {
        onImageChange(null);
        setInternalError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            handleClick();
        }
    };

    const formatsList = acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ');

    return (
        <div className="w-full">
            <label htmlFor={uploadId} className="block normal-text-2 text-slate-300 font-medium mb-2">
                {label}
                {required && <span className="text-accent-50 ml-1">*</span>}
            </label>

            <div className="space-y-4">
                {/* Upload Area */}
                {!currentImage && (
                    <div
                        onClick={handleClick}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onKeyDown={handleKeyDown}
                        role="button"
                        tabIndex={disabled ? -1 : 0}
                        aria-label={`Upload image for ${label}`}
                        aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`.trim()}
                        aria-invalid={!!error}
                        className={`
                            relative border-2 border-dashed rounded-xl p-8 
                            transition-all duration-300 cursor-pointer
                            ${disabled
                                ? 'bg-primary-200 border-accent/20 cursor-not-allowed opacity-60'
                                : isDragging
                                    ? 'border-accent bg-accent/10'
                                    : error
                                        ? 'border-red-500 bg-red-500/5'
                                        : 'border-accent/30 hover:border-accent hover:bg-primary-200'
                            }
                            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary
                        `}
                    >
                        <input
                            ref={fileInputRef}
                            id={uploadId}
                            name={name}
                            type="file"
                            accept={acceptedFormats.join(',')}
                            onChange={handleFileInputChange}
                            disabled={disabled}
                            required={required && !currentImage}
                            className="sr-only"
                            aria-label={`File input for ${label}`}
                        />

                        <div className="flex flex-col items-center text-center">
                            {isLoading ? (
                                <div className="w-12 h-12 rounded-full border-4 border-accent/20 border-t-accent animate-spin mb-4" />
                            ) : (
                                <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                                    <Upload
                                        className={`w-8 h-8 ${disabled ? 'text-slate-500' : 'text-accent-50'}`}
                                        aria-hidden="true"
                                    />
                                </div>
                            )}

                            <p className="big-text-5 font-semibold text-white mb-1">
                                {isLoading ? 'Processing image...' : 'Click to upload or drag and drop'}
                            </p>
                            <p className="small-text text-slate-400">
                                {formatsList} up to {maxSizeMB}MB
                            </p>
                        </div>
                    </div>
                )}

                {/* Image Preview */}
                {currentImage && !isLoading && (
                    <div className="relative group rounded-xl overflow-hidden border-2 border-accent/30 hover:border-accent transition-all duration-300">
                        <Image
                            width={1000}
                            height={1000}
                            src={currentImage}
                            alt={`Preview of ${label}`}
                            className="w-full h-48 sm:h-64 object-cover"
                        />

                        {/* Overlay on hover (desktop) */}
                        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleClick}
                                    disabled={disabled}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold normal-text-2 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    aria-label="Change image"
                                >
                                    <ImageIcon className="w-4 h-4" aria-hidden="true" />
                                    Change
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    disabled={disabled}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold normal-text-2 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-400"
                                    aria-label="Remove image"
                                >
                                    <X className="w-4 h-4" aria-hidden="true" />
                                    Remove
                                </button>
                            </div>
                        </div>

                        {/* Mobile buttons */}
                        <div className="sm:hidden absolute top-3 right-3 flex gap-2">
                            <button
                                type="button"
                                onClick={handleClick}
                                disabled={disabled}
                                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
                                aria-label="Change image"
                            >
                                <ImageIcon className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                disabled={disabled}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-400"
                                aria-label="Remove image"
                            >
                                <X className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div
                        id={errorId}
                        className="flex items-start gap-2 p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                        role="alert"
                    >
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="small-text text-red-400">{error}</p>
                    </div>
                )}

                {/* Helper Text */}
                {helperText && !error && (
                    <p id={helperId} className="small-text text-slate-400">
                        {helperText}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;