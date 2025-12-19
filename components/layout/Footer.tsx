"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Mail, Phone, MapPin, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';

import { contactInfo, socialLinks, navLinks } from '@/data/static.general';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !email.includes('@')) {
            setMessage({ type: 'error', text: 'Please enter a valid email address' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = 'Failed to subscribe. Please try again.';
                
                if (data.email && Array.isArray(data.email)) {
                    errorMessage = data.email[0];
                } else if (data.error) {
                    errorMessage = data.error;
                } else if (data.detail) {
                    errorMessage = data.detail;
                } else if (data.message) {
                    errorMessage = data.message;
                }

                setMessage({ type: 'error', text: errorMessage });
                return;
            }

            // Success
            setMessage({ type: 'success', text: 'Successfully subscribed to newsletter!' });
            setEmail('');
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                setMessage(null);
            }, 5000);

        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="relative bg-linear-to-br from-primary via-primary to-indigo-900 text-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-50" />
            </div>

            {/* Decorative Pattern Overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            {/* Content Container */}
            <div className="relative z-10 py-10 px-6 md:px-12">
                <div className="mx-auto max-w-7xl">
                    {/* Top Section - CTA Banner */}
                    <div className="mb-14 text-center">
                        <h2 className="big-text-2 font-bold mb-4 bg-linear-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                            Ready to Experience Something Amazing?
                        </h2>
                        <p className="normal-text text-blue-100 max-w-2xl mx-auto mb-6">
                            Join thousands of event-goers discovering the best experiences across Ghana
                        </p>
                        <Link 
                            href="/events"
                            className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white text-primary font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl group small-text"
                        >
                            Browse Events
                            <ArrowUpRight className="w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </Link>
                    </div>

                    {/* Main Footer Grid */}
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-10">
                        {/* Column 1: Branding */}
                        <div className="space-y-4">
                            <Link href="/" className="inline-block group">
                                <div className="flex items-center gap-4">
                                    <figure className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                        <Image
                                            width={64}
                                            height={64}
                                            src="/assets/logo.png"
                                            className="w-full h-full object-cover"
                                            alt="Cafa Tickets logo"
                                        />
                                    </figure>
                                    <div>
                                        <h2 className="big-text-4 font-bold text-white">Cafa Tickets</h2>
                                        <p className="small-text text-blue-200">Your Event Partner</p>
                                    </div>
                                </div>
                            </Link>
                            
                            <p className="normal-text-2 text-blue-100 leading-relaxed">
                                Ghana&apos;s premier event ticketing platform. Discover, book, and experience unforgettable moments.
                            </p>
                            
                            {/* Social Links */}
                            <div>
                                <p className="small-text font-semibold text-white mb-3 uppercase tracking-wider">Connect With Us</p>
                                <div className="flex gap-3" aria-label="Social media links">
                                    {socialLinks.map(({ id, label, icon, href }) => (
                                        <Link 
                                            key={id}
                                            href={href}
                                            aria-label={`Visit our ${label}`}
                                            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {icon}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Navigation */}
                        <div>
                            <h3 className="big-text-5 font-bold mb-6 text-white flex items-center gap-2">
                                <span className="w-1 h-6 bg-linear-to-b from-purple-400 to-blue-400 rounded-full"></span>
                                Quick Links
                            </h3>
                            <nav aria-label="Footer navigation" className="space-y-3">
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.id}
                                        href={link.url}
                                        className="group flex items-center gap-2 normal-text text-blue-100 hover:text-white transition-all duration-300 hover:translate-x-2"
                                    >
                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span>{link.name}</span>
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Column 3: Contact Info */}
                        <div>
                            <h3 className="big-text-5 font-bold mb-6 text-white flex items-center gap-2">
                                <span className="w-1 h-6 bg-linear-to-b from-purple-400 to-blue-400 rounded-full"></span>
                                Get in Touch
                            </h3>
                            <ul className="space-y-4">
                                {contactInfo.map(({ id, label, value, href }) => {
                                    // Determine icon based on label
                                    let IconComponent = Mail;
                                    if (label.toLowerCase().includes('phone')) IconComponent = Phone;
                                    if (label.toLowerCase().includes('address') || label.toLowerCase().includes('location')) IconComponent = MapPin;

                                    return (
                                        <li key={id} className="flex items-start gap-3 group">
                                            <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                                                <IconComponent className="w-5 h-5 text-blue-200" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="small-text text-blue-300 font-medium mb-1">{label}</p>
                                                {href ? (
                                                    <a
                                                        href={href}
                                                        className="normal-text-2 text-white hover:text-blue-200 transition-colors duration-300 underline-offset-4 hover:underline"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {value}
                                                    </a>
                                                ) : (
                                                    <span className="normal-text-2 text-white">{value}</span>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Column 4: Newsletter & Legal */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="big-text-5 font-bold mb-6 text-white flex items-center gap-2">
                                    <span className="w-1 h-6 bg-linear-to-b from-purple-400 to-blue-400 rounded-full"></span>
                                    Stay Updated
                                </h3>
                                <p className="normal-text-2 text-blue-100 mb-4">
                                    Get the latest events and exclusive offers delivered to your inbox.
                                </p>
                                
                                {/* Success/Error Message */}
                                {message && (
                                    <div className={`mb-3 p-3 rounded-lg flex items-start gap-2 animate-fade-in ${
                                        message.type === 'success' 
                                            ? 'bg-emerald-500/20 border border-emerald-500/30' 
                                            : 'bg-red-500/20 border border-red-500/30'
                                    }`}>
                                        {message.type === 'success' ? (
                                            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                        )}
                                        <p className={`small-text ${
                                            message.type === 'success' ? 'text-emerald-200' : 'text-red-200'
                                        }`}>
                                            {message.text}
                                        </p>
                                    </div>
                                )}

                                <form className="flex flex-col gap-3" onSubmit={handleNewsletterSubmit}>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                        className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="Email for newsletter"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                                Subscribing...
                                            </>
                                        ) : (
                                            <>
                                                Subscribe
                                                <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            <div>
                                <h3 className="big-text-5 font-bold mb-2 text-white">Legal</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <Link
                                            href="/privacy"
                                            className="normal-text-2 text-blue-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                                        >
                                            <span>Privacy Policy</span>
                                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/terms"
                                            className="normal-text-2 text-blue-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                                        >
                                            <span>Terms &amp; Conditions</span>
                                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-6 border-t border-white/10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="small-text text-blue-200 text-center md:text-left">
                                &copy; {new Date().getFullYear()} Cafa Tickets. All rights reserved.
                            </p>
                            <div className="flex items-center gap-6">
                                <Link href="/sitemap" className="small-text text-blue-200 hover:text-white transition-colors duration-300">
                                    Sitemap
                                </Link>
                                <Link href="/accessibility" className="small-text text-blue-200 hover:text-white transition-colors duration-300">
                                    Accessibility
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;