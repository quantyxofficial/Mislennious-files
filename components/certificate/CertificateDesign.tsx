import React, { forwardRef } from 'react';
import QRCode from 'react-qr-code';

interface CertificateDesignProps {
    name: string;
    email: string;
    uniqueId: string;
    userImage?: string;
    verificationUrl?: string;
}

export const CertificateDesign = forwardRef<HTMLDivElement, CertificateDesignProps>(
    ({ name, email, uniqueId, userImage, verificationUrl }, ref) => {
        const qrValue = verificationUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/verify/${uniqueId}`;

        return (
            <div
                className="relative overflow-hidden bg-white shadow-2xl bg-cover bg-center bg-no-repeat"
                ref={ref}
                style={{
                    width: '600px',
                    height: '848px',
                    backgroundImage: 'url(/certificate-template.png)'
                }}
            >
                {/* To: Name */}
                <div className="absolute top-[28%] left-[12%] text-left w-[450px]">
                    <h2 className="text-xl font-serif font-bold text-black tracking-wide uppercase whitespace-nowrap overflow-visible">
                        {name}
                    </h2>
                </div>

                {/* To: Email */}
                <div className="absolute top-[30.5%] left-[12%] text-left w-[450px]">
                    <p className="text-sm font-serif text-black whitespace-nowrap overflow-visible">
                        {email}
                    </p>
                </div>

                {/* Dear [Name], */}
                <div className="absolute top-[41.2%] left-[13%] text-left w-[400px]">
                    <h2 className="text-sm font-serif font-bold text-black tracking-wide uppercase whitespace-nowrap overflow-visible">
                        {name},
                    </h2>
                </div>

                {/* User Uploaded Image */}
                {userImage && (
                    <div className="absolute top-[28%] right-[12%] w-[110px] h-[130px] rounded-sm overflow-hidden border border-gray-300 shadow-sm z-10 bg-white">
                        <img src={userImage} alt="User" className="w-full h-full object-cover" />
                    </div>
                )}

                {/* QR Code */}
                <div className="absolute bottom-[55px] right-[40px] opacity-90 p-1 bg-white/50 rounded-lg">
                    <QRCode
                        value={qrValue}
                        size={40}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                </div>

                <div className="absolute bottom-[40px] right-[40px] text-[8px] text-gray-500 font-mono text-center w-[40px]">
                    ID: {uniqueId}
                </div>
            </div>
        );
    }
);

CertificateDesign.displayName = 'CertificateDesign';
