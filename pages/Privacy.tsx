import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export const Privacy: React.FC = () => {
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
                        <Shield className="w-10 h-10 text-lux-text" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl text-lux-text mb-6 leading-tight"
                    >
                        Privacy Policy
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
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Introduction</h2>
                        <p className="text-lux-muted leading-relaxed mb-4">
                            At KaizenStat ("we", "our", or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                        </p>
                        <p className="text-lux-muted leading-relaxed">
                            By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Information We Collect</h2>
                        <p className="text-lux-muted leading-relaxed mb-4">
                            We collect several types of information to provide and improve our services:
                        </p>
                        <ul className="space-y-3 text-lux-muted">
                            <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide when filling out forms or contacting us.</li>
                            <li><strong>Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, pages visited, and time spent on pages.</li>
                            <li><strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies to track activity on our website and store certain information.</li>
                            <li><strong>Business Information:</strong> Details about your company, project requirements, and business needs when requesting our services.</li>
                        </ul>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">How We Use Your Information</h2>
                        <p className="text-lux-muted leading-relaxed mb-4">
                            We use the collected information for various purposes:
                        </p>
                        <ul className="space-y-3 text-lux-muted">
                            <li>To provide and maintain our services</li>
                            <li>To notify you about changes to our services</li>
                            <li>To provide customer support and respond to inquiries</li>
                            <li>To gather analysis or valuable information to improve our services</li>
                            <li>To monitor the usage of our services</li>
                            <li>To detect, prevent, and address technical issues</li>
                            <li>To send you newsletters, marketing communications, and other information (with your consent)</li>
                        </ul>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Data Security</h2>
                        <p className="text-lux-muted leading-relaxed">
                            The security of your data is important to us. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Data Sharing and Disclosure</h2>
                        <p className="text-lux-muted leading-relaxed mb-4">
                            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                        </p>
                        <ul className="space-y-3 text-lux-muted">
                            <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and services.</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety.</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                        </ul>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Your Rights</h2>
                        <p className="text-lux-muted leading-relaxed mb-4">
                            You have certain rights regarding your personal information:
                        </p>
                        <ul className="space-y-3 text-lux-muted">
                            <li>The right to access and receive a copy of your personal data</li>
                            <li>The right to request correction of inaccurate data</li>
                            <li>The right to request deletion of your data</li>
                            <li>The right to object to processing of your data</li>
                            <li>The right to data portability</li>
                            <li>The right to withdraw consent at any time</li>
                        </ul>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Cookies Policy</h2>
                        <p className="text-lux-muted leading-relaxed">
                            We use cookies to enhance your experience on our website. Cookies are small files stored on your device that help us understand how you use our site. You can control cookies through your browser settings, though disabling cookies may affect website functionality.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Changes to This Privacy Policy</h2>
                        <p className="text-lux-muted leading-relaxed">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-xl">
                        <h2 className="font-serif text-3xl text-lux-text mb-6">Contact Us</h2>
                        <p className="text-lux-muted leading-relaxed mb-4">
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <ul className="space-y-2 text-lux-muted">
                            <li>Email: privacy@kaizenstat.com</li>
                            <li>Phone: +91 98765 43210</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};
