
import React from 'react';
import SolutionDetail from '@/components/solutions/SolutionDetail';

const VerifiedCheckmarkSolution: React.FC = () => {
  const sections = [
    {
      id: 'authenticity',
      title: 'Prove Your Authenticity',
      description: 'A verified checkmark next to your team name shows other players that you have exclusive rights to the name and it has been officially registered.',
      imageUrl: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'recognition',
      title: 'Instant Recognition',
      description: 'Stand out in fantasy leagues with a distinctive verified badge that sets your team apart from the competition.',
      imageUrl: 'https://images.unsplash.com/photo-1633265486501-b90b34b6b0bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'protection',
      title: 'Name Protection',
      description: 'Your verification status helps prevent others from using similar names, ensuring your brand remains unique across all platforms.',
      imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    }
  ];

  return (
    <SolutionDetail
      title="Verified Checkmark"
      description="Display an exclusive verification badge next to your team name, ensuring its authenticity and uniqueness."
      sections={sections}
      actionLink="/search"
      actionText="Get Verified Status"
    />
  );
};

export default VerifiedCheckmarkSolution;
