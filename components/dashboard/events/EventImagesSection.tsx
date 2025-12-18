"use client";

import React from 'react';
import { Image as ImageIcon, Info, X } from 'lucide-react';
import { ImageUpload } from '@/components';
import { useFormikContext } from 'formik';
import { formatImageUrls } from '@/utils/functions';

const EventImagesSection = () => {
    const { values, setFieldValue, errors, touched } = useFormikContext<any>();

    const handleFeaturedImageChange = (base64Image: string | null) => {
        setFieldValue('featured_image', base64Image || '');
    };

    const handleAdditionalImageChange = (base64Image: string | null, index: number) => {
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

    const handleAddImageSlot = () => {
        const currentImages = values.additional_images || [];
        if (currentImages.length < 5) {
            setFieldValue('additional_images', [...currentImages, '']);
        }
    };

    const additionalImages = formatImageUrls(values.additional_images) || [];
    const canAddMore = additionalImages.length < 5;

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
                    {canAddMore && additionalImages.filter((img: string) => img).length > 0 && (
                        <button
                            type="button"
                            onClick={handleAddImageSlot}
                            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold small-text hover:bg-accent-100 transition-all duration-300"
                        >
                            <ImageIcon className="w-4 h-4" aria-hidden="true" />
                            Add Image
                        </button>
                    )}
                </div>

                {additionalImages.length === 0 ? (
                    <button
                        type="button"
                        onClick={handleAddImageSlot}
                        className="w-full p-8 border-2 border-dashed border-accent/30 rounded-xl hover:border-accent hover:bg-primary-100 transition-all duration-300 flex flex-col items-center justify-center gap-3"
                    >
                        <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-accent-50" aria-hidden="true" />
                        </div>
                        <p className="big-text-5 font-semibold text-white">
                            Add Additional Images
                        </p>
                        <p className="small-text text-slate-400">
                            Upload up to 5 additional images to showcase your event
                        </p>
                    </button>
                ) : (
                    <div className="space-y-4">
                        {additionalImages.map((image: string, index: number) => (
                            <div key={index} className="relative">
                                <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                        <ImageUpload
                                            label={`Image ${index + 1}`}
                                            name={`additional_images[${index}]`}
                                            onImageChange={(base64Image) => handleAdditionalImageChange(base64Image, index)}
                                            currentImage={image}
                                            helperText="Max 5MB, JPG/PNG/WEBP"
                                            maxSizeMB={5}
                                            acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
                                        />
                                    </div>
                                    {image && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveAdditionalImage(index)}
                                            className="mt-8 w-10 h-10 rounded-lg bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-red-400"
                                            aria-label={`Remove image ${index + 1}`}
                                        >
                                            <X className="w-5 h-5 text-white" aria-hidden="true" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {canAddMore && (
                            <button
                                type="button"
                                onClick={handleAddImageSlot}
                                className="w-full p-4 border-2 border-dashed border-accent/30 rounded-xl hover:border-accent hover:bg-primary-100 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <ImageIcon className="w-5 h-5 text-accent-50" aria-hidden="true" />
                                <span className="normal-text-2 font-semibold text-accent-50">
                                    Add Another Image ({5 - additionalImages.length} remaining)
                                </span>
                            </button>
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