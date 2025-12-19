import { Metadata } from 'next';
import { Eye, Ear, Keyboard, MousePointer, Users, CheckCircle, Mail, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Accessibility Statement | Cafa Ticket',
    description: 'Our commitment to making Cafa Ticket accessible to everyone, including people with disabilities.',
    keywords: ['accessibility', 'WCAG', 'inclusive design', 'disability access'],
};

const AccessibilityPage = () => {
    const features = [
        {
            icon: Eye,
            title: 'Visual Accessibility',
            items: [
                'High contrast color schemes for better readability',
                'Scalable text that works with browser zoom up to 200%',
                'Clear visual indicators for interactive elements',
                'Alternative text for all images and graphics',
                'Color is not used as the only means of conveying information'
            ]
        },
        {
            icon: Keyboard,
            title: 'Keyboard Navigation',
            items: [
                'Full keyboard navigation support throughout the site',
                'Visible focus indicators for all interactive elements',
                'Logical tab order following content flow',
                'Skip navigation links to bypass repetitive content',
                'Keyboard shortcuts documented where applicable'
            ]
        },
        {
            icon: Ear,
            title: 'Audio & Visual Content',
            items: [
                'Text alternatives for non-text content',
                'Captions and transcripts for video content',
                'Visual alerts for important audio notifications',
                'No auto-playing audio that cannot be controlled',
                'Clear heading structure for screen readers'
            ]
        },
        {
            icon: MousePointer,
            title: 'Interactive Elements',
            items: [
                'Sufficient target sizes for touch and click interactions',
                'Clear and descriptive link text',
                'Form labels properly associated with inputs',
                'Error messages that are clear and actionable',
                'Timeout warnings with options to extend time'
            ]
        }
    ];

    const standards = [
        {
            title: 'WCAG 2.1 Level AA',
            description: 'We strive to meet Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.'
        },
        {
            title: 'Screen Reader Compatible',
            description: 'Tested with popular screen readers including JAWS, NVDA, and VoiceOver.'
        },
        {
            title: 'Responsive Design',
            description: 'Fully responsive layout that works across devices and screen sizes.'
        },
        {
            title: 'Semantic HTML',
            description: 'Proper use of HTML5 semantic elements for better structure and navigation.'
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
                                <Users className="w-6 h-6 text-accent-50" aria-hidden="true" />
                            </div>
                            <h1 className="big-text-1 text-white font-bold">
                                Accessibility Statement
                            </h1>
                        </div>
                        <p className="big-text-5 text-slate-200 mb-4">
                            At Cafa Ticket, we&apos;re committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.
                        </p>
                        <p className="normal-text text-slate-300">
                            Last updated: December 19, 2024
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Commitment */}
            <section>
                <div className="inner-wrapper">
                    <div className="max-w-4xl">
                        <h2 className="big-text-2 text-white font-bold mb-6">
                            Our Commitment
                        </h2>
                        <div className="space-y-4">
                            <p className="normal-text text-slate-200">
                                We believe that everyone should have equal access to our event ticketing platform, regardless of ability. Our commitment to accessibility means:
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Providing an inclusive experience for all users',
                                    'Following web accessibility best practices and standards',
                                    'Regularly testing our platform with assistive technologies',
                                    'Training our team on accessibility principles',
                                    'Actively seeking and implementing user feedback'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-accent-50 shrink-0 mt-0.5" aria-hidden="true" />
                                        <span className="normal-text text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Accessibility Features */}
            <section className="bg-primary-100">
                <div className="inner-wrapper">
                    <div className="max-w-6xl">
                        <h2 className="big-text-2 text-white font-bold mb-8 text-center">
                            Accessibility Features
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <article 
                                        key={index}
                                        className="bg-primary rounded-xl border-2 border-accent/30 p-6 hover:border-accent transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-accent-50" aria-hidden="true" />
                                            </div>
                                            <h3 className="big-text-4 text-white font-bold">
                                                {feature.title}
                                            </h3>
                                        </div>
                                        <ul className="space-y-2">
                                            {feature.items.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-accent-50 mt-1">•</span>
                                                    <span className="normal-text-2 text-slate-300">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Standards & Compliance */}
            <section>
                <div className="inner-wrapper">
                    <div className="max-w-4xl">
                        <h2 className="big-text-2 text-white font-bold mb-8">
                            Standards & Compliance
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {standards.map((standard, index) => (
                                <div 
                                    key={index}
                                    className="bg-primary-100 rounded-xl border-2 border-accent/30 p-5"
                                >
                                    <h3 className="big-text-5 text-white font-semibold mb-2">
                                        {standard.title}
                                    </h3>
                                    <p className="normal-text-2 text-slate-300">
                                        {standard.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Feedback Section */}
            <section>
                <div className="inner-wrapper">
                    <div className="max-w-4xl">
                        <h2 className="big-text-2 text-white font-bold mb-6">
                            We Welcome Your Feedback
                        </h2>
                        <div className="bg-primary-100 rounded-xl border-2 border-accent/30 p-6 md:p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                                    <Mail className="w-8 h-8 text-accent-50" aria-hidden="true" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="big-text-4 text-white font-bold mb-3">
                                        Report Accessibility Issues
                                    </h3>
                                    <p className="normal-text text-slate-300 mb-4">
                                        If you experience any difficulty accessing any part of our website or have suggestions for improvement, please let us know. We take your feedback seriously and will consider it as we evaluate ways to accommodate all our customers and our overall accessibility policies.
                                    </p>
                                    <div className="space-y-2">
                                        <p className="normal-text-2 text-slate-200">
                                            <strong>Email:</strong> <a href="mailto:accessibility@cafatickets.com" className="text-accent-50 hover:text-accent-100 transition-colors">accessibility@cafatickets.com</a>
                                        </p>
                                        <p className="normal-text-2 text-slate-200">
                                            <strong>Response Time:</strong> We aim to respond within 2 business days
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Information */}
            <section className="bg-primary-100 border-t-2 border-accent/30">
                <div className="inner-wrapper">
                    <div className="max-w-4xl">
                        <h2 className="big-text-2 text-white font-bold mb-6">
                            Technical Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="big-text-5 text-white font-semibold mb-2">
                                    Compatible Technologies
                                </h3>
                                <p className="normal-text text-slate-300">
                                    This website is designed to be compatible with the following assistive technologies:
                                </p>
                                <ul className="mt-2 space-y-1">
                                    {[
                                        'Screen readers (JAWS, NVDA, VoiceOver)',
                                        'Voice recognition software',
                                        'Screen magnification software',
                                        'Browser text-to-speech extensions'
                                    ].map((tech, index) => (
                                        <li key={index} className="normal-text-2 text-slate-300 ml-6">
                                            • {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="big-text-5 text-white font-semibold mb-2">
                                    Supported Browsers
                                </h3>
                                <p className="normal-text text-slate-300">
                                    For the best accessibility experience, we recommend using the latest versions of:
                                </p>
                                <ul className="mt-2 space-y-1">
                                    {[
                                        'Google Chrome',
                                        'Mozilla Firefox',
                                        'Apple Safari',
                                        'Microsoft Edge'
                                    ].map((browser, index) => (
                                        <li key={index} className="normal-text-2 text-slate-300 ml-6">
                                            • {browser}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AccessibilityPage;