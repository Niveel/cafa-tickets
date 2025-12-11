"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { dashboardSideLinks } from "@/data/static.general";
import {AppButton} from "@/components";

const DashboardSideBar: React.FC = () => {
    const pathname = usePathname();

    const activeLink = dashboardSideLinks
        .filter(link => pathname === link.link || pathname.startsWith(link.link + '/'))
        .sort((a, b) => b.link.length - a.link.length)[0];

    const handleLogout = () => {
        // Implement logout functionality here
        console.log("Logout clicked");
    }

    return (
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
                        onClick={handleLogout}
                        variant="danger"
                        className="w-full"
                        aria-label="Logout from dashboard"
                        title="Logout"
                        fullWidth
                    />
            </div>
        </nav>
    );
};

export default DashboardSideBar;