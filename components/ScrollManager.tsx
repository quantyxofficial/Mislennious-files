import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollManager = () => {
    const location = useLocation();
    const navType = useNavigationType();

    // Using sessionStorage to persist across reloads
    const getSavedPosition = (key: string) => {
        const stored = sessionStorage.getItem(`scroll_pos_${key}`);
        return stored ? parseInt(stored, 10) : 0;
    };

    const savePosition = (key: string, pos: number) => {
        sessionStorage.setItem(`scroll_pos_${key}`, pos.toString());
    };

    useEffect(() => {
        // Save scroll position on scroll (debounced slightly for perf if needed, but direct is safe mostly)
        const handleScroll = () => {
            savePosition(location.key, window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.key]);

    useEffect(() => {
        if (navType === 'POP') {
            const savedY = getSavedPosition(location.key);

            // Attempt to restore scroll position with retries for async content
            let attempts = 0;
            const maxAttempts = 20; // 2 seconds approx

            const restoreScroll = () => {
                const currentHeight = document.documentElement.scrollHeight;
                const windowHeight = window.innerHeight;

                // If the page is tall enough to scroll to savedY
                if (currentHeight >= savedY + windowHeight || attempts >= maxAttempts) {
                    window.scrollTo(0, savedY);
                    return; // Done
                }

                // If not tall enough yet, verify if we are at bottom.
                // But generally we just want to wait for height to increase.

                // Partial scroll to max available
                window.scrollTo(0, savedY);

                attempts++;
                requestAnimationFrame(() => setTimeout(restoreScroll, 100));
            };

            // Initial try
            restoreScroll();
        } else {
            // New page -> Reset to top
            window.scrollTo(0, 0);
        }
    }, [location.pathname, navType, location.key]);

    return null;
};
