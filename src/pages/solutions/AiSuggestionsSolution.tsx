
import React from 'react';
import SolutionDetail from '@/components/solutions/SolutionDetail';

const AiSuggestionsSolution: React.FC = () => {
  const sections = [
    {
      id: 'personalized',
      title: 'Personalized Suggestions',
      description: 'Our AI analyzes your preferences, favorite sports, and team style to generate names that perfectly match your personality and interests.',
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'creative',
      title: 'Creative and Unique',
      description: 'Say goodbye to generic team names. Our AI creates truly original ideas that will make your team stand out in any fantasy league.',
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 'unlimited',
      title: 'Unlimited Inspiration',
      description: 'Need more options? Generate as many name suggestions as you want until you find the perfect fit for your fantasy team.',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    }
  ];

  return (
    <SolutionDetail
      title="AI Name Suggestions"
      description="Let our advanced AI generate creative, unique, and personalized team name ideas based on your preferences."
      sections={sections}
      actionLink="/suggestions"
      actionText="Get AI Suggestions"
    />
  );
};

export default AiSuggestionsSolution;
