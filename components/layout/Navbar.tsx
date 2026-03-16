"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, Plus } from "lucide-react";

import { placeholderPic } from '@/data/constants';
import { navLinks, profileMenuItems } from "@/data/static.general";
import { ProfileDropdown, AppButton, Modal } from "@/components";
import { CurrentUser as CurrentUserType } from "@/types/general.types";
import { useAlertModal } from "@/contexts/AlertModalContext";

interface NavBarProps { 
    isLoggedIn?: boolean;
    currentUser?: CurrentUserType | null;
}

const Navbar = ({ isLoggedIn = false, currentUser = null }: NavBarProps) => {
    const router = useRouter();
    const [navbarActive, setNavbarActive] = useState<boolean>(true);
    const [showBg, setShowBg] = useState<boolean>(false);
    const [mobileNavMenuActive, setMobileNavMenuActive] = useState<boolean>(false);
    const [lastScrollY, setLastScrollY] = useState<number>(0);
    
    // Logout confirmation modal state
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const { showConfirm } = useAlertModal();

    const pathname = usePathname();

    // Toggle navbar visibility based on scroll direction
    useEffect(() => {
        const handleScroll = (): void => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                setNavbarActive(false);
            } else {
                setNavbarActive(true);
            }

            if (window.scrollY > 50) {
                setShowBg(true);
            } else {
                setShowBg(false);
            }

            setMobileNavMenuActive(false);
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Lock body scroll when mobile nav is active
    useEffect(() => {
        const body = document.querySelector("body");
        const main = document.querySelector("main");

        if (mobileNavMenuActive) {
            body!.style.overflow = "hidden";
            if (main) main.setAttribute("aria-hidden", "true");
            closeButtonRef.current?.focus();
        } else {
            body!.style.overflow = "";
            if (main) main.removeAttribute("aria-hidden");
        }

        return () => {
            body!.style.overflow = "";
            if (main) main.removeAttribute("aria-hidden");
        };
    }, [mobileNavMenuActive]);

    // Keyboard navigation for mobile menu
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            if (!mobileNavMenuActive) return;

            if (e.key === "Escape") {
                setMobileNavMenuActive(false);
            }

            if (e.key === "Tab") {
                const focusableElements = mobileMenuRef.current?.querySelectorAll(
                    'a[href], button:not([disabled]), [tabindex="0"]'
                );

                if (!focusableElements) return;

                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [mobileNavMenuActive]);

    const handleLogoutClick = (): void => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = async (): Promise<void> => {
        setIsLoggingOut(true);
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                window.location.href = '/';
            } else {
                console.error('Logout failed');
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Logout error:', error);
            window.location.href = '/';
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleLogoutCancel = (): void => {
        if (!isLoggingOut) {
            setShowLogoutModal(false);
        }
    };

    const handleCreateEventClick = () => {
        if (currentUser?.is_organizer) {
            router.push('/dashboard/events/create');
            setMobileNavMenuActive(false);
            return;
        }

        showConfirm({
            title: 'Identity Verification Required',
            message: 'You need to complete identity verification before creating an event.',
            confirmText: 'Start Verification',
            cancelText: 'Cancel',
            variant: 'info',
            onConfirm: () => {
                setMobileNavMenuActive(false);
                router.push('/dashboard/profile/verify');
            },
        });
    };

    return (
        <>
            <nav
                className={`
                    fixed top-0 left-0 w-full z-5000
                    transition-all duration-500
                    ${navbarActive ? "translate-y-0" : "-translate-y-full"}
                    ${showBg 
                        ? 'bg-primary backdrop-blur-xl shadow-lg border-b border-accent' 
                        : 'bg-transparent'
                    }
                `}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        {/* Logo Section */}
                        <div className="flex items-center gap-6 sm:gap-8">
                            <Link
                                href="/"
                                className="flex items-center gap-3 group"
                                aria-label="Cafa Ticket Home"
                            >
                                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden ring-2 ring-accent/30 group-hover:ring-accent transition-all duration-300 group-hover:scale-105">
                                    <Image
                                        src="/assets/logo.png"
                                        width={48}
                                        height={48}
                                        alt="Cafa Ticket Logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="big-text-5 font-bold text-white">
                                        Cafa Ticket
                                    </h1>
                                    <p className="small-text-2 text-slate-200 -mt-1">
                                        Your Event Partner
                                    </p>
                                </div>
                            </Link>

                            {/* Desktop Navigation Links */}
                            <div className="hidden lg:flex items-center gap-1">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.url;

                                    return (
                                        <Link
                                            key={link.id}
                                            href={link.url}
                                            className={`
                                                px-4 py-2 rounded-lg
                                                normal-text font-medium
                                                flex items-center gap-2
                                                transition-all duration-300
                                                ${isActive
                                                    ? 'bg-accent text-white shadow-md border border-accent'
                                                    : 'text-white hover:bg-primary-100 hover:text-slate-100 border border-transparent'
                                                }
                                            `}
                                        >
                                            <span className="text-base">{link.icon}</span>
                                            <span>{link.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Section - Auth & Actions */}
                        <div className="flex items-center gap-3">
                            {isLoggedIn ? (
                                <>
                                    {/* Create Event Button - Desktop */}
                                    <div className="hidden sm:block">
                                        <AppButton
                                            title="Create Event"
                                            onClick={handleCreateEventClick}
                                            variant="primary"
                                            size="md"
                                            icon={<Plus className="w-4 h-4" />}
                                            iconPosition="left"
                                        />
                                    </div>

                                    {/* Profile Dropdown */}
                                    <ProfileDropdown
                                        image={currentUser?.profile_image || placeholderPic}
                                        userName={currentUser?.full_name}
                                        userEmail={currentUser?.email}
                                        menuItems={profileMenuItems}
                                        onClick={handleLogoutClick}
                                    />
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <AppButton
                                        title="Login"
                                        url="/login"
                                        variant="outline"
                                        size="md"
                                        className="hidden sm:inline-flex"
                                    />
                                    <AppButton
                                        title="Sign Up"
                                        url="/signup"
                                        variant="primary"
                                        size="md"
                                    />
                                </div>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button
                                className="lg:hidden p-2 rounded-lg bg-accent text-white hover:bg-accent-100 transition-colors duration-300"
                                aria-label="Open mobile menu"
                                onClick={() => setMobileNavMenuActive(true)}
                                type="button"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            <div
                ref={mobileMenuRef}
                className={`
                    fixed inset-0 bg-primary z-50000
                    transition-all duration-500 ease-out
                    ${mobileNavMenuActive
                        ? "opacity-100 translate-x-0 visible pointer-events-auto"
                        : "opacity-0 translate-x-full invisible pointer-events-none"
                    }
                `}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
            >
                {/* Mobile Menu Header */}
                <div className="flex justify-between items-center p-4 border-b border-accent bg-linear-to-r from-primary-100 to-primary-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-accent/30">
                            <Image
                                src="/assets/images/logo.png"
                                width={40}
                                height={40}
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="normal-text font-bold text-white">Cafa Ticket</h2>
                            <p className="small-text text-slate-200">Menu</p>
                        </div>
                    </div>
                    <button
                        ref={closeButtonRef}
                        className="p-2 rounded-lg bg-accent text-white hover:bg-accent-100 transition-colors"
                        aria-label="Close mobile menu"
                        onClick={() => setMobileNavMenuActive(false)}
                        type="button"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Mobile Menu Content */}
                <div className="overflow-y-auto h-[calc(100vh-73px)] p-6">
                    {/* User Info Section - Mobile */}
                    {isLoggedIn && currentUser && (
                        <div className="mb-6 p-4 rounded-xl bg-linear-to-br from-primary-100 via-primary-200 to-primary border border-accent/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-accent">
                                    <Image
                                        src={currentUser.profile_image || placeholderPic}
                                        width={56}
                                        height={56}
                                        alt="Profile"
                                        className="w-full h-full object-cover bg-white"
                                    />
                                </div>
                                <div>
                                    <p className="normal-text font-bold text-white">
                                        {currentUser.full_name}
                                    </p>
                                    <p className="small-text text-slate-200">
                                        {currentUser.email}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Link
                                    href="/tickets"
                                    className="px-3 py-2 rounded-lg bg-primary-200 text-white text-center small-text font-medium hover:bg-primary-100 transition-colors border border-accent/20"
                                    onClick={() => setMobileNavMenuActive(false)}
                                >
                                    My Tickets
                                </Link>
                                <button
                                    type="button"
                                    className="px-3 py-2 rounded-lg bg-accent text-white text-center small-text font-medium hover:bg-accent-100 transition-colors"
                                    onClick={handleCreateEventClick}
                                >
                                    Create Event
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Navigation Links */}
                    <nav className="space-y-2 mb-6">
                        <p className="small-text font-semibold text-slate-300 uppercase tracking-wider mb-3">
                            Navigation
                        </p>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.url;

                            return (
                                <Link
                                    key={link.id}
                                    href={link.url}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl
                                        transition-all duration-300
                                        ${isActive
                                            ? 'bg-accent text-white shadow-lg border border-accent'
                                            : 'text-slate-200 hover:bg-primary-100 hover:text-white border border-transparent hover:border-accent/20'
                                        }
                                    `}
                                    onClick={() => setMobileNavMenuActive(false)}
                                >
                                    <span className="text-xl">{link.icon}</span>
                                    <span className="big-text-5 font-medium">{link.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Auth Section - Mobile */}
                    {!isLoggedIn && (
                        <div className="space-y-3 pt-6 border-t border-accent/30">
                            <AppButton
                                title="Login"
                                url="/login"
                                variant="outline"
                                size="lg"
                                fullWidth
                            />
                            <AppButton
                                title="Sign Up"
                                url="/signup"
                                variant="primary"
                                size="lg"
                                fullWidth
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            <Modal
                isOpen={showLogoutModal}
                onClose={handleLogoutCancel}
                size="sm"
                closeOnBackdropClick={!isLoggingOut}
                closeOnEscape={!isLoggingOut}
                footer={
                    <>
                        <button
                            onClick={handleLogoutCancel}
                            disabled={isLoggingOut}
                            className="flex-1 px-6 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogoutConfirm}
                            disabled={isLoggingOut}
                            className="flex-1 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                            type="button"
                        >
                            {isLoggingOut ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Logging out...
                                </>
                            ) : (
                                'Logout'
                            )}
                        </button>
                    </>
                }
            >
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                        <X className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="big-text-4 font-bold text-slate-900 mb-2">
                        Logout Confirmation
                    </h3>
                    <p className="normal-text text-slate-600 mb-4">
                        Are you sure you want to logout? You will need to login again to access your account.
                    </p>
                    {isLoggedIn && currentUser && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="normal-text-2 text-red-800">
                                User: <span className="font-bold">{currentUser.full_name}</span>
                            </p>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default Navbar;
