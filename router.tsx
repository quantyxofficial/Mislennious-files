import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';

// Lazy load all route components for code splitting
const PracticeHome = lazy(() => import('./pages/PracticeHome').then(m => ({ default: m.PracticeHome })));
const AgencyHome = lazy(() => import('./pages/AgencyHome').then(m => ({ default: m.AgencyHome })));
const PracticeList = lazy(() => import('./pages/PracticeList').then(m => ({ default: m.PracticeList })));
const PracticeProblem = lazy(() => import('./pages/PracticeProblem').then(m => ({ default: m.PracticeProblem })));
const StudyMaterials = lazy(() => import('./pages/StudyMaterials').then(m => ({ default: m.StudyMaterials })));
const StudyChapter = lazy(() => import('./pages/StudyChapter').then(m => ({ default: m.StudyChapter })));
const CertificateExam = lazy(() => import('./pages/CertificateExam').then(m => ({ default: m.CertificateExam })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Events = lazy(() => import('./pages/Events').then(m => ({ default: m.Events })));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail').then(m => ({ default: m.ServiceDetail })));
const Portfolio = lazy(() => import('./pages/Portfolio').then(m => ({ default: m.Portfolio })));
const BlogListing = lazy(() => import('./pages/BlogListing').then(m => ({ default: m.BlogListing })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const Careers = lazy(() => import('./pages/Careers').then(m => ({ default: m.Careers })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <PracticeHome />,
            },
            {
                path: 'agency',
                element: <AgencyHome />,
            },
            {
                path: 'practice/:topic',
                element: <PracticeList />,
            },
            {
                path: 'practice/:topic/:problemId',
                element: <PracticeProblem />,
            },
            {
                path: 'study/:topic',
                element: <StudyMaterials />,
            },
            {
                path: 'study/:topic/:chapterId',
                element: <StudyChapter />,
            },
            {
                path: 'exam/:topic',
                element: <CertificateExam />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'services/:serviceId',
                element: <ServiceDetail />,
            },
            {
                path: 'events',
                element: <Events />,
            },
            {
                path: 'portfolio',
                element: <Portfolio />,
            },
            {
                path: 'blog',
                element: <BlogListing />,
            },
            {
                path: 'blog/:postId',
                element: <BlogPost />,
            },
            {
                path: 'careers',
                element: <Careers />,
            },
            {
                path: 'privacy',
                element: <Privacy />,
            },
            {
                path: 'terms',
                element: <Terms />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
