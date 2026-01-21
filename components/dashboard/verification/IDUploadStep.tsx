'use client';

import { useState, useRef } from 'react';
import { Upload, CreditCard, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface IDUploadStepProps {
    onUpload: (file: File) => void;
    isLoading?: boolean;
    error?: string | null; // ✅ NEW: Error prop
}

const IDUploadStep = ({ onUpload, isLoading = false, error = null }: IDUploadStepProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                alert('Please select a valid image file (JPG, PNG, or WebP)');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                alert('File size must be less than 10MB');
                return;
            }

            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = () => {
        if (!selectedFile || isLoading) return;
        onUpload(selectedFile);
    };

    const handleRemove = () => {
        if (isLoading) return;
        setPreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="bg-primary-100 rounded-2xl border-2 border-accent/30 p-8">
            {/* ✅ NEW: Error Alert */}
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500/50 rounded-xl flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                        <p className="normal-text-2 font-semibold text-red-400 mb-1">
                            Upload Failed
                        </p>
                        <p className="small-text text-red-300">
                            {error}
                        </p>
                    </div>
                </div>
            )}

            {/* Instructions */}
            <div className="mb-8">
                <h2 className="big-text-3 font-bold text-white mb-3">
                    Upload Your National ID
                </h2>
                <p className="normal-text text-slate-300 mb-4">
                    Please upload a clear photo of your national ID card, driver&apos;s license, or passport.
                </p>
                
                {/* Requirements */}
                <div className="bg-primary-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-slate-300 small-text">
                        <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                        <span>Photo must be clear and readable</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 small-text">
                        <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                        <span>All corners of ID must be visible</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 small-text">
                        <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                        <span>Maximum file size: 10MB</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 small-text">
                        <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                        <span>Accepted formats: JPG, PNG, WebP</span>
                    </div>
                </div>
            </div>

            {/* Upload Area */}
            {!preview ? (
                <div
                    onClick={() => !isLoading && fileInputRef.current?.click()}
                    className={`border-2 border-dashed border-accent/50 rounded-xl p-12 text-center transition-all ${
                        isLoading 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'cursor-pointer hover:border-accent hover:bg-accent/5'
                    }`}
                >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                        <CreditCard className="w-8 h-8 text-accent-50" aria-hidden="true" />
                    </div>
                    <h3 className="big-text-4 font-semibold text-white mb-2">
                        Choose ID Image
                    </h3>
                    <p className="normal-text-2 text-slate-400 mb-4">
                        Click to browse or drag and drop
                    </p>
                    <p className="small-text text-slate-500">
                        JPG, PNG, or WebP (max 10MB)
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileSelect}
                        disabled={isLoading}
                        className="hidden"
                        aria-label="Upload ID document"
                    />
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Preview */}
                    <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden border-2 border-accent/30 bg-primary-200">
                        <img
                            src={preview}
                            alt="ID document preview"
                            className="w-full h-full object-contain"
                        />
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={handleRemove}
                                disabled={isLoading}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg small-text font-semibold hover:bg-red-600 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                aria-label="Remove ID image"
                            >
                                Remove
                            </button>
                        </div>
                        
                        {/* Loading Overlay */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                                    <p className="normal-text-2 text-white font-semibold">
                                        Uploading ID...
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Upload Button */}
                    <button
                        onClick={handleUpload}
                        disabled={isLoading || !selectedFile}
                        className="w-full py-4 bg-accent text-white rounded-xl font-bold big-text-5 hover:bg-accent-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        aria-label="Continue to selfie step"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="w-5 h-5" aria-hidden="true" />
                                Continue to Selfie
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Privacy Notice */}
            <div className="mt-6 flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="small-text text-slate-300">
                    Your ID information is encrypted and stored securely. We only use it to verify your identity and comply with legal requirements.
                </p>
            </div>
        </div>
    );
};

export default IDUploadStep;