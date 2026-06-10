import { Navbar } from '../components/sections/Navbar';
import { SectionNavigator } from '../components/ui/SectionNavigator';
import { Hero } from '../components/sections/Hero';
import { TrustMetrics } from '../components/sections/TrustMetrics';
import { UniversityBelt } from '../components/sections/UniversityBelt';
import { ContributionFlow } from '../components/sections/ContributionFlow';
import { Tracks } from '../components/sections/Tracks';
import { FeaturedProjects } from '../components/sections/FeaturedProjects';
import { JoinRoles } from '../components/sections/JoinRoles';
import { FloatingReviews } from '../components/sections/FloatingReviews';
import { Team } from '../components/sections/Team';
import { PastEvents } from '../components/sections/PastEvents';
import { GlobalNetwork } from '../components/sections/GlobalNetwork';
import { Rewards } from '../components/sections/Rewards';
import { Sponsors } from '../components/sections/Sponsors';
import { Footer } from '../components/sections/Footer';

export function CompetitionsPage() {
  return (
    <>
      <Navbar />
      <SectionNavigator />
      <main className="pt-[80px]">
        <Hero />
        <TrustMetrics />
        <UniversityBelt />

        <ContributionFlow />
        <Tracks />
        <JoinRoles />
        <FeaturedProjects />
        <Rewards />
        <FloatingReviews />
        <Team />
        <PastEvents />
        <GlobalNetwork />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
}
