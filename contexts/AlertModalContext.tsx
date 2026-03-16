"use client";

import React from "react";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Modal } from "@/components";

type AlertVariant = "info" | "success" | "error";

type AlertOptions = {
    title?: string;
    message: string;
    confirmText?: string;
    variant?: AlertVariant;
    onConfirm?: () => void;
};

type ConfirmOptions = {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: AlertVariant;
    onConfirm?: () => void;
    onCancel?: () => void;
};

type ModalState =
    | (AlertOptions & { kind: "alert" })
    | (ConfirmOptions & { kind: "confirm" })
    | null;

type AlertModalContextValue = {
    showAlert: (options: AlertOptions) => void;
    showConfirm: (options: ConfirmOptions) => void;
};

const AlertModalContext = React.createContext<AlertModalContextValue | null>(null);

const defaultTitleByVariant: Record<AlertVariant, string> = {
    info: "Notice",
    success: "Success",
    error: "Something Went Wrong",
};

const getVariantStyles = (variant: AlertVariant) => {
    if (variant === "success") {
        return {
            iconBg: "bg-emerald-500/20",
            iconText: "text-emerald-400",
            confirmBtn: "bg-emerald-600 hover:bg-emerald-700 text-white",
        };
    }

    if (variant === "error") {
        return {
            iconBg: "bg-red-500/20",
            iconText: "text-red-400",
            confirmBtn: "bg-red-600 hover:bg-red-700 text-white",
        };
    }

    return {
        iconBg: "bg-blue-500/20",
        iconText: "text-blue-400",
        confirmBtn: "bg-accent hover:bg-accent-100 text-white",
    };
};

export const AlertModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalState, setModalState] = React.useState<ModalState>(null);

    const closeModal = React.useCallback(() => {
        setModalState(null);
    }, []);

    const showAlert = React.useCallback((options: AlertOptions) => {
        setModalState({
            kind: "alert",
            confirmText: "OK",
            variant: "info",
            ...options,
        });
    }, []);

    const showConfirm = React.useCallback((options: ConfirmOptions) => {
        setModalState({
            kind: "confirm",
            confirmText: "Confirm",
            cancelText: "Cancel",
            variant: "info",
            ...options,
        });
    }, []);

    const value = React.useMemo(
        () => ({
            showAlert,
            showConfirm,
        }),
        [showAlert, showConfirm]
    );

    const variant = modalState?.variant || "info";
    const styles = getVariantStyles(variant);

    const handleConfirm = () => {
        modalState?.onConfirm?.();
        closeModal();
    };

    const handleCancel = () => {
        if (modalState?.kind === "confirm") {
            modalState.onCancel?.();
        }
        closeModal();
    };

    return (
        <AlertModalContext.Provider value={value}>
            {children}

            <Modal
                isOpen={!!modalState}
                onClose={handleCancel}
                size="sm"
                title={modalState?.title || defaultTitleByVariant[variant]}
                closeOnEscape
                closeOnBackdropClick
                footer={
                    modalState ? (
                        <>
                            {modalState.kind === "confirm" && (
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 rounded-xl border-2 border-accent text-accent-50 hover:bg-accent hover:text-white transition-all duration-300 font-semibold normal-text"
                                    type="button"
                                >
                                    {modalState.cancelText || "Cancel"}
                                </button>
                            )}
                            <button
                                onClick={handleConfirm}
                                className={`px-4 py-2 rounded-xl transition-all duration-300 font-semibold normal-text ${styles.confirmBtn}`}
                                type="button"
                            >
                                {modalState.confirmText || "OK"}
                            </button>
                        </>
                    ) : null
                }
            >
                {modalState && (
                    <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${styles.iconBg}`}>
                            {variant === "success" && (
                                <CheckCircle2 className={`w-5 h-5 ${styles.iconText}`} aria-hidden="true" />
                            )}
                            {variant === "error" && (
                                <AlertTriangle className={`w-5 h-5 ${styles.iconText}`} aria-hidden="true" />
                            )}
                            {variant === "info" && (
                                <Info className={`w-5 h-5 ${styles.iconText}`} aria-hidden="true" />
                            )}
                        </div>
                        <p className="normal-text text-slate-200 leading-relaxed">
                            {modalState.message}
                        </p>
                    </div>
                )}
            </Modal>
        </AlertModalContext.Provider>
    );
};

export const useAlertModal = () => {
    const context = React.useContext(AlertModalContext);

    if (!context) {
        throw new Error("useAlertModal must be used within AlertModalProvider");
    }

    return context;
};
