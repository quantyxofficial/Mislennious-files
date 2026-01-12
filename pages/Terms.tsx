import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export const Terms: React.FC = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-3xl bg-white/60 border border-white/80 backdrop-blur-xl"
                    >
                        <FileText className="w-10 h-10 text-lux-text" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl text-lux-text mb-6 leading-tight"
                    >
                        Terms of Service
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lux-muted text-lg"
                    >
                        Last updated: January 12, 2026
                    </motion.p>
                </div>
            </section>

            {/* Content */}
            <section className="px-6 md:px-12 lg:px-24 pb-32">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Agreement to Terms</h2>
                        <p className="text-lux-muted leading-relaxed">
                            These Terms of Service constitute a legally binding agreement between you and KaizenStat ("Company", "we", "us", or "our") concerning your access to and use of our website and services. By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access our services.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Services Description</h2>
                        <p className="text-lux-muted leading-relaxed mb-4">
                            KaizenStat provides digital services including but not limited to:
                        </p>
                        <ul className="space-y-2 text-lux-muted">
                            <li>Web development and design</li>
                            <li>Data analytics and business intelligence</li>
                            <li>AI and machine learning solutions</li>
                            <li>Growth marketing and advertising</li>
                            <li>Visual design and branding</li>
                        </ul>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">User Responsibilities</h2>
                        <p className="text-lux-muted leading-relaxed mb-4">
                            By using our services, you agree to:
                        </p>
                        <ul className="space-y-3 text-lux-muted">
                            <li>Provide accurate and complete information when submitting inquiries or forms</li>
                            <li>Maintain the confidentiality of any account credentials</li>
                            <li>Use our services only for lawful purposes</li>
                            <li>Not interfere with or disrupt our services or servers</li>
                            <li>Not attempt to gain unauthorized access to any part of our services</li>
                            <li>Respect intellectual property rights</li>
                        </ul>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Intellectual Property</h2>
                        <p className="text-lux-muted leading-relaxed">
                            All content on our website, including text, graphics, logos, images, and software, is the property of KaizenStat or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Service Agreements</h2>
                        <p className="text-lux-muted leading-relaxed mb-4">
                            When you engage our services, specific terms will be outlined in a separate service agreement or statement of work, which may include:
                        </p>
                        <ul className="space-y-2 text-lux-muted">
                            <li>Project scope and deliverables</li>
                            <li>Timeline and milestones</li>
                            <li>Payment terms and pricing</li>
                            <li>Intellectual property ownership</li>
                            <li>Confidentiality obligations</li>
                        </ul>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Payment Terms</h2>
                        <p className="text-lux-muted leading-relaxed mb-4">
                            Unless otherwise specified in a service agreement:
                        </p>
                        <ul className="space-y-2 text-lux-muted">
                            <li>Payments are due according to the agreed schedule</li>
                            <li>Late payments may incur additional fees</li>
                            <li>All fees are non-refundable unless otherwise stated</li>
                            <li>Prices are subject to change with notice</li>
                        </ul>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Limitation of Liability</h2>
                        <p className="text-lux-muted leading-relaxed">
                            To the maximum extent permitted by law, KaizenStat shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Warranty Disclaimer</h2>
                        <p className="text-lux-muted leading-relaxed">
                            Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, timely, secure, or error-free.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Termination</h2>
                        <p className="text-lux-muted leading-relaxed">
                            We reserve the right to terminate or suspend access to our services immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use our services will immediately cease.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Governing Law</h2>
                        <p className="text-lux-muted leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in India.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Changes to Terms</h2>
                        <p className="text-lux-muted leading-relaxed">
                            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. Your continued use of our services after changes constitutes acceptance of the new Terms.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Contact Information</h2>
                        <p className="text-lux-muted leading-relaxed mb-4">
                            If you have any questions about these Terms, please contact us:
                        </p>
                        <ul className="space-y-2 text-lux-muted">
                            <li>Email: legal@kaizenstat.com</li>
                            <li>Phone: +91 98765 43210</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};
