import React from 'react';
import { Scale, FileCheck, AlertCircle, Calendar, CheckCircle } from 'lucide-react';
import { termsOfService } from '@/data/static.general';

const TermsPage = () => {
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
                                <Scale className="w-10 h-10 text-accent-50" />
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="massive-text text-white mb-4">
                            Terms of Service
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="big-text-5 text-slate-200 mb-6">
                            Please read these terms carefully before using Cafa Ticket
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

                {/* Decorative linear orbs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </section>

            {/* Key Points Section */}
            <section className="bg-primary-100 border-b-2 border-accent/20">
                <div className="inner-wrapper">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-linear-to-br from-accent/10 to-accent/5 rounded-2xl p-6 md:p-8 border-2 border-accent/30">
                            <div className="flex items-start gap-3 mb-4">
                                <AlertCircle className="w-6 h-6 text-accent-50 shrink-0 mt-1" />
                                <div>
                                    <h2 className="big-text-4 font-bold text-white mb-2">
                                        Important Notice
                                    </h2>
                                    <p className="normal-text text-slate-200">
                                        By using Cafa Ticket, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use our platform.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            {[
                                {
                                    icon: <CheckCircle className="w-6 h-6" />,
                                    title: "Fair Usage",
                                    description: "Clear guidelines for users and organizers"
                                },
                                {
                                    icon: <Scale className="w-6 h-6" />,
                                    title: "Legal Protection",
                                    description: "Rights and responsibilities defined"
                                },
                                {
                                    icon: <FileCheck className="w-6 h-6" />,
                                    title: "Transparency",
                                    description: "Open about our policies and procedures"
                                }
                            ].map((item, index) => (
                                <div 
                                    key={index}
                                    className="bg-primary rounded-xl p-5 border-2 border-accent/20 hover:border-accent transition-all duration-300"
                                >
                                    <div className="w-11 h-11 rounded-lg bg-accent/20 flex-center mb-3 border border-accent/30">
                                        <div className="text-accent-50">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <h3 className="big-text-5 font-bold text-white mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="normal-text-2 text-slate-300">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Terms Content */}
            <section className="bg-primary">
                <div className="inner-wrapper">
                    <div className="max-w-4xl mx-auto">
                        {/* Table of Contents */}
                        <div className="bg-primary-100 rounded-2xl p-6 md:p-8 mb-8 border-2 border-accent/20">
                            <h2 className="big-text-3 font-bold text-white mb-4 flex items-center gap-2">
                                <FileCheck className="w-6 h-6 text-accent-50" />
                                Table of Contents
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {termsOfService.map((section) => (
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

                        {/* Terms Sections */}
                        <div className="space-y-8">
                            {termsOfService.map((section) => (
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

                                        {/* Subsections if they exist */}
                                        {section.subsections && section.subsections.length > 0 && (
                                            <div className="mt-4 space-y-3">
                                                {section.subsections.map((subsection, subIndex) => (
                                                    <div key={subIndex} className="pl-4 border-l-2 border-accent/30">
                                                        <h3 className="big-text-5 font-semibold text-white mb-2">
                                                            {subsection.title}
                                                        </h3>
                                                        <div className="space-y-2">
                                                            {subsection.content.map((subParagraph, subParaIndex) => (
                                                                <p 
                                                                    key={subParaIndex}
                                                                    className="normal-text-2 text-slate-200"
                                                                >
                                                                    {subParagraph}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Acceptance Section */}
                        <div className="mt-12 bg-linear-to-br from-primary-100 to-primary-200 rounded-2xl p-6 md:p-8 border-2 border-accent">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="w-16 h-16 rounded-xl bg-accent/20 flex-center shrink-0 border-2 border-accent">
                                    <CheckCircle className="w-8 h-8 text-accent-50" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="big-text-4 font-bold text-white mb-2">
                                        By Using Cafa Ticket, You Agree
                                    </h3>
                                    <p className="normal-text text-slate-200 mb-3">
                                        Your continued use of our platform constitutes acceptance of these Terms of Service and our Privacy Policy. We recommend saving or printing a copy for your records.
                                    </p>
                                    <a
                                        href="/privacy"
                                        className="inline-flex items-center gap-2 text-accent-50 hover:text-accent font-semibold normal-text hover:underline"
                                    >
                                        View Privacy Policy →
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="mt-8 bg-linear-to-br from-primary-100 to-primary-200 rounded-2xl p-6 md:p-8 border-2 border-accent/30 text-center">
                            <Scale className="w-16 h-16 text-accent-50 mx-auto mb-4" />
                            <h3 className="big-text-3 font-bold text-white mb-3">
                                Questions About These Terms?
                            </h3>
                            <p className="normal-text text-slate-200 mb-6 max-w-2xl mx-auto">
                                If you have any questions or need clarification about our Terms of Service, our team is here to help you.
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

            {/* Bottom Notice */}
            <section className="bg-primary-200 border-t-2 border-accent/20">
                <div className="inner-wrapper">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-accent/10 rounded-xl p-4 border border-accent/20 mb-4">
                            <p className="small-text text-slate-300 leading-relaxed">
                                <strong className="text-white">Legal Disclaimer:</strong> These Terms of Service constitute a legally binding agreement. By using Cafa Ticket, you acknowledge that you have read, understood, and agree to be bound by these terms. If you are entering into this agreement on behalf of an organization, you represent that you have the authority to bind that organization to these terms.
                            </p>
                        </div>
                        <p className="normal-text-2 text-slate-300">
                            Last Updated: {lastUpdated} | Version 1.0
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default TermsPage;