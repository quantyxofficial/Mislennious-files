import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { ServiceDetail } from './pages/ServiceDetail';
import { Portfolio } from './pages/Portfolio';
import { BlogListing } from './pages/BlogListing';
import { BlogPost } from './pages/BlogPost';
import { Careers } from './pages/Careers';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
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
        ],
    },
]);
