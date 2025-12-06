import {
    FaMobile,
    FaCalendarAlt,
    FaSignOutAlt, 
    FaTicketAlt,
    FaHistory,
    FaHome, 
    FaCogs, 
    FaUser,
    FaCreditCard,
    FaClipboardCheck,
} from "react-icons/fa";
import {
    FaFacebookF,
    FaYoutube,
} from 'react-icons/fa6';
import { MdDashboard, MdCalendarMonth } from "react-icons/md";

import { NavLink, ProfileMenuItem, DashboardSideLink } from "@/types/general.types";

export const navLinks: NavLink[] = [
    {
        id: 3,
        name: "Events",
        url: "/events",
        icon: <FaCalendarAlt />,
    },
    {
        id: 4,
        name: "Contact us",
        url: "/contact",
        icon: <FaMobile />,
    },
    {
        id: 5,
        name: "Events History",
        url: "/events/history",
        icon: <FaHistory />,
    },
];

export const socialLinks = [
    {
        id: 1,
        label: "Facebook",
        icon: <FaFacebookF />,
        href: "#",
    },
    {
        id: 4,
        label: "YouTube",
        icon: <FaYoutube />,
        href: "#",
    },
];

export const contactInfo = [
    {
        id: 1,
        label: "Email",
        value: "cafatickets74@gmail.com",
        href: "mailto:cafatickets74@gmail.com",
    },
    {
        id: 2,
        label: "Phone",
        value: "+233 5455454 545",
        href: "tel:+233555454545",
    },
];

export const profileMenuItems: ProfileMenuItem[] = [
    {
        label: "Dashboard",
        icon: <MdDashboard />,
        link: "/dashboard",
    },
    {
        label: "My events",
        icon: <MdCalendarMonth />,
        link: "/dashboard/events",
    },
    {
        label: "My tickets",
        icon: <FaTicketAlt />,
        link: "/dashboard/my-tickets",
    },
    {
        label: "Logout",
        icon: <FaSignOutAlt />,
        link: null,
        isLogout: true,
    },
];

export const cities = ["Accra", "Kumasi", "Tamale", "Takoradi", "Cape Coast", "Tema", "Ashaiman", "Obuasi"];

export const dashboardSideLinks: DashboardSideLink[] = [
    {
        id: 0,
        title: "Home",
        icon: <FaHome />,
        link: "/"
    },
    {
        id: 10,
        title: "Dashboard",
        icon: <MdDashboard />,
        link: "/dashboard"
    },
    {
        id: 1,
        title: "Profile",
        icon: <FaUser />,
        link: "/dashboard/profile"
    },
    {
        id: 2,
        title: "Events",
        icon: <MdCalendarMonth />,
        link: "/dashboard/events"
    },
    {
        id: 4,
        title: "Payments",
        icon: <FaCreditCard />,
        link: "/dashboard/payments"
    },
    {
        id: 7,
        title: "Check in",
        icon: <FaClipboardCheck />,
        link: "/dashboard/check-in"
    },
    {
        id: 5,
        title: "Settings",
        icon: <FaCogs />,
        link: "/dashboard/settings"
    },
]