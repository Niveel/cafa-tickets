"use client";

import React, { useEffect, useRef, useState } from 'react';
import { CgMenuLeft } from "react-icons/cg";
import { RiCloseLargeLine } from "react-icons/ri";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { dashboardSideLinks } from '@/data/static.general';
import { CurrentUser } from '@/types/general.types';
import { ProfileCard } from '@/components';

type Props = {
    user: CurrentUser | null;
};

const DashboardTopBar: React.FC<Props> = ({ user }) => {
    const [showNavMenu, setShowNavMenu] = useState<boolean>(false);
    const navRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const activeLink = dashboardSideLinks
        .filter(link => pathname === link.link || pathname.startsWith(link.link + '/'))
        .sort((a, b) => b.link.length - a.link.length)[0];

    // Close menu on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowNavMenu(false);
            }
        };

        if (showNavMenu) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showNavMenu]);

    // Focus trap for mobile menu
    useEffect(() => {
        if (!showNavMenu || !navRef.current) return;

        const focusableElements = navRef.current.querySelectorAll<HTMLElement>(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        const trapFocus = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        };

        document.addEventListener('keydown', trapFocus);
        firstEl?.focus();

        return () => {
            document.removeEventListener('keydown', trapFocus);
        };
    }, [showNavMenu]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (showNavMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [showNavMenu]);

    return (
        <>
            <nav
                className="w-full md:w-[calc(100%-1rem)] md:ml-4 py-3 px-4 sm:px-6 bg-primary-100 rounded-xl shadow-lg border-2 border-accent"
                aria-label="Top navigation"
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden text-2xl bg-accent duration-300 hover:bg-accent-100 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-50"
                            onClick={() => setShowNavMenu(true)}
                            aria-label="Open main menu"
                            aria-expanded={showNavMenu}
                            aria-controls="mobile-navigation"
                            type="button"
                        >
                            <CgMenuLeft aria-hidden="true" />
                        </button>
                        <h1 className="uppercase font-bold text-white big-text-5">
                            Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <ProfileCard user={user} />
                    </div>
                </div>
            </nav>

            {/* Mobile Nav Menu Overlay */}
            {showNavMenu && (
                <div
                    className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-8999"
                    onClick={() => setShowNavMenu(false)}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Nav Menu */}
            <nav
                id="mobile-navigation"
                ref={navRef}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
                className={`w-full max-w-xs fixed z-9000 top-0 left-0 h-screen bg-primary-100 duration-300 overflow-auto shadow-2xl border-r-2 border-accent ${
                    showNavMenu ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-4 flex justify-between items-center border-b border-accent">
                    <h2 className="big-text-4 font-bold text-white">Menu</h2>
                    <button
                        onClick={() => setShowNavMenu(false)}
                        className="text-2xl text-slate-300 hover:text-accent-50 focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-2 transition-colors duration-300"
                        aria-label="Close navigation menu"
                        type="button"
                    >
                        <RiCloseLargeLine aria-hidden="true" />
                    </button>
                </div>

                <ul className="py-4 px-3 space-y-2">
                    {dashboardSideLinks.map((link, index) => {
                        const isActive = link.link === activeLink?.link;

                        return (
                            <li key={index}>
                                <Link
                                    href={link.link}
                                    className={`px-4 py-3 rounded-xl duration-300 flex items-center gap-3 w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent transition-all ${
                                        isActive 
                                            ? 'bg-accent text-white shadow-lg border-2 border-accent' 
                                            : 'text-slate-200 hover:bg-primary-200 border-2 border-transparent hover:border-accent/30'
                                    }`}
                                    onClick={() => setShowNavMenu(false)}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    <span
                                        className={`text-xl shrink-0 ${isActive ? 'text-white' : 'text-accent-50'}`}
                                        aria-hidden="true"
                                    >
                                        {link.icon}
                                    </span>
                                    <span className="font-semibold normal-text-2">{link.title}</span>
                                    {isActive && (
                                        <span className="sr-only"> (current page)</span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Footer in mobile menu */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-accent/30 bg-primary">
                    <p className="small-text text-slate-300 text-center">
                        Cafa Ticket Dashboard
                    </p>
                </div>
            </nav>
        </>
    );
};

export default DashboardTopBar;