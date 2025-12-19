import React from 'react';
import { Ticket, Sparkles, Music } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4 overflow-hidden">
            {/* Background animated linear orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-50/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Main loading container */}
            <div className="relative z-10 flex flex-col items-center justify-center">
                {/* Animated ticket icon container */}
                <div className="relative mb-8">
                    {/* Outer rotating ring */}
                    <div className="absolute inset-0 w-32 h-32 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
                    
                    {/* Middle rotating ring (opposite direction) */}
                    <div className="absolute inset-2 w-28 h-28 border-4 border-accent-50/20 border-b-accent-50 rounded-full animate-spin-slow-reverse"></div>
                    
                    {/* Inner pulsing circle */}
                    <div className="absolute inset-4 w-24 h-24 bg-linear-to-br from-accent to-accent-100 rounded-full animate-pulse flex items-center justify-center shadow-2xl shadow-accent/50">
                        <Ticket className="w-12 h-12 text-white animate-bounce" aria-hidden="true" />
                    </div>

                    {/* Floating sparkles */}
                    <Sparkles 
                        className="absolute -top-2 -right-2 w-6 h-6 text-accent-50 animate-ping" 
                        aria-hidden="true" 
                    />
                    <Sparkles 
                        className="absolute -bottom-2 -left-2 w-5 h-5 text-accent animate-ping delay-500" 
                        aria-hidden="true" 
                    />
                    <Music 
                        className="absolute top-0 left-0 w-4 h-4 text-accent-50 animate-ping delay-300" 
                        aria-hidden="true" 
                    />
                </div>

                {/* Loading text with linear animation */}
                <div className="text-center mb-6">
                    <h2 className="big-text-2 font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-accent-50 to-white animate-linear-x mb-2">
                        Loading Cafa Tickets
                    </h2>
                    <p className="normal-text text-slate-300 animate-pulse">
                        Please wait while we prepare your experience...
                    </p>
                </div>

                {/* Animated dots */}
                <div className="flex gap-2 mb-8">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-3 h-3 bg-accent rounded-full animate-bounce"
                            style={{
                                animationDelay: `${i * 0.15}s`,
                                animationDuration: '0.6s'
                            }}
                        ></div>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="w-64 h-2 bg-primary-200 rounded-full overflow-hidden border border-accent/30">
                    <div className="h-full bg-linear-to-r from-accent via-accent-50 to-accent rounded-full animate-progress"></div>
                </div>

                {/* Floating tickets animation */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.8}s`,
                                animationDuration: `${3 + Math.random() * 2}s`
                            }}
                        >
                            <Ticket 
                                className="w-6 h-6 text-accent/20 rotate-12" 
                                aria-hidden="true"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom animations */}
            <style jsx>{`
                @keyframes spin-slow-reverse {
                    from {
                        transform: rotate(360deg);
                    }
                    to {
                        transform: rotate(0deg);
                    }
                }

                @keyframes linear-x {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                @keyframes progress {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                        opacity: 0.6;
                    }
                }

                .animate-spin-slow-reverse {
                    animation: spin-slow-reverse 3s linear infinite;
                }

                .animate-linear-x {
                    background-size: 200% 200%;
                    animation: linear-x 3s ease infinite;
                }

                .animate-progress {
                    animation: progress 1.5s ease-in-out infinite;
                }

                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }

                .delay-300 {
                    animation-delay: 0.3s;
                }

                .delay-500 {
                    animation-delay: 0.5s;
                }

                .delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </div>
    );
}