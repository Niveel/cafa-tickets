'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, Zap, Mail } from 'lucide-react';
import Link from 'next/link';

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        // Log the error to your error reporting service
        console.error('🔥 Critical Global Error:', error);

        // Send to error tracking (Sentry, LogRocket, etc.)
        // Sentry.captureException(error);
    }, [error]);

    const handleReload = () => {
        window.location.href = '/';
    };

    const copyErrorToClipboard = () => {
        const errorText = `Critical Error: ${error.message}\nDigest: ${error.digest || 'N/A'}\nStack: ${error.stack || 'N/A'}`;
        navigator.clipboard.writeText(errorText);
    };

    return (
        <html lang="en">
            <head>
                <title>Critical Error - Cafa Ticket</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                <div style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(to bottom right, #050E3C, #002455)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div style={{ maxWidth: '42rem', width: '100%', textAlign: 'center' }}>
                        {/* Critical Error Animation */}
                        <div style={{ position: 'relative', marginBottom: '2rem' }}>
                            {/* Pulsing rings */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    width: '8rem',
                                    height: '8rem',
                                    background: 'rgba(220, 0, 0, 0.2)',
                                    borderRadius: '50%',
                                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                                }}></div>
                            </div>

                            {/* Icon Container */}
                            <div style={{
                                position: 'relative',
                                width: '7rem',
                                height: '7rem',
                                margin: '0 auto',
                                background: 'linear-gradient(135deg, #DC0000, #FF3838)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 25px 50px -12px rgba(220, 0, 0, 0.5)',
                                border: '4px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                <Zap style={{
                                    width: '3rem',
                                    height: '3rem',
                                    color: 'white',
                                    animation: 'pulse 1.5s ease-in-out infinite'
                                }} />
                            </div>
                        </div>

                        {/* Error Content Card */}
                        <div style={{
                            background: '#002455',
                            borderRadius: '1.5rem',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            border: '2px solid rgba(220, 0, 0, 0.3)',
                            padding: '2.5rem',
                            animation: 'fadeIn 0.5s ease-out'
                        }}>
                            {/* Title */}
                            <h1 style={{
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                color: 'white',
                                marginBottom: '1rem',
                                lineHeight: '1.2'
                            }}>
                                🔥 Critical System Error
                            </h1>

                            <p style={{
                                fontSize: '1.125rem',
                                color: '#cbd5e1',
                                marginBottom: '2rem',
                                lineHeight: '1.75'
                            }}>
                                We&apos;ve encountered a critical error that prevented the application from loading properly.
                                This is usually temporary and can be fixed by reloading.
                            </p>

                            {/* Error Details - Development Only */}
                            {process.env.NODE_ENV === 'development' && (
                                <div style={{
                                    background: 'rgba(220, 0, 0, 0.1)',
                                    border: '2px solid rgba(220, 0, 0, 0.3)',
                                    borderRadius: '0.75rem',
                                    padding: '1.25rem',
                                    marginBottom: '2rem',
                                    textAlign: 'left'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        marginBottom: '0.75rem'
                                    }}>
                                        <div style={{
                                            width: '2rem',
                                            height: '2rem',
                                            background: 'rgba(220, 0, 0, 0.2)',
                                            borderRadius: '0.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <AlertTriangle style={{ width: '1rem', height: '1rem', color: '#fca5a5' }} />
                                        </div>
                                        <h3 style={{
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            color: '#fca5a5',
                                            margin: 0
                                        }}>
                                            Development Error Details
                                        </h3>
                                    </div>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: '#fca5a5',
                                        fontFamily: 'monospace',
                                        wordBreak: 'break-word',
                                        margin: '0 0 0.75rem 0',
                                        lineHeight: '1.5'
                                    }}>
                                        {error.message || 'Unknown error occurred'}
                                    </p>
                                    {error.digest && (
                                        <p style={{
                                            fontSize: '0.75rem',
                                            color: '#f87171',
                                            fontFamily: 'monospace',
                                            margin: 0
                                        }}>
                                            Error ID: {error.digest}
                                        </p>
                                    )}
                                    <button
                                        onClick={copyErrorToClipboard}
                                        style={{
                                            marginTop: '0.75rem',
                                            fontSize: '0.75rem',
                                            color: '#fca5a5',
                                            textDecoration: 'underline',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: 0
                                        }}
                                    >
                                        Copy error details
                                    </button>
                                </div>
                            )}

                            {/* What Happened */}
                            <div style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                border: '2px solid rgba(59, 130, 246, 0.3)',
                                borderRadius: '0.75rem',
                                padding: '1.25rem',
                                marginBottom: '2rem',
                                textAlign: 'left'
                            }}>
                                <h3 style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: '#93c5fd',
                                    marginBottom: '0.75rem'
                                }}>
                                    What Happened?
                                </h3>
                                <ul style={{
                                    margin: 0,
                                    padding: 0,
                                    listStyle: 'none'
                                }}>
                                    {[
                                        'A critical error prevented the app from starting',
                                        'This usually happens due to network issues',
                                        'Your data is safe and has not been affected',
                                        'Try reloading to fix the issue'
                                    ].map((item, index) => (
                                        <li key={index} style={{
                                            display: 'flex',
                                            gap: '0.5rem',
                                            marginBottom: index < 3 ? '0.5rem' : 0
                                        }}>
                                            <span style={{ color: '#60a5fa' }}>•</span>
                                            <span style={{
                                                fontSize: '0.875rem',
                                                color: '#93c5fd',
                                                lineHeight: '1.5'
                                            }}>
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ marginBottom: '2rem' }}>
                                {/* Primary - Retry */}
                                <button
                                    onClick={reset}
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(to right, #DC0000, #FF3838)',
                                        color: 'white',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        padding: '1rem 1.5rem',
                                        borderRadius: '0.75rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75rem',
                                        marginBottom: '0.75rem',
                                        transition: 'all 0.2s',
                                        boxShadow: '0 4px 6px -1px rgba(220, 0, 0, 0.3)'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.02)';
                                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(220, 0, 0, 0.4)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(220, 0, 0, 0.3)';
                                    }}
                                >
                                    <RefreshCw style={{ width: '1.25rem', height: '1.25rem' }} />
                                    <span>Retry Application</span>
                                </button>

                                {/* Secondary - Reload */}
                                <button
                                    onClick={handleReload}
                                    style={{
                                        width: '100%',
                                        background: '#134686',
                                        color: 'white',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        padding: '1rem 1.5rem',
                                        borderRadius: '0.75rem',
                                        border: '2px solid rgba(220, 0, 0, 0.3)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75rem',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = '#002455';
                                        e.currentTarget.style.borderColor = 'rgba(220, 0, 0, 0.5)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = '#134686';
                                        e.currentTarget.style.borderColor = 'rgba(220, 0, 0, 0.3)';
                                    }}
                                >
                                    <Home style={{ width: '1.25rem', height: '1.25rem' }} />
                                    <span>Go to Homepage</span>
                                </button>
                            </div>

                            {/* Support */}
                            <div style={{
                                paddingTop: '1.5rem',
                                borderTop: '2px solid rgba(220, 0, 0, 0.3)',
                                textAlign: 'center'
                            }}>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: '#94a3b8',
                                    marginBottom: '0.75rem'
                                }}>
                                    Need immediate help?
                                </p>

                                <Link href="mailto:info@cafaticket.com"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.625rem 1.25rem',
                                        background: 'rgba(16, 185, 129, 0.2)',
                                        color: '#6ee7b7',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        borderRadius: '0.5rem',
                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)';
                                    }}
                                >
                                    <Mail style={{ width: '1rem', height: '1rem' }} />
                                    <span>Contact Support</span>
                                </Link>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                            <p style={{
                                fontSize: '0.875rem',
                                color: '#64748b',
                                marginBottom: '0.5rem'
                            }}>
                                This is a critical system error that requires a full reload
                            </p>
                            <p style={{
                                fontSize: '0.75rem',
                                color: '#475569'
                            }}>
                                Cafa Ticket • Always here to help
                            </p>
                        </div>
                    </div>
                </div>

                {/* Inline animations */}
                <style>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </body>
        </html>
    );
}