import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, QrCode } from 'lucide-react';

interface CommunityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CommunityModal: React.FC<CommunityModalProps> = ({ isOpen, onClose }) => {
    const whatsappLink = "https://chat.whatsapp.com/DF0aZ6N71egLaQJaXfALfH";

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-lux-muted hover:text-black transition-colors rounded-full hover:bg-stone-100"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                                <QrCode className="w-6 h-6" />
                            </div>

                            <h3 className="font-serif text-2xl text-lux-text mb-2">Join the Club.</h3>
                            <p className="text-sm text-lux-muted mb-8 leading-relaxed">
                                Scan or click to join our exclusive WhatsApp community for updates, resources, and discussions.
                            </p>

                            {/* QR Code Container */}
                            <div className="w-56 h-56 bg-white border border-stone-100 rounded-2xl p-2 shadow-sm mb-8">
                                <img
                                    src="/assets/whatsapp-qr.png"
                                    alt="WhatsApp Group QR Code"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>

                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 bg-[#25D366] text-white font-bold text-xs uppercase tracking-[0.1em] rounded-xl hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Join via Link
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
