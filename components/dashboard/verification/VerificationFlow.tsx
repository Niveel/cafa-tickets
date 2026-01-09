'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {VerificationHeader, IDUploadStep, SelfieStep, VerificationResult} from "@/components"
import { CurrentUser } from '@/types/general.types';

type VerificationStep = 'id-upload' | 'selfie' | 'result';

interface VerificationFlowProps {
    user: CurrentUser | null;
}

const VerificationFlow = ({ user }: VerificationFlowProps) => {
    const [currentStep, setCurrentStep] = useState<VerificationStep>('id-upload');
    const [idImage, setIdImage] = useState<File | null>(null);
    const [selfieImage, setSelfieImage] = useState<File | null>(null);
    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');

    const handleIDUpload = (file: File) => {
        setIdImage(file);
        // Animate to next step
        setTimeout(() => {
            setCurrentStep('selfie');
        }, 500);
    };

    const handleSelfieUpload = async (file: File) => {
        setSelfieImage(file);
        setCurrentStep('result');
        
        // Simulate backend verification (2 seconds)
        setTimeout(() => {
            // For now, always succeed (you'll implement actual verification later)
            setVerificationStatus('success');
        }, 2000);
    };

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
                        <IDUploadStep onUpload={handleIDUpload} />
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
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VerificationFlow;