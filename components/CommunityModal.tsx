import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, QrCode, ArrowRight } from 'lucide-react';

interface CommunityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CommunityModal: React.FC<CommunityModalProps> = ({ isOpen, onClose }) => {
    const whatsappLink = "https://chat.whatsapp.com/DF0aZ6N71egLaQJaXfALfH";

    // Portal logic: Render into document.body
    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 pointer-events-auto">
                    {/* Backdrop with blurring */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", bounce: 0.35, duration: 0.6 }}
                        className="relative w-full max-w-md z-10"
                    >
                        {/* Glass Container */}
                        <div className="bg-white/90 backdrop-blur-2xl border border-white/60 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] rounded-[2.5rem] p-1 overflow-hidden">

                            {/* Inner Content Area */}
                            <div className="relative bg-white/50 rounded-[2.25rem] p-8 md:p-10 flex flex-col items-center text-center overflow-hidden">

                                {/* Background Decorative Blobs */}
                                <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
                                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-5 right-5 p-2 text-lux-muted/60 hover:text-lux-text transition-colors rounded-full hover:bg-black/5 z-20"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Icon / Header */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100/50 border border-green-200/50 flex items-center justify-center text-green-600 mb-6 shadow-sm"
                                >
                                    <QrCode className="w-8 h-8" />
                                </motion.div>

                                <div className="relative z-10 space-y-2 mb-8">
                                    <h3 className="font-serif text-3xl text-lux-text tracking-tight">
                                        Join the <span className="italic text-emerald-600/90">Community</span>
                                    </h3>
                                    <p className="text-sm text-lux-muted leading-relaxed max-w-[260px] mx-auto">
                                        Scan to connect with fellow builders, get exclusive updates, and resources.
                                    </p>
                                </div>

                                {/* QR Code Card */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative group bg-white p-3 rounded-2xl border border-gray-100 shadow-sm mb-8 hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                    <img
                                        src="/assets/whatsapp-qr.png"
                                        alt="WhatsApp Group QR Code"
                                        className="w-48 h-48 object-contain rounded-xl"
                                    />
                                    {/* Scan Corner Indicators */}
                                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-500 rounded-tl-md opacity-30" />
                                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-500 rounded-tr-md opacity-30" />
                                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-500 rounded-bl-md opacity-30" />
                                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-500 rounded-br-md opacity-30" />
                                </motion.div>

                                {/* Action Button */}
                                <motion.a
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-full py-4 rounded-xl overflow-hidden shadow-lg shadow-green-900/10 hover:shadow-green-900/20 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E]" />
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="relative flex items-center justify-center gap-2 text-white font-bold text-xs tracking-[0.15em] uppercase">
                                        <ExternalLink className="w-4 h-4" />
                                        <span>Join via Link</span>
                                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
