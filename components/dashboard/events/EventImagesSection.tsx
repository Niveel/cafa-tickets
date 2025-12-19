"use client";

import React from 'react';
import { Image as ImageIcon, Info, X } from 'lucide-react';
import { ImageUpload } from '@/components';
import { useFormikContext } from 'formik';
import { formatImageUrls } from '@/utils/functions';
import Image from 'next/image';

const EventImagesSection = () => {
    const { values, setFieldValue, errors, touched } = useFormikContext<any>();

    const handleFeaturedImageChange = (base64Image: string | null) => {
        setFieldValue('featured_image', base64Image || '');
    };

    const handleMultipleAdditionalImagesChange = (base64Images: string[]) => {
        const currentImages = values.additional_images || [];
        const newImages = [...currentImages, ...base64Images];

        // Limit to 5 images
        const limitedImages = newImages.slice(0, 5);
        setFieldValue('additional_images', limitedImages);
    };

    const handleSingleAdditionalImageChange = (base64Image: string | null, index: number) => {
        if (base64Image) {
            const currentImages = values.additional_images || [];
            const newImages = [...currentImages];
            newImages[index] = base64Image;
            setFieldValue('additional_images', newImages);
        }
    };

    const handleRemoveAdditionalImage = (index: number) => {
        const currentImages = values.additional_images || [];
        const newImages = currentImages.filter((_: any, i: number) => i !== index);
        setFieldValue('additional_images', newImages);
    };

    const additionalImages = (values.additional_images || [])
        .map((img: string) => {
            // Only format if it's a relative URL (not base64, not blob, not full URL)
            if (!img) return '';
            if (img.startsWith('data:') || img.startsWith('blob:') || img.startsWith('http')) {
                return img; // Already formatted or base64
            }
            // It's a relative URL from backend, format it
            return formatImageUrls([img])[0];
        })
        .filter((img: string) => {
            if (!img || typeof img !== 'string' || img.trim() === '') return false;
            return img.startsWith('data:') || img.startsWith('http') || img.startsWith('blob:');
        });
    const canAddMore = additionalImages.length < 5;
    const remainingSlots = 5 - additionalImages.length;

    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-pink-400" aria-hidden="true" />
                </div>
                <div>
                    <h2 className="big-text-3 font-bold text-white">
                        Event Images
                    </h2>
                    <p className="small-text text-slate-400">
                        Add attractive images to showcase your event
                    </p>
                </div>
            </div>

            {/* Featured Image */}
            <div className="p-5 bg-primary-200 rounded-xl border-2 border-accent/30">
                <h3 className="big-text-4 font-bold text-white mb-4">
                    Featured Image
                </h3>
                <ImageUpload
                    label="Upload Featured Image"
                    name="featured_image"
                    onImageChange={handleFeaturedImageChange}
                    currentImage={values.featured_image}
                    required
                    multiple={false}
                    error={touched.featured_image && errors.featured_image ? String(errors.featured_image) : undefined}
                    helperText="This image will be the main image for your event (max 5MB, JPG/PNG/WEBP)"
                    maxSizeMB={5}
                    acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
                />
            </div>

            {/* Additional Images */}
            <div className="p-5 bg-primary-200 rounded-xl border-2 border-accent/30">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="big-text-4 font-bold text-white">
                            Additional Images (Optional)
                        </h3>
                        <p className="small-text text-slate-400">
                            {additionalImages.filter((img: string) => img).length} of 5 images added
                        </p>
                    </div>
                </div>

                {additionalImages.length === 0 ? (
                    <ImageUpload
                        label="Upload Additional Images"
                        name="additional_images"
                        onImageChange={() => { }}
                        onMultipleImagesChange={handleMultipleAdditionalImagesChange}
                        multiple={true}
                        helperText="Select up to 5 additional images at once (max 5MB each, JPG/PNG/WEBP)"
                        maxSizeMB={5}
                        acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
                    />
                ) : (
                    <div className="space-y-4">
                        {/* Helper text - shown once at the top */}
                        <p className="small-text text-slate-400">
                            Max 5MB, JPG/PNG/WEBP per image
                        </p>

                        {/* Grid of existing images */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {additionalImages.map((image: string, index: number) => {
                                if (!image || !image.startsWith('data:')) {
                                    return null;
                                }

                                return (
                                    <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border-2 border-accent/30 hover:border-accent transition-all duration-300">
                                        <Image
                                            width={300}
                                            height={300}
                                            src={image}
                                            alt={`Additional image ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            unoptimized={image.startsWith('blob:') || image.startsWith('data:')}
                                        />

                                        {/* Overlay with buttons */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300">
                                            <div className="absolute top-2 right-2 flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        // Trigger file input for this specific image
                                                        const input = document.createElement('input');
                                                        input.type = 'file';
                                                        input.accept = 'image/jpeg,image/png,image/webp';
                                                        input.onchange = async (e) => {
                                                            const file = (e.target as HTMLInputElement).files?.[0];
                                                            if (file) {
                                                                // Convert to base64
                                                                const reader = new FileReader();
                                                                reader.onload = (e) => {
                                                                    const base64 = e.target?.result as string;
                                                                    handleSingleAdditionalImageChange(base64, index);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        };
                                                        input.click();
                                                    }}
                                                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                    aria-label={`Change image ${index + 1}`}
                                                >
                                                    <ImageIcon className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveAdditionalImage(index)}
                                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                    aria-label={`Remove image ${index + 1}`}
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Image number label */}
                                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                                            {index + 1}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Add more images button */}
                        {canAddMore && (
                            <div className="border-2 border-dashed border-accent/30 rounded-xl p-6">
                                <ImageUpload
                                    label={`Add More Images (${remainingSlots} remaining)`}
                                    name="additional_images_new"
                                    onImageChange={() => { }}
                                    onMultipleImagesChange={handleMultipleAdditionalImagesChange}
                                    multiple={true}
                                    helperText={`Select up to ${remainingSlots} more images at once`}
                                    maxSizeMB={5}
                                    acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Info Note */}
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="small-text text-blue-300 font-semibold mb-1">
                            Image Guidelines
                        </p>
                        <ul className="small-text-2 text-blue-300 space-y-1 list-disc list-inside">
                            <li>Use high-quality images that represent your event well</li>
                            <li>Featured image appears on event cards and listings</li>
                            <li>Additional images appear in the event detail gallery</li>
                            <li>You can select multiple additional images at once</li>
                            <li>Recommended size: 1920x1080px or higher</li>
                            <li>Supported formats: JPG, PNG, WEBP (max 5MB each)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventImagesSection;