import React from 'react';
import {
    Hero,
    ClientMarquee,
    Services,
    Work,
    CommunityPreview,
    Testimonials,
    Team,
    Contact
} from '../components';

export const AgencyHome: React.FC = () => {
    return (
        <>
            <Hero />
            <ClientMarquee />
            <Services />
            <Work />
            <CommunityPreview />
            <Testimonials />
            <Team />
            {/* Contact is now in global Layout */}
        </>
    );
};
