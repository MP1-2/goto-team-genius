
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Mock partners
const PARTNERS = [
  { id: '1', name: 'ESPN Fantasy', logo: '🏆' },
  { id: '2', name: 'Yahoo Fantasy', logo: '🎮' },
  { id: '3', name: 'NFL Fantasy', logo: '🏈' },
  { id: '4', name: 'Sleeper', logo: '💤' },
];

interface PartnershipsSectionProps {
  partnershipsRef: React.RefObject<HTMLDivElement>;
}

const PartnershipsSection: React.FC<PartnershipsSectionProps> = ({ partnershipsRef }) => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact');
  };

  return (
    <section ref={partnershipsRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Our Partnerships</h2>
          <p className="text-muted-foreground max-w-2xl">
            We work with the leading fantasy sports platforms to provide you with a seamless experience
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {PARTNERS.map((partner) => (
            <div key={partner.id} className="flex flex-col items-center space-y-3">
              <div className="h-24 w-24 rounded-full bg-white shadow flex items-center justify-center text-4xl">
                {partner.logo}
              </div>
              <h3 className="font-medium">{partner.name}</h3>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-6">
            Interested in partnering with GotoGuys? We're always looking to expand our network of fantasy sports platforms.
          </p>
          <Button onClick={handleContactUs}>Contact Us</Button>
        </div>
      </div>
    </section>
  );
};

export default PartnershipsSection;
