import React from 'react';
import { Outlet } from 'react-router-dom';
import { PracticeLayout } from './PracticeLayout';

export const PracticeShell: React.FC = () => {
    return (
        <PracticeLayout>
            <Outlet />
        </PracticeLayout>
    );
};
