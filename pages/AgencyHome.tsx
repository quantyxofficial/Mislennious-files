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
} from '../components/index';

export const AgencyHome: React.FC = () => {
    return (
        <>
            <Hero />
            <Services />
            <Work />
            <Testimonials />
            <Team />
            {/* Contact is now in global Layout */}
        </>
    );
};
