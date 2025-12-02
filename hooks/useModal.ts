import { useState, useCallback } from 'react';
import { UseModalReturn } from '@/types/modal.types';

/**
 * Custom hook for managing modal open/close state
 * 
 * @param initialState - Initial open state (default: false)
 * @returns Object with isOpen state and control functions
 * 
 * @example
 * ```tsx
 * const modal = useModal();
 * 
 * return (
 *   <>
 *     <button onClick={modal.open}>Open Modal</button>
 *     <Modal isOpen={modal.isOpen} onClose={modal.close}>
 *       Content here
 *     </Modal>
 *   </>
 * );
 * ```
 */
export const useModal = (initialState = false): UseModalReturn => {
    const [isOpen, setIsOpen] = useState(initialState);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return {
        isOpen,
        open,
        close,
        toggle,
    };
};

export default useModal;