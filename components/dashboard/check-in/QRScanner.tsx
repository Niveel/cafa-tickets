"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Info, Loader2 } from 'lucide-react';

type Props = {
    onScan: (ticketId: string) => void;
    isProcessing: boolean;
};

const QRScanner = ({ onScan, isProcessing }: Props) => {
    const [isScanning, setIsScanning] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(false);
    const scannerRef = useRef<any>(null);
    const lastScanRef = useRef<string>('');
    const isMountedRef = useRef(true);

    // Suppress html5-qrcode's removeChild errors
    useEffect(() => {
        const originalError = console.error;
        console.error = (...args) => {
            if (
                typeof args[0] === 'string' &&
                (args[0].includes('removeChild') || 
                 args[0].includes('Failed to execute') ||
                 args[0].includes('not a child of this node'))
            ) {
                // Suppress html5-qrcode DOM cleanup errors
                return;
            }
            originalError.apply(console, args);
        };

        return () => {
            console.error = originalError;
        };
    }, []);

    const startScanner = async () => {
        if (isInitializing || isScanning || typeof window === 'undefined') return;
        
        try {
            setIsInitializing(true);
            setCameraError(null);

            // Dynamically import html5-qrcode only on client side
            const { Html5Qrcode } = await import('html5-qrcode');
            
            // Wait for DOM to be ready
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Check if container exists
            const container = document.getElementById("qr-reader-container");
            if (!container) {
                throw new Error('Scanner container not found');
            }

            // Completely clear the container
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            // Create a fresh div for the scanner
            const scannerDiv = document.createElement('div');
            scannerDiv.id = 'qr-reader';
            scannerDiv.style.width = '100%';
            container.appendChild(scannerDiv);

            // Small delay to ensure DOM is updated
            await new Promise(resolve => setTimeout(resolve, 50));

            // Create new scanner instance
            const scanner = new Html5Qrcode("qr-reader");
            scannerRef.current = scanner;

            // Start scanning
            await scanner.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0
                },
                (decodedText) => {
                    // Prevent duplicate scans
                    if (decodedText === lastScanRef.current || isProcessing) return;

                    lastScanRef.current = decodedText;

                    try {
                        // Try to parse as JSON
                        const parsed = JSON.parse(decodedText);
                        if (parsed.ticket_id) {
                            onScan(parsed.ticket_id);
                        }
                    } catch {
                        // Treat as plain ticket ID
                        onScan(decodedText);
                    }

                    // Reset after 2 seconds
                    setTimeout(() => {
                        lastScanRef.current = '';
                    }, 2000);
                },
                () => {
                    // Ignore scanning errors
                }
            );

            if (isMountedRef.current) {
                setIsScanning(true);
            }
        } catch (error: any) {
            console.log('Scanner initialization error:', error.message);
            
            if (!isMountedRef.current) return;

            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                setCameraError('Camera permission denied. Please allow camera access in your browser settings.');
            } else if (error.name === 'NotFoundError') {
                setCameraError('No camera found on this device.');
            } else if (error.name === 'NotReadableError') {
                setCameraError('Camera is in use by another app. Please close other apps and try again.');
            } else {
                setCameraError('Failed to start camera. Please use manual entry instead.');
            }

            // Cleanup on error
            if (scannerRef.current) {
                try {
                    scannerRef.current = null;
                } catch (e) {
                    // Ignore
                }
            }
        } finally {
            if (isMountedRef.current) {
                setIsInitializing(false);
            }
        }
    };

    const stopScanner = async () => {
        if (!scannerRef.current || !isScanning) return;
        
        setIsScanning(false);
        
        try {
            await scannerRef.current.stop();
        } catch (e) {
            // Ignore stop errors
        }

        try {
            await scannerRef.current.clear();
        } catch (e) {
            // Ignore clear errors
        }
        
        scannerRef.current = null;

        // Clean DOM manually
        try {
            const container = document.getElementById("qr-reader-container");
            if (container) {
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
            }
        } catch (e) {
            // Ignore cleanup errors
        }
    };

    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
            
            if (scannerRef.current) {
                const scanner = scannerRef.current;
                scannerRef.current = null;
                
                // Async cleanup
                Promise.resolve()
                    .then(() => scanner.stop())
                    .catch(() => {})
                    .then(() => scanner.clear())
                    .catch(() => {});
            }
        };
    }, []);

    return (
        <div className="bg-primary rounded-xl border-2 border-accent/30 p-6">
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <Camera className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                        </div>
                        <div>
                            <h3 className="big-text-4 font-bold text-white">
                                QR Code Scanner
                            </h3>
                            <p className="small-text text-slate-400">
                                Point camera at ticket QR code
                            </p>
                        </div>
                    </div>

                    {/* Toggle Button */}
                    {!isProcessing && (
                        <button
                            onClick={isScanning ? stopScanner : startScanner}
                            disabled={isInitializing}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold normal-text-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                                isScanning
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                            }`}
                        >
                            {isInitializing ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                                    Starting...
                                </>
                            ) : isScanning ? (
                                <>
                                    <CameraOff className="w-4 h-4" aria-hidden="true" />
                                    Stop Camera
                                </>
                            ) : (
                                <>
                                    <Camera className="w-4 h-4" aria-hidden="true" />
                                    Start Camera
                                </>
                            )}
                        </button>
                    )}
                </div>

                {/* Camera Error */}
                {cameraError && (
                    <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <p className="small-text text-red-400">
                            {cameraError}
                        </p>
                    </div>
                )}

                {/* Scanner View */}
                <div className="relative">
                    <div 
                        id="qr-reader-container" 
                        className="rounded-xl overflow-hidden bg-black"
                        style={{ 
                            minHeight: '400px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {!isScanning && !cameraError && !isInitializing && (
                            <div className="text-center p-8">
                                <Camera className="w-16 h-16 text-slate-600 mx-auto mb-4" aria-hidden="true" />
                                <p className="normal-text text-slate-500">
                                    Click &quot;Start Camera&quot; to begin scanning
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Processing Overlay */}
                    {isProcessing && (
                        <div className="absolute inset-0 bg-black/80 rounded-xl flex items-center justify-center">
                            <div className="text-center">
                                <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-3" aria-hidden="true" />
                                <p className="big-text-5 font-semibold text-white">
                                    Processing...
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Instructions */}
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <p className="small-text text-blue-300 font-semibold mb-1">
                                Scanning Tips
                            </p>
                            <ul className="small-text-2 text-blue-300 space-y-1">
                                <li>• Hold the device steady and ensure good lighting</li>
                                <li>• Center the QR code within the scanning box</li>
                                <li>• Keep the QR code flat and avoid glare</li>
                                <li>• The scanner will automatically detect and process tickets</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRScanner;