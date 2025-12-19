"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LogOut } from 'lucide-react';

interface MenuItem {
    label: string;
    icon?: React.ReactNode;
    link?: string | null;
    isLogout?: boolean;
    badge?: string | number;
}

interface ProfileDropdownProps {
    image?: string;
    userName?: string;
    userEmail?: string;
    menuItems?: MenuItem[];
    onClick?: () => void;
}

const ProfileDropdown = ({
    image = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    userName = "User",
    userEmail,
    menuItems = [],
    onClick
}: ProfileDropdownProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleDropdown = (): void => setOpen((prev) => !prev);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent): void => {
            const target = e.target as Node;
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(target) &&
                !buttonRef.current?.contains(target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent): void => {
            const items = dropdownRef.current?.querySelectorAll('[role="menuitem"]');
            const focusable = Array.from(items || []) as HTMLElement[];
            const currentIndex = focusable.findIndex(
                (el) => el === document.activeElement
            );

            switch (e.key) {
                case "Escape":
                    setOpen(false);
                    buttonRef.current?.focus();
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % focusable.length;
                    focusable[nextIndex]?.focus();
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    const prevIndex =
                        (currentIndex - 1 + focusable.length) % focusable.length;
                    focusable[prevIndex]?.focus();
                    break;
                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open]);

    const handleButtonClick = (): void => {
        if (onClick) {
            onClick();
        }
        setOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            {/* Trigger Button */}
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-2 py-1.5 rounded-full bg-linear-to-br from-primary to-primary-100 hover:from-primary-100 hover:to-primary-200 border border-accent transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 group"
                aria-haspopup="true"
                aria-expanded={open}
                aria-label="Open user menu"
                type="button"
            >
                {/* Avatar with ring */}
                <div className="relative">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-accent/30 group-hover:ring-accent transition-all duration-300 overflow-hidden">
                        <Image
                            width={40}
                            height={40}
                            src={image}
                            className="w-full h-full object-cover bg-white"
                            alt="User avatar"
                        />
                    </div>
                </div>

                {/* Chevron indicator */}
                <ChevronDown 
                    className={`w-4 h-4 text-slate-200 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div
                    ref={dropdownRef}
                    role="menu"
                    aria-label="Profile dropdown"
                    className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl ring-1 ring-accent focus:outline-none z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                >
                    {/* User Info Header */}
                    <div className="px-4 py-3 bg-linear-to-br from-primary via-primary-100 to-primary-200 border-b border-accent">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full ring-2 ring-accent/50 overflow-hidden">
                                    <Image
                                        width={48}
                                        height={48}
                                        src={image}
                                        className="w-full h-full object-cover"
                                        alt="User avatar"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="normal-text font-bold text-slate-50 truncate">
                                    {userName}
                                </p>
                                {userEmail && (
                                    <p className="small-text text-slate-200 truncate">
                                        {userEmail}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <ul className="py-2 bg-primary" role="none">
                        {menuItems.map((item: MenuItem, idx: number) => {
                            const isLogout = item.isLogout;
                            const IconComponent = item.icon;

                            return (
                                <React.Fragment key={idx}>
                                    {isLogout && (
                                        <div className="mt-2 px-3">
                                            <hr className="border-accent" role="separator" />
                                        </div>
                                    )}
                                    <li>
                                        {item.link ? (
                                            <Link
                                                href={item.link}
                                                role="menuitem"
                                                className={`
                                                    py-2 px-3
                                                    flex items-center justify-between
                                                    normal-text-2
                                                    transition-all duration-200
                                                    group
                                                    ${isLogout 
                                                        ? 'text-accent-50 hover:bg-accent/20 hover:text-accent focus:bg-accent/20 focus:text-accent' 
                                                        : 'text-white hover:bg-primary-100 hover:text-slate-100 focus:bg-primary-100 focus:text-slate-100'
                                                    }
                                                    focus:outline-none
                                                `}
                                                aria-label={`Navigate to ${item.label}`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    {IconComponent && (
                                                        <span 
                                                            className={`
                                                                w-6 h-6 small-text rounded-md  flex items-center justify-center
                                                                ${isLogout ? 'bg-accent/20 text-accent' : 'bg-accent text-white'}
                                                                group-hover:scale-110 transition-transform duration-200
                                                            `}
                                                            aria-hidden="true"
                                                        >
                                                            {IconComponent}
                                                        </span>
                                                    )}
                                                    <span className="font-medium">{item.label}</span>
                                                </span>
                                                {item.badge && (
                                                    <span 
                                                        className="px-2 py-0.5 bg-accent text-white text-xs font-bold rounded-full"
                                                        aria-label={`${item.badge} notifications`}
                                                    >
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={handleButtonClick}
                                                role="menuitem"
                                                type="button"
                                                className={`
                                                    w-full text-left py-2 px-3
                                                    flex items-center justify-between
                                                    normal-text-2
                                                    transition-all duration-200
                                                    cursor-pointer
                                                    group
                                                    ${isLogout 
                                                        ? 'text-accent-50 hover:bg-accent/20 focus:bg-accent/20 hover:text-accent focus:text-accent' 
                                                        : 'text-white hover:bg-primary-100 hover:text-slate-100 focus:bg-primary-100 focus:text-slate-100'
                                                    }
                                                    focus:outline-none
                                                `}
                                                aria-label={isLogout ? 'Logout from your account' : item.label}
                                            >
                                                <span className="flex items-center gap-3">
                                                    {IconComponent ? (
                                                        <span 
                                                            className={`
                                                                w-8 h-8 rounded-lg flex items-center justify-center
                                                                ${isLogout ? 'bg-accent/20 text-accent' : 'bg-accent text-white'}
                                                                group-hover:scale-110 transition-transform duration-200
                                                            `}
                                                            aria-hidden="true"
                                                        >
                                                            {IconComponent}
                                                        </span>
                                                    ) : isLogout ? (
                                                        <span 
                                                            className="w-7 h-7 rounded-lg flex items-center justify-center bg-accent/20 text-accent group-hover:scale-110 transition-transform duration-200"
                                                            aria-hidden="true"
                                                        >
                                                            <LogOut className="w-4 h-4" />
                                                        </span>
                                                    ) : null}
                                                    <span className="font-medium">{item.label}</span>
                                                </span>
                                                {item.badge && (
                                                    <span 
                                                        className="px-2 py-0.5 bg-accent text-white text-xs font-bold rounded-full"
                                                        aria-label={`${item.badge} notifications`}
                                                    >
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </button>
                                        )}
                                    </li>
                                </React.Fragment>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;