'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VerificationHeader, IDUploadStep, SelfieStep, VerificationResult } from "@/components";
import { CurrentUser } from '@/types/general.types';
import type { VerificationStatus, VerificationStatusResponse } from '@/types/verification.types';

type VerificationStep = 'id-upload' | 'selfie' | 'result';

interface VerificationFlowProps {
    user: CurrentUser | null;
}

const VerificationFlow = ({ user }: VerificationFlowProps) => {
    const [currentStep, setCurrentStep] = useState<VerificationStep>('id-upload');
    const [idImage, setIdImage] = useState<File | null>(null);
    const [selfieImage, setSelfieImage] = useState<File | null>(null);
    const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('not_started');
    const [rejectionReason, setRejectionReason] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkVerificationStatus();
    }, []);

    const checkVerificationStatus = async () => {
        try {
            const response = await fetch('/api/auth/verification/status');
            const result: VerificationStatusResponse = await response.json();

            if (response.ok && result.success) {
                const status = result.data.verification_status;
                setVerificationStatus(status);

                // Determine which step to show
                if (status === 'not_started') {
                    setCurrentStep('id-upload');
                } else if (status === 'id_uploaded') {
                    setCurrentStep('selfie');
                } else if (status === 'verified' || status === 'rejected' || status === 'pending') {
                    setCurrentStep('result');
                    if (status === 'rejected') {
                        setRejectionReason(result.data.verification_notes);
                    }
                }
            } else {
                console.error('Failed to fetch verification status:', result);
            }
        } catch (error) {
            console.error('Error checking verification status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleIDUpload = async (file: File) => {
        setIdImage(file);
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('id_document', file);

            const response = await fetch('/api/auth/verification/upload-id', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setVerificationStatus('id_uploaded');
                setTimeout(() => setCurrentStep('selfie'), 500);
            } else {
                console.error('ID Upload Failed:', data);
                alert(data.message || 'Failed to upload ID. Please try again.');
            }
        } catch (error) {
            console.error('ID upload error:', error);
            alert('Failed to upload ID. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelfieUpload = async (file: File) => {
        setSelfieImage(file);
        setCurrentStep('result');
        setVerificationStatus('pending');
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('selfie_image', file);

            const response = await fetch('/api/auth/verification/upload-selfie', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                if (data.data.verification_status === 'verified') {
                    setVerificationStatus('verified');
                } else if (data.data.verification_status === 'rejected') {
                    // Log rejection details for debugging
                    console.log('\n❌ Verification Rejected');
                    console.log('Full Response:', data);
                    console.log('Rejection Reason:', data.data.rejection_reason);
                    console.log('Message:', data.message);
                    console.log('');
                    
                    setVerificationStatus('rejected');
                    setRejectionReason(data.data.rejection_reason);
                }
            } else {
                console.error('Selfie Upload Failed:', data);
                alert(data.message || 'Failed to upload selfie. Please try again.');
                setCurrentStep('selfie');
                setVerificationStatus('id_uploaded');
            }
        } catch (error) {
            console.error('Selfie upload error:', error);
            alert('Failed to upload selfie. Please try again.');
            setCurrentStep('selfie');
            setVerificationStatus('id_uploaded');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRetry = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/verification/retry', {
                method: 'POST',
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setIdImage(null);
                setSelfieImage(null);
                setRejectionReason(null);
                setVerificationStatus('not_started');
                setCurrentStep('id-upload');
            } else {
                console.error('Retry failed:', data);
                alert(data.message || 'Failed to reset verification. Please try again.');
            }
        } catch (error) {
            console.error('Retry verification error:', error);
            alert('Failed to reset verification. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && currentStep === 'result') {
        return (
            <div className="max-w-3xl mx-auto">
                <VerificationHeader 
                    currentStep={currentStep}
                    userName={user?.full_name || 'there'}
                />
                <VerificationResult 
                    status="pending"
                    idImage={idImage}
                    selfieImage={selfieImage}
                    rejectionReason={null}
                    onRetry={handleRetry}
                />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <VerificationHeader 
                currentStep={currentStep}
                userName={user?.full_name || 'there'}
            />

            <AnimatePresence mode="wait">
                {currentStep === 'id-upload' && (
                    <motion.div
                        key="id-upload"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <IDUploadStep onUpload={handleIDUpload} isLoading={isLoading} />
                    </motion.div>
                )}

                {currentStep === 'selfie' && (
                    <motion.div
                        key="selfie"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <SelfieStep 
                            onUpload={handleSelfieUpload}
                            idImage={idImage}
                            isLoading={isLoading}
                        />
                    </motion.div>
                )}

                {currentStep === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                    >
                        <VerificationResult 
                            status={verificationStatus}
                            idImage={idImage}
                            selfieImage={selfieImage}
                            rejectionReason={rejectionReason}
                            onRetry={handleRetry}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VerificationFlow;