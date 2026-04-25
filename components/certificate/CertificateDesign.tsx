import React, { forwardRef } from 'react';
import QRCode from 'react-qr-code';

interface CertificateDesignProps {
    name: string;
    email: string;
    uniqueId: string;
    userImage?: string;
    verificationUrl?: string;
    position?: string;
    category?: string;
    templateId?: string;
}

export const CertificateDesign = forwardRef<HTMLDivElement, CertificateDesignProps>(
    ({ name, email, uniqueId, userImage, verificationUrl, position, category, templateId }, ref) => {
        const qrValue = verificationUrl || `https://www.kaizenstat.com/verify/${uniqueId}`;

        // Determine template and text positions based on category and templateId
        const isGraphicDesign = category === 'Graphic Design';
        const isCoreTeam = category === 'Core Team';
        const isCompletion = templateId === 'tech-blog-completion';

        let bgImage = '/certificate-template.png'; // Default / Tech Blog Onboarding
        if (isGraphicDesign) bgImage = '/graphic_design_cert.png';
        if (isCoreTeam) bgImage = '/core_team_cert.png';
        if (isCompletion) bgImage = '/templates/Tech blog Certificate of Completion.png';

        // Orientation dimensions
        const width = isCompletion ? '848px' : '600px';
        const height = isCompletion ? '600px' : '848px';

        return (
            <div
                className="relative overflow-hidden bg-white shadow-2xl bg-cover bg-center bg-no-repeat"
                ref={ref}
                style={{
                    width,
                    height,
                    backgroundImage: `url("${bgImage}")`
                }}
            >
                {/* Dynamic Content based on Template */}

                {isGraphicDesign ? (
                    <>
                        {/* To: Name */}
                        <div className="absolute top-[27.5%] left-[10%] text-left w-[450px]">
                            <h2 className="text-xl font-serif font-bold text-black tracking-wide uppercase whitespace-nowrap overflow-visible">
                                {name}
                            </h2>
                        </div>

                        {/* Dear [Name], */}
                        <div className="absolute top-[41%] left-[10%] text-left w-[400px]">
                            <p className="text-lg font-serif font-bold text-black tracking-wide uppercase whitespace-nowrap overflow-visible">
                                {name},
                            </p>
                        </div>
                    </>
                ) : isCoreTeam ? (
                    <>
                        {/* To: Name */}
                        <div className="absolute top-[19.5%] left-[12%] text-left w-[450px]">
                            <h2 className="text-xl font-serif font-bold text-black tracking-wide uppercase whitespace-nowrap overflow-visible">
                                {name}
                            </h2>
                        </div>

                        {/* Sub: Onboarding as [Position] */}
                        <div className="absolute top-[27.5%] left-[36%] text-left w-[400px]">
                            <p className="text-md font-serif font-bold text-black whitespace-nowrap overflow-visible">
                                {position || 'Core Team Member'}
                            </p>
                        </div>

                        {/* Dear [Name], */}
                        <div className="absolute top-[32%] left-[16%] text-left w-[400px]">
                            <p className="text-lg font-serif font-bold text-black tracking-wide uppercase whitespace-nowrap overflow-visible">
                                {name},
                            </p>
                        </div>

                        {/* Body Position Insert */}
                        <div className="absolute top-[46.5%] left-[50%] transform -translate-x-1/2 text-left w-[300px]">
                            <p className="text-md font-serif font-bold text-black tracking-wide text-center w-full">
                                {position || 'Core Team Member'}
                            </p>
                        </div>
                    </>
                ) : isCompletion ? (
                    <>
                        {/* Tech Blog Completion Layout (Landscape 848x600) */}
                        
                        {/* Top Right Cluster: Name, Email, QR, ID */}
                        <div className="absolute top-[20px] right-[20px] flex flex-col items-end gap-1">
                            <div className="text-right mb-1">
                                <h2 className="text-[8px] font-serif font-bold text-black tracking-widest uppercase">
                                    {name}
                                </h2>
                                <p className="text-[6px] font-serif text-black/70">
                                    {email}
                                </p>
                            </div>
                            <div className="p-1 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-white/30">
                                <QRCode
                                    value={qrValue}
                                    size={60}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                />
                            </div>
                            <p className="text-[6px] text-gray-500 font-mono tracking-tighter opacity-70">
                                ID: {uniqueId}
                            </p>
                        </div>

                        {/* Awarded To Area (Main name) - Moved more right and up */}
                        <div className="absolute top-[44%] left-[38%] text-left">
                            <h2 className="text-2xl font-serif font-bold text-black tracking-wider uppercase">
                                {name},
                            </h2>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Tech Blog / Default Legacy Layout (certificate-template.png) - Portrait */}
                        <div className="absolute top-[28%] left-[12%] text-left w-[450px]">
                            <h2 className="text-xl font-serif font-bold text-black tracking-wide uppercase whitespace-nowrap overflow-visible">
                                {name}
                            </h2>
                        </div>
                        <div className="absolute top-[30.5%] left-[12%] text-left w-[450px]">
                            <p className="text-sm font-serif text-black whitespace-nowrap overflow-visible">
                                {email}
                            </p>
                        </div>
                        <div className="absolute top-[41.2%] left-[13%] text-left w-[400px]">
                            <h2 className="text-sm font-serif font-bold text-black tracking-wide uppercase whitespace-nowrap overflow-visible">
                                {name},
                            </h2>
                        </div>
                    </>
                )}

                {/* Common Elements */}
                {userImage && (
                    <div className="absolute top-[28%] right-[12%] w-[110px] h-[130px] border border-gray-300 shadow-sm z-10 bg-white">
                        <img src={userImage} alt="User" className="w-full h-full object-cover" />
                    </div>
                )}

                {/* QR Code and ID for NON-completion templates */}
                {!isCompletion && (
                    <>
                        <div className="absolute bottom-[55px] right-[40px] opacity-90 p-1 bg-white/50 rounded-lg">
                            <QRCode
                                value={qrValue}
                                size={35}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            />
                        </div>
                        <div className="absolute bottom-[40px] right-[40px] text-[8px] text-gray-500 font-mono text-center w-[50px]">
                            ID: {uniqueId}
                        </div>
                    </>
                )}
            </div>
        );
    }
);

CertificateDesign.displayName = 'CertificateDesign';
