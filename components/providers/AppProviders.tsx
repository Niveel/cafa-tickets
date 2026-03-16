"use client";

import React from "react";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AlertModalProvider } from "@/contexts/AlertModalContext";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <CurrencyProvider>
            <AlertModalProvider>
                {children}
            </AlertModalProvider>
        </CurrencyProvider>
    );
};

export default AppProviders;
