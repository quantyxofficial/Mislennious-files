import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { FORMSPREE_ENDPOINT } from '../constants';

interface FormState {
    email: string;
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string;
}

export const NewsletterForm: React.FC = () => {
    const [formState, setFormState] = useState<FormState>({
        email: '',
        status: 'idle',
        message: ''
    });

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(formState.email)) {
            setFormState({
                ...formState,
                status: 'error',
                message: 'Please enter a valid email address'
            });
            return;
        }

        setFormState({ ...formState, status: 'loading', message: '' });

        try {
            const formData = new FormData();
            formData.append('email', formState.email);
            formData.append('form_type', 'newsletter');

            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setFormState({
                    email: '',
                    status: 'success',
                    message: 'Thanks for subscribing! Check your inbox for confirmation.'
                });

                // Reset success message after 5 seconds
                setTimeout(() => {
                    setFormState(prev => ({ ...prev, status: 'idle', message: '' }));
                }, 5000);
            } else {
                setFormState({
                    ...formState,
                    status: 'error',
                    message: 'Something went wrong. Please try again later.'
                });
            }

        } catch (error) {
            setFormState({
                ...formState,
                status: 'error',
                message: 'Something went wrong. Please try again later.'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
                <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lux-muted/50" />
                    <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value, status: 'idle', message: '' })}
                        placeholder="Enter your email"
                        disabled={formState.status === 'loading'}
                        className="w-full pl-12 pr-6 py-3 rounded-full bg-white/80 border border-lux-text/10 text-lux-text placeholder:text-lux-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-lux-text/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        required
                        aria-label="Email address"
                    />
                </div>
                <button
                    type="submit"
                    disabled={formState.status === 'loading'}
                    className="px-8 py-3 bg-lux-text text-white rounded-full text-sm font-semibold hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    data-hover
                    aria-label="Subscribe to newsletter"
                >
                    {formState.status === 'loading' ? (
                        <>
                            <Loader className="w-4 h-4 animate-spin" />
                            <span>Subscribing...</span>
                        </>
                    ) : (
                        'Subscribe'
                    )}
                </button>
            </div>

            {/* Status Messages */}
            {formState.message && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 text-sm p-3 rounded-2xl ${formState.status === 'success'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                        }`}
                >
                    {formState.status === 'success' ? (
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    ) : (
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span>{formState.message}</span>
                </motion.div>
            )}
        </form>
    );
};
