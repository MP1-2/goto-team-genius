
import React from 'react';
import SolutionDetail from '@/components/solutions/SolutionDetail';

const LogoGenerationSolution: React.FC = () => {
  const sections = [
    {
      id: 'custom',
      title: 'Custom Team Logos',
      description: 'Create a professional logo that perfectly represents your team identity with our advanced AI-powered logo generator.',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'styles',
      title: 'Multiple Design Styles',
      description: 'Choose from various styles including modern, vintage, and cartoon to find the perfect aesthetic for your team brand.',
      imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'customization',
      title: 'Easy Customization',
      description: 'Fine-tune colors, layouts, and elements to create a logo that perfectly matches your team name and personality.',
      imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    }
  ];

  return (
    <SolutionDetail
      title="Logo Generation"
      description="Create professional-looking team logos that perfectly match your team name and style."
      sections={sections}
      actionLink="/logo"
      actionText="Create Your Logo"
    />
  );
};

export default LogoGenerationSolution;
