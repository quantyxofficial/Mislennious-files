import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { FORMSPREE_ENDPOINT } from '../constants';

interface ProjectFormProps {
    serviceName?: string;
    onClose?: () => void;
    onSuccess?: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ serviceName = 'General Inquiry', onClose, onSuccess }) => {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');

        try {
            const formData = new FormData(e.currentTarget);
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setFormStatus('success');
                if (onSuccess) onSuccess();
            } else {
                setFormStatus('error');
            }
        } catch (error) {
            setFormStatus('error');
        }
    };

    if (formStatus === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
            >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Check className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-serif text-3xl text-lux-text mb-4">Inquiry Received</h3>
                <p className="text-lux-muted mb-8 max-w-sm mx-auto">
                    Thanks for reaching out! We'll review your details and get back to you within 24 hours.
                </p>
                {/* Removed Phone Assistance Block */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-xs font-bold uppercase tracking-widest text-lux-text hover:text-lux-text/70 transition-colors"
                    >
                        Close Window
                    </button>
                )}
            </motion.div>
        );
    }

    return (
        <div className="text-left w-full max-w-lg mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-lux-text mb-3 text-center md:text-left">Let's Build This.</h2>
            <p className="text-sm text-lux-muted mb-10 text-center md:text-left leading-relaxed">
                Share a few details about your goals. We're ready to start when you are.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-6">
                <input type="hidden" name="service" value={serviceName} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-lux-text/50 ml-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-lux-text/20 focus:ring-4 focus:ring-lux-text/5 outline-none transition-all placeholder:text-gray-400 text-sm font-medium"
                            placeholder="Jane Doe"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-lux-text/50 ml-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-lux-text/20 focus:ring-4 focus:ring-lux-text/5 outline-none transition-all placeholder:text-gray-400 text-sm font-medium"
                            placeholder="jane@company.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-lux-text/50 ml-1">Project Details</label>
                    <textarea
                        name="message"
                        required
                        rows={4}
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-lux-text/20 focus:ring-4 focus:ring-lux-text/5 outline-none transition-all placeholder:text-gray-400 resize-none text-sm leading-relaxed"
                        placeholder="Tell us about your project goals, timeline, and rough budget..."
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full py-5 bg-lux-text text-lux-cream font-bold text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-black dark:hover:bg-white dark:hover:text-black hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-gray-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {formStatus === 'submitting' ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                            </>
                        ) : (
                            'Submit Inquiry'
                        )}
                    </button>
                </div>

                <p className="text-[10px] text-center text-lux-muted/60 mt-6 md:hidden">
                    {/* Spacer/Empty for mobile if needed, or just remove lines */}
                </p>
            </form>
        </div>
    );
};
