import { Metadata } from 'next';
import Link from 'next/link';
import { Home, Calendar, Ticket, CreditCard, User, Settings, Shield, MapPin, Mail, FileText, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Sitemap | Cafa Tickets',
    description: 'Complete sitemap of Cafa Tickets - Find all pages and navigate our event ticketing platform easily.',
    keywords: ['sitemap', 'site navigation', 'Cafa Tickets pages', 'event platform map'],
};

const SitemapPage = () => {
    const sitemapSections = [
        {
            icon: Home,
            title: 'Main Pages',
            links: [
                { label: 'Home', url: '/' },
                { label: 'About Us', url: '/about' },
                { label: 'Contact', url: '/contact' },
                { label: 'Accessibility', url: '/accessibility' },
                { label: 'Sitemap', url: '/sitemap' }
            ]
        },
        {
            icon: Calendar,
            title: 'Events',
            links: [
                { label: 'Browse Events', url: '/events' },
                { label: 'Past Events', url: '/events/history' },
                { label: 'Event Categories', url: '/events#categories' },
                { label: 'Event Details', url: '/events/[slug]', subtitle: 'Individual event pages' }
            ]
        },
        {
            icon: User,
            title: 'Authentication',
            links: [
                { label: 'Login', url: '/login' },
                { label: 'Sign Up', url: '/signup' },
                { label: 'Forgot Password', url: '/forgot-password' },
                { label: 'Activate Account', url: '/activate' },
                { label: 'Reset Password', url: '/reset-password' }
            ]
        },
        {
            icon: Home,
            title: 'Dashboard',
            links: [
                { label: 'Dashboard Home', url: '/dashboard' },
                { label: 'My Profile', url: '/dashboard/profile' },
                { label: 'Edit Profile', url: '/dashboard/profile/edit' }
            ]
        },
        {
            icon: Calendar,
            title: 'Event Management',
            links: [
                { label: 'My Events', url: '/dashboard/events' },
                { label: 'Create Event', url: '/dashboard/events/create' },
                { label: 'Edit Event', url: '/dashboard/events/[slug]/edit', subtitle: 'Event-specific' },
                { label: 'Event Analytics', url: '/dashboard/events/[slug]/analytics', subtitle: 'Event-specific' },
                { label: 'Event Attendees', url: '/dashboard/events/[slug]/attendees', subtitle: 'Event-specific' },
                { label: 'Attended Events', url: '/dashboard/events/attended' }
            ]
        },
        {
            icon: Ticket,
            title: 'Tickets',
            links: [
                { label: 'My Tickets', url: '/dashboard/tickets' },
                { label: 'Ticket Details', url: '/dashboard/tickets/[id]', subtitle: 'Ticket-specific' },
                { label: 'Event Check-in', url: '/dashboard/check-in' }
            ]
        },
        {
            icon: CreditCard,
            title: 'Payments & Revenue',
            links: [
                { label: 'Revenue Dashboard', url: '/dashboard/payments' },
                { label: 'Payment History', url: '/dashboard/payments/history' },
                { label: 'Payment Details', url: '/dashboard/payments/history/[id]', subtitle: 'Payment-specific' },
                { label: 'Payment Profiles', url: '/dashboard/payments/profiles' },
                { label: 'Create Payment Profile', url: '/dashboard/payments/profiles/create' },
                { label: 'Edit Payment Profile', url: '/dashboard/payments/profiles/[id]/edit', subtitle: 'Profile-specific' }
            ]
        },
        {
            icon: Settings,
            title: 'Settings',
            links: [
                { label: 'Settings Hub', url: '/dashboard/settings' },
                { label: 'Security Settings', url: '/dashboard/settings/security' },
                { label: 'Notification Settings', url: '/dashboard/settings/notifications' },
                { label: 'Privacy Settings', url: '/dashboard/settings/privacy' }
            ]
        },
        {
            icon: Shield,
            title: 'Legal & Policies',
            links: [
                { label: 'Terms of Service', url: '/terms' },
                { label: 'Privacy Policy', url: '/privacy' },
                { label: 'Cookie Policy', url: '/cookies' },
                { label: 'Refund Policy', url: '/refund-policy' }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative bg-primary-100 border-b-2 border-accent/30">
                <div className="inner-wrapper py-16 md:py-24">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-accent-50" aria-hidden="true" />
                            </div>
                            <h1 className="big-text-1 text-white font-bold">
                                Sitemap
                            </h1>
                        </div>
                        <p className="big-text-5 text-slate-200 mb-4">
                            Navigate through all pages and features of Cafa Tickets. Find exactly what you&apos;re looking for with our comprehensive site map.
                        </p>
                        <p className="normal-text text-slate-300">
                            All links open in the same window. Dynamic routes like [slug] and [id] represent individual pages for specific items.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section>
                <div className="inner-wrapper">
                    <div className="max-w-6xl">
                        <h2 className="big-text-3 text-white font-bold mb-6">
                            Quick Navigation
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {[
                                { label: 'Home', url: '/', icon: Home },
                                { label: 'Events', url: '/events', icon: Calendar },
                                { label: 'Dashboard', url: '/dashboard', icon: Home },
                                { label: 'My Tickets', url: '/dashboard/tickets', icon: Ticket },
                                { label: 'Revenue', url: '/dashboard/payments', icon: CreditCard },
                                { label: 'Profile', url: '/dashboard/profile', icon: User },
                                { label: 'Settings', url: '/dashboard/settings', icon: Settings },
                                { label: 'Contact', url: '/contact', icon: Mail }
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={item.url}
                                        className="group flex items-center gap-3 p-4 bg-primary-100 rounded-xl border-2 border-accent/30 hover:border-accent transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        <Icon className="w-5 h-5 text-accent-50 group-hover:scale-110 transition-transform" aria-hidden="true" />
                                        <span className="normal-text-2 text-white font-semibold">
                                            {item.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Complete Sitemap */}
            <section className="bg-primary-100">
                <div className="inner-wrapper">
                    <div className="max-w-6xl">
                        <h2 className="big-text-2 text-white font-bold mb-8">
                            Complete Site Structure
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {sitemapSections.map((section, index) => {
                                const Icon = section.icon;
                                return (
                                    <article
                                        key={index}
                                        className="bg-primary rounded-xl border-2 border-accent/30 p-6 hover:border-accent transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-accent-50" aria-hidden="true" />
                                            </div>
                                            <h3 className="big-text-4 text-white font-bold">
                                                {section.title}
                                            </h3>
                                        </div>
                                        <nav aria-label={`${section.title} navigation`}>
                                            <ul className="space-y-3">
                                                {section.links.map((link, idx) => (
                                                    <li key={idx}>
                                                        {link.url.includes('[') ? (
                                                            <div className="group">
                                                                <div className="flex items-start gap-2">
                                                                    <span className="text-accent-50 mt-1">→</span>
                                                                    <div>
                                                                        <span className="normal-text-2 text-slate-300 font-medium">
                                                                            {link.label}
                                                                        </span>
                                                                        {link.subtitle && (
                                                                            <p className="small-text text-slate-500 mt-0.5">
                                                                                {link.subtitle}
                                                                            </p>
                                                                        )}
                                                                        <code className="block mt-1 small-text text-slate-500 font-mono">
                                                                            {link.url}
                                                                        </code>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <Link
                                                                href={link.url}
                                                                className="group flex items-start gap-2 hover:translate-x-1 transition-transform duration-200"
                                                            >
                                                                <ExternalLink className="w-4 h-4 text-accent-50 shrink-0 mt-0.5 group-hover:text-accent-100 transition-colors" aria-hidden="true" />
                                                                <div>
                                                                    <span className="normal-text-2 text-slate-300 group-hover:text-white font-medium transition-colors">
                                                                        {link.label}
                                                                    </span>
                                                                    {link.subtitle && (
                                                                        <p className="small-text text-slate-500 mt-0.5">
                                                                            {link.subtitle}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </Link>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* XML Sitemap Note */}
            <section>
                <div className="inner-wrapper">
                    <div className="max-w-4xl">
                        <div className="bg-primary-100 rounded-xl border-2 border-accent/30 p-6 md:p-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                                    <FileText className="w-6 h-6 text-accent-50" aria-hidden="true" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="big-text-4 text-white font-bold mb-3">
                                        XML Sitemap for Search Engines
                                    </h3>
                                    <p className="normal-text text-slate-300 mb-3">
                                        Looking for the machine-readable sitemap? Our XML sitemap is available for search engine crawlers.
                                    </p>
                                    
                                    <Link href="/sitemap.xml"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-100 text-white rounded-lg font-semibold normal-text-2 transition-colors"
                                    >
                                        <FileText className="w-4 h-4" aria-hidden="true" />
                                        View XML Sitemap
                                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Help Section */}
            <section className="bg-primary-100 border-t-2 border-accent/30">
                <div className="inner-wrapper">
                    <div className="max-w-4xl text-center">
                        <h2 className="big-text-3 text-white font-bold mb-4">
                            Can&apos;t Find What You&apos;re Looking For?
                        </h2>
                        <p className="normal-text text-slate-300 mb-6">
                            If you need help navigating our platform or have questions about specific features, we&apos;re here to help.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-100 text-white rounded-xl font-semibold normal-text-2 transition-colors"
                            >
                                <Mail className="w-4 h-4" aria-hidden="true" />
                                Contact Support
                            </Link>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-200 hover:bg-primary text-white rounded-xl font-semibold normal-text-2 transition-colors border-2 border-accent/30"
                            >
                                Learn More About Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SitemapPage;