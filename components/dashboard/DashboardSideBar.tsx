"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, AlertTriangle } from "lucide-react";

import { dashboardSideLinks } from "@/data/static.general";
import { AppButton, Modal } from "@/components";

const DashboardSideBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const activeLink = dashboardSideLinks
        .filter(link => pathname === link.link || pathname.startsWith(link.link + '/'))
        .sort((a, b) => b.link.length - a.link.length)[0];

    const handleLogout = async () => {
        setIsLoggingOut(true);

        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Logged out successfully');
                // Redirect to login page
                router.push('/login');
            } else {
                console.error('Logout failed:', response.status);
                alert('Failed to logout. Please try again.');
            }
        } catch (error) {
            console.error('Logout error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoggingOut(false);
            setShowLogoutModal(false);
        }
    };

    return (
        <>
            <nav
                className="w-56 fixed h-[calc(100vh-2rem)] bg-primary-100 rounded-xl hidden p-2 overflow-hidden md:flex flex-col justify-between shadow-2xl border-2 border-accent"
                role="navigation"
                aria-label="Dashboard sidebar"
            >
                <div className="flex flex-col gap-2">
                    {/* Navigation Links */}
                    <div className="space-y-1">
                        {dashboardSideLinks.map((link, index) => {
                            const isActive = link.link === activeLink?.link;

                            return (
                                <Link
                                    key={index}
                                    href={link.link}
                                    className={`flex items-center rounded-xl gap-3 px-3 py-2 transition-all duration-300 relative group ${
                                        isActive
                                            ? "bg-accent text-white shadow-lg border-2 border-accent"
                                            : "text-slate-200 hover:bg-primary-200 hover:pl-5 border-2 border-transparent hover:border-accent/30"
                                    }`}
                                    aria-current={isActive ? "page" : undefined}
                                    aria-label={`Go to ${link.title}${isActive ? " (current page)" : ""}`}
                                >
                                    {/* Active indicator */}
                                    {isActive && (
                                        <div
                                            className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-white rounded-r-full"
                                            aria-hidden="true"
                                        />
                                    )}

                                    <span
                                        className={`text-xl shrink-0 ${isActive ? 'text-white' : 'text-accent-50 group-hover:text-accent-100'}`}
                                        aria-hidden="true"
                                    >
                                        {link.icon}
                                    </span>
                                    <span className={`normal-text-2 font-semibold ${
                                        isActive ? "text-white" : "group-hover:text-white"
                                    }`}>
                                        {link.title}
                                    </span>

                                    {isActive && (
                                        <span className="sr-only"> (current page)</span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Footer section - logout */}
                <div className="border-t border-accent/70 pt-4 mt-4">
                    <AppButton
                        onClick={() => setShowLogoutModal(true)}
                        variant="danger"
                        className="w-full"
                        aria-label="Logout from dashboard"
                        title="Logout"
                        fullWidth
                        icon={<LogOut className="w-4 h-4" />}
                        iconPosition="left"
                    />
                </div>
            </nav>

            {/* Logout Confirmation Modal */}
            <Modal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                title="Confirm Logout"
                size="sm"
                footer={
                    <>
                        <button
                            onClick={() => setShowLogoutModal(false)}
                            disabled={isLoggingOut}
                            className="px-4 py-2 rounded-xl border-2 border-accent text-accent-50 hover:bg-accent hover:text-white transition-all duration-300 font-semibold normal-text disabled:opacity-50 disabled:cursor-not-allowed"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all duration-300 font-semibold normal-text disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            type="button"
                        >
                            {isLoggingOut ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Logging out...
                                </>
                            ) : (
                                <>
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </>
                            )}
                        </button>
                    </>
                }
            >
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-red-400" aria-hidden="true" />
                    </div>
                    <div>
                        <p className="big-text-5 text-white font-semibold mb-2">
                            Are you sure you want to logout?
                        </p>
                        <p className="normal-text text-slate-300">
                            You will need to login again to access your dashboard.
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DashboardSideBar;