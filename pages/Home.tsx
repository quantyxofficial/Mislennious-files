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

export const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <ClientMarquee />
            <Services />
            <Work />
            <CommunityPreview />
            <Testimonials />
            <Team />
            <Contact />
        </>
    );
};
