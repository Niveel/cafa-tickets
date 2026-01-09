'use client';

import { ShieldCheck, CreditCard, Camera, CheckCircle } from 'lucide-react';

type VerificationStep = 'id-upload' | 'selfie' | 'result';

interface VerificationHeaderProps {
    currentStep: VerificationStep;
    userName: string;
}

const VerificationHeader = ({ currentStep, userName }: VerificationHeaderProps) => {
    const steps = [
        { id: 'id-upload', label: 'ID Upload', icon: CreditCard },
        { id: 'selfie', label: 'Selfie Verification', icon: Camera },
        { id: 'result', label: 'Verification', icon: CheckCircle },
    ];

    const currentStepIndex = steps.findIndex(step => step.id === currentStep);

    return (
        <div className="mb-12">
            {/* Title */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-accent-50" />
                </div>
                <h1 className="big-text-1 font-bold text-white mb-2">
                    Identity Verification
                </h1>
                <p className="normal-text text-slate-300">
                    Hi {userName}! Let's verify your identity to start creating events
                </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between max-w-2xl mx-auto">
                {steps.map((step, index) => {
                    const StepIcon = step.icon;
                    const isActive = index === currentStepIndex;
                    const isCompleted = index < currentStepIndex;

                    return (
                        <div key={step.id} className="flex items-center flex-1">
                            {/* Step Circle */}
                            <div className="flex flex-col items-center">
                                <div className={`
                                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                                    ${isCompleted ? 'bg-green-500' : isActive ? 'bg-accent' : 'bg-primary-200'}
                                    ${isActive ? 'ring-4 ring-accent/30 scale-110' : ''}
                                `}>
                                    <StepIcon className={`w-6 h-6 ${isCompleted || isActive ? 'text-white' : 'text-slate-400'}`} />
                                </div>
                                <span className={`
                                    mt-2 small-text font-semibold transition-colors
                                    ${isActive ? 'text-accent-50' : isCompleted ? 'text-green-400' : 'text-slate-400'}
                                `}>
                                    {step.label}
                                </span>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className={`
                                    flex-1 h-1 mx-4 transition-all duration-500
                                    ${isCompleted ? 'bg-green-500' : 'bg-primary-200'}
                                `} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VerificationHeader;