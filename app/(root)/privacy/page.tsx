import React from 'react';
import { Shield, Lock, Eye, FileText, Calendar } from 'lucide-react';
import { privacyPolicy } from '@/data/static.general';

const PrivacyPage = () => {
    const lastUpdated = "December 19, 2025";

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
                                <Shield className="w-10 h-10 text-accent-50" />
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="massive-text text-white mb-4">
                            Privacy Policy
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="big-text-5 text-slate-200 mb-6">
                            Your privacy and data security are our top priorities
                        </p>

                        {/* Last Updated */}
                        <div className="flex-center gap-2 text-slate-300">
                            <Calendar className="w-4 h-4 text-accent-50" />
                            <span className="normal-text">
                                Last Updated: {lastUpdated}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Decorative gradient orbs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </section>

            {/* Key Highlights Section */}
            <section className="bg-primary-100 border-b-2 border-accent/20">
                <div className="inner-wrapper">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                icon: <Lock className="w-6 h-6" />,
                                title: "Secure by Design",
                                description: "End-to-end encryption for all your data"
                            },
                            {
                                icon: <Eye className="w-6 h-6" />,
                                title: "Transparent",
                                description: "Clear information on data usage"
                            },
                            {
                                icon: <Shield className="w-6 h-6" />,
                                title: "Your Control",
                                description: "Manage your data preferences anytime"
                            },
                            {
                                icon: <FileText className="w-6 h-6" />,
                                title: "Compliance",
                                description: "Adhering to data protection regulations"
                            }
                        ].map((item, index) => (
                            <div 
                                key={index}
                                className="bg-primary rounded-xl p-6 border-2 border-accent/20 hover:border-accent transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-lg bg-accent/20 flex-center mb-4 border border-accent/30">
                                    <div className="text-accent-50">
                                        {item.icon}
                                    </div>
                                </div>
                                <h3 className="big-text-5 font-bold text-white mb-2">
                                    {item.title}
                                </h3>
                                <p className="normal-text-2 text-slate-300">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Privacy Policy Content */}
            <section className="bg-primary">
                <div className="inner-wrapper">
                    <div className="max-w-4xl mx-auto">
                        {/* Table of Contents */}
                        <div className="bg-primary-100 rounded-2xl p-6 md:p-8 mb-8 border-2 border-accent/20">
                            <h2 className="big-text-3 font-bold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-6 h-6 text-accent-50" />
                                Table of Contents
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {privacyPolicy.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#section-${section.id}`}
                                        className="flex items-start gap-2 text-slate-200 hover:text-accent-50 transition-colors normal-text-2 group"
                                    >
                                        <span className="text-accent-50 font-bold shrink-0">
                                            {section.id}.
                                        </span>
                                        <span className="group-hover:underline">
                                            {section.title}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Policy Sections */}
                        <div className="space-y-8">
                            {privacyPolicy.map((section) => (
                                <div
                                    key={section.id}
                                    id={`section-${section.id}`}
                                    className="bg-primary-100 rounded-2xl p-6 md:p-8 border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 scroll-mt-24"
                                >
                                    {/* Section Header */}
                                    <div className="flex items-start gap-4 mb-4 pb-4 border-b border-accent/20">
                                        <div className="w-10 h-10 rounded-lg bg-accent/20 flex-center shrink-0 border border-accent/30">
                                            <span className="text-accent-50 font-bold normal-text">
                                                {section.id}
                                            </span>
                                        </div>
                                        <h2 className="big-text-3 font-bold text-white">
                                            {section.title}
                                        </h2>
                                    </div>

                                    {/* Section Content */}
                                    <div className="space-y-4 pl-0 md:pl-14">
                                        {section.content.map((paragraph, index) => (
                                            <p 
                                                key={index}
                                                className="normal-text text-slate-200 leading-relaxed"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Section */}
                        <div className="mt-12 bg-linear-to-br from-primary-100 to-primary-200 rounded-2xl p-6 md:p-8 border-2 border-accent text-center">
                            <Shield className="w-16 h-16 text-accent-50 mx-auto mb-4" />
                            <h3 className="big-text-3 font-bold text-white mb-3">
                                Questions About Your Privacy?
                            </h3>
                            <p className="normal-text text-slate-200 mb-6 max-w-2xl mx-auto">
                                We're here to help. If you have any questions or concerns about how we handle your data, please don't hesitate to reach out.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="mailto:info@cafaticket.com"
                                    className="px-6 py-3 bg-accent text-white rounded-xl font-semibold normal-text hover:bg-accent-100 transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    Email Us
                                </a>
                                <a
                                    href="tel:+233545545454"
                                    className="px-6 py-3 bg-primary-200 text-white rounded-xl font-semibold normal-text border-2 border-accent/30 hover:border-accent transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    Call Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-primary-200 border-t-2 border-accent/20">
                <div className="inner-wrapper text-center">
                    <p className="normal-text text-slate-200 mb-4">
                        By using Cafa Ticket, you agree to our Privacy Policy and Terms of Service
                    </p>
                    <a
                        href="/terms"
                        className="inline-block text-accent-50 hover:text-accent font-semibold normal-text hover:underline"
                    >
                        Read our Terms of Service →
                    </a>
                </div>
            </section>
        </main>
    );
};

export default PrivacyPage;