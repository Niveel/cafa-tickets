'use client';

import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, CheckCircle, RotateCcw, X, AlertCircle, XCircle } from 'lucide-react';

interface SelfieStepProps {
    onUpload: (file: File) => void;
    idImage: File | null;
    isLoading?: boolean;
    error?: string | null; // ✅ NEW: Error prop
}

const SelfieStep = ({ onUpload, idImage, isLoading = false, error = null }: SelfieStepProps) => {
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [cameraError, setCameraError] = useState<string>('');
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
    
    const webcamRef = useRef<Webcam>(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: facingMode,
    };

    const handleStartCamera = () => {
        if (isLoading) return;
        setCameraError('');
        setIsCameraActive(true);
    };

    const handleCapture = useCallback(() => {
        if (isLoading || !webcamRef.current) return;

        const imageSrc = webcamRef.current.getScreenshot({
            width: 1280,
            height: 720
        });
        
        if (imageSrc) {
            setCapturedImage(imageSrc);
            setIsCameraActive(false);
            
            // Convert base64 to File and upload immediately
            fetch(imageSrc)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'selfie.jpg', { 
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    
                    // Call parent's upload function immediately
                    onUpload(file);
                })
                .catch(error => {
                    console.error('Failed to convert image:', error);
                    setCameraError('Failed to process the image. Please try again.');
                    setCapturedImage(null);
                });
        }
    }, [onUpload, isLoading]);

    const handleRetake = useCallback(() => {
        if (isLoading) return;
        setCapturedImage(null);
        setIsCameraActive(true);
        setCameraError('');
    }, [isLoading]);

    const handleCancel = useCallback(() => {
        if (isLoading) return;
        setIsCameraActive(false);
        setCapturedImage(null);
        setCameraError('');
    }, [isLoading]);

    const switchCamera = useCallback(() => {
        if (isLoading) return;
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    }, [isLoading]);

    const handleUserMediaError = (error: string | DOMException) => {
        console.error('Webcam error:', error);
        
        let errorMessage = 'Failed to access camera. ';
        
        if (typeof error === 'object' && error.name) {
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                errorMessage += 'Please allow camera access in your browser and try again.';
            } else if (error.name === 'NotFoundError') {
                errorMessage += 'No camera found on your device.';
            } else if (error.name === 'NotReadableError') {
                errorMessage += 'Camera is being used by another application.';
            } else {
                errorMessage += 'Please check your camera permissions.';
            }
        } else {
            errorMessage += 'Please check your camera permissions.';
        }
        
        setCameraError(errorMessage);
        setIsCameraActive(false);
    };

    return (
        <div className="bg-primary-100 rounded-2xl border-2 border-accent/30 p-8">
            {/* Success Badge */}
            <div className="mb-6 flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                <span className="normal-text text-slate-300">
                    ID uploaded successfully!
                </span>
            </div>

            {/* ✅ NEW: Upload Error Alert */}
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500/50 rounded-xl flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                        <p className="normal-text-2 font-semibold text-red-400 mb-1">
                            Verification Failed
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
                    Take a Selfie
                </h2>
                <p className="normal-text text-slate-300 mb-4">
                    Take a clear selfie to verify your identity matches your ID.
                </p>
                
                {/* Requirements */}
                <div className="bg-primary-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-slate-300 small-text">
                        <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                        <span>Face must be clearly visible</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 small-text">
                        <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                        <span>Remove glasses and hats</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300 small-text">
                        <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                        <span>Good lighting, neutral expression</span>
                    </div>
                </div>
            </div>

            {/* Camera Error */}
            {cameraError && (
                <div className="mb-6 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                        <p className="normal-text-2 text-red-400 font-semibold mb-1">Camera Error</p>
                        <p className="small-text text-slate-300 mb-3">{cameraError}</p>
                        <button
                            onClick={handleStartCamera}
                            disabled={isLoading}
                            className="px-4 py-2 bg-accent text-white rounded-lg small-text font-semibold hover:bg-accent-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}

            {/* Camera/Preview Area */}
            <div className="space-y-4">
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden border-2 border-accent/30 bg-primary-200">
                    {/* Start Camera Button */}
                    {!isCameraActive && !capturedImage && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button
                                onClick={handleStartCamera}
                                disabled={isLoading}
                                className="flex flex-col items-center gap-4 p-8 bg-accent/20 rounded-2xl hover:bg-accent/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="w-20 h-20 rounded-full bg-accent/30 flex items-center justify-center">
                                    <Camera className="w-10 h-10 text-accent-50" aria-hidden="true" />
                                </div>
                                <div className="text-center">
                                    <p className="big-text-4 font-semibold text-white mb-2">
                                        Start Camera
                                    </p>
                                    <p className="normal-text-2 text-slate-300">
                                        Click to activate your camera
                                    </p>
                                </div>
                            </button>
                        </div>
                    )}

                    {/* Live Camera Feed */}
                    {isCameraActive && !capturedImage && (
                        <div className="relative w-full h-full">
                            <Webcam
                                ref={webcamRef}
                                audio={false}
                                screenshotFormat="image/jpeg"
                                screenshotQuality={0.95}
                                videoConstraints={videoConstraints}
                                className="w-full h-full object-cover"
                                mirrored={facingMode === 'user'}
                                onUserMediaError={handleUserMediaError}
                            />
                            
                            {/* Face Guide Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-48 h-64 sm:w-56 sm:h-72 border-4 border-accent/50 rounded-full" />
                            </div>

                            {/* Control Buttons */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                                {/* Switch Camera (mobile) */}
                                <button
                                    onClick={switchCamera}
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-primary-200 text-white rounded-lg small-text font-semibold hover:bg-primary-300 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Switch camera"
                                >
                                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                                    Flip
                                </button>

                                {/* Capture Button */}
                                <button
                                    onClick={handleCapture}
                                    disabled={isLoading}
                                    className="w-16 h-16 rounded-full bg-accent border-4 border-white shadow-lg hover:bg-accent-100 transition-all hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Capture photo"
                                >
                                    <Camera className="w-8 h-8 text-white mx-auto" aria-hidden="true" />
                                </button>

                                {/* Cancel Button */}
                                <button
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg small-text font-semibold hover:bg-red-600 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Cancel camera"
                                >
                                    <X className="w-4 h-4" aria-hidden="true" />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Captured Photo Preview */}
                    {capturedImage && (
                        <>
                            <img
                                src={capturedImage}
                                alt="Captured selfie"
                                className="w-full h-full object-contain"
                            />
                            
                            {/* Loading Overlay */}
                            {isLoading && (
                                <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                                        <p className="normal-text-2 text-white font-semibold mb-1">
                                            Verifying Your Identity...
                                        </p>
                                        <p className="small-text text-slate-300">
                                            This may take a few seconds
                                        </p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Retake Button - Only show if not loading */}
                            {!isLoading && (
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={handleRetake}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary-200 text-white rounded-lg small-text font-semibold hover:bg-primary-300 shadow-lg"
                                        aria-label="Retake photo"
                                    >
                                        <RotateCcw className="w-4 h-4" aria-hidden="true" />
                                        Retake
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Status Messages */}
                {capturedImage && !isLoading && !error && (
                    <div className="w-full py-4 bg-green-500 text-white rounded-xl font-bold big-text-5 flex items-center justify-center gap-3">
                        <CheckCircle className="w-5 h-5" aria-hidden="true" />
                        Selfie Captured Successfully
                    </div>
                )}

                {isLoading && capturedImage && (
                    <div className="w-full py-4 bg-accent text-white rounded-xl font-bold big-text-5 flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing Verification...
                    </div>
                )}
            </div>

            {/* Camera Active Notice */}
            {isCameraActive && !isLoading && (
                <div className="mt-6 flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <Camera className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="small-text text-slate-300">
                        Position your face within the oval guide. Make sure your face is well-lit and clearly visible.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SelfieStep;