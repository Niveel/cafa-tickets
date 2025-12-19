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

import { NavLink, ProfileMenuItem, DashboardSideLink, PolicySection, TermSection } from "@/types/general.types";

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
        value: "info@cafaticket.com",
        href: "mailto:info@cafaticket.com",
    },
    // {
    //     id: 2,
    //     label: "Phone",
    //     value: "+233 5455454 545",
    //     href: "tel:+233555454545",
    // },
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
        link: "/dashboard/tickets",
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
        id: 20,
        title: "Tickets",
        icon: <FaTicketAlt />,
        link: "/dashboard/tickets"
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

export const privacyPolicy: PolicySection[] = [
    {
        id: 1,
        title: "Introduction",
        content: [
            "Welcome to Cafa Ticket. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our event ticketing platform.",
            "By accessing or using Cafa Ticket, you agree to the terms outlined in this Privacy Policy. If you do not agree with these terms, please do not use our services."
        ]
    },
    {
        id: 2,
        title: "Information We Collect",
        content: [
            "We collect information that you provide directly to us when creating an account, purchasing tickets, organizing events, or communicating with us. This includes:",
            "Personal Information: Name, email address, phone number, profile picture, bio, city, and country.",
            "Account Information: Username, password (encrypted), and authentication tokens.",
            "Payment Information: Payment method details, billing address, and transaction history. Note that we do not store complete credit card numbers - these are processed securely by our payment partners.",
            "Event Information: Details about events you organize or attend, including ticket purchases, check-ins, and event preferences.",
            "Communication Data: Messages sent through our platform, customer support inquiries, and feedback.",
            "Usage Data: Information about how you interact with our platform, including IP address, browser type, device information, pages visited, and time spent on our platform.",
            "Location Data: With your permission, we may collect location information to provide location-based services and improve event recommendations."
        ]
    },
    {
        id: 3,
        title: "How We Use Your Information",
        content: [
            "We use the collected information for the following purposes:",
            "Service Delivery: To process ticket purchases, manage event registrations, send event notifications and reminders, and facilitate event check-ins.",
            "Account Management: To create and manage your account, authenticate your identity, and provide customer support.",
            "Event Organization: To enable event organizers to manage their events, track ticket sales, and communicate with attendees.",
            "Personalization: To personalize your experience, recommend relevant events, and customize content based on your preferences.",
            "Communication: To send transactional emails, marketing communications (with your consent), and important platform updates.",
            "Analytics: To analyze platform usage, improve our services, develop new features, and understand user behavior.",
            "Security: To detect and prevent fraud, maintain platform security, and protect against unauthorized access.",
            "Legal Compliance: To comply with legal obligations, enforce our terms of service, and resolve disputes."
        ]
    },
    {
        id: 4,
        title: "Information Sharing and Disclosure",
        content: [
            "We share your information only in the following circumstances:",
            "Event Organizers: When you purchase a ticket, we share your name, email, and attendance information with the event organizer to facilitate event management.",
            "Service Providers: We work with trusted third-party service providers who assist us with payment processing, email delivery, analytics, customer support, and hosting services. These providers are bound by confidentiality agreements.",
            "Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.",
            "Legal Requirements: We may disclose your information if required by law, court order, or government request, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.",
            "With Your Consent: We may share your information with third parties when you explicitly provide consent."
        ]
    },
    {
        id: 5,
        title: "Data Security",
        content: [
            "We implement industry-standard security measures to protect your personal information:",
            "Encryption: All sensitive data is encrypted in transit using SSL/TLS protocols and at rest using strong encryption algorithms.",
            "Access Controls: We limit access to personal information to authorized personnel who need it to perform their job functions.",
            "Regular Audits: We conduct regular security audits and vulnerability assessments to identify and address potential risks.",
            "Secure Infrastructure: Our platform is hosted on secure servers with redundant backups and disaster recovery procedures.",
            "However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security."
        ]
    },
    {
        id: 6,
        title: "Your Rights and Choices",
        content: [
            "You have the following rights regarding your personal information:",
            "Access: You can access and review your personal information through your account dashboard.",
            "Correction: You can update or correct your personal information at any time through your profile settings.",
            "Deletion: You can request deletion of your account and personal information. Note that we may retain certain information for legal or business purposes.",
            "Data Portability: You can request a copy of your personal information in a structured, machine-readable format.",
            "Marketing Opt-Out: You can opt out of marketing communications by clicking the unsubscribe link in emails or adjusting your notification preferences.",
            "Cookie Management: You can control cookie preferences through your browser settings."
        ]
    },
    {
        id: 7,
        title: "Cookies and Tracking Technologies",
        content: [
            "We use cookies and similar tracking technologies to enhance your experience on our platform:",
            "Essential Cookies: Required for basic platform functionality, including authentication and security.",
            "Analytics Cookies: Help us understand how users interact with our platform to improve services.",
            "Preference Cookies: Remember your settings and preferences for a personalized experience.",
            "Marketing Cookies: Used to deliver relevant advertisements and measure campaign effectiveness.",
            "You can manage cookie preferences through your browser settings, but disabling certain cookies may affect platform functionality."
        ]
    },
    {
        id: 8,
        title: "Children's Privacy",
        content: [
            "Cafa Ticket is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately, and we will take steps to delete such information."
        ]
    },
    {
        id: 9,
        title: "International Data Transfers",
        content: [
            "Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our services, you consent to the transfer of your information to these countries. We take appropriate measures to ensure your information remains protected."
        ]
    },
    {
        id: 10,
        title: "Data Retention",
        content: [
            "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When you delete your account, we will delete or anonymize your personal information, except where we are required to retain it for legal or business purposes."
        ]
    },
    {
        id: 11,
        title: "Changes to This Privacy Policy",
        content: [
            "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or business needs. We will notify you of significant changes by posting the updated policy on our platform and updating the 'Last Updated' date. We encourage you to review this policy periodically."
        ]
    },
    {
        id: 12,
        title: "Contact Us",
        content: [
            "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
            "Email: info@cafaticket.com",
            "Phone: +233 5455454 545",
            "We will respond to your inquiry within a reasonable timeframe and work to address your concerns."
        ]
    }
];

export const termsOfService: TermSection[] = [
    {
        id: 1,
        title: "Agreement to Terms",
        content: [
            "By accessing and using Cafa Ticket ('the Platform', 'we', 'us', or 'our'), you agree to be bound by these Terms of Service ('Terms'). These Terms constitute a legally binding agreement between you and Cafa Ticket.",
            "If you do not agree to these Terms, you must not access or use the Platform. Your continued use of the Platform signifies your acceptance of these Terms and any future modifications."
        ]
    },
    {
        id: 2,
        title: "Eligibility",
        content: [
            "You must be at least 13 years old to use Cafa Ticket. Users between 13 and 18 years old must have parental or guardian consent to use the Platform.",
            "To purchase tickets or organize events, you must be at least 18 years old and have the legal capacity to enter into binding contracts.",
            "By using the Platform, you represent and warrant that you meet these eligibility requirements."
        ]
    },
    {
        id: 3,
        title: "Account Registration and Security",
        content: [
            "To access certain features, you must create an account. You agree to:",
            "Provide accurate, current, and complete information during registration.",
            "Maintain and promptly update your account information to keep it accurate and complete.",
            "Maintain the security and confidentiality of your login credentials.",
            "Notify us immediately of any unauthorized access or security breach.",
            "Accept responsibility for all activities that occur under your account.",
            "You may not:",
            "Share your account credentials with others.",
            "Create multiple accounts for deceptive purposes.",
            "Use another person's account without permission.",
            "Create an account if you have been previously banned from the Platform."
        ]
    },
    {
        id: 4,
        title: "User Conduct",
        content: [
            "You agree to use Cafa Ticket in a lawful and respectful manner. You will not:",
            "Violate any applicable laws, regulations, or third-party rights.",
            "Post false, misleading, or fraudulent event information.",
            "Engage in fraudulent ticket sales or purchases.",
            "Harass, abuse, or harm other users or event organizers.",
            "Upload content that is defamatory, obscene, offensive, or infringes on intellectual property rights.",
            "Attempt to gain unauthorized access to the Platform or other user accounts.",
            "Use automated tools (bots, scrapers) to access the Platform without permission.",
            "Interfere with or disrupt the Platform's functionality or servers.",
            "Resell tickets at inflated prices (scalping) where prohibited by law.",
            "Impersonate any person or entity or misrepresent your affiliation."
        ]
    },
    {
        id: 5,
        title: "Event Organizer Responsibilities",
        content: [
            "If you organize events through Cafa Ticket, you agree to:",
            "Provide accurate and truthful event information, including date, time, location, and ticket details.",
            "Comply with all applicable laws and regulations governing your event.",
            "Obtain necessary permits, licenses, and insurance for your event.",
            "Honor all ticket sales and provide the advertised event experience.",
            "Handle attendee data responsibly and in compliance with privacy laws.",
            "Respond to attendee inquiries and resolve disputes in good faith.",
            "Not engage in discriminatory practices when selling tickets or managing events.",
            "Clearly communicate refund and cancellation policies.",
            "As an event organizer, you are solely responsible for:",
            "Event planning, execution, and quality.",
            "Safety and security of attendees.",
            "Compliance with local regulations and tax obligations.",
            "Any liabilities arising from your event.",
            "Cafa Ticket serves as a platform facilitator and is not responsible for the events themselves."
        ]
    },
    {
        id: 6,
        title: "Ticket Purchases",
        content: [
            "When purchasing tickets through Cafa Ticket:",
            "You agree to pay the full ticket price plus any applicable fees and taxes.",
            "All sales are final unless otherwise stated by the event organizer or required by law.",
            "Tickets are non-transferable unless explicitly permitted by the event organizer.",
            "You are responsible for verifying event details before purchase.",
            "Ticket prices are set by event organizers, not by Cafa Ticket.",
            "You may not resell tickets for profit without the organizer's permission.",
            "You understand that ticket availability is subject to change.",
            "In case of event cancellation or postponement:",
            "The event organizer's refund policy applies.",
            "Cafa Ticket will facilitate refunds as directed by the organizer.",
            "Processing fees may be non-refundable.",
            "Refunds may take 5-10 business days to process."
        ]
    },
    {
        id: 7,
        title: "Payment and Fees",
        content: [
            "Ticket purchasers agree to pay:",
            "The ticket price as displayed at the time of purchase.",
            "Service fees charged by Cafa Ticket (clearly indicated during checkout).",
            "Payment processing fees from our payment partners.",
            "Applicable taxes and government charges.",
            "Event organizers agree to:",
            "Pay platform fees as specified in their organizer agreement.",
            "Provide valid payment information for receiving payouts.",
            "Understand that payouts may be subject to holding periods for fraud prevention.",
            "All payments are processed through secure third-party payment processors. We do not store complete credit card information."
        ]
    },
    {
        id: 8,
        title: "Intellectual Property Rights",
        content: [
            "The Platform and its content (including text, graphics, logos, images, software) are owned by Cafa Ticket and protected by copyright, trademark, and other intellectual property laws.",
            "You are granted a limited, non-exclusive, non-transferable license to access and use the Platform for personal, non-commercial purposes.",
            "You may not:",
            "Copy, modify, distribute, or create derivative works of our content.",
            "Use our trademarks, logos, or branding without written permission.",
            "Reverse engineer, decompile, or disassemble our software.",
            "Remove or alter any copyright or proprietary notices.",
            "Content you upload (event descriptions, images, etc.) remains your property, but you grant us a worldwide, royalty-free license to use, display, and distribute it as necessary to provide our services."
        ]
    },
    {
        id: 9,
        title: "Third-Party Links and Services",
        content: [
            "Cafa Ticket may contain links to third-party websites, services, or payment processors. We are not responsible for:",
            "The content, privacy practices, or terms of these third parties.",
            "Any transactions or interactions you have with third parties.",
            "Your use of third-party services is subject to their respective terms and conditions."
        ]
    },
    {
        id: 10,
        title: "Disclaimers and Limitations of Liability",
        content: [
            "THE PLATFORM IS PROVIDED 'AS IS' AND 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.",
            "We do not guarantee:",
            "Uninterrupted or error-free operation of the Platform.",
            "That the Platform will meet your specific requirements.",
            "The accuracy, reliability, or completeness of content or listings.",
            "That events will occur as advertised or that tickets will be honored.",
            "To the fullest extent permitted by law, Cafa Ticket shall not be liable for:",
            "Any indirect, incidental, consequential, or punitive damages.",
            "Loss of profits, revenue, data, or business opportunities.",
            "Event cancellations, postponements, or changes.",
            "Actions or omissions of event organizers or attendees.",
            "Unauthorized access to your account or data.",
            "Our total liability shall not exceed the amount you paid for tickets in the past 12 months."
        ]
    },
    {
        id: 11,
        title: "Indemnification",
        content: [
            "You agree to indemnify, defend, and hold harmless Cafa Ticket, its affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, or expenses arising from:",
            "Your use of the Platform.",
            "Your violation of these Terms.",
            "Your violation of any laws or third-party rights.",
            "Events you organize (if applicable).",
            "Content you upload or submit."
        ]
    },
    {
        id: 12,
        title: "Dispute Resolution and Governing Law",
        content: [
            "These Terms are governed by the laws of Ghana, without regard to conflict of law principles.",
            "Any disputes arising from these Terms or your use of the Platform shall be resolved through:",
            "Good Faith Negotiation: First, we encourage you to contact us to resolve the issue amicably.",
            "Arbitration: If negotiation fails, disputes shall be resolved through binding arbitration in accordance with the rules of the Ghana Arbitration Centre.",
            "You agree to waive your right to participate in class-action lawsuits."
        ]
    },
    {
        id: 13,
        title: "Termination",
        content: [
            "We reserve the right to suspend or terminate your account at any time if:",
            "You violate these Terms.",
            "You engage in fraudulent or illegal activities.",
            "Your account has been inactive for an extended period.",
            "Required by law or court order.",
            "You may delete your account at any time through your account settings. Upon termination:",
            "You lose access to your account and purchased tickets.",
            "Unpaid obligations remain enforceable.",
            "Event organizers must fulfill commitments to ticket holders.",
            "Provisions that should survive termination (including payment obligations, disclaimers, and indemnification) will remain in effect."
        ]
    },
    {
        id: 14,
        title: "Changes to Terms",
        content: [
            "We may modify these Terms at any time to reflect changes in our services, legal requirements, or business practices.",
            "We will notify you of significant changes by:",
            "Posting the updated Terms on the Platform.",
            "Sending an email notification (if applicable).",
            "Displaying a prominent notice on the Platform.",
            "Your continued use of the Platform after changes take effect constitutes acceptance of the modified Terms. If you do not agree with the changes, you must stop using the Platform."
        ]
    },
    {
        id: 15,
        title: "Severability",
        content: [
            "If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect."
        ]
    },
    {
        id: 16,
        title: "Entire Agreement",
        content: [
            "These Terms, along with our Privacy Policy, constitute the entire agreement between you and Cafa Ticket regarding your use of the Platform and supersede any prior agreements."
        ]
    },
    {
        id: 17,
        title: "Contact Information",
        content: [
            "For questions, concerns, or support regarding these Terms, please contact us:",
            "Email: info@cafaticket.com",
            "Phone: +233 5455454 545",
            "We are committed to addressing your inquiries and resolving issues promptly."
        ]
    }
];