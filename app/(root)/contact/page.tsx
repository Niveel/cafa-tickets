import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, HeadphonesIcon } from 'lucide-react';
import Link from 'next/link';

import {ContactForm} from '@/components';
import { getCurrentUser } from '@/app/lib/auth';
import { contactInfo, socialLinks } from '@/data/static.general';

const ContactPage = async () => {
    const currentUser = await getCurrentUser();

    return (
        <main className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-br from-primary via-primary-100 to-primary-200 border-b-2 border-accent">
                <div className="absolute inset-0 bg-[url('/assets/patterns/grid.svg')] opacity-5"></div>
                
                <div className="inner-wrapper relative py-16 sm:py-20 md:py-24">
                    <div className="text-center max-w-3xl mx-auto">
                        {/* Icon */}
                        <div className="flex-center mb-6">
                            <div className="w-20 h-20 rounded-2xl bg-accent/20 backdrop-blur-sm flex-center border-2 border-accent">
                                <MessageCircle className="w-10 h-10 text-accent-50" />
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="massive-text text-white mb-4">
                            Get in Touch
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="big-text-5 text-slate-200 mb-6">
                            Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>

                {/* Decorative gradient orbs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </section>

            {/* Contact Info Cards */}
            <section className="bg-primary-100 border-b-2 border-accent/20">
                <div className="inner-wrapper">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Email Card */}
                        <div className="bg-primary rounded-xl p-6 border-2 border-accent/20 hover:border-accent transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-xl bg-accent/20 flex-center mb-4 border border-accent/30 group-hover:scale-110 transition-transform">
                                <Mail className="w-7 h-7 text-accent-50" />
                            </div>
                            <h3 className="big-text-5 font-bold text-white mb-2">
                                Email Us
                            </h3>
                            <p className="normal-text-2 text-slate-300 mb-3">
                                Send us an email anytime
                            </p>
                            <a 
                                href={contactInfo[0].href}
                                className="text-accent-50 hover:text-accent font-semibold normal-text-2 hover:underline"
                            >
                                {contactInfo[0].value}
                            </a>
                        </div>

                        {/* Phone Card */}
                        <div className="bg-primary rounded-xl p-6 border-2 border-accent/20 hover:border-accent transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-xl bg-accent/20 flex-center mb-4 border border-accent/30 group-hover:scale-110 transition-transform">
                                <Phone className="w-7 h-7 text-accent-50" />
                            </div>
                            <h3 className="big-text-5 font-bold text-white mb-2">
                                Call Us
                            </h3>
                            <p className="normal-text-2 text-slate-300 mb-3">
                                Mon-Fri from 8am to 5pm
                            </p>
                            <Link 
                                href={"mailto:info@cafaticket.com"}
                                className="text-accent-50 hover:text-accent font-semibold normal-text-2 hover:underline"
                            >
                                info@cafaticket.com
                            </Link>
                        </div>

                        {/* Location Card */}
                        <div className="bg-primary rounded-xl p-6 border-2 border-accent/20 hover:border-accent transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-xl bg-accent/20 flex-center mb-4 border border-accent/30 group-hover:scale-110 transition-transform">
                                <MapPin className="w-7 h-7 text-accent-50" />
                            </div>
                            <h3 className="big-text-5 font-bold text-white mb-2">
                                Location
                            </h3>
                            <p className="normal-text-2 text-slate-300 mb-3">
                                Serving all of Ghana
                            </p>
                            <p className="text-accent-50 font-semibold normal-text-2">
                                Accra, Ghana
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="bg-primary">
                <div className="inner-wrapper">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Form */}
                        <div className="lg:col-span-3">
                            <div className="mb-6">
                                <h2 className="big-text-2 font-bold text-white mb-3">
                                    Send us a Message
                                </h2>
                                <p className="normal-text text-slate-200">
                                    Fill out the form below and we'll get back to you within 24 hours.
                                </p>
                            </div>

                            <ContactForm currentUser={currentUser} />
                        </div>

                        {/* Sidebar Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Support Hours */}
                            <div className="bg-primary-100 rounded-xl p-6 border-2 border-accent/20">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex-center shrink-0 border border-accent/30">
                                        <Clock className="w-5 h-5 text-accent-50" />
                                    </div>
                                    <div>
                                        <h3 className="big-text-5 font-bold text-white mb-2">
                                            Support Hours
                                        </h3>
                                        <div className="space-y-2 normal-text-2 text-slate-200">
                                            <p className="flex justify-between">
                                                <span className="text-slate-300">Monday - Friday:</span>
                                                <span className="font-semibold">8am - 5pm</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span className="text-slate-300">Saturday:</span>
                                                <span className="font-semibold">9am - 2pm</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span className="text-slate-300">Sunday:</span>
                                                <span className="font-semibold">Closed</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Help */}
                            <div className="bg-primary-100 rounded-xl p-6 border-2 border-accent/20">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex-center shrink-0 border border-accent/30">
                                        <HeadphonesIcon className="w-5 h-5 text-accent-50" />
                                    </div>
                                    <div>
                                        <h3 className="big-text-5 font-bold text-white mb-2">
                                            Need Quick Help?
                                        </h3>
                                        <p className="normal-text-2 text-slate-200 mb-4">
                                            Check out our frequently asked questions or browse our help center.
                                        </p>
                                        <div className="space-y-2">
                                            <a 
                                                href="/events"
                                                className="block text-accent-50 hover:text-accent font-semibold normal-text-2 hover:underline"
                                            >
                                                Browse Events →
                                            </a>
                                            <a 
                                                href="/privacy"
                                                className="block text-accent-50 hover:text-accent font-semibold normal-text-2 hover:underline"
                                            >
                                                Privacy Policy →
                                            </a>
                                            <a 
                                                href="/terms"
                                                className="block text-accent-50 hover:text-accent font-semibold normal-text-2 hover:underline"
                                            >
                                                Terms of Service →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-primary-100 rounded-xl p-6 border-2 border-accent/20">
                                <h3 className="big-text-5 font-bold text-white mb-4">
                                    Connect With Us
                                </h3>
                                <div className="flex gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.id}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-xl bg-accent/20 hover:bg-accent flex-center border border-accent/30 hover:border-accent transition-all duration-300 hover:scale-110 text-accent-50 hover:text-white"
                                            aria-label={social.label}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary-200 border-t-2 border-accent/20">
                <div className="inner-wrapper text-center">
                    <h3 className="big-text-3 font-bold text-white mb-3">
                        Looking for Events?
                    </h3>
                    <p className="normal-text text-slate-200 mb-6 max-w-2xl mx-auto">
                        Discover amazing events happening across Ghana. From concerts to conferences, find your next experience.
                    </p>
                    <a
                        href="/events"
                        className="inline-block px-8 py-4 bg-accent hover:bg-accent-100 text-white rounded-xl font-bold normal-text transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                    >
                        Explore Events
                    </a>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;