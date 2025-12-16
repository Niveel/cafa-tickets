"use client";

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    footer?: React.ReactNode;
    className?: string;
    overlayClassName?: string;
}

const Modal = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    footer,
    className = '',
    overlayClassName = '',
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Size variants
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-full mx-4',
    };

    // Handle escape key press
    useEffect(() => {
        if (!isOpen || !closeOnEscape) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeOnEscape, onClose]);

    // Focus management
    useEffect(() => {
        if (isOpen) {
            // Store the currently focused element
            previousActiveElement.current = document.activeElement as HTMLElement;

            // Focus the modal
            modalRef.current?.focus();

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Restore body scroll
            document.body.style.overflow = '';

            // Return focus to the previously focused element
            if (previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Focus trap
    useEffect(() => {
        if (!isOpen) return;

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || !modalRef.current) return;

            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement?.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement?.focus();
            }
        };

        document.addEventListener('keydown', handleTabKey);
        return () => document.removeEventListener('keydown', handleTabKey);
    }, [isOpen]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`fixed inset-0 bg-primary/90 backdrop-blur-sm z-9998 ${overlayClassName}`}
                        onClick={handleBackdropClick}
                        aria-hidden="true"
                    />

                    {/* Modal Container */}
                    <div
                        className="fixed inset-0 z-9999 flex items-center justify-center p-4 overflow-y-auto"
                        onClick={handleBackdropClick}
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className={`
                                relative bg-primary-100 rounded-2xl shadow-2xl w-full border-2 border-accent
                                ${sizeClasses[size]}
                                ${className}
                            `}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={title ? 'modal-title' : undefined}
                            aria-describedby={description ? 'modal-description' : undefined}
                            tabIndex={-1}
                        >
                            {/* Header */}
                            {(title || showCloseButton) && (
                                <div className="flex items-start justify-between p-6 pb-4 border-b border-accent/30">
                                    <div className="flex-1 pr-4">
                                        {title && (
                                            <h2
                                                id="modal-title"
                                                className="big-text-4 font-bold text-white"
                                            >
                                                {title}
                                            </h2>
                                        )}
                                        {description && (
                                            <p
                                                id="modal-description"
                                                className="normal-text text-slate-200 mt-1"
                                            >
                                                {description}
                                            </p>
                                        )}
                                    </div>

                                    {showCloseButton && (
                                        <button
                                            onClick={onClose}
                                            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary-100"
                                            aria-label="Close modal"
                                            type="button"
                                        >
                                            <X className="w-5 h-5" aria-hidden="true" />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Body */}
                            <div className="p-6 text-white">
                                {children}
                            </div>

                            {/* Footer */}
                            {footer && (
                                <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-accent/30 bg-primary rounded-b-2xl">
                                    {footer}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;