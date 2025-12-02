import { ReactNode } from 'react';

/**
 * Modal component props interface
 */
export interface ModalProps {
    /** Controls modal visibility */
    isOpen: boolean;
    
    /** Callback function when modal should close */
    onClose: () => void;
    
    /** Modal title - displayed in header */
    title?: string;
    
    /** Modal description - displayed below title */
    description?: string;
    
    /** Main content of the modal */
    children: ReactNode;
    
    /** Size variant of the modal */
    size?: ModalSize;
    
    /** Show/hide the X close button in header */
    showCloseButton?: boolean;
    
    /** Allow closing modal by clicking backdrop */
    closeOnBackdropClick?: boolean;
    
    /** Allow closing modal with Escape key */
    closeOnEscape?: boolean;
    
    /** Footer content (typically action buttons) */
    footer?: ReactNode;
    
    /** Additional CSS classes for modal container */
    className?: string;
    
    /** Additional CSS classes for backdrop overlay */
    overlayClassName?: string;
}

/**
 * Available modal sizes
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Common modal action button props
 */
export interface ModalActionButtonProps {
    /** Button label */
    label: string;
    
    /** Click handler */
    onClick: () => void | Promise<void>;
    
    /** Button variant/style */
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    
    /** Loading state */
    isLoading?: boolean;
    
    /** Disabled state */
    disabled?: boolean;
    
    /** Optional icon */
    icon?: ReactNode;
    
    /** Additional CSS classes */
    className?: string;
}

/**
 * Confirmation modal specific props
 */
export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'warning' | 'info';
    isConfirming?: boolean;
}

/**
 * Alert modal specific props
 */
export interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    variant?: 'success' | 'error' | 'warning' | 'info';
    actionLabel?: string;
}

/**
 * Helper hook return type for modal state management
 */
export interface UseModalReturn {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}