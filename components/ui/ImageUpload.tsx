"use client";

import React, { useRef, useState, ChangeEvent } from 'react';
import { AlertCircle, Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    label: string;
    name: string;
    onImageChange: (base64Image: string | null) => void;
    onMultipleImagesChange?: (base64Images: string[]) => void;
    currentImage?: string | null;
    helperText?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    maxSizeMB?: number;
    acceptedFormats?: string[];
    multiple?: boolean;
    compact?: boolean; // NEW: for grid layout
}

const ImageUpload = ({
    label,
    name,
    onImageChange,
    onMultipleImagesChange,
    currentImage = null,
    helperText,
    error: externalError,
    required = false,
    disabled = false,
    maxSizeMB = 5,
    acceptedFormats = ['image/jpeg', 'image/png', 'image/webp'],
    multiple = false,
    compact = false
}: ImageUploadProps) => {
    const [internalError, setInternalError] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadId = `image-upload-${name}-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${uploadId}-error`;
    const helperId = `${uploadId}-helper`;

    const error = externalError || internalError;

    // Determine which preview to show
    const displayImage = previewUrl || currentImage;

    const handleFileSelect = async (file: File): Promise<string | null> => {
        // Validate file type
        if (!acceptedFormats.includes(file.type)) {
            const formats = acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ');
            setInternalError(`Please upload a valid image file (${formats})`);
            return null;
        }

        // Validate file size
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            setInternalError(`File "${file.name}" is ${fileSizeMB.toFixed(2)}MB. Maximum size is ${maxSizeMB}MB`);
            return null;
        }

        // Convert to base64
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target?.result as string;
                resolve(base64String);
            };
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleMultipleFiles = async (files: FileList) => {
        setInternalError('');
        setIsLoading(true);

        const fileArray = Array.from(files);
        const base64Images: string[] = [];

        try {
            for (const file of fileArray) {
                const base64 = await handleFileSelect(file);
                if (base64) {
                    base64Images.push(base64);
                }
            }

            if (base64Images.length > 0 && onMultipleImagesChange) {
                onMultipleImagesChange(base64Images);
            }
        } catch (err) {
            setInternalError('Failed to process one or more files. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSingleFile = async (file: File) => {
        setInternalError('');
        setIsLoading(true);

        try {
            // Create blob URL for immediate preview
            const blobUrl = URL.createObjectURL(file);
            setPreviewUrl(blobUrl);

            // Convert to base64 for storage
            const base64 = await handleFileSelect(file);
            if (base64) {
                onImageChange(base64);
            }
        } catch (err) {
            setInternalError('Failed to read file. Please try again.');
            setPreviewUrl(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (multiple) {
            handleMultipleFiles(files);
        } else {
            handleSingleFile(files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        const files = e.dataTransfer.files;
        if (!files || files.length === 0) return;

        if (multiple) {
            handleMultipleFiles(files);
        } else {
            handleSingleFile(files[0]);
        }
    };

    const handleRemoveImage = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }
        
        // Revoke blob URL to free memory
        if (previewUrl && previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }

        setPreviewUrl(null);
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

    const handleChangeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleClick();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            handleClick();
        }
    };

    const formatsList = acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ');

    // Determine if we should show the image
    const shouldShowImage = displayImage && displayImage.trim() !== '' && !isLoading;

    return (
        <div className="w-full">
            {!compact && (
                <label htmlFor={uploadId} className="block normal-text-2 text-slate-300 font-medium mb-2">
                    {label}
                    {required && <span className="text-accent-50 ml-1">*</span>}
                </label>
            )}

            <div className="space-y-4">
                {/* Upload Area */}
                {!shouldShowImage && (
                    <div
                        onClick={handleClick}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onKeyDown={handleKeyDown}
                        role="button"
                        tabIndex={disabled ? -1 : 0}
                        aria-label={`Upload ${multiple ? 'images' : 'image'} for ${label}`}
                        aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`.trim()}
                        aria-invalid={!!error}
                        className={`
                            relative border-2 border-dashed rounded-xl 
                            transition-all duration-300 cursor-pointer
                            ${compact ? 'p-4' : 'p-8'}
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
                            multiple={multiple}
                            className="hidden"
                            aria-label={`File input for ${label}`}
                        />

                        <div className="flex flex-col items-center text-center">
                            {isLoading ? (
                                <div className={`rounded-full border-4 border-accent/20 border-t-accent animate-spin ${compact ? 'w-8 h-8 mb-2' : 'w-12 h-12 mb-4'}`} />
                            ) : (
                                <div className={`rounded-xl bg-accent/20 flex items-center justify-center ${compact ? 'w-12 h-12 mb-2' : 'w-16 h-16 mb-4'}`}>
                                    <Upload
                                        className={`${compact ? 'w-6 h-6' : 'w-8 h-8'} ${disabled ? 'text-slate-500' : 'text-accent-50'}`}
                                        aria-hidden="true"
                                    />
                                </div>
                            )}

                            <p className={`font-semibold text-white ${compact ? 'small-text mb-1' : 'big-text-5 mb-1'}`}>
                                {isLoading
                                    ? 'Processing...'
                                    : compact
                                        ? 'Upload'
                                        : multiple
                                            ? 'Click to upload or drag and drop multiple images'
                                            : 'Click to upload or drag and drop'
                                }
                            </p>
                            {!compact && (
                                <p className="small-text text-slate-400">
                                    {formatsList} up to {maxSizeMB}MB {multiple ? 'each' : ''}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Image Preview */}
                {shouldShowImage && (
                    <div className={`relative group rounded-xl overflow-hidden border-2 border-accent/30 hover:border-accent transition-all duration-300 ${compact ? 'aspect-square' : ''}`}>
                        <Image
                            width={1000}
                            height={1000}
                            src={displayImage}
                            alt={`Preview of ${label}`}
                            className={compact ? "w-full h-full object-cover" : "w-full h-48 sm:h-64 object-cover"}
                            unoptimized={displayImage.startsWith('blob:') || displayImage.startsWith('data:')}
                        />

                        {/* Overlay on hover (desktop) */}
                        {!compact && (
                            <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleChangeClick}
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
                        )}

                        {/* Buttons - visible on mobile, hover on desktop for compact, always visible on mobile for compact */}
                        <div className={`absolute ${compact ? 'top-2 right-2' : 'top-3 right-3 sm:hidden'} flex gap-2`}>
                            {compact && (
                                <button
                                    type="button"
                                    onClick={handleChangeClick}
                                    disabled={disabled}
                                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
                                    aria-label="Change image"
                                >
                                    <ImageIcon className="w-4 h-4" aria-hidden="true" />
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                disabled={disabled}
                                className={`p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-400 ${compact ? 'shadow-lg' : ''}`}
                                aria-label="Remove image"
                            >
                                <X className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Mobile Change button for non-compact */}
                        {!compact && (
                            <div className="sm:hidden absolute top-3 left-3">
                                <button
                                    type="button"
                                    onClick={handleChangeClick}
                                    disabled={disabled}
                                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    aria-label="Change image"
                                >
                                    <ImageIcon className="w-4 h-4" aria-hidden="true" />
                                </button>
                            </div>
                        )}
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
                {helperText && !error && !compact && (
                    <p id={helperId} className="small-text text-slate-400">
                        {helperText}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;