'use client';

import { useState, useRef, useCallback } from 'react';
import { X, Camera, RotateCw, CheckCircle, AlertCircle } from 'lucide-react';
import Webcam from 'react-webcam';

interface FaceVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    title?: string;
    description?: string;
}

type VerificationState = 'capture' | 'verifying' | 'success' | 'rejected';

const FaceVerificationModal = ({
    isOpen,
    onClose,
    onSuccess,
    title = 'Verify Your Identity',
    description = 'For your security, please verify your identity with a selfie before proceeding.'
}: FaceVerificationModalProps) => {
    const webcamRef = useRef<Webcam>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
    const [verificationState, setVerificationState] = useState<VerificationState>('capture');
    const [error, setError] = useState<string | null>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);

    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot({
            width: 1280,
            height: 720
        });
        if (imageSrc) {
            setCapturedImage(imageSrc);
        }
    }, []);

    const handleRetake = () => {
        setCapturedImage(null);
        setError(null);
    };

    const handleFlipCamera = () => {
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
        setCapturedImage(null);
    };

    const handleVerify = async () => {
        if (!capturedImage) return;

        setVerificationState('verifying');
        setError(null);

        try {
            // Convert base64 to File
            const blob = await fetch(capturedImage).then(r => r.blob());
            const file = new File([blob], 'withdrawal-selfie.jpg', { type: 'image/jpeg' });

            const formData = new FormData();
            formData.append('selfie_image', file);

            const response = await fetch('/api/auth/verification/upload-selfie', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                if (data.data.verification_status === 'verified') {
                    setVerificationState('success');
                    
                    // Call onSuccess after short delay for UX
                    setTimeout(() => {
                        onSuccess();
                        handleModalClose();
                    }, 1500);
                } else if (data.data.verification_status === 'rejected') {
                    setVerificationState('rejected');
                    setError(data.data.rejection_reason || 'Face verification failed. Please try again.');
                }
            } else {
                setVerificationState('rejected');
                setError(data.message || 'Verification failed. Please try again.');
            }
        } catch (err) {
            console.error('Face verification error:', err);
            setVerificationState('rejected');
            setError('Failed to verify identity. Please try again.');
        }
    };

    const handleModalClose = () => {
        setCapturedImage(null);
        setVerificationState('capture');
        setError(null);
        setCameraError(null);
        onClose();
    };

    const handleCameraError = (error: string | DOMException) => {
        console.error('Camera error:', error);
        const errorMessage = typeof error === 'string' ? error : error.message;
        
        if (errorMessage.includes('Permission denied')) {
            setCameraError('Camera access denied. Please enable camera permissions in your browser settings.');
        } else if (errorMessage.includes('not found')) {
            setCameraError('No camera found. Please connect a camera and try again.');
        } else {
            setCameraError('Failed to access camera. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div 
                className="bg-primary-100 rounded-2xl border-2 border-accent/30 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                role="dialog"
                aria-labelledby="verification-modal-title"
                aria-modal="true"
            >
                {/* Modal Header */}
                <div className="sticky top-0 bg-primary-100 border-b-2 border-accent/30 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <Camera className="w-5 h-5 text-blue-400" aria-hidden="true" />
                        </div>
                        <h2 id="verification-modal-title" className="big-text-3 font-bold text-white">
                            {title}
                        </h2>
                    </div>
                    <button
                        onClick={handleModalClose}
                        disabled={verificationState === 'verifying'}
                        className="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center transition-colors disabled:opacity-50"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 text-white" aria-hidden="true" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                    {/* Success State */}
                    {verificationState === 'success' && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-400" aria-hidden="true" />
                            </div>
                            <h3 className="big-text-3 font-bold text-white mb-2">
                                Identity Verified!
                            </h3>
                            <p className="normal-text text-slate-300">
                                Proceeding to withdrawal...
                            </p>
                        </div>
                    )}

                    {/* Capture/Verifying/Rejected State */}
                    {verificationState !== 'success' && (
                        <>
                            {/* Description */}
                            <p className="normal-text text-slate-300 text-center">
                                {description}
                            </p>

                            {/* Camera or Captured Image */}
                            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden border-2 border-accent/30 bg-primary-200">
                                {!capturedImage ? (
                                    <>
                                        {cameraError ? (
                                            <div className="absolute inset-0 flex items-center justify-center p-6">
                                                <div className="text-center">
                                                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" aria-hidden="true" />
                                                    <p className="normal-text text-red-400">{cameraError}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <Webcam
                                                ref={webcamRef}
                                                audio={false}
                                                screenshotFormat="image/jpeg"
                                                screenshotQuality={0.95}
                                                videoConstraints={{
                                                    facingMode,
                                                    width: 1280,
                                                    height: 720,
                                                }}
                                                mirrored={facingMode === 'user'}
                                                onUserMediaError={handleCameraError}
                                                className="w-full h-full object-cover"
                                            />
                                        )}

                                        {/* Face Guide Overlay */}
                                        {!cameraError && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="w-48 h-64 sm:w-56 sm:h-72 border-4 border-white/50 rounded-full" />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <img
                                        src={capturedImage}
                                        alt="Captured selfie"
                                        className="w-full h-full object-cover"
                                    />
                                )}

                                {/* Verifying Overlay */}
                                {verificationState === 'verifying' && (
                                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-12 h-12 mx-auto mb-4 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                            <p className="big-text-4 font-bold text-white">
                                                Verifying Your Identity...
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Error Message */}
                            {error && verificationState === 'rejected' && (
                                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl" role="alert">
                                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                                    <p className="normal-text-2 text-red-400">{error}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                {!capturedImage && !cameraError ? (
                                    <>
                                        <button
                                            onClick={handleCapture}
                                            disabled={verificationState === 'verifying'}
                                            className="w-full py-4 bg-accent text-white rounded-xl font-bold big-text-5 hover:bg-accent-100 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                        >
                                            <Camera className="w-5 h-5" aria-hidden="true" />
                                            Capture Selfie
                                        </button>

                                        <button
                                            onClick={handleFlipCamera}
                                            disabled={verificationState === 'verifying'}
                                            className="w-full py-3 bg-slate-700 text-white rounded-xl font-semibold normal-text hover:bg-slate-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            <RotateCw className="w-4 h-4" aria-hidden="true" />
                                            Flip Camera
                                        </button>
                                    </>
                                ) : capturedImage && verificationState !== 'verifying' ? (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleRetake}
                                            className="flex-1 py-4 bg-slate-700 text-white rounded-xl font-bold big-text-5 hover:bg-slate-600 transition-all"
                                        >
                                            Retake
                                        </button>
                                        <button
                                            onClick={handleVerify}
                                            className="flex-1 py-4 bg-accent text-white rounded-xl font-bold big-text-5 hover:bg-accent-100 transition-all flex items-center justify-center gap-3"
                                        >
                                            <CheckCircle className="w-5 h-5" aria-hidden="true" />
                                            Verify
                                        </button>
                                    </div>
                                ) : null}
                            </div>

                            {/* Tips */}
                            {!capturedImage && !cameraError && (
                                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                    <p className="small-text text-blue-300">
                                        <strong>Tips for best results:</strong>
                                    </p>
                                    <ul className="small-text text-blue-300 mt-2 space-y-1 list-disc list-inside">
                                        <li>Ensure your face is well-lit</li>
                                        <li>Look directly at the camera</li>
                                        <li>Remove glasses if possible</li>
                                        <li>Keep your face within the oval guide</li>
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FaceVerificationModal;