"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Plus, ShieldCheck } from "lucide-react";
import { useAlertModal } from "@/contexts/AlertModalContext";

type Props = {
    canCreateEvent: boolean;
    className?: string;
    createLabel?: string;
    verifyLabel?: string;
};

const CreateEventGuardButton = ({
    canCreateEvent,
    className = "",
    createLabel = "Create Event",
    verifyLabel = "Verify to Create Event",
}: Props) => {
    const router = useRouter();
    const { showConfirm } = useAlertModal();

    const handleClick = () => {
        if (canCreateEvent) {
            router.push("/dashboard/events/create");
            return;
        }

        showConfirm({
            title: "Identity Verification Required",
            message: "You need to complete identity verification before creating an event.",
            confirmText: "Start Verification",
            cancelText: "Cancel",
            variant: "info",
            onConfirm: () => router.push("/dashboard/profile/verify"),
        });
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={className}
        >
            {canCreateEvent ? (
                <>
                    <Plus className="w-5 h-5" aria-hidden="true" />
                    {createLabel}
                </>
            ) : (
                <>
                    <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                    {verifyLabel}
                </>
            )}
        </button>
    );
};

export default CreateEventGuardButton;
