
import React from 'react';
import SolutionDetail from '@/components/solutions/SolutionDetail';

const NameReservationSolution: React.FC = () => {
  const sections = [
    {
      id: 'exclusive',
      title: 'Secure Exclusive Rights',
      description: 'When you reserve a team name with us, you gain exclusive rights to use it across all major fantasy platforms. No more confusion or duplicate names in your leagues.',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'verification',
      title: 'Verified Name Badge',
      description: 'Your reserved name comes with a verified badge that shows other players your name is officially registered and protected.',
      imageUrl: 'https://images.unsplash.com/photo-1508345228704-935cc84bf5e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'platforms',
      title: 'Multi-Platform Support',
      description: 'We check and reserve your name across ESPN, Yahoo, Sleeper, NFL, and other popular fantasy sports platforms, ensuring consistency everywhere you play.',
      imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    }
  ];

  return (
    <SolutionDetail
      title="Reserve Unique Names"
      description="Secure an exclusive team name across all major fantasy platforms and stand out from the crowd."
      sections={sections}
      actionLink="/search"
      actionText="Check Name Availability"
    />
  );
};

export default NameReservationSolution;
