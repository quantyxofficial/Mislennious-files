import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface ContactFormData {
    name: string;
    email: string;
    company: string;
    message: string;
}

interface FormState extends ContactFormData {
    status: 'idle' | 'loading' | 'success' | 'error';
    errorMessage: string;
}

export const ContactForm: React.FC = () => {
    const [formState, setFormState] = useState<FormState>({
        name: '',
        email: '',
        company: '',
        message: '',
        status: 'idle',
        errorMessage: ''
    });

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
            status: 'idle',
            errorMessage: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formState.name.trim()) {
            setFormState({ ...formState, status: 'error', errorMessage: 'Please enter your name' });
            return;
        }
        if (!validateEmail(formState.email)) {
            setFormState({ ...formState, status: 'error', errorMessage: 'Please enter a valid email address' });
            return;
        }
        if (!formState.message.trim()) {
            setFormState({ ...formState, status: 'error', errorMessage: 'Please enter a message' });
            return;
        }

        setFormState({ ...formState, status: 'loading', errorMessage: '' });

        try {
            // TODO: Replace with your actual form submission endpoint
            // Options:
            // 1.Formspree: https://formspree.io/f/YOUR_FORM_ID
            // 2. EmailJS: https://api.emailjs.com/api/v1.0/email/send
            // 3. Formsphere for WhatsApp: Configure with your number
            // 4. Your own backend API

            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    company: formState.company,
                    message: formState.message,
                }),
            });

            if (response.ok) {
                setFormState({
                    name: '',
                    email: '',
                    company: '',
                    message: '',
                    status: 'success',
                    errorMessage: ''
                });

                // Reset success message after 8 seconds
                setTimeout(() => {
                    setFormState(prev => ({ ...prev, status: 'idle' }));
                }, 8000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            setFormState({
                ...formState,
                status: 'error',
                errorMessage: 'Failed to send message. Please try again or contact us directly.'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-400 mb-2">
                        Your Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        disabled={formState.status === 'loading'}
                        className="w-full px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-400 mb-2">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        disabled={formState.status === 'loading'}
                        className="w-full px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                        placeholder="john@company.com"
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="company" className="block text-sm font-medium text-stone-400 mb-2">
                    Company (Optional)
                </label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    disabled={formState.status === 'loading'}
                    className="w-full px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                    placeholder="Your Company"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-400 mb-2">
                    Your Message *
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    disabled={formState.status === 'loading'}
                    rows={6}
                    className="w-full px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 resize-none"
                    placeholder="Tell us about your project..."
                    required
                ></textarea>
            </div>

            {/* Status Messages */}
            {formState.status === 'success' && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-300"
                >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <div>
                        <p className="font-semibold">Message sent successfully!</p>
                        <p className="text-sm text-green-400">We'll get back to you within 24 hours.</p>
                    </div>
                </motion.div>
            )}

            {formState.status === 'error' && formState.errorMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-300"
                >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p>{formState.errorMessage}</p>
                </motion.div>
            )}

            <button
                type="submit"
                disabled={formState.status === 'loading'}
                className="w-full px-8 py-4 bg-white text-lux-text font-semibold text-sm tracking-wider uppercase rounded-full hover:bg-stone-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                data-hover
            >
                {formState.status === 'loading' ? (
                    <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                    </>
                )}
            </button>
        </form>
    );
};
