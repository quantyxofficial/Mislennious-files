import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout as AgencyLayout } from '../AgencyLayout';

// Lazy load all route components
const PracticeHome = lazy(() => import('../pages/agency/PracticeHome').then(m => ({ default: m.PracticeHome })));

const PracticeList = lazy(() => import('../pages/agency/PracticeList').then(m => ({ default: m.PracticeList })));
const PracticeProblem = lazy(() => import('../pages/agency/PracticeProblem').then(m => ({ default: m.PracticeProblem })));
const PracticeShell = lazy(() => import('../components/agency/practice/PracticeShell').then(m => ({ default: m.PracticeShell })));
const StudyMaterials = lazy(() => import('../pages/agency/StudyMaterials').then(m => ({ default: m.StudyMaterials })));
const StudyChapter = lazy(() => import('../pages/agency/StudyChapter').then(m => ({ default: m.StudyChapter })));
const CertificateExam = lazy(() => import('../pages/agency/CertificateExam').then(m => ({ default: m.CertificateExam })));
const About = lazy(() => import('../pages/agency/About').then(m => ({ default: m.About })));
const Events = lazy(() => import('../pages/agency/Events').then(m => ({ default: m.Events })));
const ServiceDetail = lazy(() => import('../pages/agency/ServiceDetail').then(m => ({ default: m.ServiceDetail })));
const Portfolio = lazy(() => import('../pages/agency/Portfolio').then(m => ({ default: m.Portfolio })));
const BlogListing = lazy(() => import('../pages/agency/BlogListing').then(m => ({ default: m.BlogListing })));
const BlogPost = lazy(() => import('../pages/agency/BlogPost').then(m => ({ default: m.BlogPost })));
const Careers = lazy(() => import('../pages/agency/Careers').then(m => ({ default: m.Careers })));
const Privacy = lazy(() => import('../pages/agency/Privacy').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('../pages/agency/Terms').then(m => ({ default: m.Terms })));
const NotFound = lazy(() => import('../pages/agency/NotFound').then(m => ({ default: m.NotFound })));
const KaizenAI = lazy(() => import('../pages/agency/KaizenAI').then(m => ({ default: m.KaizenAI })));
const AdminDashboard = lazy(() => import('../pages/agency/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const CertificateGenerator = lazy(() => import('../pages/agency/CertificateGenerator').then(m => ({ default: m.CertificateGenerator })));
const CertificateVerify = lazy(() => import('../pages/agency/CertificateVerify').then(m => ({ default: m.CertificateVerify })));
const OpenSourceLanding = lazy(() => import('../pages/agency/OpenSourceLanding').then(m => ({ default: m.OpenSourceLanding })));

// Student Dashboard Components
const StudentLayout = lazy(() => import('../pages/agency/student/StudentLayout').then(m => ({ default: m.StudentLayout })));
const StudentInfo = lazy(() => import('../pages/agency/student/StudentInfo').then(m => ({ default: m.StudentInfo })));
const UpcomingCompetitions = lazy(() => import('../pages/agency/student/UpcomingCompetitions').then(m => ({ default: m.UpcomingCompetitions })));
const VirtualIdCard = lazy(() => import('../pages/agency/student/VirtualIdCard').then(m => ({ default: m.VirtualIdCard })));
const Announcements = lazy(() => import('../pages/agency/student/Announcements').then(m => ({ default: m.Announcements })));

// Admin Components
const AdminLogin = lazy(() => import('../pages/agency/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const StudentAnalytics = lazy(() => import('../pages/agency/admin/StudentAnalytics').then(m => ({ default: m.StudentAnalytics })));
const DashboardAdmin = lazy(() => import('../pages/agency/admin/DashboardAdmin').then(m => ({ default: m.DashboardAdmin })));

// Member ID Verification
const MemberIdVerify = lazy(() => import('../pages/agency/MemberIdVerify').then(m => ({ default: m.MemberIdVerify })));

export const AgencyRoutes = () => {
    return (
        <Routes>
            <Route element={<AgencyLayout />}>
                <Route path="get-certified" element={<CertificateGenerator />} />
                <Route path="verify/:shortId" element={<MemberIdVerify />} />
                <Route path="verify" element={<CertificateVerify />} />
                <Route path="verify/:uniqueId" element={<CertificateVerify />} />
                <Route path="practice" element={<PracticeHome />} />
                <Route path="kaizen-ai" element={<KaizenAI />} />

                {/* Student Dashboard */}
                <Route path="student" element={<StudentLayout />}>
                    <Route index element={<StudentInfo />} />
                    <Route path="competitions" element={<UpcomingCompetitions />} />
                    <Route path="id-card" element={<VirtualIdCard />} />
                    <Route path="announcements" element={<Announcements />} />
                </Route>

                <Route path="practice/:topic" element={<PracticeList />} />
                <Route path="practice/:topic/:problemId" element={<PracticeShell />}>
                    <Route index element={<PracticeProblem />} />
                </Route>

                <Route path="study/:topic" element={<StudyMaterials />} />
                <Route path="study/:topic/:chapterId" element={<StudyChapter />} />
                <Route path="exam/:topic" element={<CertificateExam />} />
                <Route path="about" element={<About />} />
                <Route path="services/:serviceId" element={<ServiceDetail />} />
                <Route path="events" element={<Events />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="blog" element={<BlogListing />} />
                <Route path="blog/:postId" element={<BlogPost />} />
                <Route path="careers" element={<Careers />} />
                <Route path="agency-privacy" element={<Privacy />} />
                <Route path="agency-terms" element={<Terms />} />
                <Route path="contribute" element={<OpenSourceLanding />} />
                <Route path="admin/login" element={<AdminLogin />} />
                <Route path="admin/students" element={<StudentAnalytics />} />
                <Route path="admin/dashboard" element={<DashboardAdmin />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};
