import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/layout/BottomNavigation';

// Import the refactored components
import HeaderNavigation from '@/components/home/HeaderNavigation';
import HeroSection from '@/components/home/HeroSection';
import SolutionSection from '@/components/home/SolutionSection';
import BlogsSection from '@/components/home/BlogsSection';
import RankingsSection from '@/components/home/RankingsSection';
import PartnershipsSection from '@/components/home/PartnershipsSection';
import AppTeaserSection from '@/components/home/AppTeaserSection';
import FooterSection from '@/components/home/FooterSection';

// Mock data for recently searched names - kept here as it's used across different sections
const MOCK_RECENT_SEARCHES = [
  { id: '1', name: 'Touchdown Titans', searchedAt: '2025-04-15T10:30:00Z' },
  { id: '2', name: 'Hoop Dreams', searchedAt: '2025-04-14T14:45:00Z' },
  { id: '3', name: 'Diamond Dynamos', searchedAt: '2025-04-13T09:15:00Z' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const solutionRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);
  const rankingsRef = useRef<HTMLDivElement>(null);
  const partnershipsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleCheckName = (name: string) => {
    navigate('/search', { state: { searchQuery: name } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Navigation */}
      <HeaderNavigation 
        onNavigate={scrollToSection}
        blogsRef={blogsRef}
        rankingsRef={rankingsRef}
        partnershipsRef={partnershipsRef}
        solutionRef={solutionRef}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Our Solution Section */}
      <SolutionSection solutionRef={solutionRef} />

      {/* Blogs Section */}
      <BlogsSection blogsRef={blogsRef} />

      {/* Rankings Section */}
      <RankingsSection rankingsRef={rankingsRef} />

      {/* Partnerships Section */}
      <PartnershipsSection partnershipsRef={partnershipsRef} />

      {/* App Teaser Section */}
      <AppTeaserSection />

      {/* Footer */}
      <FooterSection />

      {/* Keep the BottomNavigation only for mobile */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Home;
